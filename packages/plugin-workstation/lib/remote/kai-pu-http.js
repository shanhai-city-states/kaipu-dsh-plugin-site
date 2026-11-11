import { PLUGIN_VERSION } from './version.js';
export function readApiError(res, parsed) {
    const body = parsed !== null && typeof parsed === 'object' ? parsed : {};
    const nested = typeof body.error === 'object' && body.error !== null ? body.error : null;
    const pick = (...vals) => vals.find((v) => typeof v === 'string' && v.length > 0);
    const code = pick(nested?.code, typeof body.error === 'string' ? body.error : undefined, body.code) ??
        `http_${res.status}`;
    const message = pick(nested?.message, nested?.detail, body.message, body.detail) ??
        `服务端返回 ${res.status}`;
    return { code, message };
}
function getFetch() {
    const f = globalThis.fetch;
    return typeof f === 'function' ? f : null;
}
function getProcess() {
    return globalThis.process;
}
export class KaipuHttpError extends Error {
    status;
    code;
    details;
    constructor(status, code, message, details) {
        super(message);
        this.name = 'KaipuHttpError';
        this.status = status;
        this.code = code;
        this.details = details;
    }
}
export class KaipuHttpClient {
    baseUrl;
    fingerprint;
    clientVersion;
    async resetDeviceSecret(signal) {
        const cred = readAnyDeviceCred();
        if (!cred) {
            throw new KaipuHttpError(0, 'no_device_cred', '找不到本机设备凭据：先在工位里登录一次，再回来重置。');
        }
        const data = await this.call('POST', '/auth/device/reset', cred, signal);
        updateDeviceCredById(cred.deviceId, { deviceSecret: data.deviceSecret });
        return data;
    }
    token = null;
    accountId = null;
    expiresAt = 0;
    shopOverride = null;
    switchShop(accountId) {
        const next = (accountId ?? '').trim() || null;
        if (next === this.shopOverride)
            return;
        this.shopOverride = next;
        this.token = null;
        this.expiresAt = 0;
        this.accountId = null;
    }
    currentShopOverride() {
        return this.shopOverride;
    }
    constructor(opts) {
        this.baseUrl = opts.baseUrl.replace(/\/+$/, '');
        this.fingerprint = (opts.fingerprint || '').trim() || deriveFingerprint();
        this.clientVersion = (opts.clientVersion || '').trim();
    }
    describe() {
        return { baseUrl: this.baseUrl, accountId: this.accountId, hasToken: this.token !== null };
    }
    fingerprintHint() {
        return this.fingerprint;
    }
    async requestProjectAudit(projectId, pkg = 'standard') {
        const token = await this.ensureToken();
        const r = await this.request('POST', `/projects/${encodeURIComponent(projectId)}/audit-request`, { package: pkg }, token);
        return r;
    }
    async getAudit(id) {
        const token = await this.ensureToken();
        const r = await this.request('GET', `/audit/${encodeURIComponent(id)}`, undefined, token);
        return r;
    }
    async identify(signal) {
        await this.ensureToken(signal);
        return this.accountId ?? '';
    }
    async ensureToken(signal) {
        const now = Date.now();
        if (this.token !== null && now < this.expiresAt - 60_000)
            return this.token;
        const cred = readDeviceCred(this.baseUrl);
        const fpBody = () => {
            const b = {
                fingerprint: this.fingerprint,
                clientVersion: PLUGIN_VERSION,
            };
            const iid = getOrCreateInstallId();
            if (iid !== '')
                b.installId = iid;
            if (this.shopOverride !== null)
                b.accountId = this.shopOverride;
            return b;
        };
        let res;
        if (cred) {
            try {
                const body = {
                    deviceId: cred.deviceId,
                    deviceSecret: cred.deviceSecret,
                };
                if (this.shopOverride !== null)
                    body.accountId = this.shopOverride;
                res = await this.request('POST', '/auth/device', body, undefined, signal);
            }
            catch (e) {
                if (e instanceof KaipuHttpError && (e.status === 401 || e.status === 403)) {
                    clearDeviceCred(this.baseUrl);
                    res = await this.request('POST', '/auth/device', fpBody(), undefined, signal);
                }
                else {
                    throw e;
                }
            }
        }
        else {
            res = await this.request('POST', '/auth/device', fpBody(), undefined, signal);
        }
        const data = res;
        if (typeof data.deviceToken !== 'string' || data.deviceToken.length === 0) {
            throw new KaipuHttpError(502, 'bad_device_auth', '服务端没有返回设备令牌 —— 接入地址可能不是开铺服务端。');
        }
        if (typeof data.deviceId === 'string' && data.deviceId.length > 0 &&
            typeof data.deviceSecret === 'string' && data.deviceSecret.length > 0) {
            writeDeviceCred(this.baseUrl, { deviceId: data.deviceId, deviceSecret: data.deviceSecret });
        }
        this.token = data.deviceToken;
        this.accountId = typeof data.accountId === 'string' ? data.accountId : null;
        const parsed = data.expiresAt ? Date.parse(data.expiresAt) : NaN;
        this.expiresAt = Number.isFinite(parsed) ? parsed : now + 3_600_000;
        return this.token;
    }
    invalidateToken() {
        this.token = null;
        this.expiresAt = 0;
    }
    async *openSseStream(path, headers, signal) {
        const token = await this.ensureToken(signal);
        const f = getFetch();
        if (f === null) {
            throw new KaipuHttpError(0, 'no_fetch', '当前宿主没有全局 fetch（需 Node 18+）—— 工位连不上服务端。');
        }
        const h = {
            Accept: 'text/event-stream',
            'X-Client-Version': this.clientVersion,
            ...headers,
        };
        if (token)
            h.Authorization = `Bearer ${token}`;
        const url = `${this.baseUrl}${path}`;
        let res;
        try {
            res = (await f(url, {
                method: 'GET',
                headers: h,
                signal,
            }));
        }
        catch (e) {
            if (signal?.aborted)
                return;
            throw new KaipuHttpError(0, 'stream_connect_failed', `连不上服务端：${e instanceof Error ? e.message : String(e)}`);
        }
        if (res.status !== 200) {
            let text = '';
            try {
                text = await res.text();
            }
            catch {
            }
            let parsedBody = null;
            try {
                parsedBody = JSON.parse(text);
            }
            catch {
                parsedBody = null;
            }
            const body = readApiError(res, parsedBody);
            throw new KaipuHttpError(res.status, body.code, body.message);
        }
        const streamBody = res.body;
        if (streamBody === null || streamBody === undefined) {
            throw new KaipuHttpError(0, 'stream_no_body', '服务端没有返回事件流（body 为空）。');
        }
        const Reader = globalThis.TextDecoder;
        if (Reader === undefined) {
            throw new KaipuHttpError(0, 'no_textdecoder', '当前宿主没有 TextDecoder，读不了事件流。');
        }
        const reader = streamBody.getReader();
        const dec = new Reader('utf-8');
        let buf = '';
        const IDLE_MS = 35_000;
        let idleTimer = null;
        try {
            for (;;) {
                if (signal?.aborted === true)
                    return;
                const chunk = (await Promise.race([
                    reader.read(),
                    new Promise((_resolve, reject) => {
                        const g = globalThis;
                        if (g.setTimeout === undefined) {
                            return;
                        }
                        idleTimer = g.setTimeout(() => {
                            reject(new KaipuHttpError(0, 'stream_idle_timeout', '实时流长时间没有数据，正在重连。'));
                        }, IDLE_MS);
                    }),
                ]));
                if (idleTimer !== null) {
                    const g = globalThis;
                    g.clearTimeout?.(idleTimer);
                    idleTimer = null;
                }
                if (chunk.done)
                    break;
                if (chunk.value === undefined)
                    continue;
                buf = (buf + dec.decode(chunk.value, { stream: true })).replace(/\r\n/gu, '\n');
                let cut = buf.indexOf('\n\n');
                while (cut >= 0) {
                    yield buf.slice(0, cut);
                    buf = buf.slice(cut + 2);
                    cut = buf.indexOf('\n\n');
                }
            }
            buf += dec.decode();
            if (buf.trim() !== '')
                yield buf;
        }
        finally {
            try {
                await reader.cancel?.();
            }
            catch {
            }
        }
    }
    async call(method, path, body, signal) {
        const token = await this.ensureToken(signal);
        return (await this.request(method, path, body, token, signal));
    }
    async callAnon(method, path, body, signal) {
        return (await this.request(method, path, body, undefined, signal));
    }
    async uploadRaw(path, bytes, headers, signal) {
        const token = await this.ensureToken(signal);
        const f = getFetch();
        if (f === null) {
            throw new KaipuHttpError(0, 'no_fetch', '当前宿主没有全局 fetch（需 Node 18+）—— 工位连不上服务端。');
        }
        const h = { Accept: 'application/json', ...headers };
        if (token)
            h.Authorization = `Bearer ${token}`;
        if (!h['Content-Type'])
            h['Content-Type'] = 'application/octet-stream';
        let res;
        try {
            const init = {
                method: 'POST',
                headers: h,
                body: bytes,
            };
            if (signal !== undefined)
                init.signal = signal;
            res = await f.call(globalThis, `${this.baseUrl}${path}`, init);
        }
        catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            throw new KaipuHttpError(0, 'network_error', `上传连不上服务端（${this.baseUrl}）：${msg}`);
        }
        return this.parseJsonResponse(res, await res.text());
    }
    async downloadRaw(path, signal) {
        const token = await this.ensureToken(signal);
        const f = getFetch();
        if (f === null) {
            throw new KaipuHttpError(0, 'no_fetch', '当前宿主没有全局 fetch（需 Node 18+）—— 工位连不上服务端。');
        }
        const h = { Accept: '*/*' };
        if (token)
            h.Authorization = `Bearer ${token}`;
        let res;
        try {
            const init = { method: 'GET', headers: h };
            if (signal !== undefined)
                init.signal = signal;
            res = await f.call(globalThis, `${this.baseUrl}${path}`, init);
        }
        catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            throw new KaipuHttpError(0, 'network_error', `下载连不上服务端（${this.baseUrl}）：${msg}`);
        }
        if (!res.ok) {
            this.parseJsonResponse(res, await res.text());
            throw new KaipuHttpError(res.status, `http_${res.status}`, `下载失败 ${res.status}`);
        }
        const buf = await res.arrayBuffer();
        const cd = res.headers?.get('Content-Disposition') ?? null;
        return {
            bytes: new Uint8Array(buf),
            contentType: res.headers?.get('Content-Type') ?? 'application/octet-stream',
            filename: parseRfc6266Filename(cd),
        };
    }
    parseJsonResponse(res, text) {
        let parsed = null;
        if (text.length > 0) {
            try {
                parsed = JSON.parse(text);
            }
            catch {
                parsed = { message: text.slice(0, 200) };
            }
        }
        if (!res.ok) {
            const { code, message } = readApiError(res, parsed);
            throw new KaipuHttpError(res.status, code, message);
        }
        if (parsed !== null && typeof parsed === 'object' && 'data' in parsed) {
            const env = parsed;
            if (env.ok === true || env.ok === undefined)
                return env.data;
        }
        return parsed;
    }
    async request(method, path, body, token, signal) {
        const f = getFetch();
        if (f === null) {
            throw new KaipuHttpError(0, 'no_fetch', '当前宿主没有全局 fetch（需 Node 18+）—— 工位连不上服务端。');
        }
        const headers = { Accept: 'application/json' };
        if (body !== undefined)
            headers['Content-Type'] = 'application/json';
        if (token)
            headers.Authorization = `Bearer ${token}`;
        let res;
        try {
            const init = {
                method,
                headers,
            };
            if (body !== undefined)
                init.body = JSON.stringify(body);
            if (signal !== undefined)
                init.signal = signal;
            res = await f.call(globalThis, `${this.baseUrl}${path}`, init);
        }
        catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            throw new KaipuHttpError(0, 'network_error', `连不上服务端（${this.baseUrl}）：${msg}`);
        }
        const text = await res.text();
        let parsed = null;
        if (text.length > 0) {
            try {
                parsed = JSON.parse(text);
            }
            catch {
                parsed = { message: text.slice(0, 200) };
            }
        }
        if (!res.ok) {
            const { code, message } = readApiError(res, parsed);
            throw new KaipuHttpError(res.status, code, message);
        }
        if (parsed !== null && typeof parsed === 'object' && 'data' in parsed) {
            const env = parsed;
            if (env.ok === true || env.ok === undefined)
                return env.data;
        }
        return parsed;
    }
}
function installIdFile() {
    const path = builtin('node:path');
    const os = builtin('node:os');
    return path.join(os.homedir(), '.kai-pu', 'install.json');
}
let cachedInstallId = null;
export function getOrCreateInstallId() {
    if (cachedInstallId !== null)
        return cachedInstallId;
    const path = builtin('node:path');
    const fs = builtin('node:fs');
    try {
        const f = installIdFile();
        if (fs.existsSync(f)) {
            const j = JSON.parse(fs.readFileSync(f, 'utf8'));
            const v = typeof j.installId === 'string' ? j.installId.trim() : '';
            if (v.length >= 8) {
                cachedInstallId = v;
                return v;
            }
        }
        let id = '';
        try {
            const crypto = builtin('node:crypto');
            id = crypto.randomUUID();
        }
        catch {
            id = 'iid-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
        }
        fs.mkdirSync(path.dirname(f), { recursive: true, mode: 0o700 });
        fs.writeFileSync(f, JSON.stringify({ installId: id, createdAt: new Date().toISOString() }), { mode: 0o600 });
        cachedInstallId = id;
        return id;
    }
    catch {
        return '';
    }
}
function deriveFingerprint() {
    const proc = getProcess();
    const env = proc?.env ?? {};
    const parts = [
        env.HOSTNAME || env.COMPUTERNAME || 'unknown-host',
        env.USER || env.USERNAME || 'unknown-user',
        proc?.platform || 'unknown-platform',
        proc?.arch || 'unknown-arch',
    ];
    const s = parts.join('|');
    let h = 0;
    for (let i = 0; i < s.length; i += 1) {
        h = (h << 5) - h + s.charCodeAt(i);
        h |= 0;
    }
    return `dsh-${Math.abs(h).toString(16).padStart(12, '0').slice(0, 12)}`;
}
function builtin(id) {
    const p = globalThis.process;
    const get = p?.getBuiltinModule;
    if (typeof get !== 'function')
        throw new Error(`运行时未暴露内置模块（${id}）`);
    const mod = get.call(p, id);
    if (mod === undefined || mod === null)
        throw new Error(`无法载入内置模块（${id}）`);
    return mod;
}
function shortHash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i += 1) {
        h = (h << 5) - h + s.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h).toString(16).padStart(8, '0').slice(0, 8);
}
function credFile(baseUrl) {
    const path = builtin('node:path');
    const os = builtin('node:os');
    return path.join(os.homedir(), '.kai-pu', `device-${shortHash(baseUrl)}.json`);
}
export function readDeviceCred(baseUrl) {
    try {
        const fs = builtin('node:fs');
        const f = credFile(baseUrl);
        if (!fs.existsSync(f))
            return null;
        const j = JSON.parse(fs.readFileSync(f, 'utf8'));
        if (typeof j.deviceId === 'string' && j.deviceId.length > 0 &&
            typeof j.deviceSecret === 'string' && j.deviceSecret.length > 0) {
            return { deviceId: j.deviceId, deviceSecret: j.deviceSecret,
                ...(typeof j.fingerprint === 'string'
                    ? { fingerprint: j.fingerprint } : {}) };
        }
        return null;
    }
    catch {
        return null;
    }
}
export function updateDeviceCredById(deviceId, patch) {
    try {
        const fs = builtin('node:fs');
        const os = builtin('node:os');
        const path = builtin('node:path');
        const dir = path.join(os.homedir(), '.kai-pu');
        for (const f of fs.readdirSync(dir)) {
            if (!f.startsWith('device-') || !f.endsWith('.json'))
                continue;
            const fp = path.join(dir, f);
            try {
                const j = JSON.parse(fs.readFileSync(fp, 'utf8'));
                if (j.deviceId !== deviceId)
                    continue;
                fs.writeFileSync(fp, JSON.stringify({ ...j, ...patch }), { mode: 0o600 });
                return true;
            }
            catch {
                continue;
            }
        }
        return false;
    }
    catch {
        return false;
    }
}
export function readAnyDeviceCred() {
    try {
        const fs = builtin('node:fs');
        const path = builtin('node:path');
        const os = builtin('node:os');
        const dir = path.join(os.homedir(), '.kai-pu');
        if (!fs.existsSync(dir))
            return null;
        for (const f of fs.readdirSync(dir)) {
            if (!f.startsWith('device-') || !f.endsWith('.json'))
                continue;
            try {
                const j = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
                if (typeof j.deviceId === 'string' && j.deviceId.length > 0 &&
                    typeof j.deviceSecret === 'string' && j.deviceSecret.length > 0) {
                    return { deviceId: j.deviceId, deviceSecret: j.deviceSecret,
                        ...(typeof j.fingerprint === 'string'
                            ? { fingerprint: j.fingerprint } : {}) };
                }
            }
            catch {
                continue;
            }
        }
        return null;
    }
    catch {
        return null;
    }
}
export function writeDeviceCred(baseUrl, c) {
    try {
        const fs = builtin('node:fs');
        const path = builtin('node:path');
        const f = credFile(baseUrl);
        fs.mkdirSync(path.dirname(f), { recursive: true, mode: 0o700 });
        const out = { ...c };
        if (!out.fingerprint) {
            try {
                out.fingerprint = deriveFingerprint();
            }
            catch { }
        }
        fs.writeFileSync(f, JSON.stringify(out), { mode: 0o600 });
        return true;
    }
    catch {
        return false;
    }
}
export function clearDeviceCred(baseUrl) {
    try {
        const fs = builtin('node:fs');
        const f = credFile(baseUrl);
        if (fs.existsSync(f))
            fs.unlinkSync(f);
    }
    catch {
    }
}
function parseRfc6266Filename(cd) {
    if (!cd)
        return null;
    const star = /filename\*=UTF-8''([^;]+)/i.exec(cd);
    if (star && star[1]) {
        try {
            return decodeURIComponent(star[1]);
        }
        catch {
            return star[1];
        }
    }
    const quoted = /filename="([^"]*)"/i.exec(cd);
    if (quoted && quoted[1])
        return quoted[1];
    const plain = /filename=([^;]+)/i.exec(cd);
    return plain && plain[1] ? plain[1].trim() : null;
}
//# sourceMappingURL=kai-pu-http.js.map