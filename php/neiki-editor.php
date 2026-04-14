<?php
/**
 * Neiki Editor - PHP Integration Helper
 * Version: 2.6.1
 *
 * A lightweight helper class for easy server-side integration
 * of Neiki Editor into PHP projects.
 *
 * Usage:
 *   require_once 'php/neiki-editor.php';
 *   echo NeikiEditor::assets();
 *   echo NeikiEditor::render('editor', $content, ['minHeight' => 400]);
 */

class NeikiEditor
{
    /** @var string CDN base URL */
    private static $cdnBase = 'https://cdn.jsdelivr.net/gh/neikiri/neiki-editor@2.6.1/dist';

    /** @var bool Whether assets have already been included */
    private static $assetsIncluded = false;

    /**
     * Output editor assets (call once per page, in <head> or before first editor).
     * By default loads a single minified file with embedded CSS.
     *
     * @param bool   $local     Use local files instead of CDN
     * @param string $basePath  Path to local dist/ directory (relative or absolute)
     * @param bool   $separate  If true, load CSS and JS as separate files instead of the single minified bundle
     * @return string HTML script (and optionally link) tags
     */
    public static function assets(bool $local = false, string $basePath = '', bool $separate = false): string
    {
        if (self::$assetsIncluded) return '';
        self::$assetsIncluded = true;

        $base = ($local && $basePath) ? rtrim($basePath, '/') : self::$cdnBase;

        if ($separate) {
            $css = $base . '/neiki-editor.css';
            $js  = $base . '/neiki-editor.js';
            return '<link rel="stylesheet" href="' . self::escape($css) . '">' . "\n"
                 . '<script src="' . self::escape($js) . '"></script>' . "\n";
        }

        $js = $base . '/neiki-editor.min.js';
        return '<script src="' . self::escape($js) . '"></script>' . "\n";
    }

    /**
     * Render a <textarea> with automatic editor initialization.
     *
     * @param string $id       Element ID (also used as form field name)
     * @param string $content  Initial HTML content
     * @param array  $options  Editor configuration options
     * @return string HTML output
     */
    public static function render(string $id, string $content = '', array $options = []): string
    {
        $safeId      = self::escape($id);
        $safeContent = self::escape($content);
        $jsonOptions = !empty($options) ? json_encode($options, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : '{}';

        $html  = '<textarea id="' . $safeId . '" name="' . $safeId . '">' . $safeContent . '</textarea>' . "\n";
        $html .= '<script>new NeikiEditor("#' . $safeId . '", ' . $jsonOptions . ');</script>' . "\n";

        return $html;
    }

    /**
     * Sanitize HTML output from the editor before saving to database.
     * Strips dangerous tags and event handler attributes.
     *
     * @param string $html Raw HTML from editor
     * @return string Sanitized HTML
     */
    public static function sanitize(string $html): string
    {
        // Allowed HTML tags
        $allowed = '<p><br><b><strong><i><em><u><s><strike><del>'
                 . '<h1><h2><h3><h4><h5><h6>'
                 . '<ul><ol><li><blockquote><pre><code>'
                 . '<a><img><table><thead><tbody><tr><th><td>'
                 . '<span><div><hr><sub><sup><mark>';

        $html = strip_tags($html, $allowed);

        // Remove all on* event handler attributes (onclick, onerror, onload, etc.)
        $html = preg_replace('/\s+on\w+\s*=\s*"[^"]*"/i', '', $html);
        $html = preg_replace('/\s+on\w+\s*=\s*\'[^\']*\'/i', '', $html);
        $html = preg_replace('/\s+on\w+\s*=\s*[^\s>]+/i', '', $html);

        // Remove javascript: protocol from href/src attributes
        $html = preg_replace('/\b(href|src)\s*=\s*["\']?\s*javascript\s*:/i', '$1="', $html);

        return $html;
    }

    /**
     * Escape a string for safe HTML attribute output.
     *
     * @param string $value
     * @return string
     */
    private static function escape(string $value): string
    {
        return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    }
}
