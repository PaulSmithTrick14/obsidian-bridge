import { MarkdownPostProcessorContext } from "obsidian";

export function	renderBlockAsHandViewer(source: string, bridgeBlockElement: HTMLElement, context: MarkdownPostProcessorContext) {
    const rows = source.split('\n').map(r => r.trim()).filter((row) => row.length > 2);
    if (rows.length < 1) return;

    const frame = bridgeBlockElement.createEl('iframe');

    const HAND_VIEWER = 'https://www.bridgebase.com/tools/handviewer.html?'
    let query = '';
    for (var row of rows) {
        const pair = row.split('=');
        if (pair.length != 2) continue;
        const attr = pair[0]?.toLocaleLowerCase();
        const value = encodeURIComponent(pair[1]!);
        query += attr + '=' + value + '&'
        if (attr === 'n') frame.addClass('north');
        if (attr === 'e') frame.addClass('east');
        if (attr === 's') frame.addClass('south');
        if (attr === 'w') frame.addClass('west');
        if (attr === 'a') frame.addClass('auction');
    }

    frame.setAttrs({
        'src': HAND_VIEWER + query.slice(0, -1)
    });
}

export function renderInlineSnippets(element: HTMLElement, context: MarkdownPostProcessorContext) {
    if (!element) return;
    for (const inlineCodeElement of Array.from(element.querySelectorAll(":not(pre) > code"))) {
        renderInlineSnippet(inlineCodeElement as HTMLElement);
    }
}

const REPLACEMENTS: Record<string, string> = {
  'C': '<span class="clubSuit"></span>',
  'D': '<span class="diamondSuit"></span>',
  'H': '<span class="heartSuit"></span>',
  'S': '<span class="spadeSuit"></span>',
  ' ': '',
  ':': '&thinsp;:&thinsp;',
  ';': '&nbsp;;&nbsp;',
  'T': '10'
};

function renderInlineSnippet(snippet: HTMLElement) {
    const snippetText = snippet.innerText.trim().toLocaleUpperCase();
    let newText = '';
    for (let c of snippetText) {
        newText += REPLACEMENTS[c] ?? c
    }

    const newSpan = snippet.createSpan();
    newSpan.innerHTML = newText;
    snippet.replaceWith(newSpan);
}