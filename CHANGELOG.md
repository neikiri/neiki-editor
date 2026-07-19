Napiš m # Changelog

## [3.9.0]
- On touch context-menu interactions, menus now fall back to the browser's native UI, preserving smooth long-press text selection and editing controls.
- Added Edit actions to selected image and video toolbars. Existing media now opens a pre-filled dialog that can update its URL, alternative text or title, width, or file without reinserting the element.
- Added a dedicated desktop gutter for the block drag handle so it no longer overlaps the first character of editable content, and fixed the handle disappearing while the cursor crossed that gutter on the way to it.
- Reworked Find & Replace into a non-modal, draggable panel so searching and replacing no longer blocks interaction with editor content.
- Preserved supported top-level `<div>` elements and their safe attributes when switching between HTML source and visual mode, preventing custom classes from being stripped during later edits.

## [3.8.0]
- Added the `formatPainter` toolbar button, which copies the selected text's inline formatting and applies it once to the next selected or clicked text. It appears directly before `removeFormat` in the default toolbar.
- Added `toolbar.formatPainter` translations in all 8 built-in languages (en, cs, zh, es, de, fr, pt, ja).

## [3.7.0]
- Fixed mobile text selection controls overlapping the floating toolbar by leaving long-press selections to the browser's native controls on touch-first devices.
- Added the `floatingToolbar` configuration option for choosing Floating Toolbar buttons or disabling it entirely; `link` can now be omitted to match the main toolbar.

## [3.6.0]
- Fixed editing existing links: invoking Insert Link while the caret or selection is inside a link now pre-fills the dialog and updates that link instead of creating a new one.
- Fixed Arrow Up and Arrow Down after selecting an image or video so they place the caret before or after the selected media and restore normal keyboard navigation.
- Fixed image/video toolbar Move Block Up/Down actions not syncing the reordered content to the original form field.

## [3.5.0]
- Added `neiki-content-default-style` as the default content typography class. When `customClass` is set, the custom class replaces this default style class while the internal `neiki-content` class remains for editor behavior.
- Added autosave/localStorage cleanup APIs: `editor.clearAutosaveStorage()`, `editor.removeStorage(key)`, `editor.removeStorageByPrefix(prefix)`, `NeikiEditor.removeStorageKey(key)`, `NeikiEditor.removeStorageByPrefix(prefix)`, and `NeikiEditor.clearAutosaveStorage(prefix)`.

