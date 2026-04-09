<h1 align="center">Neiki Editor</h1>

<p align="center">
  <img src="logo.png" alt="neiki-editor" width="400">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript">
  <img src="https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white" alt="CSS">
  <br>
  <img src="https://img.shields.io/badge/License-MIT-2563EB?style=for-the-badge&logo=open-source-initiative&logoColor=white&labelColor=000F15&logoWidth=20" alt="License">
  <img src="https://img.shields.io/badge/Version-1.0.0-2563EB?style=for-the-badge&logo=semantic-release&logoColor=white&labelColor=000F15&logoWidth=20" alt="Version">
</p>

<p align="center">
  <b>Lightweight WYSIWYG Rich Text Editor</b><br>
  <i>Easy to integrate, fully customizable, zero dependencies.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Features-30%2B%20Tools-3b82f6?style=flat&labelColor=383C43" />
  <img src="https://img.shields.io/badge/Themes-Light%20%26%20Dark-8b5cf6?style=flat&labelColor=383C43" />
  <img src="https://img.shields.io/badge/Setup-Zero%20Config-22c55e?style=flat&labelColor=383C43" />
  <img src="https://img.shields.io/badge/Size-Lightweight-f97316?style=flat&labelColor=383C43" />
</p>

---

## 📦 Installation

### CDN (recommended)

```html
<script src="https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@1.0.0/dist/neiki-editor.js"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@1.0.0/dist/neiki-editor.css">
```

### Manual Install

```bash
git clone https://github.com/neikiri/neiki-editor.git
```

Copy the `dist/` folder to your project.

---

## 🚀 Usage

### HTML/JavaScript

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dist/neiki-editor.css">
</head>
<body>
    <textarea id="my-editor"></textarea>
    
    <script src="dist/neiki-editor.js"></script>
    <script>
        const editor = new NeikiEditor('#my-editor', {
            height: 400,
            theme: 'light'
        });
    </script>
</body>
</html>
```

### PHP

```php
<?php include 'php/neiki-editor.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <?php neiki_editor_head(); ?>
</head>
<body>
    <?php neiki_editor('my-editor', ['height' => 400]); ?>
</body>
</html>
```

---

## ⚙️ Configuration

```javascript
const editor = new NeikiEditor('#my-editor', {
    height: 400,
    placeholder: 'Start typing...',
    theme: 'light', // 'light' or 'dark'
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
        'source', 'fullscreen', 'print'
    ],
    onChange: function(content) {
        console.log('Content changed:', content);
    },
    onReady: function(editor) {
        console.log('Editor ready');
    }
});
```

---

## 📋 Toolbar Commands

| Command | Description |
|---------|-------------|
| `undo` | Undo |
| `redo` | Redo |
| `formatBlock` | Format selection (headings, paragraph) |
| `fontName` | Font family |
| `fontSize` | Font size |
| `bold` | Bold |
| `italic` | Italic |
| `underline` | Underline |
| `strikethrough` | Strikethrough |
| `foreColor` | Text color |
| `backColor` | Background color |
| `alignLeft` | Align left |
| `alignCenter` | Align center |
| `alignRight` | Align right |
| `alignJustify` | Justify |
| `insertOrderedList` | Ordered list |
| `insertUnorderedList` | Unordered list |
| `indent` | Increase indent |
| `outdent` | Decrease indent |
| `createLink` | Insert link |
| `insertImage` | Insert image |
| `insertTable` | Insert table |
| `blockquote` | Blockquote |
| `insertHorizontalRule` | Horizontal rule |
| `insertCode` | Code block |
| `subscript` | Subscript |
| `superscript` | Superscript |
| `removeFormat` | Remove formatting |
| `findReplace` | Find and replace |
| `emoji` | Emoji picker |
| `specialChar` | Special characters |
| `source` | View HTML source |
| `fullscreen` | Fullscreen mode |
| `print` | Print |
| `\|` | Group separator |

---

## 🔧 API Methods

```javascript
// Get HTML content
const html = editor.getContent();

// Set content
editor.setContent('<p>New content</p>');

// Get plain text
const text = editor.getText();

// Clear editor
editor.clear();

// Focus editor
editor.focus();

// Change theme
editor.setTheme('dark');

// Destroy editor
editor.destroy();
```

---

## 🎨 PHP Helper Functions

```php
// Basic editor
neiki_editor('id', $options, $content);

// Minimal editor (basic formatting)
neiki_editor_minimal('id', $options, $content);

// Full editor (all features)
neiki_editor_full('id', $options, $content);

// Custom toolbar
neiki_editor_custom('id', $toolbar, $options, $content);

// Get content from POST
$content = neiki_editor_get_content('field_name');

// Sanitize content
$safe = neiki_editor_sanitize($content);
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` | Bold |
| `Ctrl+I` | Italic |
| `Ctrl+U` | Underline |
| `Ctrl+K` | Insert link |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+F` | Find and replace |

---

## 🌙 Dark Mode

```javascript
// On initialization
new NeikiEditor('#editor', { theme: 'dark' });

// Dynamically
editor.setTheme('dark');
editor.setTheme('light');
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ for the web community
</p>
