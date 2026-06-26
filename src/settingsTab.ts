import { App, PluginSettingTab, Setting } from "obsidian";
import BridgeStylerPlugin from "./main.js";
import { suitStyles } from "./settings.js";

export class BridgeStylerTab extends PluginSettingTab {
    plugin: BridgeStylerPlugin;

    constructor(app: App, plugin: BridgeStylerPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    // 1.13.0+: Obsidian calls this and skips display()
    // Controls auto-bind to this.plug.settings[key]
    getSettingsDefinitions() {
        return [
            {
                name: 'Suit Style',
                control: {
                    type: 'dropdown',
                    key: 'suitStyle',
                    defaultValue: 'standard',
                    options: { standard: 'Standard', bbo: 'BBO', minorOutline: 'Outline minors'}
                }
            }
        ]
    }

    // < 1.13.0: Obsidian calls this.
    display(): void {
        let { containerEl } = this;
        containerEl.empty();

        new Setting(containerEl)
                .setName('Suit symbol style')
                .setDesc('Standard black/red solid suits, bbo style orange and green minors, outline minor suit symbols')
                .addDropdown((dropper) => dropper
                    .addOptions({ standard: 'Standard', bbo: 'BBO', minorOutline: 'Outline minors'})
                    .setValue(this.plugin.settings.suitStyle)
                    .onChange(async (value: string) => {
                        this.plugin.settings.suitStyle = value as suitStyles;
                        await this.plugin.saveSettings();
                        this.plugin.setSuitStyle(value as suitStyles);
                    })
                );
    }
}