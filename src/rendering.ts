import { MarkdownPostProcessorContext } from "obsidian";

export function	renderBlockAsHandViewer(source: string, bridgeBlockElement: HTMLElement, context: MarkdownPostProcessorContext) {
    const sectionInfo = context.getSectionInfo(bridgeBlockElement)
    const header = sectionInfo?.text.split("\n")[sectionInfo.lineStart]
    const params = header?.split('handviewer')[1]?.trim();
    const data = new URLSearchParams(params);

    const rows = source.split('\n').map(r => r.trim()).filter((row) => row.length > 2);
    if (rows.length < 1) return;

    const positionValue = data.get('position');
    let positionClass = 'centre';
    if (positionValue !== null) {
        if (positionValue[0] === "'" || positionValue[0] === '"') {
            positionClass = positionValue.slice(1,-1)
        } else {
            positionClass = positionValue;
        }
    }

    bridgeBlockElement.parentElement?.removeClasses(['left','centre','right']);
    bridgeBlockElement.parentElement?.addClass(positionClass);

    if (data.has('title')) {
        const titleDiv = document.createElement('div')
        titleDiv.addClass('handTitle')
        titleDiv.textContent = data.get('title')?.slice(1,-1) ?? ''
        bridgeBlockElement.parentElement?.insertBefore(titleDiv, bridgeBlockElement)
    }

    const frame = bridgeBlockElement.createEl('iframe');

    const HAND_VIEWER = 'https://www.bridgebase.com/tools/handviewer.html?'
    let query = '';
    for (let row of rows) {
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

const REPLACEMENTS: Record<string, (parent: HTMLElement) => void> = {
  'C': (p) => p.createSpan({ cls: 'clubSuit'}),
  'D': (p) => p.createSpan({ cls: 'diamondSuit'}),
  'H': (p) => p.createSpan({ cls: 'heartSuit'}),
  'S': (p) => p.createSpan({ cls: 'spadeSuit'}),
  ' ': (p) => {},
  ':': (p) => p.append('\u200a:\u200a'),
  ';': (p) => p.append('\u00a0;\u00a0'),
  'T': (p) => p.append('10'),
  'N': (p) => p.append('NT')
};

function renderInlineSnippet(snippet: HTMLElement) {
    const snippetText = snippet.innerText.trim().toLocaleUpperCase();
    const replacement = document.createDocumentFragment().createSpan({cls: 'snippet'});
    for (let c of snippetText) {
        let action = REPLACEMENTS[c];
        if (action) {
            action(replacement);
        } else {
            replacement.append(c)
        }
    }

    snippet.replaceWith(replacement);
}

// export function renderBridgeBlocks(element: HTMLElement, context: MarkdownPostProcessorContext) {
//     console.log(`block = ${element.innerHTML}`)
// }
