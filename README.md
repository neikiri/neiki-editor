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
  <img src="https://img.shields.io/badge/Version-1.0.4-2563EB?style=for-the-badge&logo=semantic-release&logoColor=white&labelColor=000F15&logoWidth=20" alt="Version">
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
<script src="https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@1.0.4/dist/neiki-editor.js"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@1.0.4/dist/neiki-editor.css">
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

## 🔌 Website Integration Guide

This comprehensive guide shows you how to integrate Neiki Editor into your website for various use cases.

### Basic Integration

#### 1. Embedding in HTML Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website with Editor</title>
    
    <!-- Neiki Editor CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@1.0.4/dist/neiki-editor.css">
</head>
<body>
    <!-- Form with editor -->
    <form id="article-form" method="POST" action="/save-article.php">
        <input type="text" name="title" placeholder="Article title">
        
        <!-- Textarea that transforms into editor -->
        <textarea id="content" name="content"></textarea>
        
        <button type="submit">Save Article</button>
    </form>
    
    <!-- Neiki Editor JS -->
    <script src="https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@1.0.4/dist/neiki-editor.js"></script>
    <script>
        const editor = new NeikiEditor('#content', {
            height: 400,
            theme: 'light',
            placeholder: 'Start writing your article...'
        });
    </script>
</body>
</html>
```

---

### Form Integration

#### Submitting Content via Form

The editor automatically synchronizes content with the original `<textarea>` element, so when submitting the form, the content is sent as a regular form field.

```html
<form id="my-form" method="POST">
    <textarea id="editor" name="article_content"></textarea>
    <button type="submit">Submit</button>
</form>

<script>
    const editor = new NeikiEditor('#editor');
    
    // You can process content before form submission
    document.getElementById('my-form').addEventListener('submit', function(e) {
        // Get HTML content
        const htmlContent = editor.getContent();
        
        // Get plain text (without HTML)
        const plainText = editor.getText();
        
        console.log('Submitting:', htmlContent);
    });
</script>
```

#### AJAX Submission

```javascript
const editor = new NeikiEditor('#editor');

document.getElementById('save-btn').addEventListener('click', async function() {
    const content = editor.getContent();
    
    try {
        const response = await fetch('/api/save-article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: content,
                title: document.getElementById('title').value
            })
        });
        
        if (response.ok) {
            alert('Article saved successfully!');
        }
    } catch (error) {
        console.error('Error saving:', error);
    }
});
```

---

### Working with Content

#### Loading Existing Content

```javascript
// Method 1: Via textarea
document.getElementById('editor').value = '<p>Existing content</p>';
const editor = new NeikiEditor('#editor');

// Method 2: Programmatically after initialization
const editor = new NeikiEditor('#editor');
editor.setContent('<h1>Title</h1><p>Article content...</p>');

// Method 3: Loading from API
fetch('/api/get-article/123')
    .then(response => response.json())
    .then(data => {
        editor.setContent(data.content);
    });
```

#### Tracking Content Changes

```javascript
const editor = new NeikiEditor('#editor', {
    onChange: function(content) {
        // Auto-save draft
        localStorage.setItem('draft', content);
        
        // Or display unsaved changes indicator
        document.getElementById('save-indicator').textContent = 'Unsaved';
    },
    onReady: function(editorInstance) {
        // Load draft on startup
        const draft = localStorage.getItem('draft');
        if (draft) {
            editorInstance.setContent(draft);
        }
    }
});
```

---

### Multiple Editors on Page

```html
<textarea id="editor-intro"></textarea>
<textarea id="editor-content"></textarea>
<textarea id="editor-conclusion"></textarea>

<script>
    // Each editor has its own instance
    const introEditor = new NeikiEditor('#editor-intro', {
        height: 150,
        toolbar: ['bold', 'italic', 'underline']
    });
    
    const contentEditor = new NeikiEditor('#editor-content', {
        height: 400,
        toolbar: [
            'undo', 'redo', '|',
            'formatBlock', 'bold', 'italic', '|',
            'insertImage', 'createLink', 'insertTable'
        ]
    });
    
    const conclusionEditor = new NeikiEditor('#editor-conclusion', {
        height: 150,
        toolbar: ['bold', 'italic', 'underline']
    });
    
    // Get content from all editors
    function getAllContent() {
        return {
            intro: introEditor.getContent(),
            content: contentEditor.getContent(),
            conclusion: conclusionEditor.getContent()
        };
    }
