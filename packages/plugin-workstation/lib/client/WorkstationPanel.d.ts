import { type ReactElement } from 'react';
import { type ClientCtxLike } from './bridge.js';
export interface DoorRegion {
    planet: string;
    country: string;
    region: string;
    label: string;
}
export interface ShopRow {
    accountId: string;
    name: string;
    shopNo: number;
    isPrimary: boolean;
    status: string;
    doorNo: number;
    doorLabel: string;
    plan: string;
    nameIsPlaceholder?: boolean;
    role?: 'owner' | 'invitee';
    ownerName?: string;
    seat?: string;
    joinedAt?: string;
}
export declare function roleOf(s: {
    role?: string;
}): 'owner' | 'invitee';
export interface ShopOpenResult {
    accountId: string;
    ownerAccount: string;
    shopNo: number;
    name: string;
    plan: string;
    status: string;
    doorNo: number;
    doorLabel: string;
    seatsProvisioned: boolean;
}
export declare function wireConnection(ctx: ClientCtxLike): void;
export declare function WorkstationPanel(): ReactElement;
export declare const CONCISE_JOINEE = "\u4F60\u5728\u300C{SHOP_NAME}\u300D\u6709\u5EA7\u4F4D\u3002\n\n\u63A5\u5165\u4E09\u6B65\uFF1A\n1. \u9A8C\u5730\u5740\uFF1Acurl -s {BASE_URL}/health\n   \u2192 \u5E94\u56DE {\"status\":\"ok\",\"service\":\"shanhai-kai-pu\"}\n   \u26A0\uFE0F \u5C11 /kai-pu \u4E5F\u56DE 200\uFF08\u53E6\u4E00\u4E2A\u670D\u52A1\uFF09\n\n2. \u62C9\u5B8C\u6574\u8BF4\u660E\uFF08\u6309\u5EA7\u4F4D\u4E0B\u53D1\u8BE5\u770B\u7684\u6BB5\u843D\uFF09\uFF1A\n   POST {BASE_URL}/kb/guide/index\n   body: {\"accountId\":\"{ACCOUNT_ID}\",\"agentId\":\"<\u7F16\u53F7>\",\"ts\":<\u65F6\u95F4\u6233>,\"sig\":\"<\u7B7E\u540D>\"}\n   \u7B7E\u540D = HMAC-SHA256(secret, \u7F16\u53F7+\u65F6\u95F4\u6233)\uFF0C\u5C0F\u5199 hex\uFF0C\u5BB9\u5DEE \u00B1300 \u79D2\n\n3. \u6309\u76EE\u5F55 level=required \u7684\u6BB5\u843D\u5F00\u5DE5\n\n\u2605 \u8BF4\u660E\u670D\u52A1\u7AEF\u4F1A\u66F4\u65B0\uFF0C\u6BCF\u6B21 poll \u770B guide.version\uFF0C\u522B\u628A\u672C\u5730\u62F7\u7684\u5F53\u6807\u51C6\u3002\n\u2605 secret \u53EA\u663E\u793A\u4E00\u6B21\uFF0C\u522B\u8D34\u5230\u522B\u4EBA\u80FD\u770B\u5230\u7684\u5730\u65B9 \u2014\u2014 \u5B83\u7B49\u4E8E\u4F60\u7684\u8EAB\u4EFD\u3002";
export declare const CONCISE_OWNER = "\u4F60\u662F\u300C{SHOP_NAME}\u300D\u7684\u7BA1\u7406\u65B9\u3002\n\n\u63A5\u5165\u4E09\u6B65\uFF1A\n1. \u9A8C\u5730\u5740\uFF1Acurl -s {BASE_URL}/health\n   \u2192 \u5E94\u56DE {\"status\":\"ok\",\"service\":\"shanhai-kai-pu\"}\n\n2. \u62C9\u5B8C\u6574\u8BF4\u660E\uFF08\u4F60\u7684\u5EA7\u4F4D\u80FD\u53D6\u5230\u53D1\u4EFB\u52A1\u3001\u5BA1\u6279\u90A3\u51E0\u6BB5\uFF09\uFF1A\n   POST {BASE_URL}/kb/guide/index\n   body: {\"accountId\":\"{ACCOUNT_ID}\",\"agentId\":\"<\u4F60\u7684\u7F16\u53F7>\",\"ts\":<\u79D2\u7EA7\u65F6\u95F4\u6233>,\"sig\":\"<\u7B7E\u540D>\"}\n   \u7B7E\u540D = HMAC-SHA256(secret, \u7F16\u53F7+\u65F6\u95F4\u6233) \u53D6\u5C0F\u5199 hex\n\n3. \u6309\u76EE\u5F55\u53D6\u4F60\u8981\u7684\u6BB5\u843D\n\n\u2605 \u53D1\u4EFB\u52A1\u7684\u7B7E\u540D\u5F0F\u4E0E\u9886\u6D3B**\u4E0D\u540C**\uFF08title \u548C isDestructive \u8981\u8FDB\u7B7E\u540D\uFF09\uFF0C\n  \u4EE5 KB \u91CC\u300C\u53D1\u4EFB\u52A1\u300D\u90A3\u6BB5\u7684\u5199\u6CD5\u4E3A\u51C6\uFF0C\u522B\u7167\u6284\u9886\u6D3B\u90A3\u79CD\u3002\n\u2605 secret \u53EA\u663E\u793A\u4E00\u6B21\uFF0C\u522B\u8D34\u5230\u4EFB\u4F55\u522B\u4EBA\u80FD\u770B\u5230\u7684\u5730\u65B9\u3002";
//# sourceMappingURL=WorkstationPanel.d.ts.map