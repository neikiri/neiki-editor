/**
 * NeikiEditor - A Modern WYSIWYG Editor
 * Version: 2.1.0
 *
 * A lightweight, feature-rich text editor with support for:
 * - Rich text formatting (bold, italic, underline, etc.)
 * - Lists (ordered, unordered)
 * - Links and images
 * - Tables
 * - Code blocks
 * - Undo/Redo
 * - Keyboard shortcuts
 */

(function (global) {
  'use strict';

  // ============================================
  // SECTION 1: CONFIGURATION & CONSTANTS
  // ============================================

  const DEFAULT_CONFIG = {
    toolbar: [
      'viewCode', 'undo', 'redo', 'findReplace', '|',
      'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'removeFormat', '|',
      'heading', 'fontFamily', 'fontSize', '|',
      'foreColor', 'backColor', '|',
      'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', '|',
      'indent', 'outdent', '|',
      'bulletList', 'numberedList', 'blockquote', 'horizontalRule', '|',
      'insertDropdown', '|',
      'moreMenu'
    ],
    placeholder: 'Start typing...',
    minHeight: 300,
    maxHeight: null,
    autofocus: false,
    spellcheck: true,
    readonly: false,
    theme: 'light',
    language: 'en',
    plugins: [],
    onChange: null,
    onSave: null,
    onFocus: null,
    onBlur: null,
    onReady: null
  };

  const TOOLBAR_ITEMS = {
    undo: { icon: 'undo', title: 'Undo (Ctrl+Z)', command: 'undo' },
    redo: { icon: 'redo', title: 'Redo (Ctrl+Y)', command: 'redo' },
    bold: { icon: 'bold', title: 'Bold (Ctrl+B)', command: 'bold' },
    italic: { icon: 'italic', title: 'Italic (Ctrl+I)', command: 'italic' },
    underline: { icon: 'underline', title: 'Underline (Ctrl+U)', command: 'underline' },
    strikethrough: { icon: 'strikethrough', title: 'Strikethrough', command: 'strikeThrough' },
    heading: { title: 'Heading', command: 'heading', type: 'select' },
    fontSize: { title: 'Font Size', command: 'fontSize', type: 'fontSizeWidget' },
    fontFamily: { title: 'Font Family', command: 'fontFamily', type: 'select' },
    foreColor: { icon: 'text-color', title: 'Text Color', command: 'foreColor', picker: 'color' },
    backColor: { icon: 'highlight', title: 'Background Color', command: 'backColor', picker: 'color' },
    alignLeft: { icon: 'align-left', title: 'Align Left', command: 'justifyLeft' },
    alignCenter: { icon: 'align-center', title: 'Align Center', command: 'justifyCenter' },
    alignRight: { icon: 'align-right', title: 'Align Right', command: 'justifyRight' },
    alignJustify: { icon: 'align-justify', title: 'Justify', command: 'justifyFull' },
    bulletList: { icon: 'list-ul', title: 'Bullet List', command: 'insertUnorderedList' },
    numberedList: { icon: 'list-ol', title: 'Numbered List', command: 'insertOrderedList' },
    indent: { icon: 'indent', title: 'Increase Indent', command: 'indent' },
    outdent: { icon: 'outdent', title: 'Decrease Indent', command: 'outdent' },
    link: { icon: 'link', title: 'Insert Link (Ctrl+K)', command: 'createLink', modal: true },
    image: { icon: 'image', title: 'Insert Image', command: 'insertImage', modal: true },
    table: { icon: 'table', title: 'Insert Table', command: 'insertTable', modal: true },
    blockquote: { icon: 'quote', title: 'Blockquote', command: 'formatBlock', value: 'blockquote' },
    viewCode: { icon: 'code', title: 'View Code (Toggle HTML)', command: 'viewCode' },
    horizontalRule: { icon: 'minus', title: 'Horizontal Line', command: 'insertHorizontalRule' },
    subscript: { icon: 'subscript', title: 'Subscript', command: 'subscript' },
    superscript: { icon: 'superscript', title: 'Superscript', command: 'superscript' },
    removeFormat: { icon: 'eraser', title: 'Remove Formatting', command: 'removeFormat' },
    findReplace: { icon: 'search', title: 'Find & Replace', command: 'findReplace', modal: true },
    emoji: { icon: 'emoji', title: 'Insert Emoji', command: 'emoji', picker: 'emoji' },
    specialChars: { icon: 'specialChars', title: 'Special Characters', command: 'specialChars', picker: 'specialChars' },
    fullscreen: { icon: 'fullscreen', title: 'Fullscreen', command: 'fullscreen' },
    autosave: { icon: 'save', title: 'Toggle Autosave', command: 'autosave', toggle: true },
    themeToggle: { icon: 'sun', title: 'Toggle Theme', command: 'themeToggle', toggle: true },
    print: { icon: 'print', title: 'Print', command: 'print' },
    insertDropdown: { icon: 'plus', title: 'Insert', type: 'insertDropdown' },
    moreMenu: { icon: 'more', title: 'More options', type: 'moreMenu' }
  };

  const FONT_SIZES = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];

  const FONT_FAMILIES = [
    { label: 'Sans Serif', value: 'Arial, sans-serif' },
    { label: 'Serif', value: 'Georgia, serif' },
    { label: 'Monospace', value: 'Consolas, monospace' },
    { label: 'Cursive', value: 'Comic Sans MS, cursive' }
  ];

  const HEADINGS = [
    { label: 'Paragraph', value: 'p' },
    { label: 'Heading 1', value: 'h1' },
    { label: 'Heading 2', value: 'h2' },
    { label: 'Heading 3', value: 'h3' },
    { label: 'Heading 4', value: 'h4' },
    { label: 'Heading 5', value: 'h5' },
    { label: 'Heading 6', value: 'h6' }
  ];

  const EMOJIS = [
    '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂',
    '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛',
    '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨',
    '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔',
    '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵',
    '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
    '👆', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
    '⭐', '🌟', '✨', '💫', '🔥', '💥', '💯', '✅', '❌', '❓'
  ];

  const SPECIAL_CHARS = [
    { char: '©', name: 'Copyright' },
    { char: '®', name: 'Registered' },
    { char: '™', name: 'Trademark' },
    { char: '€', name: 'Euro' },
    { char: '£', name: 'Pound' },
    { char: '¥', name: 'Yen' },
    { char: '¢', name: 'Cent' },
    { char: '°', name: 'Degree' },
    { char: '±', name: 'Plus-Minus' },
    { char: '×', name: 'Multiply' },
    { char: '÷', name: 'Divide' },
    { char: '≠', name: 'Not Equal' },
    { char: '≤', name: 'Less or Equal' },
    { char: '≥', name: 'Greater or Equal' },
    { char: '∞', name: 'Infinity' },
    { char: '√', name: 'Square Root' },
    { char: 'π', name: 'Pi' },
    { char: 'Ω', name: 'Omega' },
    { char: 'α', name: 'Alpha' },
    { char: 'β', name: 'Beta' },
    { char: 'γ', name: 'Gamma' },
    { char: 'δ', name: 'Delta' },
    { char: 'µ', name: 'Micro' },
    { char: '∑', name: 'Sum' },
    { char: '∆', name: 'Delta (big)' },
    { char: '←', name: 'Left Arrow' },
    { char: '→', name: 'Right Arrow' },
    { char: '↑', name: 'Up Arrow' },
    { char: '↓', name: 'Down Arrow' },
    { char: '↔', name: 'Left-Right Arrow' },
    { char: '•', name: 'Bullet' },
    { char: '…', name: 'Ellipsis' },
    { char: '—', name: 'Em Dash' },
    { char: '–', name: 'En Dash' },
    { char: '§', name: 'Section' },
    { char: '¶', name: 'Paragraph' },
    { char: '†', name: 'Dagger' },
    { char: '‡', name: 'Double Dagger' },
    { char: '♠', name: 'Spade' },
    { char: '♣', name: 'Club' },
    { char: '♥', name: 'Heart' },
    { char: '♦', name: 'Diamond' }
  ];

  const COLORS = [
    '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
    '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
    '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
    '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd',
    '#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0',
    '#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79',
    '#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#1155cc', '#0b5394', '#351c75', '#741b47',
    '#5b0f00', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#1c4587', '#073763', '#20124d', '#4c1130'
  ];

  // ============================================
  // SECTION 2: UTILITY FUNCTIONS
  // ============================================

  const Utils = {
    generateId() {
      return 'neiki-' + Math.random().toString(36).substr(2, 9);
    },

    createElement(tag, attrs = {}, children = []) {
      const el = document.createElement(tag);
      Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'className') {
          el.className = value;
        } else if (key === 'innerHTML') {
          el.innerHTML = value;
        } else if (key === 'textContent') {
          el.textContent = value;
        } else if (key.startsWith('on') && typeof value === 'function') {
          el.addEventListener(key.slice(2).toLowerCase(), value);
        } else if (key === 'style' && typeof value === 'object') {
          Object.assign(el.style, value);
        } else {
          el.setAttribute(key, value);
        }
      });
      children.forEach(child => {
        if (typeof child === 'string') {
          el.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
          el.appendChild(child);
        }
      });
      return el;
    },

    debounce(fn, delay) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
      };
    },

    deepMerge(target, source) {
      const result = { ...target };
      Object.keys(source).forEach(key => {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          result[key] = Utils.deepMerge(result[key] || {}, source[key]);
        } else {
          result[key] = source[key];
        }
      });
      return result;
    },

    sanitizeHTML(html) {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const scripts = temp.querySelectorAll('script');
      scripts.forEach(s => s.remove());
      return temp.innerHTML;
    },

    isValidUrl(string) {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    },

    getSelection() {
      return window.getSelection();
    },

    saveSelection() {
      const sel = window.getSelection();
      if (sel.rangeCount > 0) {
        return sel.getRangeAt(0).cloneRange();
      }
      return null;
    },

    restoreSelection(range) {
      if (range) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  // ============================================
  // SECTION 3: ICONS (SVG)
  // ============================================

  const Icons = {
    undo: '<svg viewBox="0 0 24 24"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>',
    redo: '<svg viewBox="0 0 24 24"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/></svg>',
    bold: '<svg viewBox="0 0 24 24"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>',
    italic: '<svg viewBox="0 0 24 24"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/></svg>',
    underline: '<svg viewBox="0 0 24 24"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/></svg>',
    strikethrough: '<svg viewBox="0 0 24 24"><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/></svg>',
    heading: '<svg viewBox="0 0 24 24"><path d="M5 4v3h5.5v12h3V7H19V4z"/></svg>',
    'font-size': '<svg viewBox="0 0 24 24"><path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3v-3H3v3z"/></svg>',
    font: '<svg viewBox="0 0 24 24"><path d="M9.93 13.5h4.14L12 7.98 9.93 13.5zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"/></svg>',
    'text-color': '<svg viewBox="0 0 24 24"><path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/><rect x="3" y="19" width="18" height="3" fill="currentColor"/></svg>',
    highlight: '<svg viewBox="0 0 24 24"><path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"/><rect x="0" y="20" width="24" height="4"/></svg>',
    'align-left': '<svg viewBox="0 0 24 24"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>',
    'align-center': '<svg viewBox="0 0 24 24"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/></svg>',
    'align-right': '<svg viewBox="0 0 24 24"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/></svg>',
    'align-justify': '<svg viewBox="0 0 24 24"><path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"/></svg>',
    'list-ul': '<svg viewBox="0 0 24 24"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>',
    'list-ol': '<svg viewBox="0 0 24 24"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/></svg>',
    indent: '<svg viewBox="0 0 24 24"><path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/></svg>',
    outdent: '<svg viewBox="0 0 24 24"><path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',
    image: '<svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>',
    table: '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"/></svg>',
    quote: '<svg viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>',
    code: '<svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',
    minus: '<svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>',
    eraser: '<svg viewBox="0 0 24 24"><path d="M16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.008 4.008 0 01-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l10.6-10.6c.79-.78 2.05-.78 2.83 0zm-1.41 1.42L6.93 12.9l4.24 4.24 7.9-7.9-4.24-4.26z"/></svg>',
    fullscreen: '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
    save: '<svg viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
    print: '<svg viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>',
    subscript: '<svg viewBox="0 0 24 24"><path d="M22 18h-2v1h3v1h-4v-2.5c0-.83.67-1.5 1.5-1.5h1.5v-1h-3v-1h2.5c.83 0 1.5.67 1.5 1.5v1c0 .83-.67 1.5-1.5 1.5zM5.88 18h2.66l3.4-5.42h.12l3.4 5.42h2.66l-4.65-7.27L17.81 4h-2.68l-3.07 4.99h-.12L8.87 4H6.19l4.32 6.73L5.88 18z"/></svg>',
    superscript: '<svg viewBox="0 0 24 24"><path d="M22 7h-2v1h3v1h-4V6.5c0-.83.67-1.5 1.5-1.5h1.5V4h-3V3h2.5c.83 0 1.5.67 1.5 1.5v1c0 .83-.67 1.5-1.5 1.5zM5.88 20h2.66l3.4-5.42h.12l3.4 5.42h2.66l-4.65-7.27L17.81 6h-2.68l-3.07 4.99h-.12L8.87 6H6.19l4.32 6.73L5.88 20z"/></svg>',
    search: '<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
    emoji: '<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>',
    specialChars: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">©</text></svg>',
    sun: '<svg viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
    more: '<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/></svg>',
    download: '<svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>',
    eye: '<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',
    'chevron-down': '<svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>'
  };

  // ============================================
  // SECTION 4: STORAGE MANAGER (Persistence)
  // ============================================

  class StorageManager {
    constructor(editorId) {
      this.prefix = 'neiki_' + editorId + '_';
    }

    set(key, value) {
      try {
        localStorage.setItem(this.prefix + key, JSON.stringify(value));
      } catch (e) {
        console.warn('NeikiEditor: localStorage not available');
      }
    }

    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(this.prefix + key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        return defaultValue;
      }
    }

    remove(key) {
      try {
        localStorage.removeItem(this.prefix + key);
      } catch (e) { }
    }

    // Global storage (shared across all editors)
    static setGlobal(key, value) {
      try {
        localStorage.setItem('neiki_global_' + key, JSON.stringify(value));
      } catch (e) { }
    }

    static getGlobal(key, defaultValue = null) {
      try {
        const item = localStorage.getItem('neiki_global_' + key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        return defaultValue;
      }
    }
  }

  // ============================================
  // SECTION 5: HISTORY MANAGER (Undo/Redo with Persistence)
  // ============================================

  class HistoryManager {
    constructor(editor, maxSize = 100) {
      this.editor = editor;
      this.maxSize = maxSize;
      this.undoStack = [];
      this.redoStack = [];
      this.isRecording = true;
      // Load persisted history if available
      this.loadFromStorage();
    }

    record() {
      if (!this.isRecording) return;

      const content = this.editor.getContent();
      const lastState = this.undoStack[this.undoStack.length - 1];

      if (lastState !== content) {
        this.undoStack.push(content);
        this.redoStack = [];

        if (this.undoStack.length > this.maxSize) {
          this.undoStack.shift();
        }
        this.saveToStorage();
      }
    }

    undo() {
      if (this.undoStack.length <= 1) return false;

      const current = this.undoStack.pop();
      this.redoStack.push(current);

      const previous = this.undoStack[this.undoStack.length - 1];
      this.isRecording = false;
      this.editor.setContent(previous);
      this.isRecording = true;
      this.saveToStorage();

      return true;
    }

    redo() {
      if (this.redoStack.length === 0) return false;

      const next = this.redoStack.pop();
      this.undoStack.push(next);

      this.isRecording = false;
      this.editor.setContent(next);
      this.isRecording = true;
      this.saveToStorage();

      return true;
    }

    canUndo() {
      return this.undoStack.length > 1;
    }

    canRedo() {
      return this.redoStack.length > 0;
    }

    clear() {
      this.undoStack = [];
      this.redoStack = [];
      this.record();
    }

    saveToStorage() {
      // Undo/Redo history is NOT persisted across page reloads
      // This is intentional - after saving content and returning to edit,
      // the "initial state" should be the saved version, not old history
    }

    loadFromStorage() {
      // No-op - history is session-only
    }

    clearStorage() {
      // No-op - history is session-only
    }
  }

  // ============================================
  // SECTION 6: MODAL MANAGER
  // ============================================

  class ModalManager {
    constructor(editor) {
      this.editor = editor;
      this.activeModal = null;
      this.overlay = null;
    }

    createOverlay() {
      if (this.overlay) return this.overlay;

      this.overlay = Utils.createElement('div', {
        className: 'neiki-modal-overlay',
        onClick: (e) => {
          if (e.target === this.overlay) {
            this.close();
          }
        }
      });

      document.body.appendChild(this.overlay);
      return this.overlay;
    }

    open(type, data = {}) {
      this.close();
      this.createOverlay();

      let modal;
      switch (type) {
        case 'link':
          modal = this.createLinkModal(data);
          break;
        case 'image':
          modal = this.createImageModal(data);
          break;
        case 'table':
          modal = this.createTableModal(data);
          break;
        case 'findReplace':
          modal = this.createFindReplaceModal(data);
          break;
        default:
          return;
      }

      this.activeModal = modal;
      this.overlay.appendChild(modal);
      this.overlay.classList.add('active');

      const firstInput = modal.querySelector('input');
      if (firstInput) firstInput.focus();
    }

    close() {
      if (this.overlay) {
        this.overlay.classList.remove('active');
        if (this.activeModal) {
          this.activeModal.remove();
          this.activeModal = null;
        }
      }
    }

    createLinkModal(data) {
      const modal = Utils.createElement('div', { className: 'neiki-modal' });

      modal.innerHTML = `
                <div class="neiki-modal-header">
                    <h3>Insert Link</h3>
                    <button class="neiki-modal-close" type="button">${Icons.close}</button>
                </div>
                <div class="neiki-modal-body">
                    <div class="neiki-form-group">
                        <label>URL</label>
                        <input type="url" class="neiki-input" name="url" placeholder="https://example.com" value="${data.url || ''}">
                    </div>
                    <div class="neiki-form-group">
                        <label>Text</label>
                        <input type="text" class="neiki-input" name="text" placeholder="Link text" value="${data.text || ''}">
                    </div>
                    <div class="neiki-form-group">
                        <label>
                            <input type="checkbox" name="newTab" ${data.newTab ? 'checked' : ''}> Open in new tab
                        </label>
                    </div>
                </div>
                <div class="neiki-modal-footer">
                    <button class="neiki-btn neiki-btn-secondary" type="button" data-action="cancel">Cancel</button>
                    <button class="neiki-btn neiki-btn-primary" type="button" data-action="insert">Insert</button>
                </div>
            `;

      modal.querySelector('.neiki-modal-close').addEventListener('click', () => this.close());
      modal.querySelector('[data-action="cancel"]').addEventListener('click', () => this.close());
      modal.querySelector('[data-action="insert"]').addEventListener('click', () => {
        const url = modal.querySelector('[name="url"]').value;
        const text = modal.querySelector('[name="text"]').value || url;
        const newTab = modal.querySelector('[name="newTab"]').checked;

        if (url) {
          this.editor.commands.insertLink(url, text, newTab);
        }
        this.close();
      });

      return modal;
    }

    createImageModal(data) {
      const modal = Utils.createElement('div', { className: 'neiki-modal' });

      modal.innerHTML = `
                <div class="neiki-modal-header">
                    <h3>Insert Image</h3>
                    <button class="neiki-modal-close" type="button">${Icons.close}</button>
                </div>
                <div class="neiki-modal-body">
                    <div class="neiki-form-group">
                        <label>Upload Image</label>
                        <input type="file" class="neiki-input" name="upload" accept="image/*">
                        <small style="color: var(--neiki-text-muted); font-size: 11px;">Will be converted to base64</small>
                    </div>
                    <div class="neiki-form-divider">
                        <span>OR</span>
                    </div>
                    <div class="neiki-form-group">
                        <label>Image URL</label>
                        <input type="url" class="neiki-input" name="url" placeholder="https://example.com/image.jpg" value="${data.url || ''}">
                    </div>
                    <div class="neiki-form-group">
                        <label>Alt Text</label>
                        <input type="text" class="neiki-input" name="alt" placeholder="Describe the image" value="${data.alt || ''}">
                    </div>
                    <div class="neiki-form-group">
                        <label>Width (optional)</label>
                        <input type="text" class="neiki-input" name="width" placeholder="e.g. 300px or 50%" value="${data.width || ''}">
                    </div>
                </div>
                <div class="neiki-modal-footer">
                    <button class="neiki-btn neiki-btn-secondary" type="button" data-action="cancel">Cancel</button>
                    <button class="neiki-btn neiki-btn-primary" type="button" data-action="insert">Insert</button>
                </div>
            `;

      const uploadInput = modal.querySelector('[name="upload"]');
      const urlInput = modal.querySelector('[name="url"]');

      // Handle file upload
      uploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            urlInput.value = e.target.result;
            urlInput.disabled = true;
          };
          reader.readAsDataURL(file);
        } else if (file) {
          alert('Please select a valid image file.');
          uploadInput.value = '';
        }
      });

      // Clear URL when upload is cleared
      urlInput.addEventListener('input', () => {
        if (!urlInput.value) {
          urlInput.disabled = false;
          uploadInput.value = '';
        }
      });

      modal.querySelector('.neiki-modal-close').addEventListener('click', () => this.close());
      modal.querySelector('[data-action="cancel"]').addEventListener('click', () => this.close());
      modal.querySelector('[data-action="insert"]').addEventListener('click', () => {
        const url = modal.querySelector('[name="url"]').value;
        const alt = modal.querySelector('[name="alt"]').value;
        const width = modal.querySelector('[name="width"]').value;

        if (url) {
          this.editor.commands.insertImage(url, alt, width);
        }
        this.close();
      });

      return modal;
    }

    createTableModal(data) {
      const modal = Utils.createElement('div', { className: 'neiki-modal' });

      modal.innerHTML = `
                <div class="neiki-modal-header">
                    <h3>Insert Table</h3>
                    <button class="neiki-modal-close" type="button">${Icons.close}</button>
                </div>
                <div class="neiki-modal-body">
                    <div class="neiki-form-row">
                        <div class="neiki-form-group">
                            <label>Rows</label>
                            <input type="number" class="neiki-input" name="rows" min="1" max="20" value="${data.rows || 3}">
                        </div>
                        <div class="neiki-form-group">
                            <label>Columns</label>
                            <input type="number" class="neiki-input" name="cols" min="1" max="10" value="${data.cols || 3}">
                        </div>
                    </div>
                    <div class="neiki-form-group">
                        <label>
                            <input type="checkbox" name="header" ${data.header !== false ? 'checked' : ''}> Include header row
                        </label>
                    </div>
                </div>
                <div class="neiki-modal-footer">
                    <button class="neiki-btn neiki-btn-secondary" type="button" data-action="cancel">Cancel</button>
                    <button class="neiki-btn neiki-btn-primary" type="button" data-action="insert">Insert</button>
                </div>
            `;

      modal.querySelector('.neiki-modal-close').addEventListener('click', () => this.close());
      modal.querySelector('[data-action="cancel"]').addEventListener('click', () => this.close());
      modal.querySelector('[data-action="insert"]').addEventListener('click', () => {
        const rows = parseInt(modal.querySelector('[name="rows"]').value) || 3;
        const cols = parseInt(modal.querySelector('[name="cols"]').value) || 3;
        const header = modal.querySelector('[name="header"]').checked;

        this.editor.commands.insertTable(rows, cols, header);
        this.close();
      });

      return modal;
    }

    createFindReplaceModal(data) {
      const modal = Utils.createElement('div', { className: 'neiki-modal neiki-modal-wide' });

      modal.innerHTML = `
                <div class="neiki-modal-header">
                    <h3>Find & Replace</h3>
                    <button class="neiki-modal-close" type="button">${Icons.close}</button>
                </div>
                <div class="neiki-modal-body">
                    <div class="neiki-form-group">
                        <label>Find</label>
                        <input type="text" class="neiki-input" name="find" placeholder="Search text...">
                    </div>
                    <div class="neiki-form-group">
                        <label>Replace with</label>
                        <input type="text" class="neiki-input" name="replace" placeholder="Replacement text...">
                    </div>
                    <div class="neiki-form-group neiki-form-row">
                        <label><input type="checkbox" name="regex"> Use Regular Expression</label>
                        <label><input type="checkbox" name="caseSensitive"> Case Sensitive</label>
                    </div>
                    <div class="neiki-find-results" style="margin-top:10px;font-size:13px;color:var(--neiki-text-muted);"></div>
                </div>
                <div class="neiki-modal-footer">
                    <button class="neiki-btn neiki-btn-secondary" type="button" data-action="findNext">Find Next</button>
                    <button class="neiki-btn neiki-btn-secondary" type="button" data-action="replaceOne">Replace</button>
                    <button class="neiki-btn neiki-btn-primary" type="button" data-action="replaceAll">Replace All</button>
                </div>
            `;

      const findInput = modal.querySelector('[name="find"]');
      const replaceInput = modal.querySelector('[name="replace"]');
      const regexCheck = modal.querySelector('[name="regex"]');
      const caseCheck = modal.querySelector('[name="caseSensitive"]');
      const resultsDiv = modal.querySelector('.neiki-find-results');

      let currentMatches = [];
      let currentIndex = -1;

      const clearHighlights = () => {
        const highlights = this.editor.contentArea.querySelectorAll('.neiki-highlight-find');
        highlights.forEach(h => {
          const text = document.createTextNode(h.textContent);
          h.parentNode.replaceChild(text, h);
        });
        this.editor.contentArea.normalize();
      };

      const findMatches = () => {
        clearHighlights();
        currentMatches = [];
        currentIndex = -1;

        const searchText = findInput.value;
        if (!searchText) {
          resultsDiv.textContent = '';
          return;
        }

        const content = this.editor.contentArea.innerHTML;
        let flags = 'g';
        if (!caseCheck.checked) flags += 'i';

        let regex;
        try {
          regex = regexCheck.checked
            ? new RegExp(searchText, flags)
            : new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
        } catch (e) {
          resultsDiv.textContent = 'Invalid regex';
          return;
        }

        // Find and highlight in text nodes
        const walker = document.createTreeWalker(
          this.editor.contentArea,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );

        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        textNodes.forEach(node => {
          const text = node.textContent;
          const matches = [...text.matchAll(regex)];
          if (matches.length > 0) {
            const frag = document.createDocumentFragment();
            let lastIndex = 0;
            matches.forEach(match => {
              if (match.index > lastIndex) {
                frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
              }
              const span = document.createElement('span');
              span.className = 'neiki-highlight-find';
              span.textContent = match[0];
              frag.appendChild(span);
              currentMatches.push(span);
              lastIndex = match.index + match[0].length;
            });
            if (lastIndex < text.length) {
              frag.appendChild(document.createTextNode(text.slice(lastIndex)));
            }
            node.parentNode.replaceChild(frag, node);
          }
        });

        resultsDiv.textContent = `${currentMatches.length} match(es) found`;
      };

      const findNext = () => {
        if (currentMatches.length === 0) {
          findMatches();
        }
        if (currentMatches.length === 0) return;

        // Remove current highlight
        if (currentIndex >= 0 && currentMatches[currentIndex]) {
          currentMatches[currentIndex].classList.remove('neiki-highlight-current');
        }

        currentIndex = (currentIndex + 1) % currentMatches.length;
        const current = currentMatches[currentIndex];
        current.classList.add('neiki-highlight-current');
        current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        resultsDiv.textContent = `Match ${currentIndex + 1} of ${currentMatches.length}`;
      };

      const replaceOne = () => {
        if (currentIndex >= 0 && currentMatches[currentIndex]) {
          const match = currentMatches[currentIndex];
          match.textContent = replaceInput.value;
          match.classList.remove('neiki-highlight-find', 'neiki-highlight-current');
          currentMatches.splice(currentIndex, 1);
          currentIndex--;
          this.editor.history.record();
          this.editor.triggerChange();
          resultsDiv.textContent = `${currentMatches.length} match(es) remaining`;
          if (currentMatches.length > 0) findNext();
        }
      };

      const replaceAll = () => {
        clearHighlights();
        const searchText = findInput.value;
        const replaceText = replaceInput.value;
        if (!searchText) return;

        let flags = 'g';
        if (!caseCheck.checked) flags += 'i';

        let regex;
        try {
          regex = regexCheck.checked
            ? new RegExp(searchText, flags)
            : new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
        } catch (e) {
          return;
        }

        // Replace in text nodes
        const walker = document.createTreeWalker(
          this.editor.contentArea,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );

        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        let count = 0;
        textNodes.forEach(node => {
          const text = node.textContent;
          const newText = text.replace(regex, () => {
            count++;
            return replaceText;
          });
          if (newText !== text) {
            node.textContent = newText;
          }
        });

        this.editor.history.record();
        this.editor.triggerChange();
        currentMatches = [];
        currentIndex = -1;
        resultsDiv.textContent = `Replaced ${count} occurrence(s)`;
      };

      findInput.addEventListener('input', Utils.debounce(findMatches, 300));
      modal.querySelector('.neiki-modal-close').addEventListener('click', () => {
        clearHighlights();
        this.close();
      });
      modal.querySelector('[data-action="findNext"]').addEventListener('click', findNext);
      modal.querySelector('[data-action="replaceOne"]').addEventListener('click', replaceOne);
      modal.querySelector('[data-action="replaceAll"]').addEventListener('click', replaceAll);

      return modal;
    }
  }

  // ============================================
  // SECTION 6: DROPDOWN MANAGER
  // ============================================

  class DropdownManager {
    constructor(editor) {
      this.editor = editor;
      this.activeDropdown = null;

      document.addEventListener('click', (e) => {
        if (this.activeDropdown && !this.activeDropdown.contains(e.target)) {
          this.close();
        }
      });
    }

    toggle(button, type) {
      const existing = button.querySelector('.neiki-dropdown');

      if (existing) {
        this.close();
        return;
      }

      this.close();

      let dropdown;
      switch (type) {
        case 'heading':
          dropdown = this.createHeadingDropdown();
          break;
        case 'fontSize':
          dropdown = this.createFontSizeDropdown();
          break;
        case 'fontFamily':
          dropdown = this.createFontFamilyDropdown();
          break;
        default:
          return;
      }

      button.appendChild(dropdown);
      this.activeDropdown = dropdown;
    }

    close() {
      if (this.activeDropdown) {
        this.activeDropdown.remove();
        this.activeDropdown = null;
      }
    }

    createHeadingDropdown() {
      const dropdown = Utils.createElement('div', { className: 'neiki-dropdown' });

      HEADINGS.forEach(({ label, value }) => {
        const item = Utils.createElement('div', {
          className: 'neiki-dropdown-item',
          innerHTML: `<${value}>${label}</${value}>`,
          onClick: () => {
            this.editor.commands.formatBlock(value);
            this.close();
          }
        });
        dropdown.appendChild(item);
      });

      return dropdown;
    }

    createFontSizeDropdown() {
      const dropdown = Utils.createElement('div', { className: 'neiki-dropdown' });

      FONT_SIZES.forEach(size => {
        const item = Utils.createElement('div', {
          className: 'neiki-dropdown-item',
          textContent: size + 'px',
          onClick: () => {
            this.editor.commands.fontSize(size + 'px');
            this.close();
          }
        });
        dropdown.appendChild(item);
      });

      return dropdown;
    }

    createFontFamilyDropdown() {
      const dropdown = Utils.createElement('div', { className: 'neiki-dropdown' });

      FONT_FAMILIES.forEach(({ label, value }) => {
        const item = Utils.createElement('div', {
          className: 'neiki-dropdown-item',
          textContent: label,
          style: { fontFamily: value },
          onClick: () => {
            this.editor.commands.fontFamily(value);
            this.close();
          }
        });
        dropdown.appendChild(item);
      });

      return dropdown;
    }
  }

  // ============================================
  // SECTION 7: COLOR PICKER
  // ============================================

  class ColorPicker {
    constructor(editor) {
      this.editor = editor;
      this.activePicker = null;
      this.activeButton = null;

      document.addEventListener('mousedown', (e) => {
        if (this.activePicker &&
          !this.activePicker.contains(e.target) &&
          (!this.activeButton || !this.activeButton.contains(e.target))) {
          this.close();
        }
      });
    }

    toggle(button, command) {
      if (this.activeButton === button && this.activePicker) {
        this.close();
        return;
      }

      this.close();

      const picker = Utils.createElement('div', { className: 'neiki-color-picker' });

      const resetSwatch = Utils.createElement('div', {
        className: 'neiki-color-swatch neiki-color-reset',
        title: 'Reset to default'
      });
      resetSwatch.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (command === 'foreColor') {
          this.editor.commands.resetForeColor();
        } else {
          this.editor.commands.resetBackColor();
        }
        this.close();
      });
      picker.appendChild(resetSwatch);

      COLORS.forEach(color => {
        const swatch = Utils.createElement('div', {
          className: 'neiki-color-swatch',
          style: { backgroundColor: color },
          title: color
        });
        swatch.addEventListener('mousedown', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (command === 'foreColor') {
            this.editor.commands.foreColor(color);
          } else {
            this.editor.commands.backColor(color);
          }
          this.close();
        });
        picker.appendChild(swatch);
      });

      button.appendChild(picker);
      this.activePicker = picker;
      this.activeButton = button;
    }

    close() {
      if (this.activePicker) {
        this.activePicker.remove();
        this.activePicker = null;
        this.activeButton = null;
      }
    }
  }

  // ============================================
  // SECTION 7b: EMOJI PICKER
  // ============================================

  class EmojiPicker {
    constructor(editor) {
      this.editor = editor;
      this.picker = null;
      this.activeButton = null;

      document.addEventListener('mousedown', (e) => {
        if (this.picker &&
          !this.picker.contains(e.target) &&
          (!this.activeButton || !this.activeButton.contains(e.target))) {
          this.close();
        }
      });
    }

    toggle(button) {
      if (this.activeButton === button && this.picker) {
        this.close();
        return;
      }

      this.close();

      this.picker = Utils.createElement('div', { className: 'neiki-emoji-picker' });

      EMOJIS.forEach(emoji => {
        const item = document.createElement('span');
        item.className = 'neiki-emoji-item';
        item.textContent = emoji;
        item.title = emoji;
        item.addEventListener('mousedown', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.editor.focus();
          document.execCommand('insertText', false, emoji);
          this.editor.history.record();
          this.editor.triggerChange();
          this.close();
        });
        this.picker.appendChild(item);
      });

      button.appendChild(this.picker);
      this.activeButton = button;
    }

    close() {
      if (this.picker) {
        this.picker.remove();
        this.picker = null;
        this.activeButton = null;
      }
    }
  }

  // ============================================
  // SECTION 7c: SPECIAL CHARS PICKER
  // ============================================

  class SpecialCharsPicker {
    constructor(editor) {
      this.editor = editor;
      this.picker = null;
      this.activeButton = null;

      document.addEventListener('mousedown', (e) => {
        if (this.picker &&
          !this.picker.contains(e.target) &&
          (!this.activeButton || !this.activeButton.contains(e.target))) {
          this.close();
        }
      });
    }

    toggle(button) {
      if (this.activeButton === button && this.picker) {
        this.close();
        return;
      }

      this.close();

      this.picker = Utils.createElement('div', { className: 'neiki-special-picker' });

      SPECIAL_CHARS.forEach(({ char, name }) => {
        const item = document.createElement('span');
        item.className = 'neiki-special-item';
        item.textContent = char;
        item.title = name;
        item.addEventListener('mousedown', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.editor.focus();
          document.execCommand('insertText', false, char);
          this.editor.history.record();
          this.editor.triggerChange();
          this.close();
        });
        this.picker.appendChild(item);
      });

      button.appendChild(this.picker);
      this.activeButton = button;
    }

    close() {
      if (this.picker) {
        this.picker.remove();
        this.picker = null;
        this.activeButton = null;
      }
    }
  }

  // ============================================
  // SECTION 8: COMMANDS
  // ============================================

  class Commands {
    constructor(editor) {
      this.editor = editor;
    }

    exec(command, value = null) {
      this.editor.focus();
      const inlineCommands = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'foreColor', 'backColor', 'fontName', 'fontSize', 'removeFormat'];
      if (inlineCommands.includes(command)) {
        this._expandToWordIfCollapsed();
      }
      document.execCommand(command, false, value);
      this.editor.history.record();
      this.editor.updateToolbar();
      this.editor.triggerChange();
    }

    _expandToWordIfCollapsed() {
      const sel = window.getSelection();
      if (!sel || !sel.rangeCount || !sel.isCollapsed) return;
      const range = sel.getRangeAt(0);
      const node = range.startContainer;
      if (node.nodeType !== Node.TEXT_NODE) return;
      const text = node.textContent;
      let start = range.startOffset;
      let end = range.startOffset;
      // Expand backward
      while (start > 0 && /\S/.test(text[start - 1])) start--;
      // Expand forward
      while (end < text.length && /\S/.test(text[end])) end++;
      if (start === end) return;
      range.setStart(node, start);
      range.setEnd(node, end);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    bold() { this.exec('bold'); }
    italic() { this.exec('italic'); }
    underline() { this.exec('underline'); }
    strikeThrough() { this.exec('strikeThrough'); }
    subscript() { this.exec('subscript'); }
    superscript() { this.exec('superscript'); }

    justifyLeft() { this.exec('justifyLeft'); }
    justifyCenter() { this.exec('justifyCenter'); }
    justifyRight() { this.exec('justifyRight'); }
    justifyFull() { this.exec('justifyFull'); }

    insertUnorderedList() { this.exec('insertUnorderedList'); }
    insertOrderedList() { this.exec('insertOrderedList'); }

    indent() { this.exec('indent'); }
    outdent() { this.exec('outdent'); }

    removeFormat() { this.exec('removeFormat'); }

    insertHorizontalRule() { this.exec('insertHorizontalRule'); }

    formatBlock(tag) {
      this.exec('formatBlock', `<${tag}>`);
    }

    fontSize(sizeStr) {
      this.editor.focus();
      this._expandToWordIfCollapsed();
      document.execCommand('fontSize', false, '7');
      const marked = this.editor.contentArea.querySelectorAll('font[size="7"]');
      marked.forEach(el => {
        const span = document.createElement('span');
        span.style.fontSize = sizeStr;
        while (el.firstChild) span.appendChild(el.firstChild);
        el.parentNode.replaceChild(span, el);
      });
      this.editor.history.record();
      this.editor.updateToolbar();
      this.editor.triggerChange();
    }

    fontFamily(font) {
      this.exec('fontName', font);
    }

    foreColor(color) {
      this.exec('foreColor', color);
    }

    backColor(color) {
      this.exec('backColor', color);
    }

    resetForeColor() {
      this._resetColorProperty('color');
    }

    resetBackColor() {
      this._resetColorProperty('backgroundColor');
    }

    _resetColorProperty(cssProp) {
      this.editor.focus();
      const sel = window.getSelection();
      if (!sel || !sel.rangeCount) return;
      const range = sel.getRangeAt(0);
      if (range.collapsed) return;

      const fragment = range.extractContents();

      const processNode = (node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.style && node.style[cssProp]) {
            node.style[cssProp] = '';
            if (!node.getAttribute('style') || !node.getAttribute('style').trim()) {
              node.removeAttribute('style');
            }
          }
          if (cssProp === 'color' && node.tagName === 'FONT' && node.hasAttribute('color')) {
            node.removeAttribute('color');
          }
          if (cssProp === 'backgroundColor' && node.tagName === 'FONT' && node.style.backgroundColor) {
            node.style.backgroundColor = '';
          }
          if (node.tagName === 'FONT' && !node.hasAttribute('color') && !node.hasAttribute('face') &&
            !node.hasAttribute('size') && (!node.getAttribute('style') || !node.getAttribute('style').trim())) {
            const parent = node.parentNode;
            if (parent) {
              while (node.firstChild) parent.insertBefore(node.firstChild, node);
              parent.removeChild(node);
            }
            return;
          }
          if (node.tagName === 'SPAN' && (!node.getAttribute('style') || !node.getAttribute('style').trim()) && !node.className) {
            const parent = node.parentNode;
            if (parent) {
              while (node.firstChild) parent.insertBefore(node.firstChild, node);
              parent.removeChild(node);
            }
            return;
          }
          Array.from(node.childNodes).forEach(processNode);
        }
      };

      Array.from(fragment.childNodes).forEach(processNode);
      range.insertNode(fragment);
      sel.removeAllRanges();
      sel.addRange(range);

      this.editor.history.record();
      this.editor.updateToolbar();
      this.editor.triggerChange();
    }

    viewCode() {
      this.editor.toggleCodeView();
    }

    autosave() {
      this.editor.toggleAutosave();
    }

    print() {
      this.editor.printContent();
    }

    insertHTML(html) {
      this.editor.focus();
      document.execCommand('insertHTML', false, html);
      this.editor.history.record();
      this.editor.triggerChange();
    }

    insertLink(url, text, newTab = false) {
      const selection = Utils.getSelection();
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

      if (range && !range.collapsed) {
        this.exec('createLink', url);
        if (newTab) {
          const links = this.editor.contentArea.querySelectorAll('a[href="' + url + '"]');
          links.forEach(link => link.setAttribute('target', '_blank'));
        }
      } else {
        const link = document.createElement('a');
        link.href = url;
        link.textContent = text || url;
        if (newTab) link.target = '_blank';

        this.editor.focus();
        document.execCommand('insertHTML', false, link.outerHTML);
        this.editor.history.record();
        this.editor.triggerChange();
      }
    }

    insertImage(url, alt = '', width = '') {
      let html = `<img src="${url}"`;
      if (alt) html += ` alt="${alt}"`;
      if (width) html += ` width="${width}"`;
      html += '>';

      this.editor.focus();
      document.execCommand('insertHTML', false, html);
      this.editor.history.record();
      this.editor.triggerChange();
    }

    insertTable(rows, cols, hasHeader = true) {
      let html = '<table class="neiki-table">';

      for (let i = 0; i < rows; i++) {
        html += '<tr>';
        for (let j = 0; j < cols; j++) {
          if (i === 0 && hasHeader) {
            html += '<th>Header</th>';
          } else {
            html += '<td>Cell</td>';
          }
        }
        html += '</tr>';
      }

      html += '</table><p><br></p>';

      this.editor.focus();
      document.execCommand('insertHTML', false, html);
      this.editor.history.record();
      this.editor.triggerChange();
    }

    undo() {
      if (this.editor.history.undo()) {
        this.editor.updateToolbar();
        this.editor.triggerChange();
      }
    }

    redo() {
      if (this.editor.history.redo()) {
        this.editor.updateToolbar();
        this.editor.triggerChange();
      }
    }
  }

  // ============================================
  // SECTION 9: MAIN EDITOR CLASS
  // ============================================

  class NeikiEditor {
    constructor(element, options = {}) {
      this.originalElement = typeof element === 'string'
        ? document.querySelector(element)
        : element;

      if (!this.originalElement) {
        throw new Error('NeikiEditor: Element not found');
      }

      // Use stable ID based on element's id or a hash of selector, not random
      this.id = this.originalElement.id ||
        this.originalElement.getAttribute('data-neiki-id') ||
        'neiki_' + (typeof element === 'string' ? element.replace(/[^a-zA-Z0-9]/g, '_') : 'editor');

      this.config = Utils.deepMerge(DEFAULT_CONFIG, options);
      this.isFullscreen = false;
      this.isAutosaveEnabled = false;
      this.autosaveInterval = null;

      this.init();
    }

    init() {
      // Initialize storage first
      this.storage = new StorageManager(this.id);

      // Load theme preference
      const savedTheme = StorageManager.getGlobal('theme', this.config.theme);
      this.config.theme = savedTheme;

      this.createStructure();
      this.createToolbar();
      this.createContentArea();
      this.createStatusBar();

      this.history = new HistoryManager(this);
      this.modal = new ModalManager(this);
      this.dropdown = new DropdownManager(this);
      this.colorPicker = new ColorPicker(this);
      this.emojiPicker = new EmojiPicker(this);
      this.specialCharsPicker = new SpecialCharsPicker(this);
      this.commands = new Commands(this);
      this.tableContextMenu = new TableContextMenu(this);
      this.floatingToolbar = new FloatingToolbar(this);

      this.bindEvents();
      this.initDragDrop();
      this.initPlugins();

      // Sync restored content to original element
      this.syncToOriginal();

      // Record initial state (content already restored in createContentArea)
      this.history.record();

      // Restore autosave state
      const savedAutosave = this.storage.get('autosave_enabled', false);
      if (savedAutosave) {
        this.enableAutosave();
      }

      this.updateStatusBar();
      this.updateToolbar();

      if (this.config.autofocus) {
        this.focus();
      }

      if (this.config.onReady) {
        this.config.onReady(this);
      }
    }

    createStructure() {
      this.container = Utils.createElement('div', {
        className: `neiki-editor ${this.config.theme === 'dark' ? 'neiki-dark' : ''}`,
        id: this.id
      });

      this.originalElement.style.display = 'none';
      this.originalElement.parentNode.insertBefore(this.container, this.originalElement);
    }

    createToolbar() {
      this.toolbar = Utils.createElement('div', { className: 'neiki-toolbar' });
      this.toolbarButtons = {};
      this.toolbarSelects = {};

      let currentGroup = Utils.createElement('div', { className: 'neiki-toolbar-group' });

      const appendToGroup = (el) => { currentGroup.appendChild(el); };
      const flushGroup = () => {
        if (currentGroup.childNodes.length > 0) {
          this.toolbar.appendChild(currentGroup);
        }
        currentGroup = Utils.createElement('div', { className: 'neiki-toolbar-group' });
      };

      this.config.toolbar.forEach(item => {
        if (item === '|') {
          flushGroup();
          return;
        }

        const config = TOOLBAR_ITEMS[item];
        if (!config) return;

        // Handle <select> type (heading, fontFamily)
        if (config.type === 'select') {
          const select = Utils.createElement('select', {
            className: 'neiki-select',
            title: config.title,
            'data-command': item
          });

          if (item === 'heading') {
            HEADINGS.forEach(({ label, value }) => {
              const opt = document.createElement('option');
              opt.value = value;
              opt.textContent = label;
              select.appendChild(opt);
            });
          } else if (item === 'fontFamily') {
            FONT_FAMILIES.forEach(({ label, value }) => {
              const opt = document.createElement('option');
              opt.value = value;
              opt.textContent = label;
              opt.style.fontFamily = value;
              select.appendChild(opt);
            });
          }

          select.addEventListener('change', (e) => {
            e.preventDefault();
            if (item === 'heading') {
              this.commands.formatBlock(select.value);
            } else if (item === 'fontFamily') {
              this.commands.fontFamily(select.value);
            }
            this.focus();
          });

          this.toolbarSelects[item] = select;
          appendToGroup(select);
          return;
        }

        // Handle fontSizeWidget type
        if (config.type === 'fontSizeWidget') {
          const wrapper = Utils.createElement('div', { className: 'neiki-fontsize-widget' });

          const minusBtn = Utils.createElement('button', {
            className: 'neiki-fontsize-btn',
            type: 'button',
            title: 'Decrease font size',
            innerHTML: '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M19 13H5v-2h14v2z" fill="currentColor"/></svg>'
          });

          const input = Utils.createElement('input', {
            className: 'neiki-fontsize-input',
            type: 'text',
            title: 'Font size',
            value: '16'
          });

          const plusBtn = Utils.createElement('button', {
            className: 'neiki-fontsize-btn',
            type: 'button',
            title: 'Increase font size',
            innerHTML: '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/></svg>'
          });

          // Save/restore selection for font size operations
          let _savedRange = null;
          const _saveSelection = () => {
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0) {
              _savedRange = sel.getRangeAt(0).cloneRange();
            }
          };
          const _restoreSelection = () => {
            if (_savedRange) {
              const sel = window.getSelection();
              sel.removeAllRanges();
              sel.addRange(_savedRange);
            }
          };

          // Dropdown for preset sizes
          const dropdown = Utils.createElement('div', { className: 'neiki-fontsize-dropdown' });
          FONT_SIZES.forEach(size => {
            const item = Utils.createElement('div', {
              className: 'neiki-fontsize-dropdown-item',
              textContent: size,
              'data-size': String(size)
            });
            item.addEventListener('mousedown', (e) => {
              e.preventDefault();
              e.stopPropagation();
            });
            item.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              input.value = size;
              _restoreSelection();
              this.commands.fontSize(size + 'px');
              dropdown.classList.remove('show');
            });
            dropdown.appendChild(item);
          });

          const applyFontSize = () => {
            const val = parseInt(input.value);
            if (val && val > 0) {
              _restoreSelection();
              this.commands.fontSize(val + 'px');
            }
          };

          minusBtn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            _saveSelection();
          });
          minusBtn.addEventListener('click', (e) => {
            e.preventDefault();
            _restoreSelection();
            const current = parseInt(input.value) || 16;
            const newSize = Math.max(1, current - 1);
            input.value = newSize;
            this.commands.fontSize(newSize + 'px');
          });

          plusBtn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            _saveSelection();
          });
          plusBtn.addEventListener('click', (e) => {
            e.preventDefault();
            _restoreSelection();
            const current = parseInt(input.value) || 16;
            const newSize = Math.min(999, current + 1);
            input.value = newSize;
            this.commands.fontSize(newSize + 'px');
          });

          input.addEventListener('mousedown', (e) => {
            _saveSelection();
          });

          input.addEventListener('focus', () => {
            dropdown.classList.add('show');
          });

          input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              applyFontSize();
              dropdown.classList.remove('show');
              this.focus();
            }
            if (e.key === 'Escape') {
              dropdown.classList.remove('show');
              this.focus();
            }
          });

          document.addEventListener('mousedown', (e) => {
            if (!wrapper.contains(e.target)) {
              dropdown.classList.remove('show');
            }
          });

          wrapper.appendChild(minusBtn);
          wrapper.appendChild(input);
          wrapper.appendChild(plusBtn);
          wrapper.appendChild(dropdown);

          this.fontSizeInput = input;
          appendToGroup(wrapper);
          return;
        }

        // Handle Insert dropdown
        if (config.type === 'insertDropdown') {
          const btn = Utils.createElement('button', {
            className: 'neiki-toolbar-btn neiki-insert-dropdown-btn',
            title: config.title,
            type: 'button'
          });
          btn.innerHTML = Icons[config.icon] + '<span class="neiki-insert-label">Insert</span><span class="neiki-chevron">' + Icons['chevron-down'] + '</span>';

          const dropdown = Utils.createElement('div', { className: 'neiki-insert-dropdown' });

          const insertItems = [
            { key: 'link', icon: Icons.link, label: 'Link', action: () => this.modal.open('link', { text: Utils.getSelection().toString() }) },
            { key: 'image', icon: Icons.image, label: 'Image', action: () => this.modal.open('image', {}) },
            { key: 'table', icon: Icons.table, label: 'Table', action: () => this.modal.open('table', {}) },
            { key: 'emoji', icon: Icons.emoji, label: 'Emoji', action: () => this.emojiPicker.toggle(btn) },
            { key: 'specialChars', icon: Icons.specialChars, label: 'Symbol', action: () => this.specialCharsPicker.toggle(btn) }
          ];

          insertItems.forEach(({ icon, label, action }) => {
            const item = Utils.createElement('div', {
              className: 'neiki-dropdown-item'
            });
            item.innerHTML = '<span class="neiki-dropdown-item-icon">' + icon + '</span>' + label;
            item.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              dropdown.classList.remove('show');
              action();
            });
            dropdown.appendChild(item);
          });

          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Close moreMenu if open
            const moreDD = this.toolbar.querySelector('.neiki-more-dropdown.show');
            if (moreDD) moreDD.classList.remove('show');
            // Close emoji/specialChars pickers if open
            this.emojiPicker.close();
            this.specialCharsPicker.close();
            dropdown.classList.toggle('show');
          });

          document.addEventListener('mousedown', (e) => {
            if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
              dropdown.classList.remove('show');
            }
          });

          btn.appendChild(dropdown);
          this.toolbarButtons[item] = btn;
          appendToGroup(btn);
          return;
        }

        // Handle More menu (⋯)
        if (config.type === 'moreMenu') {
          const btn = Utils.createElement('button', {
            className: 'neiki-toolbar-btn neiki-more-btn',
            title: config.title,
            type: 'button',
            innerHTML: Icons[config.icon],
            'data-command': item
          });

          const dropdown = Utils.createElement('div', { className: 'neiki-more-dropdown' });

          const moreItems = [
            { key: 'save', icon: Icons.save, label: 'Save', action: () => this.triggerSave() },
            { key: 'preview', icon: Icons.eye, label: 'Preview', action: () => this.previewContent() },
            { key: 'download', icon: Icons.download, label: 'Download', action: () => this.downloadContent() },
            { key: 'print', icon: Icons.print, label: 'Print', action: () => this.printContent() },
            { key: 'divider' },
            { key: 'autosave', icon: Icons.save, label: 'Autosave', action: () => this.toggleAutosave(), toggle: true },
            { key: 'divider' },
            { key: 'clearAll', icon: Icons.trash, label: 'Clear all', action: () => this.clearAll(), danger: true },
            { key: 'themeToggle', icon: Icons.sun, label: 'Toggle Theme', action: () => { this.toggleTheme(); this._updateThemeMenuItem(); } },
            { key: 'fullscreen', icon: Icons.fullscreen, label: 'Fullscreen', action: () => this.toggleFullscreen() }
          ];

          moreItems.forEach(({ key, icon, label, action, danger, toggle }) => {
            if (key === 'divider') {
              dropdown.appendChild(Utils.createElement('div', { className: 'neiki-dropdown-divider' }));
              return;
            }
            const menuItem = Utils.createElement('div', {
              className: 'neiki-dropdown-item' + (danger ? ' neiki-dropdown-item-danger' : '')
            });
            menuItem.innerHTML = '<span class="neiki-dropdown-item-icon">' + icon + '</span><span class="neiki-dropdown-item-label">' + label + '</span>';

            if (key === 'autosave') {
              const badge = Utils.createElement('span', { className: 'neiki-autosave-badge' });
              badge.textContent = '✕';
              menuItem.appendChild(badge);
              this._autosaveMenuItem = menuItem;
              this._autosaveBadge = badge;
            }

            if (key === 'themeToggle') {
              this._themeMenuItem = menuItem;
              this._themeMenuIcon = menuItem.querySelector('.neiki-dropdown-item-icon');
            }

            menuItem.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (key !== 'autosave') dropdown.classList.remove('show');
              action();
            });
            dropdown.appendChild(menuItem);
          });

          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Close insertDropdown if open
            const insDD = this.toolbar.querySelector('.neiki-insert-dropdown.show');
            if (insDD) insDD.classList.remove('show');
            dropdown.classList.toggle('show');
          });

          document.addEventListener('mousedown', (e) => {
            if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
              dropdown.classList.remove('show');
            }
          });

          btn.appendChild(dropdown);
          this.toolbarButtons[item] = btn;
          appendToGroup(btn);
          currentGroup.style.marginLeft = 'auto';
          return;
        }

        // Default: regular button
        const button = Utils.createElement('button', {
          className: 'neiki-toolbar-btn',
          title: config.title,
          type: 'button',
          innerHTML: Icons[config.icon] || '',
          'data-command': item
        });

        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.handleToolbarClick(item, button);
        });

        this.toolbarButtons[item] = button;
        appendToGroup(button);
      });

      // Flush the last group
      flushGroup();

      this.container.appendChild(this.toolbar);
    }

    createContentArea() {
      this.contentWrapper = Utils.createElement('div', { className: 'neiki-content-wrapper' });

      this.contentArea = Utils.createElement('div', {
        className: 'neiki-content',
        contentEditable: !this.config.readonly,
        spellcheck: this.config.spellcheck,
        'data-placeholder': this.config.placeholder
      });

      if (this.config.minHeight) {
        this.contentArea.style.minHeight = this.config.minHeight + 'px';
      }
      if (this.config.maxHeight) {
        this.contentArea.style.maxHeight = this.config.maxHeight + 'px';
        this.contentArea.style.overflowY = 'auto';
      }

      // Check if autosave is enabled AND has saved content
      const autosaveEnabled = this.storage.get('autosave_enabled', false);
      const autosavedContent = this.storage.get('autosave_content', null);

      if (autosaveEnabled && autosavedContent) {
        // Restore autosaved content only if autosave was enabled
        this.contentArea.innerHTML = autosavedContent;
      } else {
        // Always use original element content (textarea value or innerHTML)
        // This ensures the page's actual content is shown, not old localStorage data
        if (this.originalElement.value) {
          this.contentArea.innerHTML = this.originalElement.value;
        } else if (this.originalElement.innerHTML.trim()) {
          this.contentArea.innerHTML = this.originalElement.innerHTML;
        }
      }

      this._ensureDefaultBlock();

      this.contentWrapper.appendChild(this.contentArea);

      // Code view overlay
      this.isCodeViewOpen = false;
      this.codeView = Utils.createElement('div', { className: 'neiki-code-view' });
      const codeViewHeader = Utils.createElement('div', { className: 'neiki-code-view-header' });
      const codeViewTitle = Utils.createElement('span', {
        className: 'neiki-code-view-title',
        textContent: 'HTML Source'
      });
      const codeViewApply = Utils.createElement('button', {
        className: 'neiki-btn neiki-code-view-apply',
        type: 'button',
        title: 'Apply changes and close'
      });
      codeViewApply.innerHTML = Icons.close + '<span style="margin-left:5px;font-size:12px;font-weight:500;">Apply & Close</span>';
      codeViewApply.addEventListener('click', () => this.toggleCodeView());
      codeViewHeader.appendChild(codeViewTitle);
      codeViewHeader.appendChild(codeViewApply);
      this.codeViewTextarea = Utils.createElement('textarea', {
        className: 'neiki-code-view-textarea',
        spellcheck: 'false'
      });
      this.codeView.appendChild(codeViewHeader);
      this.codeView.appendChild(this.codeViewTextarea);
      this.contentWrapper.appendChild(this.codeView);

      this.container.appendChild(this.contentWrapper);
    }

    bindEvents() {
      // Content changes
      this.contentArea.addEventListener('input', Utils.debounce(() => {
        this._ensureDefaultBlock();
        this.history.record();
        this.syncToOriginal();
        this.triggerChange();
        this.updateStatusBar();
      }, 300));

      // Selection changes
      document.addEventListener('selectionchange', () => {
        if (this.contentArea.contains(document.activeElement) ||
          document.activeElement === this.contentArea) {
          this.updateToolbar();
          this.updateStatusBar();
        }
      });

      // Focus/Blur
      this.contentArea.addEventListener('focus', () => {
        if (this.config.onFocus) this.config.onFocus(this);
      });

      this.contentArea.addEventListener('blur', () => {
        if (this.config.onBlur) this.config.onBlur(this);
      });

      // Keyboard shortcuts
      this.contentArea.addEventListener('keydown', (e) => this.handleKeydown(e));

      // Paste handling
      this.contentArea.addEventListener('paste', (e) => this.handlePaste(e));
    }

    handleToolbarClick(item, button) {
      const config = TOOLBAR_ITEMS[item];
      if (!config) return;

      // Skip custom types (handled in createToolbar)
      if (config.type) return;

      // Handle color pickers
      if (config.picker === 'color') {
        this.colorPicker.toggle(button, config.command);
        return;
      }

      // Handle emoji picker
      if (config.picker === 'emoji') {
        this.emojiPicker.toggle(button);
        return;
      }

      // Handle special chars picker
      if (config.picker === 'specialChars') {
        this.specialCharsPicker.toggle(button);
        return;
      }

      // Handle modals
      if (config.modal) {
        const savedRange = Utils.saveSelection();
        let data = {};

        if (item === 'link') {
          const sel = Utils.getSelection();
          data.text = sel.toString();
        }

        this.modal.open(item, data);
        Utils.restoreSelection(savedRange);
        return;
      }

      // Handle fullscreen
      if (item === 'fullscreen') {
        this.toggleFullscreen();
        return;
      }

      // Handle theme toggle
      if (item === 'themeToggle') {
        this.toggleTheme();
        return;
      }

      // Handle regular commands
      if (config.value) {
        this.commands[config.command](config.value);
      } else if (this.commands[config.command]) {
        this.commands[config.command]();
      } else {
        this.commands.exec(config.command);
      }
    }

    handleKeydown(e) {
      // Ctrl/Cmd shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            this.commands.bold();
            break;
          case 'i':
            e.preventDefault();
            this.commands.italic();
            break;
          case 'u':
            e.preventDefault();
            this.commands.underline();
            break;
          case 'k':
            e.preventDefault();
            this.modal.open('link', { text: Utils.getSelection().toString() });
            break;
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              this.commands.redo();
            } else {
              this.commands.undo();
            }
            break;
          case 'y':
            e.preventDefault();
            this.commands.redo();
            break;
          case 's':
            e.preventDefault();
            this.triggerSave();
            break;
        }
      }

      // Tab handling
      if (e.key === 'Tab') {
        e.preventDefault();
        if (e.shiftKey) {
          this.commands.outdent();
        } else {
          this.commands.indent();
        }
      }
    }

    handlePaste(e) {
      // Get plain text and sanitize
      e.preventDefault();

      let text = '';
      if (e.clipboardData) {
        // Try to get HTML first
        let html = e.clipboardData.getData('text/html');
        if (html) {
          text = Utils.sanitizeHTML(html);
        } else {
          text = e.clipboardData.getData('text/plain');
          // Convert line breaks to <br>
          text = text.replace(/\n/g, '<br>');
        }
      }

      document.execCommand('insertHTML', false, text);
      this.history.record();
      this.triggerChange();
    }

    updateToolbar() {
      Object.entries(this.toolbarButtons).forEach(([item, button]) => {
        const config = TOOLBAR_ITEMS[item];
        if (!config || config.type) return;

        let isActive = false;

        try {
          switch (config.command) {
            case 'bold':
            case 'italic':
            case 'underline':
            case 'strikeThrough':
            case 'subscript':
            case 'superscript':
            case 'insertUnorderedList':
            case 'insertOrderedList':
              isActive = document.queryCommandState(config.command);
              break;
            case 'justifyLeft':
            case 'justifyCenter':
            case 'justifyRight':
            case 'justifyFull':
              isActive = document.queryCommandState(config.command);
              break;
          }
        } catch (e) {
          // queryCommandState can throw in some browsers
        }

        button.classList.toggle('active', isActive);
      });

      // Update undo/redo states
      if (this.toolbarButtons.undo) {
        this.toolbarButtons.undo.disabled = !this.history.canUndo();
      }
      if (this.toolbarButtons.redo) {
        this.toolbarButtons.redo.disabled = !this.history.canRedo();
      }
      // Update viewCode active state
      if (this.toolbarButtons.viewCode) {
        this.toolbarButtons.viewCode.classList.toggle('active', this.isCodeViewOpen);
      }

      // Sync heading select
      if (this.toolbarSelects.heading) {
        const block = this.getCurrentBlockType();
        const validValues = HEADINGS.map(h => h.value);
        this.toolbarSelects.heading.value = validValues.includes(block) ? block : 'p';
      }

      // Sync fontFamily select
      if (this.toolbarSelects.fontFamily) {
        try {
          const font = document.queryCommandValue('fontName');
          if (font) {
            const match = FONT_FAMILIES.find(f => f.value.toLowerCase().includes(font.toLowerCase().replace(/"/g, '')));
            if (match) this.toolbarSelects.fontFamily.value = match.value;
          }
        } catch (e) {}
      }

      // Sync font size input
      if (this.fontSizeInput) {
        try {
          const sel = window.getSelection();
          if (sel && sel.rangeCount) {
            let node = sel.getRangeAt(0).startContainer;
            if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
            const computed = window.getComputedStyle(node);
            const size = Math.round(parseFloat(computed.fontSize));
            if (size) this.fontSizeInput.value = size;
          }
        } catch (e) {}
      }

      // Update autosave badge in more menu
      if (this._autosaveBadge) {
        this._autosaveBadge.textContent = this.isAutosaveEnabled ? '✓' : '✕';
        this._autosaveBadge.classList.toggle('active', this.isAutosaveEnabled);
      }
    }

    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      this.container.classList.toggle('neiki-fullscreen', this.isFullscreen);
      document.body.classList.toggle('neiki-fullscreen-active', this.isFullscreen);

      if (this.toolbarButtons.fullscreen) {
        this.toolbarButtons.fullscreen.classList.toggle('active', this.isFullscreen);
      }
    }

    toggleTheme() {
      const isDark = this.container.classList.contains('neiki-dark');
      const newTheme = isDark ? 'light' : 'dark';

      this.container.classList.toggle('neiki-dark', !isDark);
      this.config.theme = newTheme;

      // Persist theme choice
      StorageManager.setGlobal('theme', newTheme);

      // Update button icon and active state
      if (this.toolbarButtons.themeToggle) {
        this.toolbarButtons.themeToggle.innerHTML = isDark ? Icons.sun : Icons.moon;
        this.toolbarButtons.themeToggle.classList.toggle('active', !isDark);
        this.toolbarButtons.themeToggle.title = isDark ? 'Switch to Dark Mode' : 'Switch to Light Mode';
      }
      this._updateThemeMenuItem();
    }

    _updateThemeMenuItem() {
      if (this._themeMenuIcon) {
        const isDark = this.container.classList.contains('neiki-dark');
        this._themeMenuIcon.innerHTML = isDark ? Icons.moon : Icons.sun;
      }
    }

    triggerSave() {
      if (this.config.onSave) {
        this.config.onSave(this.getContent(), this);
      }
    }

    previewContent() {
      const content = this.getContent();

      // Create overlay
      const overlay = Utils.createElement('div', { className: 'neiki-preview-overlay' });

      const modal = Utils.createElement('div', { className: 'neiki-preview-modal' });

      const header = Utils.createElement('div', { className: 'neiki-preview-header' });
      header.innerHTML = '<span>Document Preview</span>';
      const closeBtn = Utils.createElement('button', {
        className: 'neiki-preview-close',
        type: 'button',
        innerHTML: Icons.close
      });
      closeBtn.addEventListener('click', () => overlay.remove());
      header.appendChild(closeBtn);

      const body = Utils.createElement('div', { className: 'neiki-preview-body' });
      body.innerHTML = content;

      modal.appendChild(header);
      modal.appendChild(body);
      overlay.appendChild(modal);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
      });

      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          overlay.remove();
          document.removeEventListener('keydown', escHandler);
        }
      });

      document.body.appendChild(overlay);
    }

    downloadContent() {
      const content = this.getContent();
      const fullHTML = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Document</title>\n<style>\nbody{font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.7;color:#1e293b;}\nimg{max-width:100%;}\ntable{border-collapse:collapse;width:100%;}\ntable td,table th{border:1px solid #d1d5db;padding:8px 12px;}\n</style>\n</head>\n<body>\n' + content + '\n</body>\n</html>';

      const blob = new Blob([fullHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.html';
      a.click();
      URL.revokeObjectURL(url);
    }

    clearAll() {
      if (this.getContent().trim() && !confirm('Clear all content?')) return;
      this.setContent('');
      this.history.record();
      this.triggerChange();
      this.updateStatusBar();
    }

    _ensureDefaultBlock() {
      // Ensure the content area always has at least one <p> block
      if (!this.contentArea) return;
      const html = this.contentArea.innerHTML.trim();
      if (!html || html === '<br>') {
        this.contentArea.innerHTML = '<p><br></p>';
        // Place cursor inside the paragraph if focused
        try {
          if (document.activeElement === this.contentArea) {
            const p = this.contentArea.querySelector('p');
            if (p) {
              const sel = window.getSelection();
              const range = document.createRange();
              range.setStart(p, 0);
              range.collapse(true);
              sel.removeAllRanges();
              sel.addRange(range);
            }
          }
        } catch (e) {}
        return;
      }
      // Wrap bare text nodes in <p>
      const childNodes = Array.from(this.contentArea.childNodes);
      childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          const p = document.createElement('p');
          node.parentNode.insertBefore(p, node);
          p.appendChild(node);
        }
      });
    }

    syncToOriginal() {
      if (this.originalElement.tagName === 'TEXTAREA' ||
        this.originalElement.tagName === 'INPUT') {
        this.originalElement.value = this.getContent();
      } else {
        this.originalElement.innerHTML = this.getContent();
      }
    }

    triggerChange() {
      if (this.config.onChange) {
        this.config.onChange(this.getContent(), this);
      }

      // Dispatch custom event
      this.container.dispatchEvent(new CustomEvent('neiki:change', {
        detail: { content: this.getContent(), editor: this }
      }));
    }

    // ============================================
    // PUBLIC API
    // ============================================

    getContent() {
      return this.contentArea.innerHTML;
    }

    setContent(html) {
      this.contentArea.innerHTML = Utils.sanitizeHTML(html);
      this._ensureDefaultBlock();
      this.syncToOriginal();
    }

    getText() {
      return this.contentArea.textContent || this.contentArea.innerText;
    }

    isEmpty() {
      const text = this.getText().trim();
      return text === '' || text === '\n';
    }

    focus() {
      this.contentArea.focus();
    }

    blur() {
      this.contentArea.blur();
    }

    enable() {
      this.contentArea.contentEditable = 'true';
      this.container.classList.remove('neiki-disabled');
    }

    disable() {
      this.contentArea.contentEditable = 'false';
      this.container.classList.add('neiki-disabled');
    }

    destroy() {
      this.modal.close();
      this.dropdown.close();
      this.colorPicker.close();

      this.container.remove();
      this.originalElement.style.display = '';

      if (this.modal.overlay) {
        this.modal.overlay.remove();
      }
    }

    setTheme(theme) {
      this.config.theme = theme;
      this.container.classList.toggle('neiki-dark', theme === 'dark');
      StorageManager.setGlobal('theme', theme);
    }

    createStatusBar() {
      this.statusBar = Utils.createElement('div', { className: 'neiki-statusbar' });
      const left = Utils.createElement('div', { className: 'neiki-statusbar-left' });
      const right = Utils.createElement('div', { className: 'neiki-statusbar-right' });

      this.statusWordCount = Utils.createElement('span', {
        className: 'neiki-statusbar-item',
        textContent: '0 words'
      });
      this.statusCharCount = Utils.createElement('span', {
        className: 'neiki-statusbar-item',
        textContent: '0 chars'
      });
      this.statusAutosave = Utils.createElement('span', {
        className: 'neiki-statusbar-item neiki-statusbar-autosave'
      });
      this.statusAutosave.style.display = 'none';
      this.statusBlockType = Utils.createElement('span', {
        className: 'neiki-statusbar-item neiki-statusbar-block',
        textContent: 'p'
      });

      left.appendChild(this.statusWordCount);
      left.appendChild(this.statusCharCount);
      right.appendChild(this.statusAutosave);
      right.appendChild(this.statusBlockType);
      this.statusBar.appendChild(left);
      this.statusBar.appendChild(right);
      this.container.appendChild(this.statusBar);
    }

    updateStatusBar() {
      if (!this.statusBar) return;
      const text = this.getText().trim();
      const words = text ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
      const chars = this.getText().length;
      this.statusWordCount.textContent = words + (words === 1 ? ' word' : ' words');
      this.statusCharCount.textContent = chars + (chars === 1 ? ' char' : ' chars');
      this.statusBlockType.textContent = this.getCurrentBlockType();
    }

    getCurrentBlockType() {
      const sel = window.getSelection();
      if (!sel || !sel.rangeCount) return 'p';
      let node = sel.getRangeAt(0).startContainer;
      if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
      const blockTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE', 'PRE', 'LI', 'DIV'];
      while (node && node !== this.contentArea) {
        if (blockTags.includes(node.tagName)) return node.tagName.toLowerCase();
        node = node.parentNode;
      }
      return 'p';
    }

    toggleCodeView() {
      if (!this.isCodeViewOpen) {
        this.codeViewTextarea.value = this.contentArea.innerHTML;
        this.codeView.classList.add('show');
        this.isCodeViewOpen = true;
        this.codeViewTextarea.focus();
        this._codeViewEsc = (e) => { if (e.key === 'Escape') this.toggleCodeView(); };
        document.addEventListener('keydown', this._codeViewEsc);
      } else {
        this.contentArea.innerHTML = Utils.sanitizeHTML(this.codeViewTextarea.value);
        this.codeView.classList.remove('show');
        this.isCodeViewOpen = false;
        this.history.record();
        this.syncToOriginal();
        this.triggerChange();
        this.updateStatusBar();
        if (this._codeViewEsc) {
          document.removeEventListener('keydown', this._codeViewEsc);
          this._codeViewEsc = null;
        }
      }
      this.updateToolbar();
    }

    // ============================================
    // AUTOSAVE METHODS
    // ============================================

    toggleAutosave() {
      if (this.isAutosaveEnabled) {
        this.disableAutosave();
      } else {
        this.enableAutosave();
      }
      this.updateToolbar();
    }

    enableAutosave() {
      this.isAutosaveEnabled = true;
      this.storage.set('autosave_enabled', true);

      // Show autosave status
      if (this.statusAutosave) {
        this.statusAutosave.style.display = '';
        this.statusAutosave.textContent = 'Saved locally';
      }

      // Listen for content changes to trigger autosave
      if (!this._autosaveContentHandler) {
        this._autosaveContentHandler = Utils.debounce(() => {
          if (!this.isAutosaveEnabled) return;
          // Show "Autosaving..."
          if (this.statusAutosave) {
            this.statusAutosave.textContent = 'Autosaving...';
            this.statusAutosave.style.display = '';
          }
          this.storage.set('autosave_content', this.getContent());
          // Show "Saved locally" after brief delay
          setTimeout(() => {
            if (this.statusAutosave && this.isAutosaveEnabled) {
              this.statusAutosave.textContent = 'Saved locally';
            }
          }, 500);
        }, 1000);
        this.contentArea.addEventListener('input', this._autosaveContentHandler);
      }

      // Save immediately
      this.storage.set('autosave_content', this.getContent());
      this.updateToolbar();
    }

    disableAutosave() {
      this.isAutosaveEnabled = false;
      this.storage.set('autosave_enabled', false);
      if (this.autosaveInterval) {
        clearInterval(this.autosaveInterval);
        this.autosaveInterval = null;
      }
      if (this.statusAutosave) {
        this.statusAutosave.style.display = 'none';
      }
      this.updateToolbar();
    }

    // ============================================
    // PRINT METHOD
    // ============================================

    printContent() {
      const printWindow = window.open('', '_blank');
      const content = this.getContent();
      printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Print</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
                        table { border-collapse: collapse; width: 100%; margin: 1em 0; }
                        td, th { border: 1px solid #ccc; padding: 8px; }
                        img { max-width: 100%; }
                        blockquote { border-left: 4px solid #ccc; margin: 1em 0; padding-left: 1em; font-style: italic; }
                        pre { background: #f5f5f5; padding: 1em; overflow-x: auto; }
                    </style>
                </head>
                <body>${content}</body>
                </html>
            `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }

    // ============================================
    // JSON API
    // ============================================

    getJSON() {
      const parseNode = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          return { type: 'text', content: node.textContent };
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return null;

        const result = {
          type: node.tagName.toLowerCase(),
          children: []
        };

        // Capture attributes
        if (node.attributes.length > 0) {
          result.attrs = {};
          for (let attr of node.attributes) {
            result.attrs[attr.name] = attr.value;
          }
        }

        // Capture inline styles as separate object
        if (node.style && node.style.cssText) {
          result.style = node.style.cssText;
        }

        // Process children
        for (let child of node.childNodes) {
          const parsed = parseNode(child);
          if (parsed) result.children.push(parsed);
        }

        return result;
      };

      const children = [];
      for (let child of this.contentArea.childNodes) {
        const parsed = parseNode(child);
        if (parsed) children.push(parsed);
      }

      return {
        version: '1.0',
        content: children
      };
    }

    setJSON(json) {
      if (!json || !json.content) return;

      const buildNode = (data) => {
        if (data.type === 'text') {
          return document.createTextNode(data.content || '');
        }

        const el = document.createElement(data.type);

        // Set attributes
        if (data.attrs) {
          for (let [key, value] of Object.entries(data.attrs)) {
            el.setAttribute(key, value);
          }
        }

        // Set inline style
        if (data.style) {
          el.style.cssText = data.style;
        }

        // Build children
        if (data.children) {
          for (let child of data.children) {
            const childNode = buildNode(child);
            if (childNode) el.appendChild(childNode);
          }
        }

        return el;
      };

      this.contentArea.innerHTML = '';
      for (let child of json.content) {
        const node = buildNode(child);
        if (node) this.contentArea.appendChild(node);
      }

      this.history.record();
      this.syncToOriginal();
      this.triggerChange();
      this.updateStatusBar();
    }

    getHTML() {
      return this.getContent();
    }

    setHTML(html) {
      this.setContent(html);
    }

    // ============================================
    // PLUGIN SUPPORT
    // ============================================

    initPlugins() {
      const plugins = NeikiEditor.getPlugins();
      plugins.forEach(plugin => {
        try {
          // Add plugin button to toolbar if it has icon
          if (plugin.icon && plugin.action) {
            const button = Utils.createElement('button', {
              className: 'neiki-toolbar-btn neiki-plugin-btn',
              title: plugin.tooltip || plugin.name,
              type: 'button',
              innerHTML: plugin.icon,
              'data-plugin': plugin.name
            });

            button.addEventListener('click', (e) => {
              e.preventDefault();
              plugin.action(this);
            });

            this.toolbar.appendChild(button);
          }

          // Call plugin init if exists
          if (plugin.init) {
            plugin.init(this);
          }
        } catch (err) {
          console.error(`NeikiEditor: Plugin "${plugin.name}" failed to initialize`, err);
        }
      });
    }

    // Plugin API methods
    insertHTML(html) {
      this.commands.insertHTML(html);
    }

    getSelection() {
      return Utils.getSelection();
    }

    wrapSelection(tagName, attributes = {}) {
      const sel = window.getSelection();
      if (!sel.rangeCount || sel.getRangeAt(0).collapsed) return;

      const range = sel.getRangeAt(0);
      const wrapper = document.createElement(tagName);

      Object.entries(attributes).forEach(([key, value]) => {
        wrapper.setAttribute(key, value);
      });

      try {
        range.surroundContents(wrapper);
        this.history.record();
        this.triggerChange();
      } catch (e) {
        // surroundContents fails if selection crosses element boundaries
        const fragment = range.extractContents();
        wrapper.appendChild(fragment);
        range.insertNode(wrapper);
        this.history.record();
        this.triggerChange();
      }
    }

    unwrapSelection(tagName) {
      const sel = window.getSelection();
      if (!sel.rangeCount) return;

      const range = sel.getRangeAt(0);
      let node = range.commonAncestorContainer;
      if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;

      const wrapper = node.closest(tagName);
      if (wrapper && this.contentArea.contains(wrapper)) {
        const parent = wrapper.parentNode;
        while (wrapper.firstChild) {
          parent.insertBefore(wrapper.firstChild, wrapper);
        }
        parent.removeChild(wrapper);
        this.history.record();
        this.triggerChange();
      }
    }

    execCommand(command, value = null) {
      this.commands.exec(command, value);
    }

    // ============================================
    // DRAG & DROP
    // ============================================

    initDragDrop() {
      let dragCounter = 0;

      this.contentArea.addEventListener('dragenter', (e) => {
        e.preventDefault();
        dragCounter++;
        this.contentArea.classList.add('neiki-drag-over');
      });

      this.contentArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dragCounter--;
        if (dragCounter === 0) {
          this.contentArea.classList.remove('neiki-drag-over');
        }
      });

      this.contentArea.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      this.contentArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dragCounter = 0;
        this.contentArea.classList.remove('neiki-drag-over');

        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length > 0) {
          // Get cursor position from drop event
          const dropX = e.clientX;
          const dropY = e.clientY;

          imageFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (readerEvent) => {
              // Set cursor position at drop location
              const range = document.caretRangeFromPoint(dropX, dropY);
              if (range) {
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
              }

              this.commands.insertImage(readerEvent.target.result, file.name, '');
            };
            reader.readAsDataURL(file);
          });
        }
      });
    }
  }

  // ============================================
  // SECTION 10: FLOATING SELECTION TOOLBAR
  // ============================================

  class FloatingToolbar {
    constructor(editor) {
      this.editor = editor;
      this.toolbar = null;
      this.isVisible = false;
      this.hideTimeout = null;

      this.createToolbar();
      this.bindEvents();
    }

    createToolbar() {
      this.toolbar = Utils.createElement('div', { className: 'neiki-floating-toolbar' });

      const buttons = [
        { item: 'bold', icon: Icons.bold, title: 'Bold' },
        { item: 'italic', icon: Icons.italic, title: 'Italic' },
        { item: 'underline', icon: Icons.underline, title: 'Underline' },
        { item: 'strikeThrough', icon: Icons.strikethrough, title: 'Strikethrough' },
        { item: 'link', icon: Icons.link, title: 'Link' }
      ];

      buttons.forEach(({ item, icon, title }) => {
        const button = Utils.createElement('button', {
          className: 'neiki-toolbar-btn neiki-floating-btn',
          title: title,
          type: 'button',
          innerHTML: icon,
          'data-command': item
        });

        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.handleButtonClick(item);
        });

        this.toolbar.appendChild(button);
      });

      document.body.appendChild(this.toolbar);
    }

    bindEvents() {
      document.addEventListener('selectionchange', () => {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = setTimeout(() => this.updatePosition(), 100);
      });

      document.addEventListener('mouseup', () => {
        setTimeout(() => this.updatePosition(), 10);
      });

      document.addEventListener('scroll', () => {
        if (this.isVisible) this.updatePosition();
      });
    }

    updatePosition() {
      const sel = window.getSelection();

      if (!sel.rangeCount || sel.isCollapsed || !this.editor.contentArea.contains(sel.anchorNode)) {
        this.hide();
        return;
      }

      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      if (rect.width === 0 && rect.height === 0) {
        this.hide();
        return;
      }

      this.show();

      const toolbarRect = this.toolbar.getBoundingClientRect();
      const x = rect.left + (rect.width / 2) - (toolbarRect.width / 2);
      const y = rect.top - toolbarRect.height - 10;

      // Keep toolbar within viewport
      const finalX = Math.max(10, Math.min(x, window.innerWidth - toolbarRect.width - 10));
      const finalY = Math.max(10, y);

      this.toolbar.style.left = finalX + 'px';
      this.toolbar.style.top = finalY + 'px';
    }

    show() {
      if (!this.isVisible) {
        this.toolbar.classList.add('show');
        this.isVisible = true;
      }
    }

    hide() {
      if (this.isVisible) {
        this.toolbar.classList.remove('show');
        this.isVisible = false;
      }
    }

    handleButtonClick(item) {
      if (item === 'link') {
        const sel = Utils.getSelection();
        this.editor.modal.open('link', { text: sel.toString() });
      } else {
        this.editor.commands[item]();
      }
      this.hide();
    }
  }

  // ============================================
  // SECTION 11: PLUGIN SYSTEM
  // ============================================

  const registeredPlugins = [];

  NeikiEditor.registerPlugin = function (plugin) {
    if (!plugin.name) {
      console.error('NeikiEditor: Plugin must have a name');
      return;
    }
    registeredPlugins.push(plugin);
  };

  NeikiEditor.getPlugins = function () {
    return [...registeredPlugins];
  };

  // ============================================
  // SECTION 11: TABLE CONTEXT MENU
  // ============================================

  class TableContextMenu {
    constructor(editor) {
      this.editor = editor;
      this.menu = null;
      this.currentCell = null;

      this.createMenu();
      this.bindEvents();
    }

    createMenu() {
      this.menu = Utils.createElement('div', { className: 'neiki-context-menu' });
      this.menu.innerHTML = `
                <div class="neiki-context-item" data-action="insertRowAbove">${Icons.table} Insert Row Above</div>
                <div class="neiki-context-item" data-action="insertRowBelow">${Icons.table} Insert Row Below</div>
                <div class="neiki-context-item" data-action="insertColLeft">${Icons.table} Insert Column Left</div>
                <div class="neiki-context-item" data-action="insertColRight">${Icons.table} Insert Column Right</div>
                <div class="neiki-context-divider"></div>
                <div class="neiki-context-item" data-action="deleteRow">${Icons.eraser} Delete Row</div>
                <div class="neiki-context-item" data-action="deleteCol">${Icons.eraser} Delete Column</div>
                <div class="neiki-context-item neiki-context-danger" data-action="deleteTable">${Icons.eraser} Delete Table</div>
                <div class="neiki-context-divider"></div>
                <div class="neiki-context-item" data-action="mergeCells">${Icons.table} Merge Cells</div>
                <div class="neiki-context-item" data-action="splitCell">${Icons.table} Split Cell</div>
            `;
      document.body.appendChild(this.menu);

      this.menu.querySelectorAll('.neiki-context-item').forEach(item => {
        item.addEventListener('click', (e) => {
          const action = item.dataset.action;
          this.executeAction(action);
          this.hide();
        });
      });
    }

    bindEvents() {
      this.editor.contentArea.addEventListener('contextmenu', (e) => {
        const cell = e.target.closest('td, th');
        if (cell) {
          e.preventDefault();
          this.currentCell = cell;
          this.show(e.clientX, e.clientY);
        }
      });

      document.addEventListener('click', (e) => {
        if (!this.menu.contains(e.target)) {
          this.hide();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.hide();
      });
    }

    show(x, y) {
      this.menu.style.display = 'block';

      // Adjust position to stay within viewport
      const rect = this.menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (x + rect.width > viewportWidth) {
        x = viewportWidth - rect.width - 10;
      }
      if (y + rect.height > viewportHeight) {
        y = viewportHeight - rect.height - 10;
      }

      this.menu.style.left = x + 'px';
      this.menu.style.top = y + 'px';
    }

    hide() {
      this.menu.style.display = 'none';
      this.currentCell = null;
    }

    executeAction(action) {
      if (!this.currentCell) return;

      const table = this.currentCell.closest('table');
      const row = this.currentCell.closest('tr');
      if (!table || !row) return;

      const rowIndex = Array.from(table.rows).indexOf(row);
      const cellIndex = Array.from(row.cells).indexOf(this.currentCell);

      switch (action) {
        case 'insertRowAbove':
          this.insertRow(table, rowIndex, 'before');
          break;
        case 'insertRowBelow':
          this.insertRow(table, rowIndex, 'after');
          break;
        case 'insertColLeft':
          this.insertColumn(table, cellIndex, 'before');
          break;
        case 'insertColRight':
          this.insertColumn(table, cellIndex, 'after');
          break;
        case 'deleteRow':
          this.deleteRow(table, rowIndex);
          break;
        case 'deleteCol':
          this.deleteColumn(table, cellIndex);
          break;
        case 'deleteTable':
          table.remove();
          break;
        case 'mergeCells':
          this.mergeCells();
          break;
        case 'splitCell':
          this.splitCell();
          break;
      }

      this.editor.history.record();
      this.editor.triggerChange();
    }

    insertRow(table, index, position) {
      const refRow = table.rows[index];
      const colCount = refRow.cells.length;
      const newRow = table.insertRow(position === 'before' ? index : index + 1);

      for (let i = 0; i < colCount; i++) {
        const cell = newRow.insertCell();
        cell.innerHTML = '&nbsp;';
      }
    }

    insertColumn(table, index, position) {
      const insertIndex = position === 'before' ? index : index + 1;

      for (let row of table.rows) {
        const cell = row.insertCell(insertIndex);
        cell.innerHTML = '&nbsp;';
        // Match header/cell type
        if (row.cells[0] && row.cells[0].tagName === 'TH') {
          const th = document.createElement('th');
          th.innerHTML = '&nbsp;';
          cell.parentNode.replaceChild(th, cell);
        }
      }
    }

    deleteRow(table, index) {
      if (table.rows.length > 1) {
        table.deleteRow(index);
      }
    }

    deleteColumn(table, index) {
      for (let row of table.rows) {
        if (row.cells.length > 1 && row.cells[index]) {
          row.deleteCell(index);
        }
      }
    }

    mergeCells() {
      const sel = window.getSelection();
      if (!sel.rangeCount) return;

      // Simple merge: just add colspan/rowspan info
      // Full implementation would need selection tracking
      const cell = this.currentCell;
      const colspan = parseInt(cell.getAttribute('colspan') || 1);
      cell.setAttribute('colspan', colspan + 1);

      // Remove next cell if exists
      const nextCell = cell.nextElementSibling;
      if (nextCell && (nextCell.tagName === 'TD' || nextCell.tagName === 'TH')) {
        cell.innerHTML += ' ' + nextCell.innerHTML;
        nextCell.remove();
      }
    }

    splitCell() {
      const cell = this.currentCell;
      const colspan = parseInt(cell.getAttribute('colspan') || 1);

      if (colspan > 1) {
        cell.setAttribute('colspan', colspan - 1);
        const newCell = document.createElement(cell.tagName);
        newCell.innerHTML = '&nbsp;';
        cell.after(newCell);
      }
    }
  }

  // ============================================
  // SECTION 12: EXPORT
  // ============================================

  // Factory function
  function createEditor(element, options) {
    return new NeikiEditor(element, options);
  }

  // jQuery-like initialization
  if (typeof jQuery !== 'undefined') {
    jQuery.fn.neikiEditor = function (options) {
      return this.each(function () {
        if (!jQuery.data(this, 'neikiEditor')) {
          jQuery.data(this, 'neikiEditor', new NeikiEditor(this, options));
        }
      });
    };
  }

  // Export
  global.NeikiEditor = NeikiEditor;
  global.createNeikiEditor = createEditor;

  // AMD
  if (typeof define === 'function' && define.amd) {
    define('NeikiEditor', [], function () { return NeikiEditor; });
  }

  // CommonJS
  if (typeof module === 'object' && module.exports) {
    module.exports = NeikiEditor;
  }

})(typeof window !== 'undefined' ? window : this);
