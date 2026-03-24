export interface ModuleLibConfig {
    url: string;
}

export function defineScriptDropSettings(url: string): ModuleLibConfig;
export function defineScriptDropSettings(config: ModuleLibConfig): ModuleLibConfig;
export function defineScriptDropSettings(input: string | ModuleLibConfig): ModuleLibConfig {
    return typeof input === 'string' ? { url: input } : input;
}
