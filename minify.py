import requests
import subprocess
import os
import re

# =========================
# CONFIG
# =========================
INPUT_DIR = "src"
OUTPUT_DIR = "dist"

CSS_INPUT = os.path.join(INPUT_DIR, "neiki-editor.css")
JS_INPUT = os.path.join(INPUT_DIR, "neiki-editor.js")

CSS_OUTPUT = os.path.join(OUTPUT_DIR, "neiki-editor.min.css")
JS_OUTPUT = os.path.join(OUTPUT_DIR, "neiki-editor.min.js")

JS_TEMP = os.path.join(OUTPUT_DIR, "neiki-editor.temp.js")

# =========================
# CSS INJECT TEMPLATE
# =========================
INJECT_TEMPLATE = """
// ============================================
// AUTO-INJECT CSS
// ============================================
(function() {{
    if (document.getElementById('neiki-editor-styles')) return;
    const style = document.createElement('style');
    style.id = 'neiki-editor-styles';
    style.textContent = `{css}`;
    document.head.appendChild(style);
}})();
"""

# =========================
# 1. CREATE OUTPUT DIR
# =========================
os.makedirs(OUTPUT_DIR, exist_ok=True)

# =========================
# 2. LOAD CSS
# =========================
with open(CSS_INPUT, "r", encoding="utf-8") as f:
    css_content = f.read()

print("Minifying CSS...")

response = requests.post(
    "https://www.toptal.com/developers/cssminifier/api/raw",
    data={"input": css_content}
)

minified_css = response.text.strip()

# save minified CSS
with open(CSS_OUTPUT, "w", encoding="utf-8") as f:
    f.write(minified_css)

# escape for JS template string
minified_css = minified_css.replace("\\", "\\\\").replace("`", "\\`")

# =========================
# 3. LOAD JS
# =========================
with open(JS_INPUT, "r", encoding="utf-8") as f:
    js_content = f.read()

print("Looking for marker in JS...")

# =========================
# 4. FIND MARKER
# =========================
pattern = r"(\s*//\s*=+\s*\r?\n\s*//\s*CSS_INJECT_POINT\s*\r?\n\s*//\s*=+\s*)"

match = re.search(pattern, js_content)

if not match:
    raise Exception("Marker not found!")

print("Marker found, injecting CSS...")

insert_pos = match.end()

injected_code = INJECT_TEMPLATE.format(css=minified_css)

js_modified = (
    js_content[:insert_pos] +
    injected_code +
    js_content[insert_pos:]
)

# =========================
# 5. SAVE TEMP JS
# =========================
with open(JS_TEMP, "w", encoding="utf-8") as f:
    f.write(js_modified)

# =========================
# 6. MINIFY JS (TERSER)
# =========================
print("Minifying JS with terser...")

subprocess.run([
    r"C:\Program Files\nodejs\npx.cmd",
    "terser",
    JS_TEMP,
    "-o", JS_OUTPUT,
    "--compress",
    "--mangle"
], check=True)

# =========================
# 7. CLEANUP
# =========================
os.remove(JS_TEMP)

print("\nDone!")
print(f"CSS: {CSS_OUTPUT}")
print(f"JS:  {JS_OUTPUT}")
