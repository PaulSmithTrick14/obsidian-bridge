export type suitStyles = "standard" | "bbo" | "minorOutline";

export interface BridgeStylerSettings {
    suitStyle: suitStyles;
    version: string;
}

export const DEFAULT_SETTINGS: BridgeStylerSettings = {
    suitStyle: 'minorOutline',
    version: '1.0.1'
}

export function convertSettings(settings: BridgeStylerSettings): BridgeStylerSettings {
    if (typeof settings?.version === "undefined") {
        return settingsClear();
    }

    while (semverNewer(DEFAULT_SETTINGS.version, settings.version)) {
        if (settings.version in settingsUpdaters) {
            settings = settingsUpdaters[settings.version]!(settings);
        } else {
            settings = settingsClear();
        }
    }

    return settings;
}

function semverNewer(newVersion: string, oldVersion: string): boolean {
	return newVersion.localeCompare(oldVersion, undefined, { numeric: true }) === 1;
}

function settingsClear(): BridgeStylerSettings {
    return DEFAULT_SETTINGS;
}

const settingsUpdaters: Record<string,(settings: BridgeStylerSettings)=>BridgeStylerSettings> = {
	"1.0.0": settingsClear,
	"1.0.1": settingsClear,
};
