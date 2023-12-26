declare class ContainerOnlyScroll {
    _startY: null | number;
    _canMoveStatus: string;
    constainers: any[];
    constructor(elements: Node[]);
    _preventMove(e: TouchEvent): void;
    _handleStart(e: TouchEvent): void;
    _handleTouchMove(e: TouchEvent): void;
    on(): void;
    off(): void;
}
export default function (target: Node | Node[]): ContainerOnlyScroll;
export {};
