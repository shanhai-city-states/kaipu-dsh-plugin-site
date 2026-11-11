export declare function humanizeJoinError(code: string | undefined, serverMessage?: string): string;
export declare function invitePitch(url: string): string;
export declare function containsInternalCode(text: string): boolean;
export declare function isPasserbyRow(row: JoinRowLike): boolean;
export declare function splitJoinRows<T extends JoinRowLike>(rows: T[]): {
    requests: T[];
    passers: T[];
};
export interface JoinRowLike {
    requestId?: string;
    nodeId?: string;
    seat?: string;
    applicantName?: string;
    applicantKind?: string;
    reason?: string;
    createdAt?: string;
    deviceTag?: string;
}
export declare function joinRowLabel(row: JoinRowLike): string;
export interface ApplicantView {
    text: string;
    tone: 'plain' | 'wait' | 'ok' | 'bad';
    dot: boolean;
    canRetry: boolean;
}
export declare function applicantView(status: string | undefined): ApplicantView;
export declare const JOIN_REQ_KEY_PREFIX = "kaipu.join.requestId";
export declare const JOIN_CODE_KEY_PREFIX = "kaipu.join.code";
export declare function looksLikeRequestId(v: unknown): boolean;
export declare function reqStoreKey(accountId: string, appId: string): string;
export declare function codeStoreKey(requestId: string): string;
export type ApplicantCodeState = 'none' | 'fresh' | 'stored' | 'lost';
export declare function applicantCodeState(status: string, serverCode: string, localCode: string): ApplicantCodeState;
export declare const CODE_ONCE_TIP = "\u8FD9\u5F20\u7801\u53EA\u663E\u793A\u4E00\u6B21\uFF0C\u8BF7\u73B0\u5728\u590D\u5236\uFF08\u5173\u6389\u5C31\u627E\u4E0D\u56DE\u6765\u4E86\uFF09";
export declare const CODE_STORED_TIP = "\u8FD9\u5F20\u7801\u5DF2\u7ECF\u5B58\u5728\u672C\u673A\uFF0C\u670D\u52A1\u7AEF\u53EA\u56DE\u4E00\u6B21\u660E\u6587\uFF0C\u518D\u67E5\u4E0D\u4F1A\u91CD\u590D\u7ED9";
export declare const CODE_LOST_TIP = "\u8FD9\u5F20\u7801\u5DF2\u7ECF\u53D6\u8FC7\u4E86\uFF0C\u672C\u673A\u6CA1\u5B58\u4E0B\u6765\u3002\u8BF7\u627E\u94FA\u4E3B\u518D\u8865\u4E00\u5F20";
export declare const REQ_ID_KEEP_LINE = "\u2605 \u63D0\u4EA4\u6210\u529F\u540E\u8BF7\u628A requestId \u6284\u4E0B\u6765\uFF0C\u67E5\u72B6\u6001\u548C\u53D6\u7801\u90FD\u8981\u7528\u5B83\u3002";
export declare const JOIN_GUIDE_SECTION: string[];
export declare function joinGuideText(baseLines: string[]): string;
//# sourceMappingURL=join-copy.d.ts.map