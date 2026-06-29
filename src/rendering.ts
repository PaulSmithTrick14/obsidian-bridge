import { MarkdownPostProcessorContext } from "obsidian";

export function	renderBlockAsHandViewer(source: string, bridgeBlockElement: HTMLElement, context: MarkdownPostProcessorContext) {
    const sectionInfo = context.getSectionInfo(bridgeBlockElement)
    if (!sectionInfo) return
    const header = sectionInfo.text.split("\n")[sectionInfo.lineStart]
    if (!header) return
    const headerElements = header.split(' ');
    const positionClass = headerElements[1] ?? 'centre';

    const rows = source.split('\n').map(r => r.trim());
    if (rows.length < 1) return;

    bridgeBlockElement.parentElement?.removeClasses(['left','centre','right']);
    bridgeBlockElement.parentElement?.addClass(positionClass);

    let oneHand = document.body.createDiv({cls: 'oneViewer'});

    const HAND_VIEWER_ROOT = 'https://www.bridgebase.com/tools/handviewer.html'

    let frame = oneHand.createEl('iframe');
    let viewerParams = new URLSearchParams();
    for (let row of rows) {
        const pair = row.split('=');
        // Blank line start a new hand
        if (pair.length < 2) {
            if (viewerParams.size > 0) {
                frame.setAttr('src', `${HAND_VIEWER_ROOT}?${viewerParams}`);
                bridgeBlockElement.append(oneHand)
                oneHand = document.body.createDiv({cls: 'oneViewer'})
                frame = oneHand.createEl('iframe')
                viewerParams = new URLSearchParams();
            }
        } else {
            const attr = pair[0]!.toLocaleLowerCase();
            const val = pair[1]!;
            let value = val;
            if (attr === 'title') {
                oneHand.insertBefore(oneHand.createDiv({text: pair[1], cls: 'handTitle'}), frame)
            } else {
                if (attr === 'n' || attr === 'e' || attr === 's' || attr === 'w') {
                    value = val.replace(/ /g, '')
                } 
                const encoded = (attr !== `a` && attr!==`p`) ? encodeURIComponent(value) : value
                viewerParams.append(attr, encoded);
                if (attr === 'n') frame.addClass('north');
                if (attr === 'e') frame.addClass('east');
                if (attr === 's') frame.addClass('south');
                if (attr === 'w') frame.addClass('west');
                if (attr === 'a') frame.addClass('auction');
            }
        }
    }

    if (viewerParams.size > 0) {
        frame.setAttr('src', `${HAND_VIEWER_ROOT}?${viewerParams}`)
        bridgeBlockElement.append(oneHand)
    }
}

export function renderFloatClear(element: HTMLElement, context: MarkdownPostProcessorContext) {
    if (!element) return;
    for (const ele of Array.from(element.querySelectorAll(".el-p p"))) {
        const text = (ele as HTMLParagraphElement).textContent;
        if (text && text.length > 2 && text.slice(text.length-2) === '||') {
            clearAfterParagraph(ele as HTMLParagraphElement);
        }
    }
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
    let previous = '';
    const replacement = document.createDocumentFragment().createSpan({cls: 'snippet'});
    for (let c of snippetText) {
        if (c === 'T' && previous === 'N') continue
        let action = REPLACEMENTS[c];
        if (action) {
            action(replacement);
        } else {
            replacement.append(c)
        }
        previous = c;
    }

    snippet.replaceWith(replacement);
}

function clearAfterParagraph(par: HTMLParagraphElement) {
    par.addClass('clearFloat');
    const lastNode = par.lastChild!;
    const newNode = document.createTextNode(lastNode.textContent!.slice(0,-2));
    par.replaceChild(newNode, lastNode);
}