# Bridge Styler Plugin

[![Release](https://img.shields.io/github/v/release/PaulSmithTrick14/obsidian-bridge?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1naXQtbWVyZ2UiPjxjaXJjbGUgY3g9IjE4IiBjeT0iMTgiIHI9IjMiLz48Y2lyY2xlIGN4PSI2IiBjeT0iNiIgcj0iMyIvPjxwYXRoIGQ9Ik02IDIxVjlhOSA5IDAgMCAwIDkgOSIvPjwvc3ZnPg==)](https://github.com/PaulSmithTrick14/obsidian-bridge/releases/latest)
[![Latest Release](https://img.shields.io/github/release-date/PaulSmithTrick14/obsidian-bridge?style=for-the-badge&label=Latest%20Release&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jYWxlbmRhci1jaGVjay0yIj48cGF0aCBkPSJNMjEgMTRWNmEyIDIgMCAwIDAtMi0ySDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDgiLz48bGluZSB4MT0iMTYiIHgyPSIxNiIgeTE9IjIiIHkyPSI2Ii8+PGxpbmUgeDE9IjgiIHgyPSI4IiB5MT0iMiIgeTI9IjYiLz48bGluZSB4MT0iMyIgeDI9IjIxIiB5MT0iMTAiIHkyPSIxMCIvPjxwYXRoIGQ9Im0xNiAyMCAyIDIgNC00Ii8+PC9zdmc+)](https://github.com/PaulSmithTrick14/obsidian-bridge/releases/latest)

This is a plugin for [Obsidian.md](https://obsidian.md) which lets you style bridge hands with auctions and inline bridge snippets in both editing mode and reading mode.  Most of the heavy lifting is done by the BBO hand viewer which is automatically embedded with the hands and/or auction that you specify.

## Settings

The settings page is split into three sections which are selected via a dropdown. A core settings page, a bridgeblock settings page and an inline snippet settings page.
Within the bridgeblock settings page, further settings pages can be selected via a dropdown.

## Bridgeblock Parameters

Bridgeblock parameters are added to the first line of the bridgeblock following the language('bridge'). They can be added in any order. Note that all parameters can be set with either `:` or `=`.

Example:

- ` ```bridge title:'Checkback example'`
- ` ```bridge title="Checkback example" left`

### Title

To display a title for a bridge hand specify `title:` followed by a title in the first line of the codeblock. If the title contains spaces, specify it between `""` or `''` e.g.: `title:"Kickback with Queen ask"`.

Example:

` ```bridge title:"Specific King ask"`

### Folding

To specify an initial fold state when the document is opened, use the `fold` parameter. If `fold` is set in a bridge block, then when you open the document, the bridge block will be automatically collapsed, and only the header will be displayed. You can unfold the bridgeblock by clicking on the header.

Clicking on any header will toggle the fold for that bridgeblock.

When no `title` parameter is set, the folded bridgeblock will have a default fold placeholder title. This can be changed in settings, or it can be changed for a specific parameter by setting a string after the fold parameter as in `fold:Folded` or `fold:"Collapsed Hand"`.

Example:

` ```bridge fold`

## Appearance

### Header

The header is displayed in the following cases:

- You specified a `title:`
- You specified `fold` If you specified `fold` but did not specify `title:` or `fold:` a default text from settings will be displayed on the header (the default is 'Collapsed Hand')

The title text can also be styled to be bold and/or italic as well as a specific font. Furthermore, the font-size of the header text can be changed.

Example:

- No header
![Header None](images/HeaderNone.png)

- Header with fold only
![Header Fold](images/HeaderFold.png)

- Header with title
![Header Language Title](images/HeaderLanguageTitle.png)

## Inline Snippet

Inline bridge snippets can be customised as well with background color, text color, text color whilst being edited, font weight, spacing around the inline snippet and curvature of the inline snippet all being customisable from the settings.  Suit symbols can be displayed in one of three ways
- Standard (Spade and Club are Black, Heart and Diamond are Red.  All symbols are solid)
- BBO (Spade is Black, Heart is Red, Diamond is Orange, Club is Green)
- MajorMinor (Black and Red but majors are solid symbols and minors are outlined)

Example:

`H2`
![Show the Heart 2 card](images/InlineCodeHighlighted.png)

You can also set a title and/or display an icon before the inline code using the parameters `title:` and `icon` following the language. `title` can take multiple words in quotation marks or speech marks.

Example:

`{bridge icon} 1c:p:1s:p;1n:/`
![Inline Snippet Highlighted Icon](images/InlineCodeHighlightedIcon.png)

`{bridge title:'Awkward Suit'} skj8`
![Snippet with title](images/InlineCodeHighlightedTitle.png)

`{bridge title:'Reverse' icon} 1d:p:1s:p;2h`
![Snippet with title and icon](images/InlineCodeHighlightedTitleIcon.png)

## Commands

The plugin exposes 3 folding commands:

- `Fold all bridgeblocks` - folds all bridgeblocks
- `Unfold all bridgeblocks` - unfolds all bridgeblocks
- `Reset fold state for all bridgeblocks` - returns all bridgeblock folding to the state defined in each of their parameter strings

## How to install the plugin

- Simply install directly from Obsidian
- Alternatively you can just copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/bridge-styler/` or use the [Obsidian Beta Reviewers Plugin](https://github.com/TfTHacker/obsidian42-brat).

## Contributions

All contributions are welcome, just create a merge request.

Please try to create bug reports/issues that are:

- **Reproducible**: Include steps to recreate the issue
- **Specific**: Include relevant details such as possible plugin conflicts, theme conflicts etc.
- **Unique**: Please do not duplicate existing open issues, add to the existing issue
- **Scoped**: Please create a separate issue for each bug you've identified

### Maintainers

- [@trick14](https://github.com/PaulSmithTrick14)

### Contributors

[![List of contributors via https://contrib.rocks](https://contrib.rocks/image?repo=PaulSmithTrick14/obsidian-bridge)](https://github.com/PaulSmithTrick14/obsidian-bridge/graphs/contributors)

## License

Distributed under the MIT License. See `LICENSE` for more information.