</script>
```

---

### PHP Backend Integration

#### Frontend (HTML)

```html
<form id="article-form" method="POST" action="save.php">
    <input type="text" name="title" required>
    <textarea id="content" name="content"></textarea>
    <button type="submit">Save</button>
</form>

<script src="dist/neiki-editor.js"></script>
<script>
    new NeikiEditor('#content');
</script>
```

#### Backend (save.php)

```php
<?php
// Get content from editor
$content = $_POST['content'] ?? '';
$title = $_POST['title'] ?? '';

// Sanitize HTML content
$allowedTags = '<p><br><strong><em><u><s><h1><h2><h3><h4><h5><h6><ul><ol><li><a><img><table><tr><td><th><thead><tbody><blockquote><pre><code><hr><span><div>';
$safeContent = strip_tags($content, $allowedTags);

// Save to database
$pdo = new PDO('mysql:host=localhost;dbname=mydb', 'user', 'password');
$stmt = $pdo->prepare('INSERT INTO articles (title, content) VALUES (?, ?)');
$stmt->execute([$title, $safeContent]);

header('Location: /articles');
exit;
```

#### Loading Article for Editing

```php
<?php
$id = $_GET['id'] ?? 0;
$stmt = $pdo->prepare('SELECT * FROM articles WHERE id = ?');
$stmt->execute([$id]);
$article = $stmt->fetch();
?>

<form method="POST" action="update.php">
    <input type="hidden" name="id" value="<?= $article['id'] ?>">
    <input type="text" name="title" value="<?= htmlspecialchars($article['title']) ?>">
    <textarea id="content" name="content"><?= htmlspecialchars($article['content']) ?></textarea>
    <button type="submit">Update</button>
</form>

<script>
    new NeikiEditor('#content');
</script>
```

---

### WordPress Integration

#### Using in Templates

```php
<?php
// In functions.php
function enqueue_neiki_editor() {
    wp_enqueue_style('neiki-editor', 'https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@1.0.4/dist/neiki-editor.css');
    wp_enqueue_script('neiki-editor', 'https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@1.0.4/dist/neiki-editor.js', [], '1.0.4', true);
}
add_action('wp_enqueue_scripts', 'enqueue_neiki_editor');
?>

<!-- In template -->
<form method="POST">
    <textarea id="user-comment" name="comment"></textarea>
    <button type="submit">Submit Comment</button>
</form>

<script>
    new NeikiEditor('#user-comment', {
        height: 200,
        toolbar: ['bold', 'italic', 'underline', '|', 'insertOrderedList', 'insertUnorderedList', '|', 'createLink']
    });
</script>
```

---

### Dynamic Editor Creation

```javascript
// Create editor for dynamically added elements
function createEditor(elementId, options = {}) {
    const defaultOptions = {
        height: 300,
        theme: 'light'
    };
    
    return new NeikiEditor(`#${elementId}`, { ...defaultOptions, ...options });
}

// Example: Adding new editor via button
let editorCount = 0;
const editors = [];

document.getElementById('add-section').addEventListener('click', function() {
    editorCount++;
    const id = `editor-${editorCount}`;
    
    // Create new textarea
    const container = document.createElement('div');
    container.innerHTML = `
        <h3>Section ${editorCount}</h3>
        <textarea id="${id}" name="section_${editorCount}"></textarea>
    `;
    document.getElementById('sections-container').appendChild(container);
    
    // Initialize editor
    const editor = createEditor(id);
    editors.push(editor);
});

// Get content from all editors
function getAllSections() {
    return editors.map((editor, index) => ({
        section: index + 1,
        content: editor.getContent()
    }));
}
```

---

### Auto-save

```javascript
const editor = new NeikiEditor('#editor', {
    onChange: debounce(function(content) {
        // Auto-save after 2 seconds of inactivity
        saveToServer(content);
    }, 2000)
});

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

