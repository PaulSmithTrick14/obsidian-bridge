import { Plugin } from 'obsidian'
import { renderBlockAsHandViewer, renderInlineSnippets } from './rendering.js';

export default class BridgeStylerPlugin extends Plugin {
	async onload(): Promise<void> {
		// All CSS classes used by this Plugin should be children of bridge-styler to 
		// reduce risk of clasing with other PLugins that may be loaded
		document.body.classList.add("bridge-styler");

		this.registerMarkdownCodeBlockProcessor(
			'handviewer', 
			(source, el, ctx) => { renderBlockAsHandViewer(source, el, ctx) }
		);

		this.registerMarkdownPostProcessor(renderInlineSnippets);
	}
}