export interface NodeHolderLike {
    agentId?: string;
    name?: string;
    seat?: string;
    online?: boolean;
    onRoster?: boolean;
    hasCred?: boolean;
    joinState?: string;
}
export interface NodeInvitedLike {
    lamp?: string;
    invitedName?: string;
    invitedAt?: string;
}
export interface OrgNodeLike {
    node_id: string;
    name: string;
    node_kind?: string;
    seq?: number;
    seat_count?: number;
    holders?: NodeHolderLike[];
    invited?: NodeInvitedLike | null;
}
export declare const PUBLIC_POOL_VALUE = "";
export declare const PUBLIC_POOL_LABEL = "\u4E0D\u6307\u5B9A\u5DE5\u4F4D\uFF08\u8C01\u90FD\u80FD\u9886\uFF09";
export declare function seqLabel(node: OrgNodeLike): string;
export declare function nodeChipLabel(node: OrgNodeLike): string;
export declare function nodeChipWho(node: OrgNodeLike): string;
export declare function sortedNodes(nodes: OrgNodeLike[]): OrgNodeLike[];
export declare function seatNodesOf<T extends OrgNodeLike>(nodes: T[], childrenOf: (nodeId: string) => T[]): T[];
export declare function publishToast(nodeLabel: string, agentName: string): string;
export declare function pickerHint(node: OrgNodeLike): string;
export type JoinState = 'present' | 'joined' | 'invited';
export declare function joinStateOf(holder: NodeHolderLike): JoinState;
export declare function dotOf(state: JoinState): {
    color: string;
    hollow: boolean;
    title: string;
};
export declare function invitedLabel(invited: NodeInvitedLike): string;
export declare function showInvited(holders: NodeHolderLike[], invited: NodeInvitedLike | null | undefined): boolean;
export declare function taskBindingText(nodeLabel: string, agentName: string): string;
export declare function humanizePublishError(code: string, message: string): string;
//# sourceMappingURL=node-pick.d.ts.map