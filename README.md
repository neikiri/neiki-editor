<h1 align="center">Neiki Editor</h1>

<p align="center">
  <img src="logo.png" alt="neiki-editor" width="400">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript">
  <img src="https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white" alt="CSS">
  <br>
  <img src="https://img.shields.io/badge/License-MIT-2563EB?style=for-the-badge&logo=open-source-initiative&logoColor=white&labelColor=000F15&logoWidth=20" alt="License">
  <img src="https://img.shields.io/badge/Version-2.0.0-2563EB?style=for-the-badge&logo=semantic-release&logoColor=white&labelColor=000F15&logoWidth=20" alt="Version">
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

### CDN (Recommended)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@2.0.0/dist/neiki-editor.css">
<script src="https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@2.0.0/dist/neiki-editor.js"></script>
```

### Self-hosted

Download `neiki-editor.js` and `neiki-editor.css`, then include them in your project:

```html
<link rel="stylesheet" href="path/to/neiki-editor.css">
<script src="path/to/neiki-editor.js"></script>
```

---

## 🚀 Quick Start

```html
<textarea id="editor"></textarea>

<script>
  const editor = new NeikiEditor('#editor');
</script>
```

That's it — zero config required. The editor replaces the `<textarea>` with a full-featured WYSIWYG editor.

---

## ⚙️ Configuration

```javascript
const editor = new NeikiEditor('#editor', {
    placeholder: 'Start typing...',
    minHeight: 300,
    maxHeight: 600,
    autofocus: false,
    spellcheck: true,
    readonly: false,
    theme: 'light',       // 'light' or 'dark'
    toolbar: [
        'undo', 'redo', '|',
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'heading', 'fontSize', 'fontFamily', '|',
        'foreColor', 'backColor', '|',
        'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', '|',
        'bulletList', 'numberedList', '|',
        'indent', 'outdent', '|',
        'link', 'image', 'table', '|',
        'blockquote', 'viewCode', 'horizontalRule', '|',
        'subscript', 'superscript', 'removeFormat', '|',
        'findReplace', 'emoji', 'specialChars', '|',
        'fullscreen', 'themeToggle', 'print'
    ],
    onChange: function(content, editor) {
        console.log('Content changed:', content);
    },
    onReady: function(editor) {
        console.log('Editor is ready!');
    }
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `placeholder` | `string` | `'Start typing...'` | Placeholder text when editor is empty |
| `minHeight` | `number` | `300` | Minimum height in pixels |
| `maxHeight` | `number\|null` | `null` | Maximum height in pixels (enables scroll) |
| `autofocus` | `boolean` | `false` | Focus editor on initialization |
| `spellcheck` | `boolean` | `true` | Enable browser spellcheck |
| `readonly` | `boolean` | `false` | Make editor read-only |
| `theme` | `string` | `'light'` | `'light'` or `'dark'` |
| `toolbar` | `array` | *(see above)* | Toolbar button configuration |
| `onChange` | `function\|null` | `null` | Callback on content change |
| `onReady` | `function\|null` | `null` | Callback when editor is ready |

---

## 🔧 Toolbar Buttons

Use the `toolbar` array to customize which buttons appear and in what order. Use `'|'` for a visual separator.

### Text Formatting

| Button | Description |
|--------|-------------|
| `bold` | Bold text (**Ctrl+B**) |
| `italic` | Italic text (**Ctrl+I**) |
| `underline` | Underline text (**Ctrl+U**) |
| `strikethrough` | Strikethrough text |
| `subscript` | Subscript text |
| `superscript` | Superscript text |
| `removeFormat` | Remove all formatting |

### Text Style

| Button | Description |
|--------|-------------|
| `heading` | Dropdown: Paragraph, H1–H6 |
| `fontSize` | Dropdown: 10px–36px |
| `fontFamily` | Dropdown: Arial, Georgia, Courier New, etc. |
| `foreColor` | Text color picker with reset option |
| `backColor` | Background color picker with reset option |

### Alignment & Lists

| Button | Description |
|--------|-------------|
| `alignLeft` | Align text left |
| `alignCenter` | Center text |
| `alignRight` | Align text right |
| `alignJustify` | Justify text |
| `bulletList` | Unordered list |
| `numberedList` | Ordered list |
| `indent` | Increase indent |
| `outdent` | Decrease indent |

### Insert

| Button | Description |
|--------|-------------|
| `link` | Insert/edit hyperlink (**Ctrl+K**) |
| `image` | Insert image (URL or file upload → base64) |
| `table` | Insert table with custom rows/columns |
| `blockquote` | Block quote |
| `horizontalRule` | Horizontal line |
| `emoji` | Emoji picker (100+ emojis) |
| `specialChars` | Special characters (©, ®, €, π, Ω, arrows, etc.) |

### Tools

| Button | Description |
|--------|-------------|
| `undo` | Undo (**Ctrl+Z**) |
| `redo` | Redo (**Ctrl+Y** / **Ctrl+Shift+Z**) |
| `findReplace` | Find & Replace with regex support |
| `viewCode` | Toggle HTML source editor |
| `fullscreen` | Toggle fullscreen mode |
| `themeToggle` | Toggle light/dark theme (persists across reloads) |
| `autosave` | Toggle autosave to localStorage *(opt-in, not in default toolbar)* |
| `print` | Print editor content |

---

## 🎨 Themes

Neiki Editor ships with **Light** and **Dark** themes.

### Set theme on init:

```javascript
const editor = new NeikiEditor('#editor', {
    theme: 'dark'
});
```

### Toggle theme at runtime:

The `themeToggle` toolbar button switches between themes and persists the choice across page reloads.

You can also toggle programmatically:

```javascript
editor.toggleTheme();
```

---

## 💾 Autosave

Autosave is **opt-in** — it is not included in the default toolbar. To enable it, add `'autosave'` to your toolbar config:

```javascript
const editor = new NeikiEditor('#editor', {
    toolbar: [
        'bold', 'italic', 'underline', '|',
        'autosave'
    ]
});
```

When activated, autosave stores content to `localStorage` every 5 seconds. Content is restored on page reload **only when autosave is enabled**.

> **Note:** For production use (CMS, blog, etc.), consider using the `onChange` callback to save content to your database instead.

---

## 📋 API Methods

### Content

```javascript
editor.getContent();          // Get HTML content
editor.setContent('<p>Hello</p>');  // Set HTML content

editor.getHTML();             // Alias for getContent()
editor.setHTML(html);         // Alias for setContent()

editor.getJSON();             // Get structured JSON representation
editor.setJSON(json);         // Set content from JSON
```

### Editor Control

```javascript
editor.focus();               // Focus the editor
editor.blur();                // Blur the editor
editor.destroy();             // Remove editor, restore original element
editor.toggleFullscreen();    // Toggle fullscreen mode
editor.toggleTheme();         // Toggle light/dark theme
```

### Command Execution

```javascript
editor.execCommand('bold');                  // Execute a command
editor.insertHTML('<span>Hello</span>');     // Insert HTML at cursor
editor.wrapSelection('mark', { class: 'highlight' }); // Wrap selection
editor.unwrapSelection('mark');              // Unwrap selection
```

### Selection

```javascript
editor.getSelection();        // Get current Selection object
```

---

## 🔌 Plugin API

Extend the editor with custom plugins:

```javascript
NeikiEditor.registerPlugin({
    name: 'word-counter-alert',
    icon: '<svg viewBox="0 0 24 24">...</svg>',   // optional toolbar button
    tooltip: 'Show Word Count',
    action: function(editor) {
        const text = editor.getContent().replace(/<[^>]*>/g, '');
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        alert('Word count: ' + words);
    },
    init: function(editor) {
        // Called once when editor initializes (optional)
        console.log('Plugin initialized!');
    }
});
```

### Plugin Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | ✅ | Unique plugin identifier |
| `icon` | `string` | ❌ | SVG icon for toolbar button |
| `tooltip` | `string` | ❌ | Button tooltip text |
| `action` | `function` | ❌ | Called when toolbar button is clicked |
| `init` | `function` | ❌ | Called once during editor initialization |

### List Registered Plugins

```javascript
NeikiEditor.getPlugins(); // Returns array of registered plugins
```

---

## 📊 Table Features

Insert tables via the toolbar button with configurable rows, columns, and optional header row.

### Table Context Menu

Right-click on any table cell to access:

- **Insert Row Above / Below**
- **Insert Column Left / Right**
- **Delete Row / Column / Table**
- **Merge Cells** — merge selected cells horizontally
- **Split Cell** — split a previously merged cell

---

## 🖼️ Image Support

### Insert via URL

Click the **Image** toolbar button and paste a URL.

### Upload from File

The Image dialog includes a file upload input. Selected images are converted to **base64** and embedded directly in the content.

### Drag & Drop

Drag image files directly into the editor content area. Images are automatically converted to base64 and inserted at the drop position.

---

## 🔍 Find & Replace

Open with the toolbar button or implement via the modal API.

Features:
- **Case-sensitive** search toggle
- **Regular expression** support
- **Find Next** — navigate through matches with highlighting
- **Replace** — replace current match
- **Replace All** — replace all matches at once

---

## ✏️ Floating Toolbar

When you select text in the editor, a floating toolbar appears above the selection with quick access to:

- Bold, Italic, Underline, Strikethrough
- Insert Link

The toolbar follows the selection and disappears when the selection is cleared.

---

## 🖨️ Print

Click the **Print** button to open the browser print dialog with the editor content formatted for printing.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Ctrl+B** | Bold |
| **Ctrl+I** | Italic |
| **Ctrl+U** | Underline |
| **Ctrl+K** | Insert Link |
| **Ctrl+Z** | Undo |
| **Ctrl+Y** / **Ctrl+Shift+Z** | Redo |
| **Tab** | Indent |
| **Shift+Tab** | Outdent |

---

## 📐 Status Bar

The editor includes a status bar at the bottom displaying:

- **Left side:** Word count and character count
- **Right side:** Current block type (p, h1, h2, etc.)

---

## 🔗 Integration Examples

### PHP Helper (Recommended)

Neiki Editor includes a PHP integration helper (`php/neiki-editor.php`) that provides asset loading, editor rendering, and HTML sanitization:

```php
<?php require_once 'php/neiki-editor.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <?= NeikiEditor::assets() ?>
</head>
<body>
    <form method="POST" action="save.php">
        <?= NeikiEditor::render('content', $article->content, [
            'minHeight' => 400,
            'placeholder' => 'Write your article...'
        ]) ?>
        <button type="submit">Save</button>
    </form>
</body>
</html>
```

```php
// save.php — sanitize before saving to database
require_once 'php/neiki-editor.php';
$clean = NeikiEditor::sanitize($_POST['content']);
$db->save($clean);
```

#### PHP Helper Methods

| Method | Description |
|--------|-------------|
| `NeikiEditor::assets()` | Output CSS & JS tags (CDN). Call once per page. |
| `NeikiEditor::assets(true, '/path/to/dist')` | Use local files instead of CDN. |
| `NeikiEditor::render($id, $content, $options)` | Render textarea + init script. |
| `NeikiEditor::sanitize($html)` | Strip dangerous tags/attributes before DB save. |

### PHP Form (Manual)

```php
<form method="POST" action="save.php">
    <textarea id="editor" name="content"><?= htmlspecialchars($article->content) ?></textarea>
    <button type="submit">Save</button>
</form>

<script>
    const editor = new NeikiEditor('#editor');
</script>
```

### AJAX Save

```javascript
const editor = new NeikiEditor('#editor', {
    onChange: debounce(function(content) {
        fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });
    }, 2000)
});
```

### Vue.js

```vue
<template>
  <textarea ref="editor"></textarea>
</template>

<script>
export default {
    mounted() {
        this.editor = new NeikiEditor(this.$refs.editor, {
            onChange: (content) => {
                this.$emit('update:modelValue', content);
            }
        });
    },
    beforeUnmount() {
        this.editor.destroy();
    }
}
</script>
```

### React

```jsx
import { useEffect, useRef } from 'react';

function NeikiEditorComponent({ value, onChange }) {
    const ref = useRef(null);
    const editorRef = useRef(null);

    useEffect(() => {
        editorRef.current = new NeikiEditor(ref.current, {
            onChange: (content) => onChange?.(content)
        });
        return () => editorRef.current?.destroy();
    }, []);

    return <textarea ref={ref} defaultValue={value} />;
}
```

---

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |
| Opera | ✅ Latest |

---

## 📁 File Structure

```
neiki-editor/
├── dist/
│   ├── neiki-editor.js       # Editor core
│   └── neiki-editor.css      # Editor styles
├── demo/
│   └── index.html            # Interactive demo page
├── php/
│   └── neiki-editor.php      # PHP integration helper
├── logo.png
├── package.json
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ for the web community
</p>
