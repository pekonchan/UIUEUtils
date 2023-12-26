interface addOption {
    timer?: number;
    msg?: string;
}
declare function add(type?: string, callback?: Function, addOption?: addOption): () => void;
declare const _default: {
    add: typeof add;
    remove(): void;
    back(): void;
};
export default _default;
