# Changelog

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