## [3.4.0]
- Added new built-in theme: `dracula` — the official [Dracula theme](https://draculatheme.com) palette, with a dark purple-blue background (`#282a36`) and pink/purple/green/yellow accents
- Added Dracula-specific HTML code view syntax highlighting for tags, attributes, and strings
- Added `theme.dracula` translation key to all 8 built-in languages (en, cs, zh, es, de, fr, pt, ja)
- Updated README documentation to reflect all eight built-in themes

## [3.3.0]
- Added new built-in theme: `autumn` — a warm retro theme inspired by the Gruvbox palette, with a brown background and orange accents (`#fe8019`)
- Added `theme.autumn` translation key to all 8 built-in languages (en, cs, zh, es, de, fr, pt, ja)
- Updated README and wiki documentation to reflect all seven built-in themes (previously several pages only listed the original four)

## [3.2.0]
- Added a general right-click context menu in the content area with Undo, Redo, Cut, Copy, Paste, **Paste as Plain Text**, Select All, and Remove Formatting — themed to match the active editor theme
- Added a `contextMenu: false` init option to disable the custom context menu (falls back to the browser's native menu)
- The existing table context menu is now theme-aware and fully translated (previously English-only and unthemed)
- Added new built-in theme: `void` — a dark purple cyberpunk theme with neon-purple accents and glow effects (`#b026ff`)
- Added `contextMenu.*`, `tableContextMenu.*`, and `theme.void` translation keys to all 8 built-in languages (en, cs, zh, es, de, fr, pt, ja)

## [3.1.0]
- Added new built-in theme: `midnight` — deep black editor background (`#0a0a10`), slightly lighter toolbar (`#111118`), and purple-pink accent color (`#c084fc`)
- Added `theme.midnight` translation key to all 8 built-in languages (en, cs, zh, es, de, fr, pt, ja)

## [3.0.3]
- Fixed empty editor submitting `<p><br></p>` instead of a blank value — `getContent()` now returns an empty string when the editor contains only the default empty block inserted by the browser

## [3.0.2]
- Hid the left-side block drag grip on touch and coarse-pointer devices, relying on the existing move up/down toolbar buttons for precise block repositioning
- Fixed blockquote toggling when the quote contains a nested `<p>` by unwrapping the active `<blockquote>` instead of formatting the inner paragraph
- Added missing i18n keys for the Insert Video toolbar item, dropdown item, modal labels, upload states, and validation messages across all built-in languages

## [3.0.1]
- Fixed a polynomial regular expression risk in HTML code view formatting by replacing the regex tokenizer with a deterministic linear scan

## [3.0.0]
- Added two new built-in themes: `blue` and `dark-blue`
- Added Insert > Video with a URL/file-upload modal, base64 embedding, and optional `videoUploadHandler`
- Added sanitizer support for editor-generated `<video>` and `<source>` content
- Added video resizing, repositioning, replacement, delete toolbar actions, and drag-and-drop video file insertion
- Added drag-and-drop moving for selected text inside the editor
- Added a shared caret-style drop indicator for dragged text, images, and videos
- Updated the drag handle icon and prevented native blue selection highlights on selected images/videos and their media toolbar
- Replaced the old Toggle Theme action with a translated Change theme select for choosing a specific built-in theme
- Fixed editor grip SVGs occasionally being inserted into the document by moving block grips outside editable content and stripping editor UI from dragged fragments
- Improved HTML code view with formatted multi-line HTML and syntax highlighting
- Updated README and wiki documentation for themes, video insertion, and upload configuration

## [2.10.1]
- Fixed a cross-site scripting (XSS) vulnerability in the HTML sanitizer's entity decoding — replaced `innerHTML`-based decoding with a safe regex-based approach that only resolves named (`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&apos;`, `&nbsp;`) and numeric (`&#123;`, `&#x1F4A9;`) entities without ever parsing HTML

## [2.10.0]
- Added `code` toolbar button with smart behavior: single-line selection wraps text in inline `<code>`, multi-line selection creates a `<pre><code>` code block. Works as a toggle — clicking again unwraps. Included in the default toolbar between `subscript` and `removeFormat`.
- Fixed text not being wrapped in `<p>` after toggling off Bullet List or Numbered List — consecutive inline/text nodes are now grouped into a single `<p>` instead of each being wrapped separately
- Fixed HTML entities (e.g. `&amp;`) being displayed as literal text instead of being decoded — the sanitizer now properly decodes entities in text nodes
- Renamed `custom_class` config option to `customClass` for consistency with the camelCase API style. The old `custom_class` name still works for backward compatibility.
- Added `toolbar.code` translation key to all 8 built-in languages (en, cs, zh, es, de, fr, pt, ja)

## [2.9.5]
- Added `custom_class` config option — appends a custom CSS class to the editor content area alongside the default `neiki-content` class
- Set `display: inline-block` on `.neiki-content img` to avoid layout conflicts with CSS resets that set images to `display: block`

## [2.9.4]
- Improved the image insert dialog with a prominent visual upload area, click-to-select behavior, drag-and-drop support, and selected-file feedback
- Added responsive upload-zone styling so mobile keeps a compact tap-focused image selection UI
- Reworked autosave storage key normalization to avoid a polynomial regular expression on uncontrolled input
- Removed selector-string URL escaping when applying `target="_blank"` to selected links
- Updated HTML sanitization parsing to avoid `DOMParser.parseFromString` while preserving the existing sanitization allowlist behavior
- Fixed floating selection toolbar positioning offset when the page is scrolled and the editor toolbar is sticky
- Changed license from MIT to GNU Affero General Public License v3

## [2.9.3]
- Fixed autosave storage collisions by scoping `localStorage` keys per page URL and editor identity
- Added `autosaveKey` config option and `data-neiki-autosave-key` attribute support for custom autosave draft scopes
- Updated autosave documentation with guidance for multiple editors and same-URL edit screens
- Hardened HTML sanitization when restoring editor content from autosave, textarea/source HTML, and public HTML insertion
- Fixed unsafe modal value interpolation for link/image dialogs and escaped inserted image attributes
- Guarded translation/config merging against prototype-polluting keys such as `__proto__`, `prototype`, and `constructor`
- Removed unused internal variables reported by static analysis in image upload, find/replace, and image resize code

## [2.9.2]
- Added **Drag to Reposition Images** — click and hold an image (or use the grip handle) to drag and drop it to any position within the editor, including between words (inline placement via caret)
- Added **Image-Specific Toolbar** — selecting an image now shows a contextual toolbar with Drag handle, Move Block Up/Down, Replace, and Delete actions instead of irrelevant text formatting buttons
- Added **Replace Image** action — quickly swap a selected image via file picker (supports both base64 and `imageUploadHandler`)
- Fixed **Image Toolbar Positioning** — the image toolbar now automatically shows below the image when near the top of the editor, preventing it from being hidden behind the main toolbar
- Fixed **Blockquote Toggle** — the blockquote button now properly toggles on/off (clicking again removes the blockquote formatting)
- Added **Sticky Toolbar** — when the editor has no `maxHeight` (page-flow mode), the toolbar uses `position: sticky` to remain visible while scrolling
- Fixed **Font Size Selection Preservation** — selection is now tracked continuously via `selectionchange`; changing font size via +/− buttons or dropdown presets no longer jumps to unrelated text
- Fixed **Image Resize Styles on Form Submission** — resized image dimensions (inline `width`/`height` styles) are now correctly synced to the original element and preserved after form submission
- Floating selection toolbar is now automatically hidden when an image is selected (image toolbar takes over)
- New translation keys for image toolbar (`imageToolbar.replaceImage`, `imageToolbar.deleteImage`, `imageToolbar.dragToMove`) added to all 8 built-in languages
- Blockquote button now shows active state when cursor is inside a blockquote
- Added **Touch/Mobile Image Drag & Drop** — images can be repositioned on touch devices using the grip handle in the image toolbar
- Fixed **File Upload Button Alignment** — the native file upload button inside modals is now vertically centered within the input on all devices
- Fixed **Image Toolbar Overflow on Mobile** — toolbar buttons now stay within the viewport on small screens with responsive sizing
- Improved **Modal Responsiveness** — modals now have proper max-height, scrollable body, stacked form rows, and prevent iOS zoom on input focus for mobile devices

## [2.9.1]
- Fixed image URL insertion so images are placed at the saved cursor position after the dialog opens
- Fixed selected image deletion after undo by handling image Backspace/Delete explicitly
- Added copy and cut support for selected images, including HTML clipboard data
- Fixed Emoji picker and Insert dropdown positioning so popups stay inside the viewport on narrow resolutions

## [2.9.0]
- Added **Multiple Image Upload** — the image dialog now accepts multiple files at once; all selected images are inserted sequentially
- Added **`imageUploadHandler`** config option — an async callback `(file) => Promise<url>` that uploads images to your server/CDN and returns a URL instead of embedding base64
- When `imageUploadHandler` is provided, **drag & drop** and **clipboard paste** also use the handler to upload images as URLs
- When no handler is set, multiple files are still supported and inserted as base64 (existing behavior preserved for single files)
- Added **clipboard image paste** support — images copied to the clipboard are now detected and inserted automatically
- Image dialog hint text dynamically reflects whether images will be converted to base64 or uploaded via handler
- New translation keys (`modal.handledViaUploader`, `modal.uploadingImage`, `modal.uploadError`) added to all 8 built-in languages

## [2.8.0]
- Added **Image Resize** — click any image to show resize handles on corners, drag to resize while maintaining aspect ratio; displays live size label (width × height)
- Added **Table Column Resize** — hover near a column border to reveal a drag handle, drag to resize adjacent columns
- Added **Block Drag & Drop Reordering** — hover over any content block (paragraph, heading, table, image, list, blockquote, etc.) to reveal a grip handle on the left; drag to reorder blocks within the editor
- Added **Move Block Up / Down** buttons to the floating selection toolbar (left side, before formatting buttons) — quickly reorder the current block without dragging
- `getContent()` now cleans up editor UI elements (resize wrappers, grip handles, placeholders) before returning HTML
- Updated print styles to hide all new interactive elements

## [2.7.1]
- Fixed: mobile language switcher not displaying on iOS Safari — replaced `<select>` with button grid

## [2.7.0]
- Added custom CDN at `cdn.neikiri.dev` — supports latest (`/neiki-editor/neiki-editor.min.js`) and versioned (`/neiki-editor/2.7.0/neiki-editor.min.js`) URLs
- jsDelivr remains available as an alternative CDN
- Added Help button to More menu (⋯) — shows logo, author, version, GitHub and documentation links
- Help modal is fully translated in all 8 languages
- New config option `showHelp` (default: `true`) to toggle Help button visibility in More menu

## [2.6.1]
- Added welcome demo content with feature overview, shown on first visit (when no cached content exists)
- Added GitHub repository link with icon to demo header (desktop and mobile menu)
- Updated logo and preview image

## [2.6.0]
- Added custom color picker with native color input, hex code input, and Apply button
- Fixed: color picker closing when clicking on hex input or native color input
- Fixed: color palette swatches overflowing the picker container
- Fixed: color picker opening off-screen on mobile — now auto-flips alignment based on viewport
- Fixed: "Drop images here" overlay appearing when dragging selected text within the editor

## [2.5.0]
- Added 6 new built-in languages: Chinese (zh), Spanish (es), German (de), French (fr), Portuguese (pt), Japanese (ja)
- Editor now ships with 8 languages out of the box
- Additional languages can still be added via `NeikiEditor.addTranslation()` API
- Fixed: pressing Enter at end of a blockquote (last element) now exits the quote and creates a new paragraph
- Fixed: modal buttons (Insert, Cancel, etc.) were squished due to toolbar `.neiki-btn` styles overriding size
- Fixed: demo page header title overlapping action buttons on smaller screens

## [2.4.0]
- Added `neiki-editor.min.js` — single minified file with embedded CSS (no separate stylesheet needed)
- CDN integration now requires only one `<script>` tag
- Standalone `neiki-editor.js` + `neiki-editor.css` still available for separate loading
- Updated documentation (README, wiki) with new installation instructions

## [2.3.0]
- Added `NeikiEditor.addTranslation(lang, keys)` static method for custom translations
- Added `translations` config option to pass custom translations at initialization
- Developers can now add any language without modifying the source file
- Missing translation keys automatically fall back to English
- Responsive header in demo page with hamburger menu for mobile

## [2.2.1]
- Added preview image
- Edited README.md - Added live version link
## [2.2.0]
- Added localization support with English and Czech languages (`language` config option)
- All UI strings (tooltips, modals, status bar, messages) are now translatable
- Added `t(key, params)` translation helper with placeholder support
- Demo page includes language switcher for testing
- Updated documentation (README, wiki) with i18n instructions

## [2.1.0]
- Toolbar groups wrap as whole units; Insert dropdown and More menu (⋯) consolidate actions
- Font size widget with ±/input/dropdown preserves text selection
- Formatting commands auto-expand to word at cursor when no text is selected
- Theme toggle and autosave moved into More menu; added onSave/onFocus/onBlur callbacks
- Updated documentation (README, wiki) and added new API methods (getText, isEmpty, setTheme, etc.)

## [2.0.0]
- Major update
- Complete remaster

## [1.0.4]
- Improved README

## [1.0.3]
- Translate labels to English

## [1.0.2]
- Added some styles

## [1.0.1]
- Fix color change

## [1.0.0]
- Initial release
- 30+ tools
