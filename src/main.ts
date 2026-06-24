import { Plugin } from 'obsidian'
import { 
	renderBlockAsHandViewer, 
	renderInlineSnippets 
} from './rendering.js';
import { 
	BridgeStylerSettings, 
	convertSettings, 
	DEFAULT_SETTINGS, 
	suitStyles
} from './settings.js';
import { BridgeStylerTab } from './settingsTab.js';

export default class BridgeStylerPlugin extends Plugin {
	settings: BridgeStylerSettings = DEFAULT_SETTINGS;

	async onload(): Promise<void> {
		await this.loadSettings();
		const settingsTab = new BridgeStylerTab(this.app, this);
		this.addSettingTab(settingsTab);

		// All CSS classes used by this Plugin should be children of bridge-styler to 
		// reduce risk of clasing with other PLugins that may be loaded
		document.body.classList.add("bridge-styler");
		this.setSuitStyle(this.settings.suitStyle);

		this.registerMarkdownCodeBlockProcessor(
			'handviewer', 
			(source, el, ctx) => { renderBlockAsHandViewer(source, el, ctx) }
		);

		this.registerMarkdownPostProcessor(renderInlineSnippets);
	}

	onunload(): void {
		document.body.classList.remove("bridge-styler");
	}

	async loadSettings(): Promise<void> {
		this.settings = { ...structuredClone(DEFAULT_SETTINGS), ...convertSettings(await this.loadData()) };
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
		this.app.workspace.updateOptions();

	}

	setSuitStyle(newStyle: suitStyles): void {
		document.body.classList.remove('standard','bbo','minorOutline');
		document.body.classList.add(newStyle);
	}
}