export default BaseInputs;
type BaseInputs = SvelteComponent<{
    level: any;
    levelPercent: any;
    setLevel: any;
    setLevelPercent: any;
    maxLevel?: number;
    minLevel?: number;
    t?: (key: any) => any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string;
};
declare const BaseInputs: $$__sveltets_2_IsomorphicComponent<{
    level: any;
    levelPercent: any;
    setLevel: any;
    setLevelPercent: any;
    maxLevel?: number;
    minLevel?: number;
    t?: (key: any) => any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import("svelte").ComponentConstructorOptions<Props>): import("svelte").SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