async function saveToServer(content) {
    const response = await fetch('/api/auto-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, articleId: 123 })
    });
    
    if (response.ok) {
        document.getElementById('status').textContent = 'Auto-saved';
    }
}
```

---

### Responsive Design

```css
/* Customize editor for mobile devices */
@media (max-width: 768px) {
    .neiki-editor-container {
        font-size: 14px;
    }
    
    .neiki-toolbar {
        flex-wrap: wrap;
    }
    
    .neiki-toolbar-group {
        margin-bottom: 5px;
    }
    
    .neiki-editor-content {
        min-height: 200px !important;
    }
}
```

```javascript
// Dynamic height based on device
const isMobile = window.innerWidth < 768;
const editor = new NeikiEditor('#editor', {
    height: isMobile ? 250 : 400,
    toolbar: isMobile 
        ? ['bold', 'italic', '|', 'insertImage', 'createLink']
        : ['undo', 'redo', '|', 'formatBlock', 'bold', 'italic', 'underline', '|', 'insertImage', 'createLink', 'insertTable']
});
```

---

### Content Validation

```javascript
const editor = new NeikiEditor('#editor');

document.getElementById('form').addEventListener('submit', function(e) {
    const content = editor.getContent();
    const text = editor.getText().trim();
    
    // Check minimum length
    if (text.length < 100) {
        e.preventDefault();
        alert('Article must be at least 100 characters.');
        return;
    }
    
    // Check maximum length
    if (text.length > 10000) {
        e.preventDefault();
        alert('Article is too long (max 10000 characters).');
        return;
    }
    
    // Check for forbidden words
    const forbiddenWords = ['spam', 'advertisement'];
    const lowerText = text.toLowerCase();
    for (const word of forbiddenWords) {
        if (lowerText.includes(word)) {
            e.preventDefault();
            alert(`Content contains forbidden word: ${word}`);
            return;
        }
    }
});
```

---

### System Theme Detection

```javascript
// Detect system theme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const editor = new NeikiEditor('#editor', {
    theme: prefersDark ? 'dark' : 'light'
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    editor.setTheme(e.matches ? 'dark' : 'light');
});
```

---

### Complete Page Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - New Article</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@1.0.4/dist/neiki-editor.css">
    <style>
        * { box-sizing: border-box; }
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input[type="text"] { width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px; }
        .btn { padding: 12px 24px; font-size: 16px; cursor: pointer; border: none; border-radius: 4px; }
        .btn-primary { background: #3b82f6; color: white; }
        .btn-secondary { background: #6b7280; color: white; margin-left: 10px; }
        .status { margin-top: 10px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <h1>New Article</h1>
    
    <form id="article-form" method="POST" action="/api/articles">
        <div class="form-group">
            <label for="title">Article Title</label>
            <input type="text" id="title" name="title" required>
        </div>
        
        <div class="form-group">
            <label for="content">Content</label>
            <textarea id="content" name="content"></textarea>
        </div>
        
        <div class="form-group">
            <button type="submit" class="btn btn-primary">Publish</button>
            <button type="button" class="btn btn-secondary" id="save-draft">Save Draft</button>
        </div>
        
        <div class="status" id="status"></div>
    </form>
    
    <script src="https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@1.0.4/dist/neiki-editor.js"></script>
    <script>
        // Initialize editor
        const editor = new NeikiEditor('#content', {
            height: 400,
            placeholder: 'Start writing your article...',
            onChange: function(content) {
                // Auto-save draft to localStorage
                localStorage.setItem('article-draft', JSON.stringify({
                    title: document.getElementById('title').value,
                    content: content,
                    savedAt: new Date().toISOString()
                }));
                document.getElementById('status').textContent = 'Draft auto-saved';
            },
            onReady: function() {
                // Load draft on startup
                const draft = localStorage.getItem('article-draft');
                if (draft) {
                    const data = JSON.parse(draft);
                    if (confirm('Unsaved draft found. Would you like to restore it?')) {
                        document.getElementById('title').value = data.title || '';
                        editor.setContent(data.content || '');
                    }
                }
            }
        });
        
        // Save draft to server
        document.getElementById('save-draft').addEventListener('click', async function() {
            const response = await fetch('/api/drafts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: document.getElementById('title').value,
                    content: editor.getContent()
                })
            });
            
            if (response.ok) {
                document.getElementById('status').textContent = 'Draft saved to server';
                localStorage.removeItem('article-draft');
            }
        });
        
        // Validate before submission
        document.getElementById('article-form').addEventListener('submit', function(e) {
            const text = editor.getText().trim();
            if (text.length < 50) {
                e.preventDefault();
                alert('Article must be at least 50 characters.');
            }
        });
    </script>
</body>
</html>
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ for the web community
</p>
