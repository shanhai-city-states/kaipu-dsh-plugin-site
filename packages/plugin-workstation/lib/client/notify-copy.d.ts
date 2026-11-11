export interface NotifyMemberLike {
    id: string;
    name: string;
    kind: string;
    membershipActive?: boolean;
}
export interface NotifyChoice {
    id: string;
    name: string;
}
export declare function agentChoices(members: NotifyMemberLike[]): NotifyChoice[];
export declare const NOTIFY_PUBLIC_VALUE = "";
export declare const NOTIFY_PUBLIC_LABEL = "\u8C01\u5728\u5C97\u8C01\u9886\uFF08\u9ED8\u8BA4\uFF09";
export declare const NOTIFY_LABEL = "\u987A\u624B\u901A\u77E5\u8C01";
export declare const NOTIFY_HINT = "\u70B9\u540D\u540E\u5B83\u4F1A\u66F4\u5FEB\u770B\u5230\u8FD9\u6D3B\uFF1B\u4E0D\u70B9\u540D\uFF0C\u6D3B\u4E5F\u5728\u516C\u6C60\u91CC\u7B49\u8BA4\u9886\u3002";
export declare function notifyPickHint(choice: NotifyChoice | null): string;
export declare function isNotifyUnsupported(code: string, message: string): boolean;
export declare const NOTIFY_DEGRADED_NOTICE = "\u8FD9\u6761\u5DF2\u6309\u300C\u8C01\u5728\u5C97\u8C01\u9886\u300D\u53D1\u5230\u516C\u6C60 \u2014\u2014 \u670D\u52A1\u7AEF\u8FD8\u6CA1\u5F00\u901A\u70B9\u540D\u901A\u77E5\uFF0C\u9009\u4E86\u4E5F\u4E0D\u4F1A\u751F\u6548\u3002";
export declare function notifyFailText(code: string, message: string): string;
export declare function extraHolderBadge(holderCount: number): string;
export declare function extraHolderTitle(holderCount: number): string;
export declare function holderUnknownText(holderCount: number, seatCount: number, seatVacantish?: boolean | undefined): string;
//# sourceMappingURL=notify-copy.d.ts.map