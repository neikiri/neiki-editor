<?php
/**
 * NEIKI EDITOR - WYSIWYG Rich Text Editor
 * PHP Include file for easy integration
 *
 * Usage:
 * <?php include 'editor/neiki-editor.php'; ?>
 * <?php neiki_editor_head(); ?> // In <head> section
 * <?php neiki_editor('my-editor', ['height' => 400]); ?> // Where you want the editor
 */

// Get the base path for editor assets
function neiki_editor_base_path() {
    $path = dirname($_SERVER['SCRIPT_NAME']);
    $editorPath = str_replace('\\', '/', dirname(__FILE__));
    $docRoot = str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']);
    $relativePath = str_replace($docRoot, '', $editorPath);
    return rtrim($relativePath, '/');
}

/**
 * Output the required CSS and JS in the head section
 */
function neiki_editor_head($useCdn = true) {
    if ($useCdn) {
        echo <<<HTML
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@1.0.4/dist/neiki-editor.css">
        <script src="https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@1.0.4/dist/neiki-editor.js" defer></script>
HTML;
    } else {
        $basePath = neiki_editor_base_path();
        echo <<<HTML
        <link rel="stylesheet" href="{$basePath}/dist/neiki-editor.css">
        <script src="{$basePath}/dist/neiki-editor.js" defer></script>
HTML;
    }
}

/**
 * Output the editor HTML
 *
 * @param string $id Unique ID for the editor
 * @param array $options Configuration options
 * @param string $content Initial content
 */
function neiki_editor($id, $options = [], $content = '') {
    $defaultOptions = [
        'height' => 400,
        'placeholder' => 'Začněte psát...',
        'theme' => 'light',
        'name' => $id // Form field name
    ];

    $options = array_merge($defaultOptions, $options);
    $optionsJson = json_encode($options, JSON_HEX_APOS | JSON_HEX_QUOT);
    $content = htmlspecialchars($content, ENT_QUOTES, 'UTF-8');

    echo <<<HTML
    <textarea id="{$id}" name="{$options['name']}" style="display:none;">{$content}</textarea>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            new NeikiEditor('#{$id}', {$optionsJson});
        });
    </script>
HTML;
}

/**
 * Output editor with custom toolbar
 *
 * @param string $id Unique ID for the editor
 * @param array $toolbar Custom toolbar configuration
 * @param array $options Additional options
 * @param string $content Initial content
 */
function neiki_editor_custom($id, $toolbar, $options = [], $content = '') {
    $options['toolbar'] = $toolbar;
    neiki_editor($id, $options, $content);
}

/**
 * Output a minimal editor (basic formatting only)
 */
function neiki_editor_minimal($id, $options = [], $content = '') {
    $toolbar = [
        'bold', 'italic', 'underline', '|',
        'insertOrderedList', 'insertUnorderedList', '|',
        'createLink', 'insertImage', '|',
        'source'
    ];
    $options['toolbar'] = $toolbar;
    neiki_editor($id, $options, $content);
}

/**
 * Output a full-featured editor
 */
function neiki_editor_full($id, $options = [], $content = '') {
    $toolbar = [
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
    ];
    $options['toolbar'] = $toolbar;
    neiki_editor($id, $options, $content);
}

/**
 * Get editor content from POST
 *
 * @param string $name Form field name
 * @return string Sanitized HTML content
 */
function neiki_editor_get_content($name) {
    if (!isset($_POST[$name])) {
        return '';
    }

    $content = $_POST[$name];

    // Basic sanitization - you may want to use a library like HTMLPurifier for production
    $allowed_tags = '<p><br><strong><b><em><i><u><s><strike><sub><sup><h1><h2><h3><h4><h5><h6><ul><ol><li><a><img><table><thead><tbody><tr><th><td><blockquote><pre><code><hr><span><div>';

    return strip_tags($content, $allowed_tags);
}

/**
 * Sanitize editor content more thoroughly
 *
 * @param string $content HTML content
 * @return string Sanitized content
 */
function neiki_editor_sanitize($content) {
    // Remove script tags
    $content = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', '', $content);

    // Remove event handlers
    $content = preg_replace('/\s+on\w+\s*=\s*["\'][^"\']*["\']/i', '', $content);

    // Remove javascript: URLs
    $content = preg_replace('/href\s*=\s*["\']javascript:[^"\']*["\']/i', 'href="#"', $content);

    return $content;
}
?>
