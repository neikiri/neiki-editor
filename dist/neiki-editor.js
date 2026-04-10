/**
 * NEIKI EDITOR - WYSIWYG Rich Text Editor
 * A full-featured rich text editor similar to TinyMCE
 * @version 1.0.0
 */

(function(global) {
    'use strict';

    // Default configuration
    const defaultConfig = {
        height: 400,
        placeholder: 'Začněte psát...',
        theme: 'light',
        toolbar: [
            'undo', 'redo', '|',
            'formatBlock', 'fontName', 'fontSize', '|',
            'bold', 'italic', 'underline', 'strikethrough', '|',
            'foreColor', 'backColor', '|',
            'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', '|',
            'insertOrderedList', 'insertUnorderedList', '|',
            'indent', 'outdent', '|',
            'createLink', 'insertImage', 'insertTable', '|',
            'blockquote', 'insertHorizontalRule', 'insertCode', '|',
            'subscript', 'superscript', '|',
            'removeFormat', 'findReplace', '|',
            'emoji', 'specialChar', '|',
            'source', 'fullscreen', 'print', 'toggleTheme'
        ],
        fonts: [
            'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia',
            'Impact', 'Lucida Console', 'Palatino Linotype', 'Tahoma',
            'Times New Roman', 'Trebuchet MS', 'Verdana'
        ],
        fontSizes: ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px', '72px'],
        colors: [
            '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef',
            '#f3f3f3', '#ffffff', '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff',
            '#4a86e8', '#0000ff', '#9900ff', '#ff00ff', '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc',
            '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc', '#dd7e6b', '#ea9999',
            '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd',
            '#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc',
            '#8e7cc3', '#c27ba0', '#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e',
            '#3c78d8', '#3d85c6', '#674ea7', '#a64d79'
        ],
        emojis: [
            '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘',
            '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐',
            '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢',
            '👍', '👎', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✌️', '🤞', '🤟', '🤘', '👌', '🤏', '👈', '👉',
            '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖',
            '⭐', '🌟', '✨', '💫', '🔥', '💥', '⚡', '🎉', '🎊', '🎁', '🏆', '🥇', '🥈', '🥉', '🏅', '🎯'
        ],
        specialChars: [
            '©', '®', '™', '€', '£', '¥', '¢', '§', '¶', '†', '‡', '•', '…', '‰', '′', '″',
            '←', '→', '↑', '↓', '↔', '↕', '⇐', '⇒', '⇑', '⇓', '⇔', '⇕', '◄', '►', '▲', '▼',
            '±', '×', '÷', '≠', '≈', '≤', '≥', '∞', '∑', '∏', '√', '∫', '∂', '∆', '∇', 'π',
            'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'λ', 'μ', 'ξ', 'ρ', 'σ', 'τ', 'φ', 'ω',
            '½', '⅓', '¼', '⅕', '⅙', '⅛', '⅔', '¾', '⅖', '⅗', '⅘', '⅚', '⅝', '⅞', '№', '℃'
        ],
        onChange: null,
        onReady: null
    };

    // Icons SVG
    const icons = {
        bold: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>',
        italic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>',
        underline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>',
        strikethrough: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 3.6 3.9h.2"/><path d="M8.7 19.1c2.3.6 4.4 1 6.2.9 2.7 0 5.3-.7 5.3-3.6 0-1.5-1.8-3.3-3.6-3.9h-.2"/><line x1="4" y1="12" x2="20" y2="12"/></svg>',
        alignLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>',
        alignCenter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></svg>',
        alignRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/></svg>',
        alignJustify: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>',
        orderedList: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>',
        unorderedList: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>',
        indent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="11" y2="12"/><line x1="21" y1="18" x2="11" y2="18"/><polyline points="7 8 3 12 7 16"/></svg>',
        outdent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="11" y2="12"/><line x1="21" y1="18" x2="11" y2="18"/><polyline points="3 8 7 12 3 16"/></svg>',
        link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
        image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
        table: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',
        undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
        redo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
        source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        fullscreen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
        exitFullscreen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
        print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
        blockquote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v4z"/></svg>',
        hr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/></svg>',
        code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        subscript: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5l8 8"/><path d="M12 5l-8 8"/><path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14.5c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"/></svg>',
        superscript: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19l8-8"/><path d="M12 19l-8-8"/><path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.5c0-.472-.167-.934-.476-1.29a2.11 2.11 0 0 0-2.62-.442c-.42.24-.74.62-.9 1.07"/></svg>',
        removeFormat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/><path d="M3 21l18-18"/></svg>',
        foreColor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h16"/><path d="M6.9 15h10.2"/><path d="M12 3L5.5 15h13L12 3z"/></svg>',
        backColor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 19.5h19v3h-19z" fill="currentColor"/><path d="M12 3L5.5 15h13L12 3z"/></svg>',
        emoji: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
        specialChar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><text x="12" y="16" text-anchor="middle" font-size="12" fill="currentColor">Ω</text></svg>',
        findReplace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
        close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        themeLight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
        themeDark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
    };

    // Tooltip labels
    const tooltips = {
        bold: 'Tučné (Ctrl+B)',
        italic: 'Kurzíva (Ctrl+I)',
        underline: 'Podtržené (Ctrl+U)',
        strikethrough: 'Přeškrtnuté',
        alignLeft: 'Zarovnat vlevo',
        alignCenter: 'Zarovnat na střed',
        alignRight: 'Zarovnat vpravo',
        alignJustify: 'Zarovnat do bloku',
        insertOrderedList: 'Číslovaný seznam',
        insertUnorderedList: 'Odrážkový seznam',
        indent: 'Zvětšit odsazení',
        outdent: 'Zmenšit odsazení',
        createLink: 'Vložit odkaz (Ctrl+K)',
        insertImage: 'Vložit obrázek',
        insertTable: 'Vložit tabulku',
        undo: 'Zpět (Ctrl+Z)',
        redo: 'Vpřed (Ctrl+Y)',
        source: 'HTML kód',
        fullscreen: 'Celá obrazovka',
        print: 'Tisk',
        blockquote: 'Citace',
        insertHorizontalRule: 'Vodorovná čára',
        insertCode: 'Blok kódu',
        subscript: 'Dolní index',
        superscript: 'Horní index',
        removeFormat: 'Odstranit formátování',
        foreColor: 'Barva textu',
        backColor: 'Barva pozadí',
        emoji: 'Emoji',
        specialChar: 'Speciální znaky',
        findReplace: 'Najít a nahradit (Ctrl+F)',
        toggleTheme: 'Přepnout světlý/tmavý režim'
    };

    class NeikiEditor {
        constructor(element, options = {}) {
            this.element = typeof element === 'string' ? document.querySelector(element) : element;
            if (!this.element) {
                console.error('NeikiEditor: Element not found');
                return;
            }

            this.config = { ...defaultConfig, ...options };
            
            // Load theme from localStorage
            const savedTheme = localStorage.getItem('neiki-editor-theme');
            if (savedTheme) {
                this.config.theme = savedTheme;
            }
            
            this.isSourceMode = false;
            this.isFullscreen = false;
            this.undoStack = [];
            this.redoStack = [];
            this.maxUndoLevels = 50;

            this.init();
        }

        init() {
            this.createEditor();
            this.attachEvents();
            this.saveState();

            if (this.config.onReady) {
                this.config.onReady(this);
            }
        }

        createEditor() {
            // Create container
            this.container = document.createElement('div');
            this.container.className = 'neiki-editor-container';
            if (this.config.theme === 'dark') {
                this.container.classList.add('neiki-editor-dark');
            }

            // Create toolbar
            this.toolbar = this.createToolbar();
            this.container.appendChild(this.toolbar);

            // Create find/replace bar
            this.findReplaceBar = this.createFindReplaceBar();
            this.container.appendChild(this.findReplaceBar);

            // Create content area
            this.contentArea = document.createElement('div');
            this.contentArea.className = 'neiki-editor-content';
            this.contentArea.contentEditable = true;
            this.contentArea.style.minHeight = this.config.height + 'px';
            this.contentArea.innerHTML = this.element.value || this.element.innerHTML || '<p><br></p>';
            this.contentArea.setAttribute('data-placeholder', this.config.placeholder);
            this.container.appendChild(this.contentArea);

            // Create source editor
            this.sourceEditor = document.createElement('textarea');
            this.sourceEditor.className = 'neiki-source-editor';
            this.sourceEditor.style.minHeight = this.config.height + 'px';
            this.container.appendChild(this.sourceEditor);

            // Create status bar
            this.statusBar = this.createStatusBar();
            this.container.appendChild(this.statusBar);

            // Replace original element
            this.element.style.display = 'none';
            this.element.parentNode.insertBefore(this.container, this.element.nextSibling);

            // Create modals
            this.createModals();
        }

        createToolbar() {
            const toolbar = document.createElement('div');
            toolbar.className = 'neiki-toolbar';

            let currentGroup = document.createElement('div');
            currentGroup.className = 'neiki-toolbar-group';

            this.config.toolbar.forEach(item => {
                if (item === '|') {
                    toolbar.appendChild(currentGroup);
                    currentGroup = document.createElement('div');
                    currentGroup.className = 'neiki-toolbar-group';
                } else if (item === 'formatBlock') {
                    currentGroup.appendChild(this.createFormatSelect());
                } else if (item === 'fontName') {
                    currentGroup.appendChild(this.createFontSelect());
                } else if (item === 'fontSize') {
                    currentGroup.appendChild(this.createFontSizeSelect());
                } else if (item === 'foreColor') {
                    currentGroup.appendChild(this.createColorPicker('foreColor'));
                } else if (item === 'backColor') {
                    currentGroup.appendChild(this.createColorPicker('backColor'));
                } else if (item === 'emoji') {
                    currentGroup.appendChild(this.createEmojiPicker());
                } else if (item === 'specialChar') {
                    currentGroup.appendChild(this.createSpecialCharPicker());
                } else if (item === 'toggleTheme') {
                    currentGroup.appendChild(this.createThemeToggle());
                } else {
                    currentGroup.appendChild(this.createButton(item));
                }
            });

            toolbar.appendChild(currentGroup);
            return toolbar;
        }

        createButton(command) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'neiki-btn';
            btn.setAttribute('data-command', command);
            btn.setAttribute('data-tooltip', tooltips[command] || command);

            const iconKey = this.getIconKey(command);
            btn.innerHTML = icons[iconKey] || command.charAt(0).toUpperCase();

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.execCommand(command);
            });

            return btn;
        }

        getIconKey(command) {
            const mapping = {
                'insertOrderedList': 'orderedList',
                'insertUnorderedList': 'unorderedList',
                'createLink': 'link',
                'insertImage': 'image',
                'insertTable': 'table',
                'insertHorizontalRule': 'hr',
                'insertCode': 'code'
            };
            return mapping[command] || command;
        }

        createFormatSelect() {
            const select = document.createElement('select');
            select.className = 'neiki-select';
            select.innerHTML = `
                <option value="p">Odstavec</option>
                <option value="h1">Nadpis 1</option>
                <option value="h2">Nadpis 2</option>
                <option value="h3">Nadpis 3</option>
                <option value="h4">Nadpis 4</option>
                <option value="h5">Nadpis 5</option>
                <option value="h6">Nadpis 6</option>
                <option value="pre">Předformátovaný</option>
            `;
            select.addEventListener('change', () => {
                this.execCommand('formatBlock', select.value);
                select.value = 'p';
            });
            return select;
        }

        createFontSelect() {
            const select = document.createElement('select');
            select.className = 'neiki-select';
            select.innerHTML = '<option value="">Písmo</option>';
            this.config.fonts.forEach(font => {
                select.innerHTML += `<option value="${font}" style="font-family: ${font}">${font}</option>`;
            });
            select.addEventListener('change', () => {
                if (select.value) {
                    this.execCommand('fontName', select.value);
                }
                select.value = '';
            });
            return select;
        }

        createFontSizeSelect() {
            const select = document.createElement('select');
            select.className = 'neiki-select';
            select.innerHTML = '<option value="">Velikost</option>';
            this.config.fontSizes.forEach(size => {
                select.innerHTML += `<option value="${size}">${size}</option>`;
            });
            select.addEventListener('change', () => {
                if (select.value) {
                    document.execCommand('fontSize', false, '7');
                    const fontElements = this.contentArea.querySelectorAll('font[size="7"]');
                    fontElements.forEach(el => {
                        el.removeAttribute('size');
                        el.style.fontSize = select.value;
                    });
                    this.saveState();
                }
                select.value = '';
            });
            return select;
        }

        createColorPicker(type) {
            const wrapper = document.createElement('div');
            wrapper.className = 'neiki-color-picker-wrapper';
            let savedSelection = null;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'neiki-btn neiki-color-btn';
            btn.setAttribute('data-type', type);
            btn.setAttribute('data-tooltip', tooltips[type]);
            btn.innerHTML = icons[type] + '<span class="neiki-color-indicator" style="background: ' + (type === 'foreColor' ? '#000' : '#ff0') + '"></span>';

            const dropdown = document.createElement('div');
            dropdown.className = 'neiki-color-dropdown';

            const grid = document.createElement('div');
            grid.className = 'neiki-color-grid';

            // Reset swatch - sets default color (black for text, transparent for background)
            const resetSwatch = document.createElement('div');
            resetSwatch.className = 'neiki-color-swatch-reset';
            resetSwatch.title = type === 'foreColor' ? 'Výchozí barva textu' : 'Bez barvy pozadí';
            resetSwatch.addEventListener('click', () => {
                if (savedSelection) {
                    this.restoreSelection(savedSelection);
                }
                this.contentArea.focus();
                if (type === 'foreColor') {
                    // Remove color formatting to use default/inherited color
                    document.execCommand('removeFormat', false, null);
                    const defaultColor = getComputedStyle(this.contentArea).color;
                    btn.querySelector('.neiki-color-indicator').style.background = defaultColor;
                } else {
                    document.execCommand('removeFormat', false, null);
                    const selection = window.getSelection();
                    if (selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        const span = range.commonAncestorContainer.parentElement;
                        if (span && span.style) {
                            span.style.backgroundColor = '';
                        }
                    }
                    btn.querySelector('.neiki-color-indicator').style.background = 'transparent';
                }
                dropdown.classList.remove('show');
                savedSelection = null;
            });
            grid.appendChild(resetSwatch);

            this.config.colors.forEach(color => {
                const swatch = document.createElement('div');
                swatch.className = 'neiki-color-swatch';
                swatch.style.backgroundColor = color;
                swatch.addEventListener('click', () => {
                    if (savedSelection) {
                        this.restoreSelection(savedSelection);
                    }
                    this.contentArea.focus();
                    this.execCommand(type, color);
                    btn.querySelector('.neiki-color-indicator').style.background = color;
                    dropdown.classList.remove('show');
                    savedSelection = null;
                });
                grid.appendChild(swatch);
            });

            const customDiv = document.createElement('div');
            customDiv.className = 'neiki-color-custom';
            const customInput = document.createElement('input');
            customInput.type = 'color';
            customInput.value = type === 'foreColor' ? '#000000' : '#ffff00';
            customInput.addEventListener('change', () => {
                if (savedSelection) {
                    this.restoreSelection(savedSelection);
                }
                this.contentArea.focus();
                this.execCommand(type, customInput.value);
                btn.querySelector('.neiki-color-indicator').style.background = customInput.value;
                dropdown.classList.remove('show');
                savedSelection = null;
            });
            customDiv.appendChild(customInput);

            dropdown.appendChild(grid);
            dropdown.appendChild(customDiv);

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                savedSelection = this.saveSelection();
                this.closeAllDropdowns();
                dropdown.classList.toggle('show');
            });

            wrapper.appendChild(btn);
            wrapper.appendChild(dropdown);

            return wrapper;
        }

        createEmojiPicker() {
            const wrapper = document.createElement('div');
            wrapper.className = 'neiki-color-picker-wrapper';
            let savedSelection = null;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'neiki-btn';
            btn.setAttribute('data-tooltip', tooltips.emoji);
            btn.innerHTML = icons.emoji;

            const dropdown = document.createElement('div');
            dropdown.className = 'neiki-emoji-dropdown';

            const grid = document.createElement('div');
            grid.className = 'neiki-emoji-grid';

            this.config.emojis.forEach(emoji => {
                const item = document.createElement('span');
                item.className = 'neiki-emoji-item';
                item.textContent = emoji;
                item.addEventListener('click', () => {
                    if (savedSelection) {
                        this.restoreSelection(savedSelection);
                    }
                    this.contentArea.focus();
                    this.insertHTML(emoji);
                    dropdown.classList.remove('show');
                    savedSelection = null;
                });
                grid.appendChild(item);
            });

            dropdown.appendChild(grid);

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                savedSelection = this.saveSelection();
                this.closeAllDropdowns();
                dropdown.classList.toggle('show');
            });

            wrapper.appendChild(btn);
            wrapper.appendChild(dropdown);

            return wrapper;
        }

        createThemeToggle() {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'neiki-btn neiki-theme-toggle';
            btn.setAttribute('data-tooltip', tooltips.toggleTheme);
            btn.innerHTML = this.config.theme === 'dark' ? icons.themeLight : icons.themeDark;

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const newTheme = this.config.theme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
                localStorage.setItem('neiki-editor-theme', newTheme);
                btn.innerHTML = newTheme === 'dark' ? icons.themeLight : icons.themeDark;
            });

            return btn;
        }

        createSpecialCharPicker() {
            const wrapper = document.createElement('div');
            wrapper.className = 'neiki-color-picker-wrapper';
            let savedSelection = null;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'neiki-btn';
            btn.setAttribute('data-tooltip', tooltips.specialChar);
            btn.innerHTML = icons.specialChar;

            const dropdown = document.createElement('div');
            dropdown.className = 'neiki-special-dropdown';

            const grid = document.createElement('div');
            grid.className = 'neiki-special-grid';

            this.config.specialChars.forEach(char => {
                const item = document.createElement('span');
                item.className = 'neiki-special-item';
                item.textContent = char;
                item.addEventListener('click', () => {
                    if (savedSelection) {
                        this.restoreSelection(savedSelection);
                    }
                    this.contentArea.focus();
                    this.insertHTML(char);
                    dropdown.classList.remove('show');
                    savedSelection = null;
                });
                grid.appendChild(item);
            });

            dropdown.appendChild(grid);

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                savedSelection = this.saveSelection();
                this.closeAllDropdowns();
                dropdown.classList.toggle('show');
            });

            wrapper.appendChild(btn);
            wrapper.appendChild(dropdown);

            return wrapper;
        }

        createFindReplaceBar() {
            const bar = document.createElement('div');
            bar.className = 'neiki-find-replace';
            bar.innerHTML = `
                <input type="text" placeholder="Najít..." class="neiki-find-input">
                <input type="text" placeholder="Nahradit..." class="neiki-replace-input">
                <button type="button" class="neiki-find-btn">Najít</button>
                <button type="button" class="neiki-replace-btn">Nahradit</button>
                <button type="button" class="neiki-replace-all-btn">Nahradit vše</button>
                <button type="button" class="close-find">${icons.close}</button>
            `;

            bar.querySelector('.neiki-find-btn').addEventListener('click', () => this.findText());
            bar.querySelector('.neiki-replace-btn').addEventListener('click', () => this.replaceText());
            bar.querySelector('.neiki-replace-all-btn').addEventListener('click', () => this.replaceAllText());
            bar.querySelector('.close-find').addEventListener('click', () => bar.classList.remove('show'));

            return bar;
        }

        createStatusBar() {
            const statusBar = document.createElement('div');
            statusBar.className = 'neiki-statusbar';
            statusBar.innerHTML = `
                <div class="neiki-statusbar-left">
                    <span class="neiki-word-count">Slova: 0</span>
                    <span class="neiki-char-count">Znaky: 0</span>
                </div>
                <div class="neiki-statusbar-right">
                    <span class="neiki-path"></span>
                </div>
            `;
            return statusBar;
        }

        createModals() {
            // Link Modal
            this.linkModal = this.createModal('Vložit odkaz', `
                <div class="neiki-form-group">
                    <label class="neiki-form-label">URL adresa</label>
                    <input type="url" class="neiki-form-input" id="neiki-link-url" placeholder="https://example.com">
                </div>
                <div class="neiki-form-group">
                    <label class="neiki-form-label">Text odkazu</label>
                    <input type="text" class="neiki-form-input" id="neiki-link-text" placeholder="Klikněte zde">
                </div>
                <div class="neiki-form-group">
                    <label class="neiki-form-label">
                        <input type="checkbox" id="neiki-link-blank"> Otevřít v novém okně
                    </label>
                </div>
            `, () => this.insertLink());

            // Image Modal
            this.imageModal = this.createModal('Vložit obrázek', `
                <div class="neiki-form-group">
                    <label class="neiki-form-label">URL obrázku</label>
                    <input type="url" class="neiki-form-input" id="neiki-image-url" placeholder="https://example.com/image.jpg">
                </div>
                <div class="neiki-form-group">
                    <label class="neiki-form-label">Alternativní text</label>
                    <input type="text" class="neiki-form-input" id="neiki-image-alt" placeholder="Popis obrázku">
                </div>
                <div class="neiki-form-group">
                    <label class="neiki-form-label">Šířka (px)</label>
                    <input type="number" class="neiki-form-input" id="neiki-image-width" placeholder="Auto">
                </div>
            `, () => this.insertImage());

            // Table Modal
            this.tableModal = this.createModal('Vložit tabulku', `
                <div class="neiki-form-group">
                    <label class="neiki-form-label">Počet řádků</label>
                    <input type="number" class="neiki-form-input" id="neiki-table-rows" value="3" min="1" max="20">
                </div>
                <div class="neiki-form-group">
                    <label class="neiki-form-label">Počet sloupců</label>
                    <input type="number" class="neiki-form-input" id="neiki-table-cols" value="3" min="1" max="10">
                </div>
                <div class="neiki-form-group">
                    <label class="neiki-form-label">
                        <input type="checkbox" id="neiki-table-header" checked> Záhlaví tabulky
                    </label>
                </div>
            `, () => this.insertTable());

            document.body.appendChild(this.linkModal);
            document.body.appendChild(this.imageModal);
            document.body.appendChild(this.tableModal);
        }

        createModal(title, content, onConfirm) {
            const overlay = document.createElement('div');
            overlay.className = 'neiki-modal-overlay';
            overlay.innerHTML = `
                <div class="neiki-modal">
                    <div class="neiki-modal-header">
                        <h3 class="neiki-modal-title">${title}</h3>
                        <button type="button" class="neiki-modal-close">&times;</button>
                    </div>
                    <div class="neiki-modal-body">${content}</div>
                    <div class="neiki-modal-footer">
                        <button type="button" class="neiki-button neiki-button-secondary neiki-modal-cancel">Zrušit</button>
                        <button type="button" class="neiki-button neiki-button-primary neiki-modal-confirm">Vložit</button>
                    </div>
                </div>
            `;

            overlay.querySelector('.neiki-modal-close').addEventListener('click', () => this.closeModal(overlay));
            overlay.querySelector('.neiki-modal-cancel').addEventListener('click', () => this.closeModal(overlay));
            overlay.querySelector('.neiki-modal-confirm').addEventListener('click', () => {
                onConfirm();
                this.closeModal(overlay);
            });
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) this.closeModal(overlay);
            });

            return overlay;
        }

        openModal(modal) {
            modal.classList.add('show');
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }

        closeModal(modal) {
            modal.classList.remove('show');
        }

        attachEvents() {
            // Content changes
            this.contentArea.addEventListener('input', () => {
                this.updateStats();
                this.syncToElement();
                this.saveState();
                if (this.config.onChange) {
                    this.config.onChange(this.getContent());
                }
            });

            // Keyboard shortcuts
            this.contentArea.addEventListener('keydown', (e) => this.handleKeyboard(e));

            // Paste handling
            this.contentArea.addEventListener('paste', (e) => this.handlePaste(e));

            // Source editor sync
            this.sourceEditor.addEventListener('input', () => {
                this.syncToElement();
            });

            // Close dropdowns on outside click
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.neiki-color-picker-wrapper')) {
                    this.closeAllDropdowns();
                }
            });

            // Update toolbar state
            this.contentArea.addEventListener('keyup', () => this.updateToolbarState());
            this.contentArea.addEventListener('mouseup', () => this.updateToolbarState());

            // Initial stats
            this.updateStats();
        }

        handleKeyboard(e) {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case 'b':
                        e.preventDefault();
                        this.execCommand('bold');
                        break;
                    case 'i':
                        e.preventDefault();
                        this.execCommand('italic');
                        break;
                    case 'u':
                        e.preventDefault();
                        this.execCommand('underline');
                        break;
                    case 'k':
                        e.preventDefault();
                        this.openModal(this.linkModal);
                        break;
                    case 'z':
                        e.preventDefault();
                        if (e.shiftKey) {
                            this.redo();
                        } else {
                            this.undo();
                        }
                        break;
                    case 'y':
                        e.preventDefault();
                        this.redo();
                        break;
                    case 'f':
                        e.preventDefault();
                        this.findReplaceBar.classList.toggle('show');
                        this.findReplaceBar.querySelector('.neiki-find-input').focus();
                        break;
                }
            }

            // Tab handling
            if (e.key === 'Tab') {
                e.preventDefault();
                this.insertHTML('&nbsp;&nbsp;&nbsp;&nbsp;');
            }
        }

        handlePaste(e) {
            e.preventDefault();
            const text = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
            
            // Clean HTML
            const cleanHTML = this.cleanPastedHTML(text);
            this.insertHTML(cleanHTML);
        }

        cleanPastedHTML(html) {
            const div = document.createElement('div');
            div.innerHTML = html;

            // Remove scripts and styles
            div.querySelectorAll('script, style, meta, link').forEach(el => el.remove());

            // Clean attributes
            div.querySelectorAll('*').forEach(el => {
                const allowedAttrs = ['href', 'src', 'alt', 'title', 'class', 'id', 'style'];
                Array.from(el.attributes).forEach(attr => {
                    if (!allowedAttrs.includes(attr.name)) {
                        el.removeAttribute(attr.name);
                    }
                });
            });

            return div.innerHTML;
        }

        execCommand(command, value = null) {
            this.contentArea.focus();

            switch (command) {
                case 'createLink':
                    this.savedSelection = this.saveSelection();
                    const selectedText = window.getSelection().toString();
                    document.getElementById('neiki-link-text').value = selectedText;
                    this.openModal(this.linkModal);
                    break;
                case 'insertImage':
                    this.savedSelection = this.saveSelection();
                    this.openModal(this.imageModal);
                    break;
                case 'insertTable':
                    this.savedSelection = this.saveSelection();
                    this.openModal(this.tableModal);
                    break;
                case 'source':
                    this.toggleSourceMode();
                    break;
                case 'fullscreen':
                    this.toggleFullscreen();
                    break;
                case 'print':
                    this.printContent();
                    break;
                case 'blockquote':
                    document.execCommand('formatBlock', false, 'blockquote');
                    break;
                case 'insertHorizontalRule':
                    document.execCommand('insertHorizontalRule', false, null);
                    break;
                case 'insertCode':
                    this.insertCodeBlock();
                    break;
                case 'findReplace':
                    this.findReplaceBar.classList.toggle('show');
                    this.findReplaceBar.querySelector('.neiki-find-input').focus();
                    break;
                case 'undo':
                    this.undo();
                    break;
                case 'redo':
                    this.redo();
                    break;
                case 'alignLeft':
                    document.execCommand('justifyLeft', false, null);
                    this.saveState();
                    break;
                case 'alignCenter':
                    document.execCommand('justifyCenter', false, null);
                    this.saveState();
                    break;
                case 'alignRight':
                    document.execCommand('justifyRight', false, null);
                    this.saveState();
                    break;
                case 'alignJustify':
                    document.execCommand('justifyFull', false, null);
                    this.saveState();
                    break;
                case 'foreColor':
                case 'backColor':
                    if (value) {
                        document.execCommand(command, false, value);
                        this.saveState();
                    }
                    break;
                default:
                    document.execCommand(command, false, value);
                    this.saveState();
            }

            this.updateToolbarState();
            this.syncToElement();
        }

        insertLink() {
            const url = document.getElementById('neiki-link-url').value;
            const text = document.getElementById('neiki-link-text').value || url;
            const blank = document.getElementById('neiki-link-blank').checked;

            if (url) {
                this.restoreSelection(this.savedSelection);
                const target = blank ? ' target="_blank" rel="noopener noreferrer"' : '';
                this.insertHTML(`<a href="${url}"${target}>${text}</a>`);
                this.saveState();
            }

            document.getElementById('neiki-link-url').value = '';
            document.getElementById('neiki-link-text').value = '';
        }

        insertImage() {
            const url = document.getElementById('neiki-image-url').value;
            const alt = document.getElementById('neiki-image-alt').value;
            const width = document.getElementById('neiki-image-width').value;

            if (url) {
                this.restoreSelection(this.savedSelection);
                const widthAttr = width ? ` width="${width}"` : '';
                this.insertHTML(`<img src="${url}" alt="${alt}"${widthAttr}>`);
                this.saveState();
            }

            document.getElementById('neiki-image-url').value = '';
            document.getElementById('neiki-image-alt').value = '';
            document.getElementById('neiki-image-width').value = '';
        }

        insertTable() {
            const rows = parseInt(document.getElementById('neiki-table-rows').value) || 3;
            const cols = parseInt(document.getElementById('neiki-table-cols').value) || 3;
            const hasHeader = document.getElementById('neiki-table-header').checked;

            let html = '<table>';
            
            for (let i = 0; i < rows; i++) {
                html += '<tr>';
                for (let j = 0; j < cols; j++) {
                    if (i === 0 && hasHeader) {
                        html += '<th>Záhlaví</th>';
                    } else {
                        html += '<td>Buňka</td>';
                    }
                }
                html += '</tr>';
            }
            
            html += '</table>';

            this.restoreSelection(this.savedSelection);
            this.insertHTML(html);
            this.saveState();
        }

        insertCodeBlock() {
            const selection = window.getSelection();
            const text = selection.toString() || 'Váš kód zde...';
            this.insertHTML(`<pre><code>${text}</code></pre>`);
            this.saveState();
        }

        insertHTML(html) {
            this.contentArea.focus();
            document.execCommand('insertHTML', false, html);
        }

        toggleSourceMode() {
            this.isSourceMode = !this.isSourceMode;

            if (this.isSourceMode) {
                this.sourceEditor.value = this.formatHTML(this.contentArea.innerHTML);
                this.contentArea.classList.add('hidden');
                this.sourceEditor.classList.add('active');
            } else {
                this.contentArea.innerHTML = this.sourceEditor.value;
                this.contentArea.classList.remove('hidden');
                this.sourceEditor.classList.remove('active');
                this.saveState();
            }

            const sourceBtn = this.toolbar.querySelector('[data-command="source"]');
            if (sourceBtn) {
                sourceBtn.classList.toggle('active', this.isSourceMode);
            }
        }

        formatHTML(html) {
            let formatted = '';
            let indent = 0;
            const tags = html.replace(/>\s*</g, '>\n<').split('\n');

            tags.forEach(tag => {
                if (tag.match(/^<\/\w/)) {
                    indent--;
                }
                formatted += '  '.repeat(Math.max(0, indent)) + tag + '\n';
                if (tag.match(/^<\w[^>]*[^\/]>.*$/) && !tag.match(/^<(br|hr|img|input|meta|link)/i)) {
                    indent++;
                }
            });

            return formatted.trim();
        }

        toggleFullscreen() {
            this.isFullscreen = !this.isFullscreen;
            this.container.classList.toggle('neiki-editor-fullscreen', this.isFullscreen);

            const btn = this.toolbar.querySelector('[data-command="fullscreen"]');
            if (btn) {
                btn.innerHTML = this.isFullscreen ? icons.exitFullscreen : icons.fullscreen;
                btn.classList.toggle('active', this.isFullscreen);
            }
        }

        printContent() {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Tisk</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        img { max-width: 100%; }
                        table { border-collapse: collapse; width: 100%; }
                        th, td { border: 1px solid #ccc; padding: 8px; }
                    </style>
                </head>
                <body>${this.contentArea.innerHTML}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }

        findText() {
            const searchText = this.findReplaceBar.querySelector('.neiki-find-input').value;
            if (!searchText) return;

            if (window.find) {
                window.find(searchText);
            } else {
                // Fallback for browsers that don't support window.find
                const content = this.contentArea.innerHTML;
                const regex = new RegExp(`(${searchText})`, 'gi');
                this.contentArea.innerHTML = content.replace(regex, '<mark>$1</mark>');
            }
        }

        replaceText() {
            const searchText = this.findReplaceBar.querySelector('.neiki-find-input').value;
            const replaceText = this.findReplaceBar.querySelector('.neiki-replace-input').value;
            if (!searchText) return;

            const selection = window.getSelection();
            if (selection.toString().toLowerCase() === searchText.toLowerCase()) {
                document.execCommand('insertText', false, replaceText);
                this.saveState();
            }
            this.findText();
        }

        replaceAllText() {
            const searchText = this.findReplaceBar.querySelector('.neiki-find-input').value;
            const replaceText = this.findReplaceBar.querySelector('.neiki-replace-input').value;
            if (!searchText) return;

            const content = this.contentArea.innerHTML;
            const regex = new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            this.contentArea.innerHTML = content.replace(regex, replaceText);
            this.saveState();
        }

        saveSelection() {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                return selection.getRangeAt(0).cloneRange();
            }
            return null;
        }

        restoreSelection(range) {
            if (range) {
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }

        saveState() {
            const content = this.contentArea.innerHTML;
            if (this.undoStack.length === 0 || this.undoStack[this.undoStack.length - 1] !== content) {
                this.undoStack.push(content);
                if (this.undoStack.length > this.maxUndoLevels) {
                    this.undoStack.shift();
                }
                this.redoStack = [];
            }
        }

        undo() {
            if (this.undoStack.length > 1) {
                this.redoStack.push(this.undoStack.pop());
                this.contentArea.innerHTML = this.undoStack[this.undoStack.length - 1];
                this.syncToElement();
            }
        }

        redo() {
            if (this.redoStack.length > 0) {
                const content = this.redoStack.pop();
                this.undoStack.push(content);
                this.contentArea.innerHTML = content;
                this.syncToElement();
            }
        }

        updateToolbarState() {
            const commands = ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'];
            commands.forEach(cmd => {
                const btn = this.toolbar.querySelector(`[data-command="${cmd}"]`);
                if (btn) {
                    btn.classList.toggle('active', document.queryCommandState(cmd));
                }
            });

            // Update alignment
            const alignments = [
                { justify: 'justifyLeft', align: 'alignLeft' },
                { justify: 'justifyCenter', align: 'alignCenter' },
                { justify: 'justifyRight', align: 'alignRight' },
                { justify: 'justifyFull', align: 'alignJustify' }
            ];
            alignments.forEach(mapping => {
                const btn = this.toolbar.querySelector(`[data-command="${mapping.align}"]`);
                if (btn) {
                    btn.classList.toggle('active', document.queryCommandState(mapping.justify));
                }
            });

            // Update foreColor button indicator
            const foreColorBtn = this.toolbar.querySelector('.neiki-color-btn[data-type="foreColor"]');
            if (foreColorBtn) {
                const indicator = foreColorBtn.querySelector('.neiki-color-indicator');
                if (indicator) {
                    const color = document.queryCommandValue('foreColor');
                    if (color && color !== '') {
                        indicator.style.backgroundColor = color;
                    }
                }
            }

            // Update backColor button indicator
            const backColorBtn = this.toolbar.querySelector('.neiki-color-btn[data-type="backColor"]');
            if (backColorBtn) {
                const indicator = backColorBtn.querySelector('.neiki-color-indicator');
                if (indicator) {
                    const color = document.queryCommandValue('backColor');
                    if (color && color !== '') {
                        indicator.style.backgroundColor = color;
                    }
                }
            }

            // Update path
            this.updatePath();
        }

        updatePath() {
            const selection = window.getSelection();
            if (!selection.rangeCount) return;

            let node = selection.anchorNode;
            const path = [];

            while (node && node !== this.contentArea) {
                if (node.nodeType === 1) {
                    path.unshift(node.tagName.toLowerCase());
                }
                node = node.parentNode;
            }

            const pathEl = this.statusBar.querySelector('.neiki-path');
            if (pathEl) {
                pathEl.textContent = path.join(' > ');
            }
        }

        updateStats() {
            const text = this.contentArea.innerText || '';
            const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
            const chars = text.length;

            const wordCount = this.statusBar.querySelector('.neiki-word-count');
            const charCount = this.statusBar.querySelector('.neiki-char-count');

            if (wordCount) wordCount.textContent = `Slova: ${words}`;
            if (charCount) charCount.textContent = `Znaky: ${chars}`;
        }

        syncToElement() {
            if (this.element.tagName === 'TEXTAREA' || this.element.tagName === 'INPUT') {
                this.element.value = this.isSourceMode ? this.sourceEditor.value : this.contentArea.innerHTML;
            } else {
                this.element.innerHTML = this.isSourceMode ? this.sourceEditor.value : this.contentArea.innerHTML;
            }
        }

        closeAllDropdowns() {
            this.container.querySelectorAll('.neiki-color-dropdown, .neiki-emoji-dropdown, .neiki-special-dropdown').forEach(d => {
                d.classList.remove('show');
            });
        }

        // Public API
        getContent() {
            return this.isSourceMode ? this.sourceEditor.value : this.contentArea.innerHTML;
        }

        setContent(html) {
            this.contentArea.innerHTML = html;
            this.sourceEditor.value = this.formatHTML(html);
            this.syncToElement();
            this.saveState();
        }

        getText() {
            return this.contentArea.innerText;
        }

        clear() {
            this.setContent('<p><br></p>');
        }

        focus() {
            this.contentArea.focus();
        }

        destroy() {
            this.container.remove();
            this.element.style.display = '';
            this.linkModal.remove();
            this.imageModal.remove();
            this.tableModal.remove();
        }

        setTheme(theme) {
            this.config.theme = theme;
            this.container.classList.toggle('neiki-editor-dark', theme === 'dark');
        }
    }

    // Export
    global.NeikiEditor = NeikiEditor;

    // Auto-init
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-neiki-editor]').forEach(el => {
            new NeikiEditor(el);
        });
    });

})(typeof window !== 'undefined' ? window : this);
