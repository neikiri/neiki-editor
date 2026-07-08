/**
 * NeikiEditor - A Modern WYSIWYG Editor
 * Version: 3.3.0
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

  let EDITOR_INSTANCE_COUNTER = 0;

  // ============================================
  // CSS_INJECT_POINT
  // ============================================

  // ============================================
  // TRANSLATIONS / i18n
  // ============================================

  const TRANSLATIONS = {
    en: {
      // Toolbar tooltips
      'toolbar.undo': 'Undo (Ctrl+Z)',
      'toolbar.redo': 'Redo (Ctrl+Y)',
      'toolbar.bold': 'Bold (Ctrl+B)',
      'toolbar.italic': 'Italic (Ctrl+I)',
      'toolbar.underline': 'Underline (Ctrl+U)',
      'toolbar.strikethrough': 'Strikethrough',
      'toolbar.heading': 'Heading',
      'toolbar.fontSize': 'Font Size',
      'toolbar.fontFamily': 'Font Family',
      'toolbar.foreColor': 'Text Color',
      'toolbar.backColor': 'Background Color',
      'toolbar.alignLeft': 'Align Left',
      'toolbar.alignCenter': 'Align Center',
      'toolbar.alignRight': 'Align Right',
      'toolbar.alignJustify': 'Justify',
      'toolbar.bulletList': 'Bullet List',
      'toolbar.numberedList': 'Numbered List',
      'toolbar.indent': 'Increase Indent',
      'toolbar.outdent': 'Decrease Indent',
      'toolbar.link': 'Insert Link (Ctrl+K)',
      'toolbar.image': 'Insert Image',
      'toolbar.video': 'Insert Video',
      'toolbar.table': 'Insert Table',
      'toolbar.blockquote': 'Blockquote',
      'toolbar.viewCode': 'View Code (Toggle HTML)',
      'toolbar.horizontalRule': 'Horizontal Line',
      'toolbar.subscript': 'Subscript',
      'toolbar.superscript': 'Superscript',
      'toolbar.removeFormat': 'Remove Formatting',
      'toolbar.findReplace': 'Find & Replace',
      'toolbar.emoji': 'Insert Emoji',
      'toolbar.specialChars': 'Special Characters',
      'toolbar.fullscreen': 'Fullscreen',
      'toolbar.autosave': 'Toggle Autosave',
      'toolbar.themeToggle': 'Change theme',
      'toolbar.print': 'Print',
      'toolbar.code': 'Code',
      'toolbar.insert': 'Insert',
      'toolbar.moreOptions': 'More options',
      'toolbar.decreaseFontSize': 'Decrease font size',
      'toolbar.increaseFontSize': 'Increase font size',

      // Headings select
      'heading.paragraph': 'Paragraph',
      'heading.h1': 'Heading 1',
      'heading.h2': 'Heading 2',
      'heading.h3': 'Heading 3',
      'heading.h4': 'Heading 4',
      'heading.h5': 'Heading 5',
      'heading.h6': 'Heading 6',

      // Font families
      'font.sansSerif': 'Sans Serif',
      'font.serif': 'Serif',
      'font.monospace': 'Monospace',
      'font.cursive': 'Cursive',

      // Insert dropdown
      'insert.link': 'Link',
      'insert.image': 'Image',
      'insert.video': 'Video',
      'insert.table': 'Table',
      'insert.emoji': 'Emoji',
      'insert.symbol': 'Symbol',

      // More menu
      'menu.save': 'Save',
      'menu.preview': 'Preview',
      'menu.download': 'Download',
      'menu.print': 'Print',
      'menu.autosave': 'Autosave',
      'menu.clearAll': 'Clear all',
      'menu.toggleTheme': 'Change theme',
      'menu.fullscreen': 'Fullscreen',
      'menu.help': 'Help',
      'theme.light': 'Light',
      'theme.dark': 'Dark',
      'theme.blue': 'Blue',
      'theme.darkBlue': 'Dark Blue',
      'theme.midnight': 'Midnight',
      'theme.void': 'Void',
      'theme.autumn': 'Autumn',

      // Help modal
      'help.author': 'Author',
      'help.version': 'Version',
      'help.github': 'GitHub',
      'help.documentation': 'Documentation',

      // Link modal
      'modal.insertLink': 'Insert Link',
      'modal.url': 'URL',
      'modal.text': 'Text',
      'modal.linkText': 'Link text',
      'modal.openInNewTab': 'Open in new tab',
      'modal.cancel': 'Cancel',
      'modal.insert': 'Insert',

      // Image modal
      'modal.insertImage': 'Insert Image',
      'modal.uploadImage': 'Upload Image',
      'modal.convertedToBase64': 'Will be converted to base64',
      'modal.handledViaUploader': 'Will be uploaded via handler',
      'modal.uploadingImage': 'Uploading...',
      'modal.uploadError': 'Upload failed. Please try again.',
      'modal.or': 'OR',
      'modal.imageUrl': 'Image URL',
      'modal.altText': 'Alt Text',
      'modal.describeImage': 'Describe the image',
      'modal.widthOptional': 'Width (optional)',
      'modal.invalidImageFile': 'Please select a valid image file.',
      'modal.insertVideo': 'Insert Video',
      'modal.uploadVideo': 'Upload Video',
      'modal.convertedVideoToBase64': 'Will be converted to base64',
      'modal.videoUrl': 'Video URL',
      'modal.videoTitle': 'Video title',
      'modal.describeVideo': 'Describe the video',
      'modal.invalidVideoFile': 'Please select a valid video file.',
      'modal.uploadingVideo': 'Uploading...',
      'modal.videoUploadError': 'Video upload failed. Please try again.',

      // Table modal
      'modal.insertTable': 'Insert Table',
      'modal.rows': 'Rows',
      'modal.columns': 'Columns',
      'modal.includeHeaderRow': 'Include header row',

      // Find & Replace modal
      'modal.findReplace': 'Find & Replace',
      'modal.find': 'Find',
      'modal.searchText': 'Search text...',
      'modal.replaceWith': 'Replace with',
      'modal.replacementText': 'Replacement text...',
      'modal.useRegex': 'Use Regular Expression',
      'modal.caseSensitive': 'Case Sensitive',
      'modal.findNext': 'Find Next',
      'modal.replace': 'Replace',
      'modal.replaceAll': 'Replace All',
      'modal.invalidRegex': 'Invalid regex',
      'modal.matchesFound': '{count} match(es) found',
      'modal.matchOf': 'Match {current} of {total}',
      'modal.matchesRemaining': '{count} match(es) remaining',
      'modal.replacedOccurrences': 'Replaced {count} occurrence(s)',

      // Status bar
      'status.words': 'words',
      'status.word': 'word',
      'status.chars': 'chars',
      'status.char': 'char',

      // Autosave
      'autosave.savedLocally': 'Saved locally',
      'autosave.autosaving': 'Autosaving...',

      // Preview
      'preview.title': 'Document Preview',

      // Clear all
      'confirm.clearAll': 'Clear all content?',

      // Color picker
      'color.reset': 'Reset to default',
      'color.pick': 'Pick a color',
      'color.apply': 'Apply',

      // Image toolbar
      'imageToolbar.replaceImage': 'Replace Image',
      'imageToolbar.deleteImage': 'Delete Image',
      'imageToolbar.dragToMove': 'Drag to move',
      'videoToolbar.replaceVideo': 'Replace Video',
      'videoToolbar.deleteVideo': 'Delete Video',
      'blockToolbar.moveUp': 'Move block up',
      'blockToolbar.moveDown': 'Move block down',
      'blockToolbar.dragToReorder': 'Drag to reorder',

      // Context menu
      'contextMenu.undo': 'Undo',
      'contextMenu.redo': 'Redo',
      'contextMenu.cut': 'Cut',
      'contextMenu.copy': 'Copy',
      'contextMenu.paste': 'Paste',
      'contextMenu.pasteAsPlainText': 'Paste as Plain Text',
      'contextMenu.selectAll': 'Select All',
      'contextMenu.removeFormat': 'Remove Formatting',
      'tableContextMenu.insertRowAbove': 'Insert Row Above',
      'tableContextMenu.insertRowBelow': 'Insert Row Below',
      'tableContextMenu.insertColLeft': 'Insert Column Left',
      'tableContextMenu.insertColRight': 'Insert Column Right',
      'tableContextMenu.deleteRow': 'Delete Row',
      'tableContextMenu.deleteCol': 'Delete Column',
      'tableContextMenu.deleteTable': 'Delete Table',
      'tableContextMenu.mergeCells': 'Merge Cells',
      'tableContextMenu.splitCell': 'Split Cell',

      // Placeholder
      'placeholder': 'Start typing...'
    },
    cs: {
      // Toolbar tooltips
      'toolbar.undo': 'Zpět (Ctrl+Z)',
      'toolbar.redo': 'Znovu (Ctrl+Y)',
      'toolbar.bold': 'Tučné (Ctrl+B)',
      'toolbar.italic': 'Kurzíva (Ctrl+I)',
      'toolbar.underline': 'Podtržené (Ctrl+U)',
      'toolbar.strikethrough': 'Přeškrtnuté',
      'toolbar.heading': 'Nadpis',
      'toolbar.fontSize': 'Velikost písma',
      'toolbar.fontFamily': 'Rodina písma',
      'toolbar.foreColor': 'Barva textu',
      'toolbar.backColor': 'Barva pozadí',
      'toolbar.alignLeft': 'Zarovnat vlevo',
      'toolbar.alignCenter': 'Zarovnat na střed',
      'toolbar.alignRight': 'Zarovnat vpravo',
      'toolbar.alignJustify': 'Do bloku',
      'toolbar.bulletList': 'Odrážkový seznam',
      'toolbar.numberedList': 'Číslovaný seznam',
      'toolbar.indent': 'Zvětšit odsazení',
      'toolbar.outdent': 'Zmenšit odsazení',
      'toolbar.link': 'Vložit odkaz (Ctrl+K)',
      'toolbar.image': 'Vložit obrázek',
      'toolbar.video': 'Vložit video',
      'toolbar.table': 'Vložit tabulku',
      'toolbar.blockquote': 'Citace',
      'toolbar.viewCode': 'Zobrazit kód (HTML)',
      'toolbar.horizontalRule': 'Vodorovná čára',
      'toolbar.subscript': 'Dolní index',
      'toolbar.superscript': 'Horní index',
      'toolbar.removeFormat': 'Odstranit formátování',
      'toolbar.findReplace': 'Najít a nahradit',
      'toolbar.emoji': 'Vložit emoji',
      'toolbar.specialChars': 'Speciální znaky',
      'toolbar.fullscreen': 'Celá obrazovka',
      'toolbar.autosave': 'Auto. ukládání',
      'toolbar.themeToggle': 'Změnit motiv',
      'toolbar.print': 'Tisk',
      'toolbar.code': 'Kód',
      'toolbar.insert': 'Vložit',
      'toolbar.moreOptions': 'Další možnosti',
      'toolbar.decreaseFontSize': 'Zmenšit písmo',
      'toolbar.increaseFontSize': 'Zvětšit písmo',

      // Headings select
      'heading.paragraph': 'Odstavec',
      'heading.h1': 'Nadpis 1',
      'heading.h2': 'Nadpis 2',
      'heading.h3': 'Nadpis 3',
      'heading.h4': 'Nadpis 4',
      'heading.h5': 'Nadpis 5',
      'heading.h6': 'Nadpis 6',

      // Font families
      'font.sansSerif': 'Sans Serif',
      'font.serif': 'Serif',
      'font.monospace': 'Monospace',
      'font.cursive': 'Cursive',

      // Insert dropdown
      'insert.link': 'Odkaz',
      'insert.image': 'Obrázek',
      'insert.video': 'Video',
      'insert.table': 'Tabulka',
      'insert.emoji': 'Emoji',
      'insert.symbol': 'Symbol',

      // More menu
      'menu.save': 'Uložit',
      'menu.preview': 'Náhled',
      'menu.download': 'Stáhnout',
      'menu.print': 'Tisk',
      'menu.autosave': 'Auto. ukládání',
      'menu.clearAll': 'Vymazat vše',
      'menu.toggleTheme': 'Změnit motiv',
      'menu.fullscreen': 'Celá obrazovka',
      'menu.help': 'Nápověda',
      'theme.light': 'Světlý',
      'theme.dark': 'Tmavý',
      'theme.blue': 'Modrý',
      'theme.darkBlue': 'Tmavě modrý',
      'theme.midnight': 'Půlnoc',
      'theme.void': 'Prázdnota',
      'theme.autumn': 'Podzim',
      'help.author': 'Autor',
      'help.version': 'Verze',
      'help.github': 'GitHub',
      'help.documentation': 'Dokumentace',

      // Link modal
      'modal.insertLink': 'Vložit odkaz',
      'modal.url': 'URL',
      'modal.text': 'Text',
      'modal.linkText': 'Text odkazu',
      'modal.openInNewTab': 'Otevřít v nové záložce',
      'modal.cancel': 'Zrušit',
      'modal.insert': 'Vložit',

      // Image modal
      'modal.insertImage': 'Vložit obrázek',
      'modal.uploadImage': 'Nahrát obrázek',
      'modal.convertedToBase64': 'Bude převeden na base64',
      'modal.handledViaUploader': 'Bude nahráno přes handler',
      'modal.uploadingImage': 'Nahrávání...',
      'modal.uploadError': 'Nahrávání selhalo. Zkuste to znovu.',
      'modal.or': 'NEBO',
      'modal.imageUrl': 'URL obrázku',
      'modal.altText': 'Alternativní text',
      'modal.describeImage': 'Popis obrázku',
      'modal.widthOptional': 'Šířka (volitelné)',
      'modal.invalidImageFile': 'Vyberte prosím platný soubor obrázku.',
      'modal.insertVideo': 'Vložit video',
      'modal.uploadVideo': 'Nahrát video',
      'modal.convertedVideoToBase64': 'Bude převedeno na base64',
      'modal.videoUrl': 'URL videa',
      'modal.videoTitle': 'Název videa',
      'modal.describeVideo': 'Popis videa',
      'modal.invalidVideoFile': 'Vyberte prosím platný soubor videa.',
      'modal.uploadingVideo': 'Nahrávání...',
      'modal.videoUploadError': 'Nahrávání videa selhalo. Zkuste to znovu.',

      // Table modal
      'modal.insertTable': 'Vložit tabulku',
      'modal.rows': 'Řádky',
      'modal.columns': 'Sloupce',
      'modal.includeHeaderRow': 'Včetně řádku záhlaví',

      // Find & Replace modal
      'modal.findReplace': 'Najít a nahradit',
      'modal.find': 'Najít',
      'modal.searchText': 'Hledaný text...',
      'modal.replaceWith': 'Nahradit za',
      'modal.replacementText': 'Text náhrady...',
      'modal.useRegex': 'Použít regulární výraz',
      'modal.caseSensitive': 'Rozlišovat velikost písmen',
      'modal.findNext': 'Najít další',
      'modal.replace': 'Nahradit',
      'modal.replaceAll': 'Nahradit vše',
      'modal.invalidRegex': 'Neplatný regulární výraz',
      'modal.matchesFound': 'Nalezeno {count} shod',
      'modal.matchOf': 'Shoda {current} z {total}',
      'modal.matchesRemaining': 'Zbývá {count} shod',
      'modal.replacedOccurrences': 'Nahrazeno {count} výskytů',

      // Status bar
      'status.words': 'slov',
      'status.word': 'slovo',
      'status.chars': 'znaků',
      'status.char': 'znak',

      // Autosave
      'autosave.savedLocally': 'Uloženo lokálně',
      'autosave.autosaving': 'Ukládám...',

      // Preview
      'preview.title': 'Náhled dokumentu',

      // Clear all
      'confirm.clearAll': 'Vymazat veškerý obsah?',
      'color.reset': 'Obnovit výchozí',
      'color.pick': 'Vybrat barvu',
      'color.apply': 'Použít',

      'imageToolbar.replaceImage': 'Nahradit obrázek',
      'imageToolbar.deleteImage': 'Smazat obrázek',
      'imageToolbar.dragToMove': 'Přetáhněte pro přesun',
      'videoToolbar.replaceVideo': 'Nahradit video',
      'videoToolbar.deleteVideo': 'Smazat video',
      'blockToolbar.moveUp': 'Přesunout blok nahoru',
      'blockToolbar.moveDown': 'Přesunout blok dolů',
      'blockToolbar.dragToReorder': 'Přetažením změnit pořadí',

      'contextMenu.undo': 'Zpět',
      'contextMenu.redo': 'Znovu',
      'contextMenu.cut': 'Vyjmout',
      'contextMenu.copy': 'Kopírovat',
      'contextMenu.paste': 'Vložit',
      'contextMenu.pasteAsPlainText': 'Vložit jako čistý text',
      'contextMenu.selectAll': 'Vybrat vše',
      'contextMenu.removeFormat': 'Odstranit formátování',
      'tableContextMenu.insertRowAbove': 'Vložit řádek nad',
      'tableContextMenu.insertRowBelow': 'Vložit řádek pod',
      'tableContextMenu.insertColLeft': 'Vložit sloupec vlevo',
      'tableContextMenu.insertColRight': 'Vložit sloupec vpravo',
      'tableContextMenu.deleteRow': 'Smazat řádek',
      'tableContextMenu.deleteCol': 'Smazat sloupec',
      'tableContextMenu.deleteTable': 'Smazat tabulku',
      'tableContextMenu.mergeCells': 'Sloučit buňky',
      'tableContextMenu.splitCell': 'Rozdělit buňku',

      'placeholder': 'Začněte psát...'
    },
    zh: {
      // Toolbar tooltips
      'toolbar.undo': '撤销 (Ctrl+Z)',
      'toolbar.redo': '重做 (Ctrl+Y)',
      'toolbar.bold': '粗体 (Ctrl+B)',
      'toolbar.italic': '斜体 (Ctrl+I)',
      'toolbar.underline': '下划线 (Ctrl+U)',
      'toolbar.strikethrough': '删除线',
      'toolbar.heading': '标题',
      'toolbar.fontSize': '字体大小',
      'toolbar.fontFamily': '字体',
      'toolbar.foreColor': '文字颜色',
      'toolbar.backColor': '背景颜色',
      'toolbar.alignLeft': '左对齐',
      'toolbar.alignCenter': '居中对齐',
      'toolbar.alignRight': '右对齐',
      'toolbar.alignJustify': '两端对齐',
      'toolbar.bulletList': '无序列表',
      'toolbar.numberedList': '有序列表',
      'toolbar.indent': '增加缩进',
      'toolbar.outdent': '减少缩进',
      'toolbar.link': '插入链接 (Ctrl+K)',
      'toolbar.image': '插入图片',
      'toolbar.video': '插入视频',
      'toolbar.table': '插入表格',
      'toolbar.blockquote': '引用',
      'toolbar.viewCode': '查看代码 (HTML)',
      'toolbar.horizontalRule': '水平线',
      'toolbar.subscript': '下标',
      'toolbar.superscript': '上标',
      'toolbar.removeFormat': '清除格式',
      'toolbar.findReplace': '查找和替换',
      'toolbar.emoji': '插入表情',
      'toolbar.specialChars': '特殊字符',
      'toolbar.fullscreen': '全屏',
      'toolbar.autosave': '自动保存',
      'toolbar.themeToggle': '更改主题',
      'toolbar.print': '打印',
      'toolbar.code': '代码',
      'toolbar.insert': '插入',
      'toolbar.moreOptions': '更多选项',
      'toolbar.decreaseFontSize': '缩小字体',
      'toolbar.increaseFontSize': '增大字体',
      'heading.paragraph': '段落',
      'heading.h1': '标题 1',
      'heading.h2': '标题 2',
      'heading.h3': '标题 3',
      'heading.h4': '标题 4',
      'heading.h5': '标题 5',
      'heading.h6': '标题 6',
      'font.sansSerif': '无衬线',
      'font.serif': '衬线',
      'font.monospace': '等宽',
      'font.cursive': '手写',
      'insert.link': '链接',
      'insert.image': '图片',
      'insert.video': '视频',
      'insert.table': '表格',
      'insert.emoji': '表情',
      'insert.symbol': '符号',
      'menu.save': '保存',
      'menu.preview': '预览',
      'menu.download': '下载',
      'menu.print': '打印',
      'menu.autosave': '自动保存',
      'menu.clearAll': '清除全部',
      'menu.toggleTheme': '更改主题',
      'menu.fullscreen': '全屏',
      'menu.help': '帮助',
      'theme.light': '浅色',
      'theme.dark': '深色',
      'theme.blue': '蓝色',
      'theme.darkBlue': '深蓝色',
      'theme.midnight': '午夜',
      'theme.void': '虚空',
      'theme.autumn': '秋天',
      'help.author': '作者',
      'help.version': '版本',
      'help.github': 'GitHub',
      'help.documentation': '文档',
      'modal.insertLink': '插入链接',
      'modal.url': 'URL',
      'modal.text': '文本',
      'modal.linkText': '链接文字',
      'modal.openInNewTab': '在新标签页中打开',
      'modal.cancel': '取消',
      'modal.insert': '插入',
      'modal.insertImage': '插入图片',
      'modal.uploadImage': '上传图片',
      'modal.convertedToBase64': '将转换为base64',
      'modal.handledViaUploader': '将通过上传处理器上传',
      'modal.uploadingImage': '上传中...',
      'modal.uploadError': '上传失败，请重试。',
      'modal.or': '或',
      'modal.imageUrl': '图片URL',
      'modal.altText': '替代文本',
      'modal.describeImage': '描述图片',
      'modal.widthOptional': '宽度（可选）',
      'modal.invalidImageFile': '请选择有效的图片文件。',
      'modal.insertVideo': '插入视频',
      'modal.uploadVideo': '上传视频',
      'modal.convertedVideoToBase64': '将转换为base64',
      'modal.videoUrl': '视频URL',
      'modal.videoTitle': '视频标题',
      'modal.describeVideo': '描述视频',
      'modal.invalidVideoFile': '请选择有效的视频文件。',
      'modal.uploadingVideo': '上传中...',
      'modal.videoUploadError': '视频上传失败，请重试。',
      'modal.insertTable': '插入表格',
      'modal.rows': '行',
      'modal.columns': '列',
      'modal.includeHeaderRow': '包含标题行',
      'modal.findReplace': '查找和替换',
      'modal.find': '查找',
      'modal.searchText': '搜索文本...',
      'modal.replaceWith': '替换为',
      'modal.replacementText': '替换文本...',
      'modal.useRegex': '使用正则表达式',
      'modal.caseSensitive': '区分大小写',
      'modal.findNext': '查找下一个',
      'modal.replace': '替换',
      'modal.replaceAll': '全部替换',
      'modal.invalidRegex': '无效的正则表达式',
      'modal.matchesFound': '找到 {count} 个匹配',
      'modal.matchOf': '第 {current} 个，共 {total} 个',
      'modal.matchesRemaining': '剩余 {count} 个匹配',
      'modal.replacedOccurrences': '已替换 {count} 处',
      'status.words': '词',
      'status.word': '词',
      'status.chars': '字符',
      'status.char': '字符',
      'autosave.savedLocally': '已本地保存',
      'autosave.autosaving': '正在保存...',
      'preview.title': '文档预览',
      'confirm.clearAll': '清除所有内容？',
      'color.reset': '重置为默认',
      'color.pick': '选择颜色',
      'color.apply': '应用',

      'imageToolbar.replaceImage': '替换图片',
      'imageToolbar.deleteImage': '删除图片',
      'imageToolbar.dragToMove': '拖动移动',
      'videoToolbar.replaceVideo': '替换视频',
      'videoToolbar.deleteVideo': '删除视频',
      'blockToolbar.moveUp': '向上移动块',
      'blockToolbar.moveDown': '向下移动块',
      'blockToolbar.dragToReorder': '拖动以重新排序',

      'contextMenu.undo': '撤销',
      'contextMenu.redo': '重做',
      'contextMenu.cut': '剪切',
      'contextMenu.copy': '复制',
      'contextMenu.paste': '粘贴',
      'contextMenu.pasteAsPlainText': '粘贴为纯文本',
      'contextMenu.selectAll': '全选',
      'contextMenu.removeFormat': '清除格式',
      'tableContextMenu.insertRowAbove': '在上方插入行',
      'tableContextMenu.insertRowBelow': '在下方插入行',
      'tableContextMenu.insertColLeft': '在左侧插入列',
      'tableContextMenu.insertColRight': '在右侧插入列',
      'tableContextMenu.deleteRow': '删除行',
      'tableContextMenu.deleteCol': '删除列',
      'tableContextMenu.deleteTable': '删除表格',
      'tableContextMenu.mergeCells': '合并单元格',
      'tableContextMenu.splitCell': '拆分单元格',

      'placeholder': '开始输入...'
    },
    es: {
      'toolbar.undo': 'Deshacer (Ctrl+Z)',
      'toolbar.redo': 'Rehacer (Ctrl+Y)',
      'toolbar.bold': 'Negrita (Ctrl+B)',
      'toolbar.italic': 'Cursiva (Ctrl+I)',
      'toolbar.underline': 'Subrayado (Ctrl+U)',
      'toolbar.strikethrough': 'Tachado',
      'toolbar.heading': 'Encabezado',
      'toolbar.fontSize': 'Tamaño de fuente',
      'toolbar.fontFamily': 'Familia de fuente',
      'toolbar.foreColor': 'Color de texto',
      'toolbar.backColor': 'Color de fondo',
      'toolbar.alignLeft': 'Alinear a la izquierda',
      'toolbar.alignCenter': 'Centrar',
      'toolbar.alignRight': 'Alinear a la derecha',
      'toolbar.alignJustify': 'Justificar',
      'toolbar.bulletList': 'Lista con viñetas',
      'toolbar.numberedList': 'Lista numerada',
      'toolbar.indent': 'Aumentar sangría',
      'toolbar.outdent': 'Disminuir sangría',
      'toolbar.link': 'Insertar enlace (Ctrl+K)',
      'toolbar.image': 'Insertar imagen',
      'toolbar.video': 'Insertar video',
      'toolbar.table': 'Insertar tabla',
      'toolbar.blockquote': 'Cita',
      'toolbar.viewCode': 'Ver código (HTML)',
      'toolbar.horizontalRule': 'Línea horizontal',
      'toolbar.subscript': 'Subíndice',
      'toolbar.superscript': 'Superíndice',
      'toolbar.removeFormat': 'Eliminar formato',
      'toolbar.findReplace': 'Buscar y reemplazar',
      'toolbar.emoji': 'Insertar emoji',
      'toolbar.specialChars': 'Caracteres especiales',
      'toolbar.fullscreen': 'Pantalla completa',
      'toolbar.autosave': 'Guardado automático',
      'toolbar.themeToggle': 'Cambiar tema',
      'toolbar.print': 'Imprimir',
      'toolbar.code': 'Código',
      'toolbar.insert': 'Insertar',
      'toolbar.moreOptions': 'Más opciones',
      'toolbar.decreaseFontSize': 'Reducir tamaño de fuente',
      'toolbar.increaseFontSize': 'Aumentar tamaño de fuente',
      'heading.paragraph': 'Párrafo',
      'heading.h1': 'Encabezado 1',
      'heading.h2': 'Encabezado 2',
      'heading.h3': 'Encabezado 3',
      'heading.h4': 'Encabezado 4',
      'heading.h5': 'Encabezado 5',
      'heading.h6': 'Encabezado 6',
      'font.sansSerif': 'Sans Serif',
      'font.serif': 'Serif',
      'font.monospace': 'Monospace',
      'font.cursive': 'Cursiva',
      'insert.link': 'Enlace',
      'insert.image': 'Imagen',
      'insert.video': 'Video',
      'insert.table': 'Tabla',
      'insert.emoji': 'Emoji',
      'insert.symbol': 'Símbolo',
      'menu.save': 'Guardar',
      'menu.preview': 'Vista previa',
      'menu.download': 'Descargar',
      'menu.print': 'Imprimir',
      'menu.autosave': 'Guardado automático',
      'menu.clearAll': 'Borrar todo',
      'menu.toggleTheme': 'Cambiar tema',
      'menu.fullscreen': 'Pantalla completa',
      'menu.help': 'Ayuda',
      'theme.light': 'Claro',
      'theme.dark': 'Oscuro',
      'theme.blue': 'Azul',
      'theme.darkBlue': 'Azul oscuro',
      'theme.midnight': 'Medianoche',
      'theme.void': 'Vacío',
      'theme.autumn': 'Otoño',
      'help.author': 'Autor',
      'help.version': 'Versión',
      'help.github': 'GitHub',
      'help.documentation': 'Documentación',
      'modal.insertLink': 'Insertar enlace',
      'modal.url': 'URL',
      'modal.text': 'Texto',
      'modal.linkText': 'Texto del enlace',
      'modal.openInNewTab': 'Abrir en nueva pestaña',
      'modal.cancel': 'Cancelar',
      'modal.insert': 'Insertar',
      'modal.insertImage': 'Insertar imagen',
      'modal.uploadImage': 'Subir imagen',
      'modal.convertedToBase64': 'Se convertirá a base64',
      'modal.handledViaUploader': 'Se subirá a través del handler',
      'modal.uploadingImage': 'Subiendo...',
      'modal.uploadError': 'Error al subir. Inténtelo de nuevo.',
      'modal.or': 'O',
      'modal.imageUrl': 'URL de imagen',
      'modal.altText': 'Texto alternativo',
      'modal.describeImage': 'Describir la imagen',
      'modal.widthOptional': 'Ancho (opcional)',
      'modal.invalidImageFile': 'Por favor, seleccione un archivo de imagen válido.',
      'modal.insertVideo': 'Insertar video',
      'modal.uploadVideo': 'Subir video',
      'modal.convertedVideoToBase64': 'Se convertirá a base64',
      'modal.videoUrl': 'URL de video',
      'modal.videoTitle': 'Título del video',
      'modal.describeVideo': 'Describir el video',
      'modal.invalidVideoFile': 'Por favor, seleccione un archivo de video válido.',
      'modal.uploadingVideo': 'Subiendo...',
      'modal.videoUploadError': 'Error al subir el video. Inténtelo de nuevo.',
      'modal.insertTable': 'Insertar tabla',
      'modal.rows': 'Filas',
      'modal.columns': 'Columnas',
      'modal.includeHeaderRow': 'Incluir fila de encabezado',
      'modal.findReplace': 'Buscar y reemplazar',
      'modal.find': 'Buscar',
      'modal.searchText': 'Texto a buscar...',
      'modal.replaceWith': 'Reemplazar con',
      'modal.replacementText': 'Texto de reemplazo...',
      'modal.useRegex': 'Usar expresión regular',
      'modal.caseSensitive': 'Distinguir mayúsculas',
      'modal.findNext': 'Buscar siguiente',
      'modal.replace': 'Reemplazar',
      'modal.replaceAll': 'Reemplazar todo',
      'modal.invalidRegex': 'Expresión regular no válida',
      'modal.matchesFound': '{count} coincidencia(s) encontrada(s)',
      'modal.matchOf': 'Coincidencia {current} de {total}',
      'modal.matchesRemaining': '{count} coincidencia(s) restante(s)',
      'modal.replacedOccurrences': '{count} ocurrencia(s) reemplazada(s)',
      'status.words': 'palabras',
      'status.word': 'palabra',
      'status.chars': 'caracteres',
      'status.char': 'carácter',
      'autosave.savedLocally': 'Guardado localmente',
      'autosave.autosaving': 'Guardando...',
      'preview.title': 'Vista previa del documento',
      'confirm.clearAll': '¿Borrar todo el contenido?',
      'color.reset': 'Restablecer',
      'color.pick': 'Elegir color',
      'color.apply': 'Aplicar',

      'imageToolbar.replaceImage': 'Reemplazar imagen',
      'imageToolbar.deleteImage': 'Eliminar imagen',
      'imageToolbar.dragToMove': 'Arrastrar para mover',
      'videoToolbar.replaceVideo': 'Reemplazar video',
      'videoToolbar.deleteVideo': 'Eliminar video',
      'blockToolbar.moveUp': 'Mover bloque arriba',
      'blockToolbar.moveDown': 'Mover bloque abajo',
      'blockToolbar.dragToReorder': 'Arrastrar para reordenar',

      'contextMenu.undo': 'Deshacer',
      'contextMenu.redo': 'Rehacer',
      'contextMenu.cut': 'Cortar',
      'contextMenu.copy': 'Copiar',
      'contextMenu.paste': 'Pegar',
      'contextMenu.pasteAsPlainText': 'Pegar como texto sin formato',
      'contextMenu.selectAll': 'Seleccionar todo',
      'contextMenu.removeFormat': 'Quitar formato',
      'tableContextMenu.insertRowAbove': 'Insertar fila arriba',
      'tableContextMenu.insertRowBelow': 'Insertar fila abajo',
      'tableContextMenu.insertColLeft': 'Insertar columna a la izquierda',
      'tableContextMenu.insertColRight': 'Insertar columna a la derecha',
      'tableContextMenu.deleteRow': 'Eliminar fila',
      'tableContextMenu.deleteCol': 'Eliminar columna',
      'tableContextMenu.deleteTable': 'Eliminar tabla',
      'tableContextMenu.mergeCells': 'Combinar celdas',
      'tableContextMenu.splitCell': 'Dividir celda',

      'placeholder': 'Empiece a escribir...'
    },
    de: {
      'toolbar.undo': 'Rückgängig (Strg+Z)',
      'toolbar.redo': 'Wiederholen (Strg+Y)',
      'toolbar.bold': 'Fett (Strg+B)',
      'toolbar.italic': 'Kursiv (Strg+I)',
      'toolbar.underline': 'Unterstrichen (Strg+U)',
      'toolbar.strikethrough': 'Durchgestrichen',
      'toolbar.heading': 'Überschrift',
      'toolbar.fontSize': 'Schriftgröße',
      'toolbar.fontFamily': 'Schriftart',
      'toolbar.foreColor': 'Textfarbe',
      'toolbar.backColor': 'Hintergrundfarbe',
      'toolbar.alignLeft': 'Linksbündig',
      'toolbar.alignCenter': 'Zentriert',
      'toolbar.alignRight': 'Rechtsbündig',
      'toolbar.alignJustify': 'Blocksatz',
      'toolbar.bulletList': 'Aufzählungsliste',
      'toolbar.numberedList': 'Nummerierte Liste',
      'toolbar.indent': 'Einzug vergrößern',
      'toolbar.outdent': 'Einzug verkleinern',
      'toolbar.link': 'Link einfügen (Strg+K)',
      'toolbar.image': 'Bild einfügen',
      'toolbar.video': 'Video einfügen',
      'toolbar.table': 'Tabelle einfügen',
      'toolbar.blockquote': 'Zitat',
      'toolbar.viewCode': 'Code anzeigen (HTML)',
      'toolbar.horizontalRule': 'Horizontale Linie',
      'toolbar.subscript': 'Tiefgestellt',
      'toolbar.superscript': 'Hochgestellt',
      'toolbar.removeFormat': 'Formatierung entfernen',
      'toolbar.findReplace': 'Suchen und Ersetzen',
      'toolbar.emoji': 'Emoji einfügen',
      'toolbar.specialChars': 'Sonderzeichen',
      'toolbar.fullscreen': 'Vollbild',
      'toolbar.autosave': 'Automatisch speichern',
      'toolbar.themeToggle': 'Design ändern',
      'toolbar.print': 'Drucken',
      'toolbar.code': 'Code',
      'toolbar.insert': 'Einfügen',
      'toolbar.moreOptions': 'Weitere Optionen',
      'toolbar.decreaseFontSize': 'Schrift verkleinern',
      'toolbar.increaseFontSize': 'Schrift vergrößern',
      'heading.paragraph': 'Absatz',
      'heading.h1': 'Überschrift 1',
      'heading.h2': 'Überschrift 2',
      'heading.h3': 'Überschrift 3',
      'heading.h4': 'Überschrift 4',
      'heading.h5': 'Überschrift 5',
      'heading.h6': 'Überschrift 6',
      'font.sansSerif': 'Sans Serif',
      'font.serif': 'Serif',
      'font.monospace': 'Monospace',
      'font.cursive': 'Schreibschrift',
      'insert.link': 'Link',
      'insert.image': 'Bild',
      'insert.video': 'Video',
      'insert.table': 'Tabelle',
      'insert.emoji': 'Emoji',
      'insert.symbol': 'Symbol',
      'menu.save': 'Speichern',
      'menu.preview': 'Vorschau',
      'menu.download': 'Herunterladen',
      'menu.print': 'Drucken',
      'menu.autosave': 'Automatisch speichern',
      'menu.clearAll': 'Alles löschen',
      'menu.toggleTheme': 'Design ändern',
      'menu.fullscreen': 'Vollbild',
      'menu.help': 'Hilfe',
      'theme.light': 'Hell',
      'theme.dark': 'Dunkel',
      'theme.blue': 'Blau',
      'theme.darkBlue': 'Dunkelblau',
      'theme.midnight': 'Mitternacht',
      'theme.void': 'Leere',
      'theme.autumn': 'Herbst',
      'help.author': 'Autor',
      'help.version': 'Version',
      'help.github': 'GitHub',
      'help.documentation': 'Dokumentation',
      'modal.insertLink': 'Link einfügen',
      'modal.url': 'URL',
      'modal.text': 'Text',
      'modal.linkText': 'Linktext',
      'modal.openInNewTab': 'In neuem Tab öffnen',
      'modal.cancel': 'Abbrechen',
      'modal.insert': 'Einfügen',
      'modal.insertImage': 'Bild einfügen',
      'modal.uploadImage': 'Bild hochladen',
      'modal.convertedToBase64': 'Wird in Base64 konvertiert',
      'modal.handledViaUploader': 'Wird über Handler hochgeladen',
      'modal.uploadingImage': 'Hochladen...',
      'modal.uploadError': 'Upload fehlgeschlagen. Bitte versuchen Sie es erneut.',
      'modal.or': 'ODER',
      'modal.imageUrl': 'Bild-URL',
      'modal.altText': 'Alternativtext',
      'modal.describeImage': 'Bild beschreiben',
      'modal.widthOptional': 'Breite (optional)',
      'modal.invalidImageFile': 'Bitte wählen Sie eine gültige Bilddatei.',
      'modal.insertVideo': 'Video einfügen',
      'modal.uploadVideo': 'Video hochladen',
      'modal.convertedVideoToBase64': 'Wird in Base64 konvertiert',
      'modal.videoUrl': 'Video-URL',
      'modal.videoTitle': 'Videotitel',
      'modal.describeVideo': 'Video beschreiben',
      'modal.invalidVideoFile': 'Bitte wählen Sie eine gültige Videodatei.',
      'modal.uploadingVideo': 'Hochladen...',
      'modal.videoUploadError': 'Video-Upload fehlgeschlagen. Bitte versuchen Sie es erneut.',
      'modal.insertTable': 'Tabelle einfügen',
      'modal.rows': 'Zeilen',
      'modal.columns': 'Spalten',
      'modal.includeHeaderRow': 'Kopfzeile einfügen',
      'modal.findReplace': 'Suchen und Ersetzen',
      'modal.find': 'Suchen',
      'modal.searchText': 'Suchtext...',
      'modal.replaceWith': 'Ersetzen durch',
      'modal.replacementText': 'Ersatztext...',
      'modal.useRegex': 'Regulären Ausdruck verwenden',
      'modal.caseSensitive': 'Groß-/Kleinschreibung beachten',
      'modal.findNext': 'Weitersuchen',
      'modal.replace': 'Ersetzen',
      'modal.replaceAll': 'Alle ersetzen',
      'modal.invalidRegex': 'Ungültiger regulärer Ausdruck',
      'modal.matchesFound': '{count} Treffer gefunden',
      'modal.matchOf': 'Treffer {current} von {total}',
      'modal.matchesRemaining': '{count} Treffer verbleibend',
      'modal.replacedOccurrences': '{count} Vorkommen ersetzt',
      'status.words': 'Wörter',
      'status.word': 'Wort',
      'status.chars': 'Zeichen',
      'status.char': 'Zeichen',
      'autosave.savedLocally': 'Lokal gespeichert',
      'autosave.autosaving': 'Speichern...',
      'preview.title': 'Dokumentvorschau',
      'confirm.clearAll': 'Gesamten Inhalt löschen?',
      'color.reset': 'Zurücksetzen',
      'color.pick': 'Farbe wählen',
      'color.apply': 'Anwenden',

      'imageToolbar.replaceImage': 'Bild ersetzen',
      'imageToolbar.deleteImage': 'Bild löschen',
      'imageToolbar.dragToMove': 'Ziehen zum Verschieben',
      'videoToolbar.replaceVideo': 'Video ersetzen',
      'videoToolbar.deleteVideo': 'Video löschen',
      'blockToolbar.moveUp': 'Block nach oben verschieben',
      'blockToolbar.moveDown': 'Block nach unten verschieben',
      'blockToolbar.dragToReorder': 'Zum Neuordnen ziehen',

      'contextMenu.undo': 'Rückgängig',
      'contextMenu.redo': 'Wiederholen',
      'contextMenu.cut': 'Ausschneiden',
      'contextMenu.copy': 'Kopieren',
      'contextMenu.paste': 'Einfügen',
      'contextMenu.pasteAsPlainText': 'Als reinen Text einfügen',
      'contextMenu.selectAll': 'Alles auswählen',
      'contextMenu.removeFormat': 'Formatierung entfernen',
      'tableContextMenu.insertRowAbove': 'Zeile oberhalb einfügen',
      'tableContextMenu.insertRowBelow': 'Zeile unterhalb einfügen',
      'tableContextMenu.insertColLeft': 'Spalte links einfügen',
      'tableContextMenu.insertColRight': 'Spalte rechts einfügen',
      'tableContextMenu.deleteRow': 'Zeile löschen',
      'tableContextMenu.deleteCol': 'Spalte löschen',
      'tableContextMenu.deleteTable': 'Tabelle löschen',
      'tableContextMenu.mergeCells': 'Zellen verbinden',
      'tableContextMenu.splitCell': 'Zelle teilen',

      'placeholder': 'Hier schreiben...'
    },
    fr: {
      'toolbar.undo': 'Annuler (Ctrl+Z)',
      'toolbar.redo': 'Rétablir (Ctrl+Y)',
      'toolbar.bold': 'Gras (Ctrl+B)',
      'toolbar.italic': 'Italique (Ctrl+I)',
      'toolbar.underline': 'Souligné (Ctrl+U)',
      'toolbar.strikethrough': 'Barré',
      'toolbar.heading': 'Titre',
      'toolbar.fontSize': 'Taille de police',
      'toolbar.fontFamily': 'Police',
      'toolbar.foreColor': 'Couleur du texte',
      'toolbar.backColor': 'Couleur de fond',
      'toolbar.alignLeft': 'Aligner à gauche',
      'toolbar.alignCenter': 'Centrer',
      'toolbar.alignRight': 'Aligner à droite',
      'toolbar.alignJustify': 'Justifier',
      'toolbar.bulletList': 'Liste à puces',
      'toolbar.numberedList': 'Liste numérotée',
      'toolbar.indent': 'Augmenter le retrait',
      'toolbar.outdent': 'Diminuer le retrait',
      'toolbar.link': 'Insérer un lien (Ctrl+K)',
      'toolbar.image': 'Insérer une image',
      'toolbar.video': 'Insérer une vidéo',
      'toolbar.table': 'Insérer un tableau',
      'toolbar.blockquote': 'Citation',
      'toolbar.viewCode': 'Voir le code (HTML)',
      'toolbar.horizontalRule': 'Ligne horizontale',
      'toolbar.subscript': 'Indice',
      'toolbar.superscript': 'Exposant',
      'toolbar.removeFormat': 'Supprimer la mise en forme',
      'toolbar.findReplace': 'Rechercher et remplacer',
      'toolbar.emoji': 'Insérer un emoji',
      'toolbar.specialChars': 'Caractères spéciaux',
      'toolbar.fullscreen': 'Plein écran',
      'toolbar.autosave': 'Sauvegarde automatique',
      'toolbar.themeToggle': 'Changer de thème',
      'toolbar.print': 'Imprimer',
      'toolbar.code': 'Code',
      'toolbar.insert': 'Insérer',
      'toolbar.moreOptions': 'Plus d\'options',
      'toolbar.decreaseFontSize': 'Réduire la taille de police',
      'toolbar.increaseFontSize': 'Augmenter la taille de police',
      'heading.paragraph': 'Paragraphe',
      'heading.h1': 'Titre 1',
      'heading.h2': 'Titre 2',
      'heading.h3': 'Titre 3',
      'heading.h4': 'Titre 4',
      'heading.h5': 'Titre 5',
      'heading.h6': 'Titre 6',
      'font.sansSerif': 'Sans Serif',
      'font.serif': 'Serif',
      'font.monospace': 'Monospace',
      'font.cursive': 'Cursive',
      'insert.link': 'Lien',
      'insert.image': 'Image',
      'insert.video': 'Vidéo',
      'insert.table': 'Tableau',
      'insert.emoji': 'Emoji',
      'insert.symbol': 'Symbole',
      'menu.save': 'Enregistrer',
      'menu.preview': 'Aperçu',
      'menu.download': 'Télécharger',
      'menu.print': 'Imprimer',
      'menu.autosave': 'Sauvegarde auto',
      'menu.clearAll': 'Tout effacer',
      'menu.toggleTheme': 'Changer de thème',
      'menu.fullscreen': 'Plein écran',
      'menu.help': 'Aide',
      'theme.light': 'Clair',
      'theme.dark': 'Sombre',
      'theme.blue': 'Bleu',
      'theme.darkBlue': 'Bleu foncé',
      'theme.midnight': 'Minuit',
      'theme.void': 'Néant',
      'theme.autumn': 'Automne',
      'help.author': 'Auteur',
      'help.version': 'Version',
      'help.github': 'GitHub',
      'help.documentation': 'Documentation',
      'modal.insertLink': 'Insérer un lien',
      'modal.url': 'URL',
      'modal.text': 'Texte',
      'modal.linkText': 'Texte du lien',
      'modal.openInNewTab': 'Ouvrir dans un nouvel onglet',
      'modal.cancel': 'Annuler',
      'modal.insert': 'Insérer',
      'modal.insertImage': 'Insérer une image',
      'modal.uploadImage': 'Téléverser une image',
      'modal.convertedToBase64': 'Sera converti en base64',
      'modal.handledViaUploader': 'Sera téléversé via le handler',
      'modal.uploadingImage': 'Téléversement...',
      'modal.uploadError': 'Échec du téléversement. Veuillez réessayer.',
      'modal.or': 'OU',
      'modal.imageUrl': 'URL de l\'image',
      'modal.altText': 'Texte alternatif',
      'modal.describeImage': 'Décrire l\'image',
      'modal.widthOptional': 'Largeur (optionnel)',
      'modal.invalidImageFile': 'Veuillez sélectionner un fichier image valide.',
      'modal.insertVideo': 'Insérer une vidéo',
      'modal.uploadVideo': 'Téléverser une vidéo',
      'modal.convertedVideoToBase64': 'Sera converti en base64',
      'modal.videoUrl': 'URL de la vidéo',
      'modal.videoTitle': 'Titre de la vidéo',
      'modal.describeVideo': 'Décrire la vidéo',
      'modal.invalidVideoFile': 'Veuillez sélectionner un fichier vidéo valide.',
      'modal.uploadingVideo': 'Téléversement...',
      'modal.videoUploadError': 'Échec du téléversement de la vidéo. Veuillez réessayer.',
      'modal.insertTable': 'Insérer un tableau',
      'modal.rows': 'Lignes',
      'modal.columns': 'Colonnes',
      'modal.includeHeaderRow': 'Inclure la ligne d\'en-tête',
      'modal.findReplace': 'Rechercher et remplacer',
      'modal.find': 'Rechercher',
      'modal.searchText': 'Texte à rechercher...',
      'modal.replaceWith': 'Remplacer par',
      'modal.replacementText': 'Texte de remplacement...',
      'modal.useRegex': 'Utiliser une expression régulière',
      'modal.caseSensitive': 'Sensible à la casse',
      'modal.findNext': 'Suivant',
      'modal.replace': 'Remplacer',
      'modal.replaceAll': 'Tout remplacer',
      'modal.invalidRegex': 'Expression régulière invalide',
      'modal.matchesFound': '{count} correspondance(s) trouvée(s)',
      'modal.matchOf': 'Correspondance {current} sur {total}',
      'modal.matchesRemaining': '{count} correspondance(s) restante(s)',
      'modal.replacedOccurrences': '{count} occurrence(s) remplacée(s)',
      'status.words': 'mots',
      'status.word': 'mot',
      'status.chars': 'caractères',
      'status.char': 'caractère',
      'autosave.savedLocally': 'Enregistré localement',
      'autosave.autosaving': 'Enregistrement...',
      'preview.title': 'Aperçu du document',
      'confirm.clearAll': 'Effacer tout le contenu ?',
      'color.reset': 'Réinitialiser',
      'color.pick': 'Choisir une couleur',
      'color.apply': 'Appliquer',

      'imageToolbar.replaceImage': 'Remplacer l\'image',
      'imageToolbar.deleteImage': 'Supprimer l\'image',
      'imageToolbar.dragToMove': 'Glisser pour déplacer',
      'videoToolbar.replaceVideo': 'Remplacer la vidéo',
      'videoToolbar.deleteVideo': 'Supprimer la vidéo',
      'blockToolbar.moveUp': 'Déplacer le bloc vers le haut',
      'blockToolbar.moveDown': 'Déplacer le bloc vers le bas',
      'blockToolbar.dragToReorder': 'Glisser pour réorganiser',

      'contextMenu.undo': 'Annuler',
      'contextMenu.redo': 'Rétablir',
      'contextMenu.cut': 'Couper',
      'contextMenu.copy': 'Copier',
      'contextMenu.paste': 'Coller',
      'contextMenu.pasteAsPlainText': 'Coller comme texte brut',
      'contextMenu.selectAll': 'Tout sélectionner',
      'contextMenu.removeFormat': 'Effacer la mise en forme',
      'tableContextMenu.insertRowAbove': 'Insérer une ligne au-dessus',
      'tableContextMenu.insertRowBelow': 'Insérer une ligne en dessous',
      'tableContextMenu.insertColLeft': 'Insérer une colonne à gauche',
      'tableContextMenu.insertColRight': 'Insérer une colonne à droite',
      'tableContextMenu.deleteRow': 'Supprimer la ligne',
      'tableContextMenu.deleteCol': 'Supprimer la colonne',
      'tableContextMenu.deleteTable': 'Supprimer le tableau',
      'tableContextMenu.mergeCells': 'Fusionner les cellules',
      'tableContextMenu.splitCell': 'Diviser la cellule',

      'placeholder': 'Commencez à écrire...'
    },
    pt: {
      'toolbar.undo': 'Desfazer (Ctrl+Z)',
      'toolbar.redo': 'Refazer (Ctrl+Y)',
      'toolbar.bold': 'Negrito (Ctrl+B)',
      'toolbar.italic': 'Itálico (Ctrl+I)',
      'toolbar.underline': 'Sublinhado (Ctrl+U)',
      'toolbar.strikethrough': 'Tachado',
      'toolbar.heading': 'Título',
      'toolbar.fontSize': 'Tamanho da fonte',
      'toolbar.fontFamily': 'Família da fonte',
      'toolbar.foreColor': 'Cor do texto',
      'toolbar.backColor': 'Cor de fundo',
      'toolbar.alignLeft': 'Alinhar à esquerda',
      'toolbar.alignCenter': 'Centralizar',
      'toolbar.alignRight': 'Alinhar à direita',
      'toolbar.alignJustify': 'Justificar',
      'toolbar.bulletList': 'Lista com marcadores',
      'toolbar.numberedList': 'Lista numerada',
      'toolbar.indent': 'Aumentar recuo',
      'toolbar.outdent': 'Diminuir recuo',
      'toolbar.link': 'Inserir link (Ctrl+K)',
      'toolbar.image': 'Inserir imagem',
      'toolbar.video': 'Inserir vídeo',
      'toolbar.table': 'Inserir tabela',
      'toolbar.blockquote': 'Citação',
      'toolbar.viewCode': 'Ver código (HTML)',
      'toolbar.horizontalRule': 'Linha horizontal',
      'toolbar.subscript': 'Subscrito',
      'toolbar.superscript': 'Sobrescrito',
      'toolbar.removeFormat': 'Remover formatação',
      'toolbar.findReplace': 'Localizar e substituir',
      'toolbar.emoji': 'Inserir emoji',
      'toolbar.specialChars': 'Caracteres especiais',
      'toolbar.fullscreen': 'Tela cheia',
      'toolbar.autosave': 'Salvamento automático',
      'toolbar.themeToggle': 'Alterar tema',
      'toolbar.print': 'Imprimir',
      'toolbar.code': 'Código',
      'toolbar.insert': 'Inserir',
      'toolbar.moreOptions': 'Mais opções',
      'toolbar.decreaseFontSize': 'Diminuir fonte',
      'toolbar.increaseFontSize': 'Aumentar fonte',
      'heading.paragraph': 'Parágrafo',
      'heading.h1': 'Título 1',
      'heading.h2': 'Título 2',
      'heading.h3': 'Título 3',
      'heading.h4': 'Título 4',
      'heading.h5': 'Título 5',
      'heading.h6': 'Título 6',
      'font.sansSerif': 'Sans Serif',
      'font.serif': 'Serif',
      'font.monospace': 'Monospace',
      'font.cursive': 'Cursiva',
      'insert.link': 'Link',
      'insert.image': 'Imagem',
      'insert.video': 'Vídeo',
      'insert.table': 'Tabela',
      'insert.emoji': 'Emoji',
      'insert.symbol': 'Símbolo',
      'menu.save': 'Salvar',
      'menu.preview': 'Visualizar',
      'menu.download': 'Baixar',
      'menu.print': 'Imprimir',
      'menu.autosave': 'Salvamento automático',
      'menu.clearAll': 'Limpar tudo',
      'menu.toggleTheme': 'Alterar tema',
      'menu.fullscreen': 'Tela cheia',
      'menu.help': 'Ajuda',
      'theme.light': 'Claro',
      'theme.dark': 'Escuro',
      'theme.blue': 'Azul',
      'theme.darkBlue': 'Azul escuro',
      'theme.midnight': 'Meia-noite',
      'theme.void': 'Vazio',
      'theme.autumn': 'Outono',
      'help.author': 'Autor',
      'help.version': 'Versão',
      'help.github': 'GitHub',
      'help.documentation': 'Documentação',
      'modal.insertLink': 'Inserir link',
      'modal.url': 'URL',
      'modal.text': 'Texto',
      'modal.linkText': 'Texto do link',
      'modal.openInNewTab': 'Abrir em nova aba',
      'modal.cancel': 'Cancelar',
      'modal.insert': 'Inserir',
      'modal.insertImage': 'Inserir imagem',
      'modal.uploadImage': 'Enviar imagem',
      'modal.convertedToBase64': 'Será convertido para base64',
      'modal.handledViaUploader': 'Será enviado via handler',
      'modal.uploadingImage': 'Enviando...',
      'modal.uploadError': 'Falha no envio. Tente novamente.',
      'modal.or': 'OU',
      'modal.imageUrl': 'URL da imagem',
      'modal.altText': 'Texto alternativo',
      'modal.describeImage': 'Descrever a imagem',
      'modal.widthOptional': 'Largura (opcional)',
      'modal.invalidImageFile': 'Por favor, selecione um arquivo de imagem válido.',
      'modal.insertVideo': 'Inserir vídeo',
      'modal.uploadVideo': 'Enviar vídeo',
      'modal.convertedVideoToBase64': 'Será convertido para base64',
      'modal.videoUrl': 'URL do vídeo',
      'modal.videoTitle': 'Título do vídeo',
      'modal.describeVideo': 'Descrever o vídeo',
      'modal.invalidVideoFile': 'Por favor, selecione um arquivo de vídeo válido.',
      'modal.uploadingVideo': 'Enviando...',
      'modal.videoUploadError': 'Falha no envio do vídeo. Tente novamente.',
      'modal.insertTable': 'Inserir tabela',
      'modal.rows': 'Linhas',
      'modal.columns': 'Colunas',
      'modal.includeHeaderRow': 'Incluir linha de cabeçalho',
      'modal.findReplace': 'Localizar e substituir',
      'modal.find': 'Localizar',
      'modal.searchText': 'Texto a localizar...',
      'modal.replaceWith': 'Substituir por',
      'modal.replacementText': 'Texto de substituição...',
      'modal.useRegex': 'Usar expressão regular',
      'modal.caseSensitive': 'Diferenciar maiúsculas',
      'modal.findNext': 'Localizar próximo',
      'modal.replace': 'Substituir',
      'modal.replaceAll': 'Substituir tudo',
      'modal.invalidRegex': 'Expressão regular inválida',
      'modal.matchesFound': '{count} correspondência(s) encontrada(s)',
      'modal.matchOf': 'Correspondência {current} de {total}',
      'modal.matchesRemaining': '{count} correspondência(s) restante(s)',
      'modal.replacedOccurrences': '{count} ocorrência(s) substituída(s)',
      'status.words': 'palavras',
      'status.word': 'palavra',
      'status.chars': 'caracteres',
      'status.char': 'caractere',
      'autosave.savedLocally': 'Salvo localmente',
      'autosave.autosaving': 'Salvando...',
      'preview.title': 'Visualização do documento',
      'confirm.clearAll': 'Limpar todo o conteúdo?',
      'color.reset': 'Redefinir',
      'color.pick': 'Escolher cor',
      'color.apply': 'Aplicar',

      'imageToolbar.replaceImage': 'Substituir imagem',
      'imageToolbar.deleteImage': 'Excluir imagem',
      'imageToolbar.dragToMove': 'Arraste para mover',
      'videoToolbar.replaceVideo': 'Substituir vídeo',
      'videoToolbar.deleteVideo': 'Excluir vídeo',
      'blockToolbar.moveUp': 'Mover bloco para cima',
      'blockToolbar.moveDown': 'Mover bloco para baixo',
      'blockToolbar.dragToReorder': 'Arraste para reordenar',

      'contextMenu.undo': 'Desfazer',
      'contextMenu.redo': 'Refazer',
      'contextMenu.cut': 'Recortar',
      'contextMenu.copy': 'Copiar',
      'contextMenu.paste': 'Colar',
      'contextMenu.pasteAsPlainText': 'Colar como texto simples',
      'contextMenu.selectAll': 'Selecionar tudo',
      'contextMenu.removeFormat': 'Remover formatação',
      'tableContextMenu.insertRowAbove': 'Inserir linha acima',
      'tableContextMenu.insertRowBelow': 'Inserir linha abaixo',
      'tableContextMenu.insertColLeft': 'Inserir coluna à esquerda',
      'tableContextMenu.insertColRight': 'Inserir coluna à direita',
      'tableContextMenu.deleteRow': 'Excluir linha',
      'tableContextMenu.deleteCol': 'Excluir coluna',
      'tableContextMenu.deleteTable': 'Excluir tabela',
      'tableContextMenu.mergeCells': 'Mesclar células',
      'tableContextMenu.splitCell': 'Dividir célula',

      'placeholder': 'Comece a digitar...'
    },
    ja: {
      'toolbar.undo': '元に戻す (Ctrl+Z)',
      'toolbar.redo': 'やり直し (Ctrl+Y)',
      'toolbar.bold': '太字 (Ctrl+B)',
      'toolbar.italic': '斜体 (Ctrl+I)',
      'toolbar.underline': '下線 (Ctrl+U)',
      'toolbar.strikethrough': '取り消し線',
      'toolbar.heading': '見出し',
      'toolbar.fontSize': 'フォントサイズ',
      'toolbar.fontFamily': 'フォント',
      'toolbar.foreColor': '文字色',
      'toolbar.backColor': '背景色',
      'toolbar.alignLeft': '左揃え',
      'toolbar.alignCenter': '中央揃え',
      'toolbar.alignRight': '右揃え',
      'toolbar.alignJustify': '両端揃え',
      'toolbar.bulletList': '箇条書き',
      'toolbar.numberedList': '番号付きリスト',
      'toolbar.indent': 'インデント増',
      'toolbar.outdent': 'インデント減',
      'toolbar.link': 'リンク挿入 (Ctrl+K)',
      'toolbar.image': '画像挿入',
      'toolbar.video': '動画挿入',
      'toolbar.table': '表挿入',
      'toolbar.blockquote': '引用',
      'toolbar.viewCode': 'コード表示 (HTML)',
      'toolbar.horizontalRule': '水平線',
      'toolbar.subscript': '下付き',
      'toolbar.superscript': '上付き',
      'toolbar.removeFormat': '書式解除',
      'toolbar.findReplace': '検索と置換',
      'toolbar.emoji': '絵文字挿入',
      'toolbar.specialChars': '特殊文字',
      'toolbar.fullscreen': '全画面',
      'toolbar.autosave': '自動保存',
      'toolbar.themeToggle': 'テーマを変更',
      'toolbar.print': '印刷',
      'toolbar.code': 'コード',
      'toolbar.insert': '挿入',
      'toolbar.moreOptions': 'その他',
      'toolbar.decreaseFontSize': 'フォント縮小',
      'toolbar.increaseFontSize': 'フォント拡大',
      'heading.paragraph': '段落',
      'heading.h1': '見出し 1',
      'heading.h2': '見出し 2',
      'heading.h3': '見出し 3',
      'heading.h4': '見出し 4',
      'heading.h5': '見出し 5',
      'heading.h6': '見出し 6',
      'font.sansSerif': 'ゴシック',
      'font.serif': '明朝',
      'font.monospace': '等幅',
      'font.cursive': '手書き',
      'insert.link': 'リンク',
      'insert.image': '画像',
      'insert.video': '動画',
      'insert.table': '表',
      'insert.emoji': '絵文字',
      'insert.symbol': '記号',
      'menu.save': '保存',
      'menu.preview': 'プレビュー',
      'menu.download': 'ダウンロード',
      'menu.print': '印刷',
      'menu.autosave': '自動保存',
      'menu.clearAll': 'すべて消去',
      'menu.toggleTheme': 'テーマを変更',
      'menu.fullscreen': '全画面',
      'menu.help': 'ヘルプ',
      'theme.light': 'ライト',
      'theme.dark': 'ダーク',
      'theme.blue': 'ブルー',
      'theme.darkBlue': 'ダークブルー',
      'theme.midnight': 'ミッドナイト',
      'theme.void': 'ヴォイド',
      'theme.autumn': 'オータム',
      'help.author': '作成者',
      'help.version': 'バージョン',
      'help.github': 'GitHub',
      'help.documentation': 'ドキュメント',
      'modal.insertLink': 'リンク挿入',
      'modal.url': 'URL',
      'modal.text': 'テキスト',
      'modal.linkText': 'リンクテキスト',
      'modal.openInNewTab': '新しいタブで開く',
      'modal.cancel': 'キャンセル',
      'modal.insert': '挿入',
      'modal.insertImage': '画像挿入',
      'modal.uploadImage': '画像アップロード',
      'modal.convertedToBase64': 'Base64に変換されます',
      'modal.handledViaUploader': 'ハンドラー経由でアップロードされます',
      'modal.uploadingImage': 'アップロード中...',
      'modal.uploadError': 'アップロードに失敗しました。もう一度お試しください。',
      'modal.or': 'または',
      'modal.imageUrl': '画像URL',
      'modal.altText': '代替テキスト',
      'modal.describeImage': '画像の説明',
      'modal.widthOptional': '幅（任意）',
      'modal.invalidImageFile': '有効な画像ファイルを選択してください。',
      'modal.insertVideo': '動画挿入',
      'modal.uploadVideo': '動画アップロード',
      'modal.convertedVideoToBase64': 'Base64に変換されます',
      'modal.videoUrl': '動画URL',
      'modal.videoTitle': '動画タイトル',
      'modal.describeVideo': '動画の説明',
      'modal.invalidVideoFile': '有効な動画ファイルを選択してください。',
      'modal.uploadingVideo': 'アップロード中...',
      'modal.videoUploadError': '動画のアップロードに失敗しました。もう一度お試しください。',
      'modal.insertTable': '表挿入',
      'modal.rows': '行',
      'modal.columns': '列',
      'modal.includeHeaderRow': 'ヘッダー行を含む',
      'modal.findReplace': '検索と置換',
      'modal.find': '検索',
      'modal.searchText': '検索テキスト...',
      'modal.replaceWith': '置換後',
      'modal.replacementText': '置換テキスト...',
      'modal.useRegex': '正規表現を使用',
      'modal.caseSensitive': '大文字小文字を区別',
      'modal.findNext': '次を検索',
      'modal.replace': '置換',
      'modal.replaceAll': 'すべて置換',
      'modal.invalidRegex': '無効な正規表現',
      'modal.matchesFound': '{count} 件見つかりました',
      'modal.matchOf': '{total} 件中 {current} 件目',
      'modal.matchesRemaining': '残り {count} 件',
      'modal.replacedOccurrences': '{count} 件を置換しました',
      'status.words': '語',
      'status.word': '語',
      'status.chars': '文字',
      'status.char': '文字',
      'autosave.savedLocally': 'ローカルに保存済み',
      'autosave.autosaving': '保存中...',
      'preview.title': 'ドキュメントプレビュー',
      'confirm.clearAll': 'すべての内容を消去しますか？',
      'color.reset': 'デフォルトに戻す',
      'color.pick': '色を選択',
      'color.apply': '適用',

      'imageToolbar.replaceImage': '画像を置換',
      'imageToolbar.deleteImage': '画像を削除',
      'imageToolbar.dragToMove': 'ドラッグで移動',
      'videoToolbar.replaceVideo': '動画を置換',
      'videoToolbar.deleteVideo': '動画を削除',
      'blockToolbar.moveUp': 'ブロックを上へ移動',
      'blockToolbar.moveDown': 'ブロックを下へ移動',
      'blockToolbar.dragToReorder': 'ドラッグして並べ替え',

      'contextMenu.undo': '元に戻す',
      'contextMenu.redo': 'やり直す',
      'contextMenu.cut': '切り取り',
      'contextMenu.copy': 'コピー',
      'contextMenu.paste': '貼り付け',
      'contextMenu.pasteAsPlainText': 'プレーンテキストとして貼り付け',
      'contextMenu.selectAll': 'すべて選択',
      'contextMenu.removeFormat': '書式をクリア',
      'tableContextMenu.insertRowAbove': '上に行を挿入',
      'tableContextMenu.insertRowBelow': '下に行を挿入',
      'tableContextMenu.insertColLeft': '左に列を挿入',
      'tableContextMenu.insertColRight': '右に列を挿入',
      'tableContextMenu.deleteRow': '行を削除',
      'tableContextMenu.deleteCol': '列を削除',
      'tableContextMenu.deleteTable': 'テーブルを削除',
      'tableContextMenu.mergeCells': 'セルを結合',
      'tableContextMenu.splitCell': 'セルを分割',

      'placeholder': '入力してください...'
    }
  };

  // Current language (will be set per editor instance)
  let _currentLanguage = 'en';

  // Register a custom translation (static method — available before init)
  function addTranslation(lang, keys) {
    if (!lang || typeof keys !== 'object') return;
    if (!Utils.isSafeObjectKey(lang)) return;
    if (!TRANSLATIONS[lang]) TRANSLATIONS[lang] = {};
    Utils.safeAssign(TRANSLATIONS[lang], keys);
  }

  // Translation helper function
  function t(key, params = {}) {
    const lang = _currentLanguage || 'en';
    let text = TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
    
    // Replace placeholders like {count}, {current}, {total}
    Object.keys(params).forEach(param => {
      text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
    });
    
    return text;
  }

  const THEMES = ['light', 'dark', 'blue', 'dark-blue', 'midnight', 'void', 'autumn'];
  const THEME_OPTIONS = [
    { value: 'light', labelKey: 'theme.light' },
    { value: 'dark', labelKey: 'theme.dark' },
    { value: 'blue', labelKey: 'theme.blue' },
    { value: 'dark-blue', labelKey: 'theme.darkBlue' },
    { value: 'midnight', labelKey: 'theme.midnight' },
    { value: 'void', labelKey: 'theme.void' },
    { value: 'autumn', labelKey: 'theme.autumn' }
  ];

  const DEFAULT_CONFIG = {
    toolbar: [
      'viewCode', 'undo', 'redo', 'findReplace', '|',
      'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'code', 'removeFormat', '|',
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
    translations: null,
    contextMenu: true,
    autosaveKey: null,
    plugins: [],
    onChange: null,
    onSave: null,
    onFocus: null,
    onBlur: null,
    onReady: null,
    showHelp: true,
    imageUploadHandler: null,
    videoUploadHandler: null,
    customClass: null
  };

  const TOOLBAR_ITEMS = {
    undo: { icon: 'undo', titleKey: 'toolbar.undo', command: 'undo' },
    redo: { icon: 'redo', titleKey: 'toolbar.redo', command: 'redo' },
    bold: { icon: 'bold', titleKey: 'toolbar.bold', command: 'bold' },
    italic: { icon: 'italic', titleKey: 'toolbar.italic', command: 'italic' },
    underline: { icon: 'underline', titleKey: 'toolbar.underline', command: 'underline' },
    strikethrough: { icon: 'strikethrough', titleKey: 'toolbar.strikethrough', command: 'strikeThrough' },
    heading: { titleKey: 'toolbar.heading', command: 'heading', type: 'select' },
    fontSize: { titleKey: 'toolbar.fontSize', command: 'fontSize', type: 'fontSizeWidget' },
    fontFamily: { titleKey: 'toolbar.fontFamily', command: 'fontFamily', type: 'select' },
    foreColor: { icon: 'text-color', titleKey: 'toolbar.foreColor', command: 'foreColor', picker: 'color' },
    backColor: { icon: 'highlight', titleKey: 'toolbar.backColor', command: 'backColor', picker: 'color' },
    alignLeft: { icon: 'align-left', titleKey: 'toolbar.alignLeft', command: 'justifyLeft' },
    alignCenter: { icon: 'align-center', titleKey: 'toolbar.alignCenter', command: 'justifyCenter' },
    alignRight: { icon: 'align-right', titleKey: 'toolbar.alignRight', command: 'justifyRight' },
    alignJustify: { icon: 'align-justify', titleKey: 'toolbar.alignJustify', command: 'justifyFull' },
    bulletList: { icon: 'list-ul', titleKey: 'toolbar.bulletList', command: 'insertUnorderedList' },
    numberedList: { icon: 'list-ol', titleKey: 'toolbar.numberedList', command: 'insertOrderedList' },
    indent: { icon: 'indent', titleKey: 'toolbar.indent', command: 'indent' },
    outdent: { icon: 'outdent', titleKey: 'toolbar.outdent', command: 'outdent' },
    link: { icon: 'link', titleKey: 'toolbar.link', command: 'createLink', modal: true },
    image: { icon: 'image', titleKey: 'toolbar.image', command: 'insertImage', modal: true },
    video: { icon: 'video', titleKey: 'toolbar.video', command: 'insertVideo', modal: true },
    table: { icon: 'table', titleKey: 'toolbar.table', command: 'insertTable', modal: true },
    blockquote: { icon: 'quote', titleKey: 'toolbar.blockquote', command: 'formatBlock', value: 'blockquote' },
    viewCode: { icon: 'code', titleKey: 'toolbar.viewCode', command: 'viewCode' },
    horizontalRule: { icon: 'minus', titleKey: 'toolbar.horizontalRule', command: 'insertHorizontalRule' },
    subscript: { icon: 'subscript', titleKey: 'toolbar.subscript', command: 'subscript' },
    superscript: { icon: 'superscript', titleKey: 'toolbar.superscript', command: 'superscript' },
    code: { icon: 'code-inline', titleKey: 'toolbar.code', command: 'toggleCode' },
    removeFormat: { icon: 'eraser', titleKey: 'toolbar.removeFormat', command: 'removeFormat' },
    findReplace: { icon: 'search', titleKey: 'toolbar.findReplace', command: 'findReplace', modal: true },
    emoji: { icon: 'emoji', titleKey: 'toolbar.emoji', command: 'emoji', picker: 'emoji' },
    specialChars: { icon: 'specialChars', titleKey: 'toolbar.specialChars', command: 'specialChars', picker: 'specialChars' },
    fullscreen: { icon: 'fullscreen', titleKey: 'toolbar.fullscreen', command: 'fullscreen' },
    autosave: { icon: 'save', titleKey: 'toolbar.autosave', command: 'autosave', toggle: true },
    themeToggle: { titleKey: 'toolbar.themeToggle', command: 'themeToggle', type: 'themeSelect' },
    print: { icon: 'print', titleKey: 'toolbar.print', command: 'print' },
    insertDropdown: { icon: 'plus', titleKey: 'toolbar.insert', type: 'insertDropdown' },
    moreMenu: { icon: 'more', titleKey: 'toolbar.moreOptions', type: 'moreMenu' }
  };

  const FONT_SIZES = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];

  const FONT_FAMILIES = [
    { labelKey: 'font.sansSerif', value: 'Arial, sans-serif' },
    { labelKey: 'font.serif', value: 'Georgia, serif' },
    { labelKey: 'font.monospace', value: 'Consolas, monospace' },
    { labelKey: 'font.cursive', value: 'Comic Sans MS, cursive' }
  ];

  const HEADINGS = [
    { labelKey: 'heading.paragraph', value: 'p' },
    { labelKey: 'heading.h1', value: 'h1' },
    { labelKey: 'heading.h2', value: 'h2' },
    { labelKey: 'heading.h3', value: 'h3' },
    { labelKey: 'heading.h4', value: 'h4' },
    { labelKey: 'heading.h5', value: 'h5' },
    { labelKey: 'heading.h6', value: 'h6' }
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
        } else if (key === 'style' && value && typeof value === 'object') {
          Object.keys(value).forEach(styleName => {
            if (Utils.isSafeObjectKey(styleName)) {
              el.style[styleName] = value[styleName];
            }
          });
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

    isSafeObjectKey(key) {
      return key !== '__proto__' && key !== 'prototype' && key !== 'constructor';
    },

    safeAssign(target, source) {
      if (!source || typeof source !== 'object') return target;
      Object.keys(source).forEach(key => {
        if (!Object.prototype.hasOwnProperty.call(source, key) || !Utils.isSafeObjectKey(key)) return;
        target[key] = source[key];
      });
      return target;
    },

    deepMerge(target, source) {
      const result = { ...target };
      if (!source || typeof source !== 'object') return result;
      Object.keys(source).forEach(key => {
        if (!Object.prototype.hasOwnProperty.call(source, key) || !Utils.isSafeObjectKey(key)) return;
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          result[key] = Utils.deepMerge(result[key] || {}, source[key]);
        } else {
          result[key] = source[key];
        }
      });
      return result;
    },

    sanitizeHTML(html) {
      const input = String(html || '');
      const lowerInput = input.toLowerCase();
      const root = document.createDocumentFragment();
      const stack = [root];
      const blockedTags = new Set(['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta', 'base']);
      const allowedTags = new Set([
        'a', 'b', 'blockquote', 'br', 'caption', 'code', 'col', 'colgroup', 'div', 'em',
        'font', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'li', 'ol',
        'p', 'pre', 's', 'span', 'strike', 'strong', 'sub', 'sup', 'table', 'tbody',
        'source', 'td', 'tfoot', 'th', 'thead', 'tr', 'u', 'ul', 'video'
      ]);
      const voidTags = new Set(['br', 'col', 'hr', 'img', 'source']);
      const urlAttrs = new Set(['href', 'src', 'xlink:href', 'poster']);
      let index = 0;

      const currentParent = () => stack[stack.length - 1];

      const ENTITY_MAP = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00A0' };
      const decodeEntities = (text) => text.replace(/&(?:#x([0-9a-fA-F]+)|#([0-9]+)|([a-zA-Z]+));/g, (m, hex, dec, named) => {
        if (hex) return String.fromCodePoint(parseInt(hex, 16));
        if (dec) return String.fromCodePoint(parseInt(dec, 10));
        return ENTITY_MAP[named] || m;
      });

      while (index < input.length) {
        const tagStart = input.indexOf('<', index);

        if (tagStart === -1) {
          currentParent().appendChild(document.createTextNode(decodeEntities(input.slice(index))));
          break;
        }

        if (tagStart > index) {
          currentParent().appendChild(document.createTextNode(decodeEntities(input.slice(index, tagStart))));
        }

        if (input.slice(tagStart, tagStart + 4) === '<!--') {
          const commentEnd = input.indexOf('-->', tagStart + 4);
          index = commentEnd === -1 ? input.length : commentEnd + 3;
          continue;
        }

        const tagEnd = Utils.findTagEnd(input, tagStart + 1);
        if (tagEnd === -1) {
          currentParent().appendChild(document.createTextNode(input.slice(tagStart)));
          break;
        }

        const rawTag = input.slice(tagStart + 1, tagEnd).trim();
        if (!rawTag || rawTag[0] === '!' || rawTag[0] === '?') {
          index = tagEnd + 1;
          continue;
        }

        if (rawTag[0] === '/') {
          const closingName = Utils.readHTMLName(rawTag, 1).name.toLowerCase();
          for (let i = stack.length - 1; i > 0; i--) {
            if (stack[i].nodeType === Node.ELEMENT_NODE && stack[i].tagName.toLowerCase() === closingName) {
              stack.length = i;
              break;
            }
          }
          index = tagEnd + 1;
          continue;
        }

        const tagInfo = Utils.readHTMLName(rawTag, 0);
        const tagName = tagInfo.name.toLowerCase();
        const selfClosing = Utils.isSelfClosingTag(rawTag);

        if (blockedTags.has(tagName)) {
          const closeTag = '</' + tagName;
          const closeStart = lowerInput.indexOf(closeTag, tagEnd + 1);
          const closeEnd = closeStart === -1 ? -1 : input.indexOf('>', closeStart + closeTag.length);
          index = closeEnd === -1 ? tagEnd + 1 : closeEnd + 1;
          continue;
        }

        if (!allowedTags.has(tagName)) {
          index = tagEnd + 1;
          continue;
        }

        const el = document.createElement(tagName);
        Utils.parseHTMLAttributes(rawTag, tagInfo.end).forEach(attr => {
          const attrName = attr.name.toLowerCase();
          const attrValue = attr.value.trim();

          if (!Utils.isSafeHTMLAttribute(attrName)) return;
          const dataMediaType = tagName === 'img' ? 'image' : (tagName === 'video' || tagName === 'source' ? 'video' : null);
          if (urlAttrs.has(attrName) && !Utils.isSafeUrl(attrValue, dataMediaType)) return;
          if (attrName === 'style' && !Utils.isSafeStyleValue(attrValue)) return;

          el.setAttribute(attr.name, attr.value);
        });

        if (tagName === 'a' && el.getAttribute('target') === '_blank') {
          el.setAttribute('rel', 'noopener noreferrer');
        }

        currentParent().appendChild(el);
        if (!selfClosing && !voidTags.has(tagName)) {
          stack.push(el);
        }

        index = tagEnd + 1;
      }

      return Utils.serializeHTML(root);
    },

    findTagEnd(input, start) {
      let quote = null;

      for (let i = start; i < input.length; i++) {
        const char = input[i];
        if (quote) {
          if (char === quote) quote = null;
        } else if (char === '"' || char === "'") {
          quote = char;
        } else if (char === '>') {
          return i;
        }
      }

      return -1;
    },

    readHTMLName(input, start) {
      let i = start;
      let name = '';

      while (i < input.length && Utils.isHTMLNameChar(input[i])) {
        name += input[i];
        i++;
      }

      return { name, end: i };
    },

    isHTMLNameChar(char) {
      return (char >= 'a' && char <= 'z') ||
        (char >= 'A' && char <= 'Z') ||
        (char >= '0' && char <= '9') ||
        char === '-' ||
        char === '_' ||
        char === ':';
    },

    isSelfClosingTag(rawTag) {
      for (let i = rawTag.length - 1; i >= 0; i--) {
        const char = rawTag[i];
        if (char === ' ' || char === '\t' || char === '\n' || char === '\r') continue;
        return char === '/';
      }
      return false;
    },

    parseHTMLAttributes(rawTag, start) {
      const attrs = [];
      let i = start;

      while (i < rawTag.length) {
        while (i < rawTag.length && /\s/.test(rawTag[i])) i++;
        if (i >= rawTag.length || rawTag[i] === '/') break;

        const attrInfo = Utils.readHTMLName(rawTag, i);
        if (!attrInfo.name) {
          i++;
          continue;
        }

        i = attrInfo.end;
        while (i < rawTag.length && /\s/.test(rawTag[i])) i++;

        let value = '';
        if (rawTag[i] === '=') {
          i++;
          while (i < rawTag.length && /\s/.test(rawTag[i])) i++;

          if (rawTag[i] === '"' || rawTag[i] === "'") {
            const quote = rawTag[i];
            i++;
            const valueStart = i;
            while (i < rawTag.length && rawTag[i] !== quote) i++;
            value = rawTag.slice(valueStart, i);
            if (rawTag[i] === quote) i++;
          } else {
            const valueStart = i;
            while (i < rawTag.length && !/\s/.test(rawTag[i]) && rawTag[i] !== '/') i++;
            value = rawTag.slice(valueStart, i);
          }
        }

        attrs.push({ name: attrInfo.name, value });
      }

      return attrs;
    },

    isSafeHTMLAttribute(name) {
      if (!name || name.startsWith('on') || name === 'srcdoc') return false;
      if (!Utils.isSafeObjectKey(name)) return false;
      return /^[a-z0-9_:-]+$/.test(name);
    },

    isSafeStyleValue(value) {
      const lower = String(value || '').toLowerCase();
      return lower.indexOf('expression') === -1 &&
        lower.indexOf('javascript:') === -1 &&
        lower.indexOf('vbscript:') === -1 &&
        lower.indexOf('data:') === -1;
    },

    serializeHTML(node) {
      let html = '';

      node.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          html += Utils.escapeHTML(child.textContent);
          return;
        }

        if (child.nodeType !== Node.ELEMENT_NODE) return;

        const tagName = child.tagName.toLowerCase();
        html += '<' + tagName;
        Array.from(child.attributes).forEach(attr => {
          html += ' ' + attr.name + '="' + Utils.escapeHTML(attr.value) + '"';
        });

        if (new Set(['br', 'col', 'hr', 'img', 'source']).has(tagName)) {
          html += '>';
        } else {
          html += '>' + Utils.serializeHTML(child) + '</' + tagName + '>';
        }
      });

      return html;
    },

    isSafeUrl(value, dataMediaType = null) {
      if (!value) return true;
      if (value.startsWith('#') || value.startsWith('/') || value.startsWith('./') || value.startsWith('../')) return true;
      const mediaType = dataMediaType === true ? 'image' : dataMediaType;

      try {
        const parsed = new URL(value, window.location.href);
        const protocol = parsed.protocol.toLowerCase();
        return protocol === 'http:' ||
          protocol === 'https:' ||
          protocol === 'mailto:' ||
          protocol === 'tel:' ||
          (mediaType === 'image' && protocol === 'data:' && /^data:image\//i.test(value)) ||
          (mediaType === 'video' && protocol === 'data:' && /^data:video\//i.test(value));
      } catch (e) {
        return false;
      }
    },

    escapeHTML(value) {
      return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[char]);
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

    isNodeInside(node, container) {
      if (!node || !container) return false;
      const target = node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
      return target === container || container.contains(target);
    },

    isRangeInside(range, container) {
      if (!range || !container) return false;
      return Utils.isNodeInside(range.commonAncestorContainer, container) ||
        (Utils.isNodeInside(range.startContainer, container) &&
          Utils.isNodeInside(range.endContainer, container));
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
    },

    positionPopup(anchor, popup, options = {}) {
      if (!anchor || !popup) return;

      const margin = options.margin || 8;
      popup.style.position = 'fixed';
      popup.style.left = '0';
      popup.style.right = 'auto';
      popup.style.top = '0';
      popup.style.bottom = 'auto';

      const adjust = () => {
        const anchorRect = anchor.getBoundingClientRect();
        const popupWidth = popup.offsetWidth || popup.getBoundingClientRect().width;
        const popupHeight = popup.offsetHeight || popup.getBoundingClientRect().height;
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;
        let left = anchorRect.left;
        let top = anchorRect.bottom + 4;

        if (left + popupWidth > viewportWidth - margin) {
          left = viewportWidth - margin - popupWidth;
        }
        if (left < margin) {
          left = margin;
        }

        const bottomSpace = viewportHeight - anchorRect.bottom - margin;
        const topSpace = anchorRect.top - margin;
        if (popupHeight > bottomSpace && topSpace > bottomSpace) {
          top = Math.max(margin, anchorRect.top - popupHeight - 4);
        }

        popup.style.left = left + 'px';
        popup.style.top = top + 'px';
      };

      adjust();
      requestAnimationFrame(adjust);
      setTimeout(adjust, 0);
      setTimeout(adjust, 50);
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
    video: '<svg viewBox="0 0 24 24"><path d="M17 10.5V6c0-1.1-.9-2-2-2H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-4.5l5 5v-13l-5 5zM9 16V8l5 4-5 4z"/></svg>',
    table: '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"/></svg>',
    quote: '<svg viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>',
    code: '<svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',
    'code-inline': '<svg viewBox="0 0 256 256"><path d="M0 0h256v256H0z" fill="none"/><path fill="currentColor" d="M71.68 97.22L34.74 128l36.94 30.78a12 12 0 1 1-15.36 18.44l-48-40a12 12 0 0 1 0-18.44l48-40a12 12 0 0 1 15.36 18.44m176 21.56l-48-40a12 12 0 1 0-15.36 18.44L221.26 128l-36.94 30.78a12 12 0 1 0 15.36 18.44l48-40a12 12 0 0 0 0-18.44M164.1 28.72a12 12 0 0 0-15.38 7.18l-64 176a12 12 0 0 0 7.18 15.37a11.8 11.8 0 0 0 4.1.73a12 12 0 0 0 11.28-7.9l64-176a12 12 0 0 0-7.18-15.38"/></svg>',
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
    'chevron-down': '<svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>',
    help: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>',
    grip: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="2" d="m15 5l-3-3l-3 3m0 14l3 3l3-3m4-4l3-3l-3-3M5 9l-3 3l3 3m7-12v9m0 0v9m0-9h9m-9 0H3"/></svg>',
    moveUp: '<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>',
    moveDown: '<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>',
    replaceImage: '<svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/><path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    cut: '<svg viewBox="0 0 24 24"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"/></svg>',
    copy: '<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',
    paste: '<svg viewBox="0 0 24 24"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',
    pasteText: '<svg viewBox="0 0 24 24"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 16H7v-2h10v2zm0-4H7v-2h10v2zm-3-4H7V8h7v2z"/></svg>',
    selectAll: '<svg viewBox="0 0 24 24"><path d="M3 3v6h2V5h4V3H3zm16 0h-4v2h4v4h2V3h-2zM5 15H3v6h6v-2H5v-4zm14 4h-4v2h6v-6h-2v4zM9 9h6v6H9V9z"/></svg>'
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
      if (this.overlay) {
        this.syncThemeClasses();
        return this.overlay;
      }

      this.overlay = Utils.createElement('div', {
        className: 'neiki-modal-overlay',
        onClick: (e) => {
          if (e.target === this.overlay) {
            this.close();
          }
        }
      });

      document.body.appendChild(this.overlay);
      this.syncThemeClasses();
      return this.overlay;
    }

    syncThemeClasses() {
      if (!this.overlay || !this.editor.getThemeClasses) return;
      this.overlay.classList.remove('neiki-dark', 'neiki-theme-blue', 'neiki-theme-dark-blue', 'neiki-theme-midnight', 'neiki-theme-void', 'neiki-theme-autumn');
      this.editor.getThemeClasses(this.editor.config.theme).split(' ').filter(Boolean).forEach(className => {
        this.overlay.classList.add(className);
      });
    }

    open(type, data = {}) {
      if (this.editor.saveCurrentSelection) {
        this.editor.saveCurrentSelection();
      }

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
        case 'video':
          modal = this.createVideoModal(data);
          break;
        case 'table':
          modal = this.createTableModal(data);
          break;
        case 'findReplace':
          modal = this.createFindReplaceModal(data);
          break;
        case 'help':
          modal = this.createHelpModal(data);
          break;
        default:
          return;
      }

      this.activeModal = modal;
      this.overlay.appendChild(modal);
      this.overlay.classList.add('active');

      const firstInput = modal.querySelector('input:not([type="file"]), textarea, select, button');
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

      const header = Utils.createElement('div', { className: 'neiki-modal-header' });
      header.appendChild(Utils.createElement('h3', { textContent: t('modal.insertLink') }));
      const closeBtn = Utils.createElement('button', {
        className: 'neiki-modal-close',
        type: 'button',
        innerHTML: Icons.close
      });
      header.appendChild(closeBtn);

      const body = Utils.createElement('div', { className: 'neiki-modal-body' });
      const urlGroup = Utils.createElement('div', { className: 'neiki-form-group' });
      const urlInput = Utils.createElement('input', {
        type: 'url',
        className: 'neiki-input',
        name: 'url',
        placeholder: 'https://example.com'
      });
      urlInput.value = data.url || '';
      urlGroup.appendChild(Utils.createElement('label', { textContent: t('modal.url') }));
      urlGroup.appendChild(urlInput);

      const textGroup = Utils.createElement('div', { className: 'neiki-form-group' });
      const textInput = Utils.createElement('input', {
        type: 'text',
        className: 'neiki-input',
        name: 'text',
        placeholder: t('modal.linkText')
      });
      textInput.value = data.text || '';
      textGroup.appendChild(Utils.createElement('label', { textContent: t('modal.text') }));
      textGroup.appendChild(textInput);

      const newTabGroup = Utils.createElement('div', { className: 'neiki-form-group' });
      const newTabLabel = Utils.createElement('label');
      const newTabInput = Utils.createElement('input', { type: 'checkbox', name: 'newTab' });
      newTabInput.checked = !!data.newTab;
      newTabLabel.appendChild(newTabInput);
      newTabLabel.appendChild(document.createTextNode(' ' + t('modal.openInNewTab')));
      newTabGroup.appendChild(newTabLabel);

      body.appendChild(urlGroup);
      body.appendChild(textGroup);
      body.appendChild(newTabGroup);

      const footer = Utils.createElement('div', { className: 'neiki-modal-footer' });
      const cancelBtn = Utils.createElement('button', {
        className: 'neiki-btn neiki-btn-secondary',
        type: 'button',
        textContent: t('modal.cancel')
      });
      const insertBtn = Utils.createElement('button', {
        className: 'neiki-btn neiki-btn-primary',
        type: 'button',
        textContent: t('modal.insert')
      });
      footer.appendChild(cancelBtn);
      footer.appendChild(insertBtn);

      modal.appendChild(header);
      modal.appendChild(body);
      modal.appendChild(footer);

      closeBtn.addEventListener('click', () => this.close());
      cancelBtn.addEventListener('click', () => this.close());
      insertBtn.addEventListener('click', () => {
        const url = urlInput.value;
        const text = textInput.value || url;
        const newTab = newTabInput.checked;

        if (url) {
          this.editor.restoreSavedSelection();
          this.editor.commands.insertLink(url, text, newTab);
        }
        this.close();
      });

      return modal;
    }

    createImageModal(data) {
      const modal = Utils.createElement('div', { className: 'neiki-modal' });
      const hasUploadHandler = typeof this.editor.config.imageUploadHandler === 'function';
      const uploadHint = hasUploadHandler ? t('modal.handledViaUploader') : t('modal.convertedToBase64');

      modal.innerHTML = `
                <div class="neiki-modal-header">
                    <h3>${Utils.escapeHTML(t('modal.insertImage'))}</h3>
                    <button class="neiki-modal-close" type="button">${Icons.close}</button>
                </div>
                <div class="neiki-modal-body">
                    <div class="neiki-form-group">
                        <label>${Utils.escapeHTML(t('modal.uploadImage'))}</label>
                        <div class="neiki-image-upload-zone" role="button" tabindex="0">
                            <input type="file" class="neiki-image-upload-input" name="upload" accept="image/*" multiple>
                            <div class="neiki-image-upload-icon">${Icons.image}</div>
                            <div class="neiki-image-upload-title">${Utils.escapeHTML(t('modal.uploadImage'))}</div>
                            <div class="neiki-image-upload-hint">${Utils.escapeHTML(uploadHint)}</div>
                            <div class="neiki-image-upload-files" aria-live="polite"></div>
                        </div>
                    </div>
                    <div class="neiki-form-divider">
                        <span>${Utils.escapeHTML(t('modal.or'))}</span>
                    </div>
                    <div class="neiki-form-group">
                        <label>${Utils.escapeHTML(t('modal.imageUrl'))}</label>
                        <input type="url" class="neiki-input" name="url" placeholder="https://example.com/image.jpg">
                    </div>
                    <div class="neiki-form-group">
                        <label>${Utils.escapeHTML(t('modal.altText'))}</label>
                        <input type="text" class="neiki-input" name="alt">
                    </div>
                    <div class="neiki-form-group">
                        <label>${Utils.escapeHTML(t('modal.widthOptional'))}</label>
                        <input type="text" class="neiki-input" name="width" placeholder="e.g. 300px or 50%">
                    </div>
                </div>
                <div class="neiki-modal-footer">
                    <button class="neiki-btn neiki-btn-secondary" type="button" data-action="cancel">${Utils.escapeHTML(t('modal.cancel'))}</button>
                    <button class="neiki-btn neiki-btn-primary" type="button" data-action="insert">${Utils.escapeHTML(t('modal.insert'))}</button>
                </div>
            `;

      const uploadInput = modal.querySelector('[name="upload"]');
      const uploadZone = modal.querySelector('.neiki-image-upload-zone');
      const uploadFiles = modal.querySelector('.neiki-image-upload-files');
      const urlInput = modal.querySelector('[name="url"]');
      const insertBtn = modal.querySelector('[data-action="insert"]');
      let pendingFiles = [];
      let uploadDragCounter = 0;

      urlInput.value = data.url || '';
      modal.querySelector('[name="alt"]').placeholder = t('modal.describeImage');
      modal.querySelector('[name="alt"]').value = data.alt || '';
      modal.querySelector('[name="width"]').value = data.width || '';

      const updateUploadFeedback = (files) => {
        uploadZone.classList.toggle('has-files', files.length > 0);
        uploadFiles.textContent = files.map(file => file.name).join(', ');
      };

      const handleSelectedFiles = (fileList) => {
        const selectedFiles = Array.from(fileList || []);
        const files = selectedFiles.filter(f => f.type.startsWith('image/'));
        const invalid = selectedFiles.filter(f => !f.type.startsWith('image/'));

        if (invalid.length > 0) {
          alert(t('modal.invalidImageFile'));
        }

        if (files.length === 0) {
          pendingFiles = [];
          updateUploadFeedback([]);
          urlInput.disabled = false;
          return;
        }

        pendingFiles = files;
        updateUploadFeedback(files);

        if (files.length === 1 && !hasUploadHandler) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            urlInput.value = ev.target.result;
            urlInput.disabled = true;
          };
          reader.readAsDataURL(files[0]);
        } else {
          urlInput.value = '';
          urlInput.disabled = true;
        }
      };

      // Handle file upload (supports multiple files)
      uploadInput.addEventListener('change', (e) => {
        handleSelectedFiles(e.target.files);
      });

      uploadZone.addEventListener('click', (e) => {
        if (e.target !== uploadInput) uploadInput.click();
      });

      uploadZone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          uploadInput.click();
        }
      });

      uploadZone.addEventListener('dragenter', (e) => {
        e.preventDefault();
        uploadDragCounter++;
        uploadZone.classList.add('drag-over');
      });

      uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      uploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadDragCounter--;
        if (uploadDragCounter <= 0) {
          uploadDragCounter = 0;
          uploadZone.classList.remove('drag-over');
        }
      });

      uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadDragCounter = 0;
        uploadZone.classList.remove('drag-over');
        handleSelectedFiles(e.dataTransfer.files);
      });

      // Clear URL when upload is cleared
      urlInput.addEventListener('input', () => {
        if (!urlInput.value) {
          urlInput.disabled = false;
          uploadInput.value = '';
          pendingFiles = [];
          updateUploadFeedback([]);
        }
      });

      modal.querySelector('.neiki-modal-close').addEventListener('click', () => this.close());
      modal.querySelector('[data-action="cancel"]').addEventListener('click', () => this.close());
      modal.querySelector('[data-action="insert"]').addEventListener('click', async () => {
        const alt = modal.querySelector('[name="alt"]').value;
        const width = modal.querySelector('[name="width"]').value;

        if (pendingFiles.length > 0 && hasUploadHandler) {
          // Use imageUploadHandler for all pending files
          insertBtn.disabled = true;
          insertBtn.textContent = t('modal.uploadingImage');

          try {
            const uploadedImages = [];
            for (const file of pendingFiles) {
              const url = await this.editor.config.imageUploadHandler(file);
              if (url) {
                uploadedImages.push({ url, alt: alt || file.name });
              }
            }
            this.editor.restoreSavedSelection();
            uploadedImages.forEach(image => {
              this.editor.commands.insertImage(image.url, image.alt, width);
            });
          } catch (err) {
            alert(t('modal.uploadError'));
          }

          this.close();
        } else if (pendingFiles.length > 1) {
          // Multiple files without handler — insert each as base64
          insertBtn.disabled = true;
          insertBtn.textContent = t('modal.uploadingImage');

          this.editor.restoreSavedSelection();
          for (const file of pendingFiles) {
            await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (ev) => {
                this.editor.commands.insertImage(ev.target.result, alt || file.name, width);
                resolve();
              };
              reader.readAsDataURL(file);
            });
          }

          this.close();
        } else {
          // Single file (already in URL field) or direct URL input
          const url = modal.querySelector('[name="url"]').value;
          if (url) {
            this.editor.restoreSavedSelection();
            this.editor.commands.insertImage(url, alt, width);
          }
          this.close();
        }
      });

      return modal;
    }

    createVideoModal(data) {
      const modal = Utils.createElement('div', { className: 'neiki-modal' });
      const hasUploadHandler = typeof this.editor.config.videoUploadHandler === 'function';
      const uploadHint = hasUploadHandler ? t('modal.handledViaUploader') : t('modal.convertedVideoToBase64');

      modal.innerHTML = `
                <div class="neiki-modal-header">
                    <h3>${Utils.escapeHTML(t('modal.insertVideo'))}</h3>
                    <button class="neiki-modal-close" type="button">${Icons.close}</button>
                </div>
                <div class="neiki-modal-body">
                    <div class="neiki-form-group">
                        <label>${Utils.escapeHTML(t('modal.uploadVideo'))}</label>
                        <div class="neiki-image-upload-zone" role="button" tabindex="0">
                            <input type="file" class="neiki-image-upload-input" name="upload" accept="video/*">
                            <div class="neiki-image-upload-icon">${Icons.video}</div>
                            <div class="neiki-image-upload-title">${Utils.escapeHTML(t('modal.uploadVideo'))}</div>
                            <div class="neiki-image-upload-hint">${Utils.escapeHTML(uploadHint)}</div>
                            <div class="neiki-image-upload-files" aria-live="polite"></div>
                        </div>
                    </div>
                    <div class="neiki-form-divider">
                        <span>${Utils.escapeHTML(t('modal.or'))}</span>
                    </div>
                    <div class="neiki-form-group">
                        <label>${Utils.escapeHTML(t('modal.videoUrl'))}</label>
                        <input type="url" class="neiki-input" name="url" placeholder="https://example.com/video.mp4">
                    </div>
                    <div class="neiki-form-group">
                        <label>${Utils.escapeHTML(t('modal.videoTitle'))}</label>
                        <input type="text" class="neiki-input" name="title">
                    </div>
                    <div class="neiki-form-group">
                        <label>${Utils.escapeHTML(t('modal.widthOptional'))}</label>
                        <input type="text" class="neiki-input" name="width" placeholder="e.g. 640px or 100%">
                    </div>
                </div>
                <div class="neiki-modal-footer">
                    <button class="neiki-btn neiki-btn-secondary" type="button" data-action="cancel">${Utils.escapeHTML(t('modal.cancel'))}</button>
                    <button class="neiki-btn neiki-btn-primary" type="button" data-action="insert">${Utils.escapeHTML(t('modal.insert'))}</button>
                </div>
            `;

      const uploadInput = modal.querySelector('[name="upload"]');
      const uploadZone = modal.querySelector('.neiki-image-upload-zone');
      const uploadFiles = modal.querySelector('.neiki-image-upload-files');
      const urlInput = modal.querySelector('[name="url"]');
      const insertBtn = modal.querySelector('[data-action="insert"]');
      let pendingFile = null;
      let uploadDragCounter = 0;

      urlInput.value = data.url || '';
      modal.querySelector('[name="title"]').placeholder = t('modal.describeVideo');
      modal.querySelector('[name="title"]').value = data.title || '';
      modal.querySelector('[name="width"]').value = data.width || '';

      const updateUploadFeedback = (file) => {
        uploadZone.classList.toggle('has-files', !!file);
        uploadFiles.textContent = file ? file.name : '';
      };

      const handleSelectedFiles = (fileList) => {
        const file = Array.from(fileList || []).find(f => f.type.startsWith('video/'));

        if (!file) {
          if (fileList && fileList.length > 0) alert(t('modal.invalidVideoFile'));
          pendingFile = null;
          updateUploadFeedback(null);
          urlInput.disabled = false;
          return;
        }

        pendingFile = file;
        updateUploadFeedback(file);

        if (!hasUploadHandler) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            urlInput.value = ev.target.result;
            urlInput.disabled = true;
          };
          reader.readAsDataURL(file);
        } else {
          urlInput.value = '';
          urlInput.disabled = true;
        }
      };

      uploadInput.addEventListener('change', (e) => {
        handleSelectedFiles(e.target.files);
      });

      uploadZone.addEventListener('click', (e) => {
        if (e.target !== uploadInput) uploadInput.click();
      });

      uploadZone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          uploadInput.click();
        }
      });

      uploadZone.addEventListener('dragenter', (e) => {
        e.preventDefault();
        uploadDragCounter++;
        uploadZone.classList.add('drag-over');
      });

      uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      uploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadDragCounter--;
        if (uploadDragCounter <= 0) {
          uploadDragCounter = 0;
          uploadZone.classList.remove('drag-over');
        }
      });

      uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadDragCounter = 0;
        uploadZone.classList.remove('drag-over');
        handleSelectedFiles(e.dataTransfer.files);
      });

      urlInput.addEventListener('input', () => {
        if (!urlInput.value) {
          urlInput.disabled = false;
          uploadInput.value = '';
          pendingFile = null;
          updateUploadFeedback(null);
        }
      });

      modal.querySelector('.neiki-modal-close').addEventListener('click', () => this.close());
      modal.querySelector('[data-action="cancel"]').addEventListener('click', () => this.close());
      modal.querySelector('[data-action="insert"]').addEventListener('click', async () => {
        const title = modal.querySelector('[name="title"]').value;
        const width = modal.querySelector('[name="width"]').value;

        if (pendingFile && hasUploadHandler) {
          insertBtn.disabled = true;
          insertBtn.textContent = t('modal.uploadingVideo');

          try {
            const url = await this.editor.config.videoUploadHandler(pendingFile);
            if (url) {
              this.editor.restoreSavedSelection();
              this.editor.commands.insertVideo(url, title || pendingFile.name, width);
            }
          } catch (err) {
            alert(t('modal.videoUploadError'));
          }

          this.close();
          return;
        }

        const url = modal.querySelector('[name="url"]').value;
        if (url) {
          this.editor.restoreSavedSelection();
          this.editor.commands.insertVideo(url, title, width);
        }
        this.close();
      });

      return modal;
    }

    createTableModal(data) {
      const modal = Utils.createElement('div', { className: 'neiki-modal' });

      modal.innerHTML = `
                <div class="neiki-modal-header">
                    <h3>${Utils.escapeHTML(t('modal.insertTable'))}</h3>
                    <button class="neiki-modal-close" type="button">${Icons.close}</button>
                </div>
                <div class="neiki-modal-body">
                    <div class="neiki-form-row">
                        <div class="neiki-form-group">
                            <label>${Utils.escapeHTML(t('modal.rows'))}</label>
                            <input type="number" class="neiki-input" name="rows" min="1" max="20">
                        </div>
                        <div class="neiki-form-group">
                            <label>${Utils.escapeHTML(t('modal.columns'))}</label>
                            <input type="number" class="neiki-input" name="cols" min="1" max="10">
                        </div>
                    </div>
                    <div class="neiki-form-group">
                        <label>
                            <input type="checkbox" name="header"> ${Utils.escapeHTML(t('modal.includeHeaderRow'))}
                        </label>
                    </div>
                </div>
                <div class="neiki-modal-footer">
                    <button class="neiki-btn neiki-btn-secondary" type="button" data-action="cancel">${Utils.escapeHTML(t('modal.cancel'))}</button>
                    <button class="neiki-btn neiki-btn-primary" type="button" data-action="insert">${Utils.escapeHTML(t('modal.insert'))}</button>
                </div>
            `;

      modal.querySelector('[name="rows"]').value = parseInt(data.rows, 10) || 3;
      modal.querySelector('[name="cols"]').value = parseInt(data.cols, 10) || 3;
      modal.querySelector('[name="header"]').checked = data.header !== false;
      modal.querySelector('.neiki-modal-close').addEventListener('click', () => this.close());
      modal.querySelector('[data-action="cancel"]').addEventListener('click', () => this.close());
      modal.querySelector('[data-action="insert"]').addEventListener('click', () => {
        const rows = parseInt(modal.querySelector('[name="rows"]').value) || 3;
        const cols = parseInt(modal.querySelector('[name="cols"]').value) || 3;
        const header = modal.querySelector('[name="header"]').checked;

        this.editor.restoreSavedSelection();
        this.editor.commands.insertTable(rows, cols, header);
        this.close();
      });

      return modal;
    }

    createFindReplaceModal(data) {
      const modal = Utils.createElement('div', { className: 'neiki-modal neiki-modal-wide' });

      modal.innerHTML = `
                <div class="neiki-modal-header">
                    <h3>${Utils.escapeHTML(t('modal.findReplace'))}</h3>
                    <button class="neiki-modal-close" type="button">${Icons.close}</button>
                </div>
                <div class="neiki-modal-body">
                    <div class="neiki-form-group">
                        <label>${Utils.escapeHTML(t('modal.find'))}</label>
                        <input type="text" class="neiki-input" name="find">
                    </div>
                    <div class="neiki-form-group">
                        <label>${Utils.escapeHTML(t('modal.replaceWith'))}</label>
                        <input type="text" class="neiki-input" name="replace">
                    </div>
                    <div class="neiki-form-group neiki-form-row">
                        <label><input type="checkbox" name="regex"> ${Utils.escapeHTML(t('modal.useRegex'))}</label>
                        <label><input type="checkbox" name="caseSensitive"> ${Utils.escapeHTML(t('modal.caseSensitive'))}</label>
                    </div>
                    <div class="neiki-find-results" style="margin-top:10px;font-size:13px;color:var(--neiki-text-muted);"></div>
                </div>
                <div class="neiki-modal-footer">
                    <button class="neiki-btn neiki-btn-secondary" type="button" data-action="findNext">${Utils.escapeHTML(t('modal.findNext'))}</button>
                    <button class="neiki-btn neiki-btn-secondary" type="button" data-action="replaceOne">${Utils.escapeHTML(t('modal.replace'))}</button>
                    <button class="neiki-btn neiki-btn-primary" type="button" data-action="replaceAll">${Utils.escapeHTML(t('modal.replaceAll'))}</button>
                </div>
            `;

      const findInput = modal.querySelector('[name="find"]');
      const replaceInput = modal.querySelector('[name="replace"]');
      const regexCheck = modal.querySelector('[name="regex"]');
      const caseCheck = modal.querySelector('[name="caseSensitive"]');
      const resultsDiv = modal.querySelector('.neiki-find-results');

      let currentMatches = [];
      let currentIndex = -1;

      findInput.placeholder = t('modal.searchText');
      replaceInput.placeholder = t('modal.replacementText');

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

        let flags = 'g';
        if (!caseCheck.checked) flags += 'i';

        let regex;
        try {
          regex = regexCheck.checked
            ? new RegExp(searchText, flags)
            : new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
        } catch (e) {
          resultsDiv.textContent = t('modal.invalidRegex');
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

        resultsDiv.textContent = t('modal.matchesFound', { count: currentMatches.length });
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
        resultsDiv.textContent = t('modal.matchOf', { current: currentIndex + 1, total: currentMatches.length });
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
          resultsDiv.textContent = t('modal.matchesRemaining', { count: currentMatches.length });
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
        resultsDiv.textContent = t('modal.replacedOccurrences', { count: count });
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

    createHelpModal() {
      const modal = Utils.createElement('div', { className: 'neiki-modal' });

      modal.innerHTML = `
        <div class="neiki-modal-header">
          <h3>${Utils.escapeHTML(t('menu.help'))}</h3>
          <button class="neiki-modal-close" type="button">${Icons.close}</button>
        </div>
        <div class="neiki-modal-body" style="text-align: center; padding: 24px 20px;">
          <img src="https://github.com/neikiri/neiki-editor/raw/main/assets/logo.png" alt="Neiki's Editor" style="width: 240px; height: auto; margin: 0 auto 16px; display: block;">
          <div style="font-size: 14px; line-height: 2; color: var(--neiki-text-primary);">
            <div><strong>${Utils.escapeHTML(t('help.author'))}:</strong> neikiri (Jindřich Stoklasa)</div>
            <div><strong>${Utils.escapeHTML(t('help.version'))}:</strong> 3.3.0</div>
            <div><strong>${Utils.escapeHTML(t('help.github'))}:</strong> <a href="https://github.com/neikiri/neiki-editor" target="_blank" rel="noopener noreferrer" style="color: var(--neiki-accent);">github.com/neikiri/neiki-editor</a></div>
            <div><strong>${Utils.escapeHTML(t('help.documentation'))}:</strong> <a href="https://github.com/neikiri/neiki-editor/wiki" target="_blank" rel="noopener noreferrer" style="color: var(--neiki-accent);">Wiki</a></div>
          </div>
        </div>
      `;

      modal.querySelector('.neiki-modal-close').addEventListener('click', () => this.close());

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

      // Color grid
      const grid = Utils.createElement('div', { className: 'neiki-color-grid' });

      const resetSwatch = Utils.createElement('div', {
        className: 'neiki-color-swatch neiki-color-reset',
        title: t('color.reset')
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
      grid.appendChild(resetSwatch);

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
        grid.appendChild(swatch);
      });

      picker.appendChild(grid);

      // Custom color section
      const customRow = Utils.createElement('div', { className: 'neiki-color-custom' });

      const colorInput = Utils.createElement('input', {
        className: 'neiki-color-custom-input',
        type: 'color',
        value: '#000000',
        title: t('color.pick')
      });

      const hexInput = Utils.createElement('input', {
        className: 'neiki-color-hex-input',
        type: 'text',
        value: '#000000',
        placeholder: '#hex',
        maxLength: 7
      });

      const applyBtn = Utils.createElement('button', {
        className: 'neiki-color-apply-btn',
        type: 'button'
      });
      applyBtn.textContent = t('color.apply');

      // Sync color input → hex input
      colorInput.addEventListener('input', (e) => {
        hexInput.value = e.target.value;
      });

      // Sync hex input → color input
      hexInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
          colorInput.value = val;
        }
      });

      const applyColor = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let color = hexInput.value.trim();
        if (!/^#/.test(color)) color = '#' + color;
        if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
          if (command === 'foreColor') {
            this.editor.commands.foreColor(color);
          } else {
            this.editor.commands.backColor(color);
          }
          this.close();
        }
      };

      applyBtn.addEventListener('mousedown', applyColor);
      hexInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') applyColor(e);
      });

      customRow.appendChild(colorInput);
      customRow.appendChild(hexInput);
      customRow.appendChild(applyBtn);
      picker.appendChild(customRow);

      // Prevent clicks inside picker from propagating to toolbar button
      picker.addEventListener('mousedown', (e) => {
        e.stopPropagation();
      });
      picker.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      button.appendChild(picker);

      // Smart positioning: flip to right-aligned if overflowing viewport
      requestAnimationFrame(() => {
        const rect = picker.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          picker.style.left = 'auto';
          picker.style.right = '0';
        }
        if (rect.left < 0) {
          picker.style.left = '0';
          picker.style.right = 'auto';
        }
      });

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
          this.editor.restoreSavedSelection();
          document.execCommand('insertText', false, emoji);
          this.editor.history.record();
          this.editor.triggerChange();
          this.close();
        });
        this.picker.appendChild(item);
      });

      button.appendChild(this.picker);
      this.activeButton = button;
      this.editor.saveCurrentSelection();
      Utils.positionPopup(button, this.picker);
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
          this.editor.restoreSavedSelection();
          document.execCommand('insertText', false, char);
          this.editor.history.record();
          this.editor.triggerChange();
          this.close();
        });
        this.picker.appendChild(item);
      });

      button.appendChild(this.picker);
      this.activeButton = button;
      this.editor.saveCurrentSelection();
      Utils.positionPopup(button, this.picker);
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

    toggleCode() {
      const sel = window.getSelection();
      if (!sel || !sel.rangeCount) return;

      const range = sel.getRangeAt(0);

      // Detect if selection is inside or contains <pre> or <code>
      const findCodeAncestor = (n) => {
        if (n.nodeType === Node.TEXT_NODE) n = n.parentNode;
        if (!n || !n.closest) return null;
        const pre = n.closest('pre');
        if (pre && this.editor.contentArea.contains(pre)) return { type: 'pre', el: pre };
        const code = n.closest('code');
        if (code && this.editor.contentArea.contains(code)) return { type: 'code', el: code };
        return null;
      };

      // Check start, end, and common ancestor
      const fromStart = findCodeAncestor(range.startContainer);
      const fromEnd = findCodeAncestor(range.endContainer);
      const fromCommon = findCodeAncestor(range.commonAncestorContainer);
      const existing = fromStart || fromEnd || fromCommon;

      // Also check if selection contains <code> elements inside it
      let containedCode = null;
      if (!existing && !range.collapsed) {
        const container = range.commonAncestorContainer;
        const el = container.nodeType === Node.TEXT_NODE ? container.parentNode : container;
        if (el) containedCode = el.querySelector ? el.querySelector('code') : null;
      }

      if (existing && existing.type === 'pre') {
        // Unwrap <pre><code> block: convert back to <p> paragraphs
        const pre = existing.el;
        const lines = pre.textContent.split('\n');
        const fragment = document.createDocumentFragment();
        lines.forEach(line => {
          const p = document.createElement('p');
          p.textContent = line || '\u00A0';
          fragment.appendChild(p);
        });
        pre.parentNode.replaceChild(fragment, pre);
      } else if (existing && existing.type === 'code') {
        // Unwrap inline <code>
        const codeEl = existing.el;
        const parent = codeEl.parentNode;
        while (codeEl.firstChild) {
          parent.insertBefore(codeEl.firstChild, codeEl);
        }
        parent.removeChild(codeEl);
      } else if (containedCode) {
        // Selection contains <code> elements — unwrap them all
        const container = range.commonAncestorContainer;
        const el = container.nodeType === Node.TEXT_NODE ? container.parentNode : container;
        const codes = el.querySelectorAll('code');
        codes.forEach(codeEl => {
          if (this.editor.contentArea.contains(codeEl)) {
            const p = codeEl.parentNode;
            while (codeEl.firstChild) p.insertBefore(codeEl.firstChild, codeEl);
            p.removeChild(codeEl);
          }
        });
      } else {
        // Apply code formatting
        if (sel.isCollapsed) this._expandToWordIfCollapsed();

        const startBlock = this._getBlockParent(range.startContainer);
        const endBlock = this._getBlockParent(range.endContainer);

        if (startBlock && endBlock && startBlock !== endBlock) {
          // Multi-block selection: create a <pre><code> block
          const blocks = [];
          let cur = startBlock;
          while (cur) {
            blocks.push(cur);
            if (cur === endBlock) break;
            cur = cur.nextElementSibling;
          }

          const textLines = blocks.map(block => block.textContent);
          const pre = document.createElement('pre');
          const code = document.createElement('code');
          code.textContent = textLines.join('\n');
          pre.appendChild(code);

          startBlock.parentNode.insertBefore(pre, startBlock);
          blocks.forEach(block => block.parentNode.removeChild(block));
        } else {
          // Single block: inline <code> wrap
          this.editor.wrapSelection('code');
        }
      }
      this.editor.history.record();
      this.editor.updateToolbar();
      this.editor.triggerChange();
    }

    _getBlockParent(node) {
      if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
      while (node && node !== this.editor.contentArea) {
        if (node.parentNode === this.editor.contentArea) return node;
        node = node.parentNode;
      }
      return null;
    }

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
      if (tag === 'blockquote') {
        const sel = window.getSelection();
        if (sel && sel.rangeCount) {
          const range = sel.getRangeAt(0);
          let node = range.startContainer;
          if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
          const bq = node.closest ? node.closest('blockquote') : null;
          if (bq && this.editor.contentArea.contains(bq)) {
            this._unwrapBlockquote(bq, range);
            this.editor.history.record();
            this.editor.updateToolbar();
            this.editor.triggerChange();
            return;
          }
        }
      }
      this.exec('formatBlock', `<${tag}>`);
    }

    _unwrapBlockquote(blockquote, range) {
      const parent = blockquote.parentNode;
      const marker = document.createElement('span');
      marker.setAttribute('data-neiki-selection-marker', 'true');
      marker.style.display = 'none';

      if (range && range.collapsed) {
        const markerRange = range.cloneRange();
        markerRange.insertNode(marker);
      }

      let inlineParagraph = null;
      const insertedNodes = [];
      const flushInlineParagraph = () => {
        if (inlineParagraph) {
          parent.insertBefore(inlineParagraph, blockquote);
          insertedNodes.push(inlineParagraph);
          inlineParagraph = null;
        }
      };

      while (blockquote.firstChild) {
        const child = blockquote.firstChild;
        if (this._isTopLevelBlock(child)) {
          flushInlineParagraph();
          parent.insertBefore(child, blockquote);
          insertedNodes.push(child);
        } else {
          if (!inlineParagraph) inlineParagraph = document.createElement('p');
          inlineParagraph.appendChild(child);
        }
      }

      flushInlineParagraph();
      parent.removeChild(blockquote);

      const sel = window.getSelection();
      const restoredMarker = parent.querySelector('[data-neiki-selection-marker="true"]');
      if (sel && restoredMarker) {
        const restoredRange = document.createRange();
        restoredRange.setStartBefore(restoredMarker);
        restoredRange.collapse(true);
        restoredMarker.remove();
        sel.removeAllRanges();
        sel.addRange(restoredRange);
      } else if (sel && insertedNodes.length > 0) {
        const fallbackRange = document.createRange();
        fallbackRange.setStart(insertedNodes[0], 0);
        fallbackRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(fallbackRange);
      }
    }

    _isTopLevelBlock(node) {
      if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
      return ['ADDRESS', 'ARTICLE', 'ASIDE', 'BLOCKQUOTE', 'DIV', 'DL', 'FIGURE', 'FOOTER', 'FORM', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEADER', 'HR', 'MAIN', 'OL', 'P', 'PRE', 'SECTION', 'TABLE', 'UL'].includes(node.tagName);
    }

    fontSize(sizeStr) {
      this.editor.focus();
      this._expandToWordIfCollapsed();
      document.execCommand('fontSize', false, '7');
      const marked = this.editor.contentArea.querySelectorAll('font[size="7"]');
      const spans = [];
      marked.forEach(el => {
        const span = document.createElement('span');
        span.style.fontSize = sizeStr;
        while (el.firstChild) span.appendChild(el.firstChild);
        el.parentNode.replaceChild(span, el);
        spans.push(span);
      });
      // Restore selection across all replaced spans
      if (spans.length > 0) {
        try {
          const sel = window.getSelection();
          const range = document.createRange();
          range.setStartBefore(spans[0].firstChild || spans[0]);
          const lastSpan = spans[spans.length - 1];
          range.setEndAfter(lastSpan.lastChild || lastSpan);
          sel.removeAllRanges();
          sel.addRange(range);
        } catch (e) { /* ignore */ }
      }
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
      document.execCommand('insertHTML', false, Utils.sanitizeHTML(html));
      this.editor.history.record();
      this.editor.triggerChange();
    }

    insertLink(url, text, newTab = false) {
      if (!Utils.isSafeUrl(url)) return;
      const selection = Utils.getSelection();
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

      if (range && !range.collapsed) {
        this.exec('createLink', url);
        if (newTab) {
          const links = Array.from(this.editor.contentArea.querySelectorAll('a'))
            .filter(link => link.getAttribute('href') === url);
          links.forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
          });
        }
      } else {
        const link = document.createElement('a');
        link.href = url;
        link.textContent = text || url;
        if (newTab) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }

        this.editor.focus();
        document.execCommand('insertHTML', false, link.outerHTML);
        this.editor.history.record();
        this.editor.triggerChange();
      }
    }

    insertImage(url, alt = '', width = '') {
      if (!Utils.isSafeUrl(url, true)) return;
      let html = `<img src="${Utils.escapeHTML(url)}"`;
      if (alt) html += ` alt="${Utils.escapeHTML(alt)}"`;
      if (width) html += ` width="${Utils.escapeHTML(width)}"`;
      html += '>';

      this.editor.focus();
      document.execCommand('insertHTML', false, html);
      this.editor.history.record();
      this.editor.triggerChange();
    }

    insertVideo(url, title = '', width = '') {
      if (!Utils.isSafeUrl(url, 'video')) return;
      let html = `<video controls src="${Utils.escapeHTML(url)}"`;
      if (title) html += ` title="${Utils.escapeHTML(title)}"`;
      if (width) html += ` width="${Utils.escapeHTML(width)}"`;
      html += '></video><p><br></p>';

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

      // Backward compatibility: support old custom_class option
      if (this.config.custom_class && !this.config.customClass) {
        this.config.customClass = this.config.custom_class;
      }
      this.instanceIndex = ++EDITOR_INSTANCE_COUNTER;
      this.storageId = this.createAutosaveStorageId(element);
      this.isFullscreen = false;
      this.isAutosaveEnabled = false;
      this.autosaveInterval = null;
      this.savedSelectionRange = null;

      this.init();
    }

    init() {
      // Initialize storage first
      this.storage = new StorageManager(this.storageId);

      // Set language for translations
      _currentLanguage = this.config.language || 'en';

      // Merge custom translations from config
      if (this.config.translations && typeof this.config.translations === 'object') {
        Object.keys(this.config.translations).forEach(lang => {
          addTranslation(lang, this.config.translations[lang]);
        });
      }

      // Load theme preference
      const savedTheme = StorageManager.getGlobal('theme', this.config.theme);
      this.config.theme = THEMES.includes(savedTheme) ? savedTheme : 'light';

      this.createStructure();
      this.createToolbar();
      this.applyTheme(this.config.theme);
      this.createContentArea();
      this.createStatusBar();

      this.history = new HistoryManager(this);
      this.modal = new ModalManager(this);
      this.dropdown = new DropdownManager(this);
      this.colorPicker = new ColorPicker(this);
      this.emojiPicker = new EmojiPicker(this);
      this.specialCharsPicker = new SpecialCharsPicker(this);
      this.commands = new Commands(this);
      if (this.config.contextMenu !== false) {
        this.tableContextMenu = new TableContextMenu(this);
        this.editorContextMenu = new EditorContextMenu(this);
      }
      this.floatingToolbar = new FloatingToolbar(this);
      this.imageResizer = new ImageResizer(this);
      this.tableColumnResizer = new TableColumnResizer(this);
      this.blockDragDrop = new BlockDragDrop(this);

      this.bindEvents();
      this.initDragDrop();
      this.initSelectionDragDrop();
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
      const langClass = _currentLanguage !== 'en' ? `neiki-lang-${_currentLanguage}` : '';
      this.container = Utils.createElement('div', {
        className: `neiki-editor ${this.getThemeClasses(this.config.theme)} ${langClass}`.trim(),
        id: this.id
      });

      this.originalElement.style.display = 'none';
      this.originalElement.parentNode.insertBefore(this.container, this.originalElement);
    }

    getThemeClasses(theme) {
      const normalizedTheme = THEMES.includes(theme) ? theme : 'light';
      const classes = [];

      if (normalizedTheme === 'dark' || normalizedTheme === 'dark-blue' || normalizedTheme === 'midnight' || normalizedTheme === 'void' || normalizedTheme === 'autumn') {
        classes.push('neiki-dark');
      }

      if (normalizedTheme !== 'light' && normalizedTheme !== 'dark') {
        classes.push('neiki-theme-' + normalizedTheme);
      }

      return classes.join(' ');
    }

    applyTheme(theme) {
      const normalizedTheme = THEMES.includes(theme) ? theme : 'light';
      this.config.theme = normalizedTheme;
      this.container.classList.remove('neiki-dark', 'neiki-theme-blue', 'neiki-theme-dark-blue', 'neiki-theme-midnight', 'neiki-theme-void', 'neiki-theme-autumn');
      this.getThemeClasses(normalizedTheme).split(' ').filter(Boolean).forEach(className => {
        this.container.classList.add(className);
      });
      StorageManager.setGlobal('theme', normalizedTheme);

      if (this._themeSelect) {
        this._themeSelect.value = normalizedTheme;
      }
      if (this.modal) this.modal.syncThemeClasses();
      this._updateThemeMenuItem();
    }

    createAutosaveStorageId(element) {
      const customKey = this.config.autosaveKey ||
        this.originalElement.getAttribute('data-neiki-autosave-key');

      if (customKey) {
        return 'autosave_' + this.normalizeStorageKey(customKey);
      }

      const pageScope = this.hashString(this.getPageStorageScope());
      const elementScope = this.normalizeStorageKey(this.getElementStorageScope(element));
      return 'autosave_' + pageScope + '_' + elementScope;
    }

    getPageStorageScope() {
      try {
        return window.location.href || window.location.pathname || 'page';
      } catch (e) {
        return 'page';
      }
    }

    getElementStorageScope(element) {
      if (this.originalElement.id) return this.originalElement.id;
      if (this.originalElement.name) return this.originalElement.name;
      if (this.originalElement.getAttribute('data-neiki-id')) {
        return this.originalElement.getAttribute('data-neiki-id');
      }
      if (typeof element === 'string') return element;
      return this.getElementPath(this.originalElement);
    }

    getElementPath(element) {
      const parts = [];
      let node = element;

      while (node && node.nodeType === Node.ELEMENT_NODE && node !== document.body) {
        let part = node.tagName.toLowerCase();
        const parent = node.parentNode;

        if (parent && parent.children) {
          const siblings = Array.prototype.filter.call(parent.children, child => child.tagName === node.tagName);
          if (siblings.length > 1) {
            part += ':nth-of-type(' + (siblings.indexOf(node) + 1) + ')';
          }
        }

        parts.unshift(part);
        node = parent;
      }

      return parts.length ? parts.join('>') : 'editor_' + this.instanceIndex;
    }

    normalizeStorageKey(value) {
      const input = String(value).trim();
      let output = '';
      let lastWasSeparator = false;

      for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const isSafe = (char >= 'a' && char <= 'z') ||
          (char >= 'A' && char <= 'Z') ||
          (char >= '0' && char <= '9') ||
          char === '-' ||
          char === '_';

        if (isSafe) {
          output += char;
          lastWasSeparator = false;
        } else if (!lastWasSeparator) {
          output += '_';
          lastWasSeparator = true;
        }
      }

      while (output[0] === '_') output = output.slice(1);
      while (output[output.length - 1] === '_') output = output.slice(0, -1);

      return output || 'editor';
    }

    hashString(value) {
      let hash = 0;
      const input = String(value);

      for (let i = 0; i < input.length; i++) {
        hash = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0;
      }

      return Math.abs(hash).toString(36);
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
            title: t(config.titleKey),
            'data-command': item
          });

          if (item === 'heading') {
            HEADINGS.forEach(({ labelKey, value }) => {
              const opt = document.createElement('option');
              opt.value = value;
              opt.textContent = t(labelKey);
              select.appendChild(opt);
            });
          } else if (item === 'fontFamily') {
            FONT_FAMILIES.forEach(({ labelKey, value }) => {
              const opt = document.createElement('option');
              opt.value = value;
              opt.textContent = t(labelKey);
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
            title: t('toolbar.decreaseFontSize'),
            innerHTML: '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M19 13H5v-2h14v2z" fill="currentColor"/></svg>'
          });

          const input = Utils.createElement('input', {
            className: 'neiki-fontsize-input',
            type: 'text',
            title: t('toolbar.fontSize'),
            value: '16'
          });

          const plusBtn = Utils.createElement('button', {
            className: 'neiki-fontsize-btn',
            type: 'button',
            title: t('toolbar.increaseFontSize'),
            innerHTML: '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/></svg>'
          });

          // Save/restore selection for font size operations
          let _savedRange = null;
          const _saveSelection = () => {
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0 && this.contentArea && this.contentArea.contains(sel.anchorNode)) {
              _savedRange = sel.getRangeAt(0).cloneRange();
            }
          };
          const _restoreSelection = () => {
            if (_savedRange && this.contentArea) {
              try {
                const sel = window.getSelection();
                this.contentArea.focus();
                sel.removeAllRanges();
                sel.addRange(_savedRange);
              } catch (e) { /* ignore */ }
            }
          };

          // Continuously track selection from content area (deferred — contentArea created after toolbar)
          const _bindSelectionTracking = () => {
            if (this.contentArea) {
              this.contentArea.addEventListener('mouseup', _saveSelection);
              this.contentArea.addEventListener('keyup', _saveSelection);
            }
          };
          // Bind after init completes
          setTimeout(_bindSelectionTracking, 0);
          document.addEventListener('selectionchange', () => {
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0 && !sel.isCollapsed && this.contentArea && this.contentArea.contains(sel.anchorNode)) {
              _savedRange = sel.getRangeAt(0).cloneRange();
            }
          });

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
              _saveSelection();
              dropdown.classList.remove('show');
            });
            dropdown.appendChild(item);
          });

          const applyFontSize = () => {
            const val = parseInt(input.value);
            if (val && val > 0) {
              _restoreSelection();
              this.commands.fontSize(val + 'px');
              _saveSelection();
            }
          };

          minusBtn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
          });
          minusBtn.addEventListener('click', (e) => {
            e.preventDefault();
            _restoreSelection();
            const current = parseInt(input.value) || 16;
            const newSize = Math.max(1, current - 1);
            input.value = newSize;
            this.commands.fontSize(newSize + 'px');
            _saveSelection();
          });

          plusBtn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
          });
          plusBtn.addEventListener('click', (e) => {
            e.preventDefault();
            _restoreSelection();
            const current = parseInt(input.value) || 16;
            const newSize = Math.min(999, current + 1);
            input.value = newSize;
            this.commands.fontSize(newSize + 'px');
            _saveSelection();
          });

          input.addEventListener('mousedown', (e) => {
            e.preventDefault();
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

        // Handle theme select
        if (config.type === 'themeSelect') {
          const wrapper = Utils.createElement('label', {
            className: 'neiki-theme-select-wrapper',
            title: t(config.titleKey)
          });
          wrapper.appendChild(Utils.createElement('span', {
            className: 'neiki-theme-select-icon',
            innerHTML: Icons.sun
          }));

          const select = Utils.createElement('select', {
            className: 'neiki-select neiki-theme-select',
            'aria-label': t(config.titleKey)
          });

          THEME_OPTIONS.forEach(option => {
            select.appendChild(Utils.createElement('option', {
              value: option.value,
              textContent: t(option.labelKey)
            }));
          });

          select.value = this.config.theme;
          select.addEventListener('change', () => this.setTheme(select.value));
          wrapper.appendChild(select);

          this.toolbarButtons[item] = select;
          this._themeSelect = select;
          appendToGroup(wrapper);
          return;
        }

        // Handle Insert dropdown
        if (config.type === 'insertDropdown') {
          const btn = Utils.createElement('button', {
            className: 'neiki-toolbar-btn neiki-insert-dropdown-btn',
            title: t(config.titleKey),
            type: 'button'
          });
          btn.innerHTML = Icons[config.icon] + '<span class="neiki-insert-label">' + t('toolbar.insert') + '</span><span class="neiki-chevron">' + Icons['chevron-down'] + '</span>';

          const dropdown = Utils.createElement('div', { className: 'neiki-insert-dropdown' });

          const insertItems = [
            {
              key: 'link', icon: Icons.link, labelKey: 'insert.link',
              action: () => { this.saveCurrentSelection(); this.modal.open('link', { text: Utils.getSelection().toString() }); }
            },
            {
              key: 'image', icon: Icons.image, labelKey: 'insert.image',
              action: () => { this.saveCurrentSelection(); this.modal.open('image', {}); }
            },
            {
              key: 'video', icon: Icons.video, labelKey: 'insert.video',
              action: () => { this.saveCurrentSelection(); this.modal.open('video', {}); }
            },
            {
              key: 'table', icon: Icons.table, labelKey: 'insert.table',
              action: () => { this.saveCurrentSelection(); this.modal.open('table', {}); }
            },
            {
              key: 'emoji', icon: Icons.emoji, labelKey: 'insert.emoji',
              action: () => { this.saveCurrentSelection(); this.emojiPicker.toggle(btn); }
            },
            {
              key: 'specialChars', icon: Icons.specialChars, labelKey: 'insert.symbol',
              action: () => { this.saveCurrentSelection(); this.specialCharsPicker.toggle(btn); }
            }
          ];

          insertItems.forEach(({ icon, labelKey, action }) => {
            const item = Utils.createElement('div', {
              className: 'neiki-dropdown-item'
            });
            item.innerHTML = '<span class="neiki-dropdown-item-icon">' + icon + '</span>' + t(labelKey);
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
            if (dropdown.classList.contains('show')) {
              Utils.positionPopup(btn, dropdown);
            }
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
            title: t(config.titleKey),
            type: 'button',
            innerHTML: Icons[config.icon],
            'data-command': item
          });

          const dropdown = Utils.createElement('div', { className: 'neiki-more-dropdown' });

          const moreItems = [
            { key: 'save', icon: Icons.save, labelKey: 'menu.save', action: () => this.triggerSave() },
            { key: 'preview', icon: Icons.eye, labelKey: 'menu.preview', action: () => this.previewContent() },
            { key: 'download', icon: Icons.download, labelKey: 'menu.download', action: () => this.downloadContent() },
            { key: 'print', icon: Icons.print, labelKey: 'menu.print', action: () => this.printContent() },
            { key: 'divider' },
            { key: 'autosave', icon: Icons.save, labelKey: 'menu.autosave', action: () => this.toggleAutosave(), toggle: true },
            { key: 'divider' },
            { key: 'clearAll', icon: Icons.trash, labelKey: 'menu.clearAll', action: () => this.clearAll(), danger: true },
            { key: 'themeSelect', icon: Icons.sun, labelKey: 'menu.toggleTheme' },
            { key: 'fullscreen', icon: Icons.fullscreen, labelKey: 'menu.fullscreen', action: () => this.toggleFullscreen() }
          ];

          if (this.config.showHelp) {
            moreItems.push({ key: 'divider' });
            moreItems.push({ key: 'help', icon: Icons.help, labelKey: 'menu.help', action: () => this.modal.open('help') });
          }

          moreItems.forEach(({ key, icon, labelKey, action, danger, toggle }) => {
            if (key === 'divider') {
              dropdown.appendChild(Utils.createElement('div', { className: 'neiki-dropdown-divider' }));
              return;
            }

            if (key === 'themeSelect') {
              const menuItem = Utils.createElement('label', {
                className: 'neiki-dropdown-item neiki-theme-menu-item'
              });
              menuItem.innerHTML = '<span class="neiki-dropdown-item-icon">' + icon + '</span>';

              const select = Utils.createElement('select', {
                className: 'neiki-theme-menu-select',
                'aria-label': t(labelKey)
              });
              THEME_OPTIONS.forEach(option => {
                select.appendChild(Utils.createElement('option', {
                  value: option.value,
                  textContent: t(option.labelKey)
                }));
              });
              select.value = this.config.theme;
              select.addEventListener('click', (e) => e.stopPropagation());
              select.addEventListener('change', () => {
                this.setTheme(select.value);
              });
              menuItem.appendChild(select);
              this._themeMenuItem = menuItem;
              this._themeMenuSelect = select;
              dropdown.appendChild(menuItem);
              return;
            }

            const menuItem = Utils.createElement('div', {
              className: 'neiki-dropdown-item' + (danger ? ' neiki-dropdown-item-danger' : '')
            });
            menuItem.innerHTML = '<span class="neiki-dropdown-item-icon">' + icon + '</span><span class="neiki-dropdown-item-label">' + t(labelKey) + '</span>';

            if (key === 'autosave') {
              const badge = Utils.createElement('span', { className: 'neiki-autosave-badge' });
              badge.textContent = '✕';
              menuItem.appendChild(badge);
              this._autosaveMenuItem = menuItem;
              this._autosaveBadge = badge;
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
          title: t(config.titleKey),
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

      const contentClasses = this.config.customClass
        ? `neiki-content ${this.config.customClass}`
        : 'neiki-content';

      this.contentArea = Utils.createElement('div', {
        className: contentClasses,
        contentEditable: !this.config.readonly,
        spellcheck: this.config.spellcheck,
        'data-placeholder': t('placeholder')
      });

      if (this.config.minHeight) {
        this.contentArea.style.minHeight = this.config.minHeight + 'px';
      }
      if (this.config.maxHeight) {
        this.contentArea.style.maxHeight = this.config.maxHeight + 'px';
        this.contentArea.style.overflowY = 'auto';
      } else {
        // Enable sticky toolbar when editor has no internal scroll
        this.container.classList.add('neiki-sticky-toolbar');
      }

      // Check if autosave is enabled AND has saved content
      const autosaveEnabled = this.storage.get('autosave_enabled', false);
      const autosavedContent = this.storage.get('autosave_content', null);

      if (autosaveEnabled && autosavedContent) {
        // Restore autosaved content only if autosave was enabled
        this.contentArea.innerHTML = Utils.sanitizeHTML(autosavedContent);
      } else {
        // Always use original element content (textarea value or innerHTML)
        // This ensures the page's actual content is shown, not old localStorage data
        if (this.originalElement.value) {
          this.contentArea.innerHTML = Utils.sanitizeHTML(this.originalElement.value);
        } else if (this.originalElement.innerHTML.trim()) {
          this.contentArea.innerHTML = Utils.sanitizeHTML(this.originalElement.innerHTML);
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
      this.codeViewHighlight = Utils.createElement('pre', {
        className: 'neiki-code-view-highlight',
        'aria-hidden': 'true'
      });
      this.codeViewEditor = Utils.createElement('div', { className: 'neiki-code-view-editor' });
      this.codeViewEditor.appendChild(this.codeViewHighlight);
      this.codeViewEditor.appendChild(this.codeViewTextarea);
      this.codeViewTextarea.addEventListener('input', () => this.renderCodeViewHighlight());
      this.codeViewTextarea.addEventListener('scroll', () => {
        this.codeViewHighlight.scrollTop = this.codeViewTextarea.scrollTop;
        this.codeViewHighlight.scrollLeft = this.codeViewTextarea.scrollLeft;
      });
      this.codeView.appendChild(codeViewHeader);
      this.codeView.appendChild(this.codeViewEditor);
      this.contentWrapper.appendChild(this.codeView);

      this.container.appendChild(this.contentWrapper);
    }

    bindEvents() {
      // Content changes
      this.contentArea.addEventListener('input', Utils.debounce(() => {
        this.removeStrayGripSvgs();
        this._ensureDefaultBlock();
        this.history.record();
        this.syncToOriginal();
        this.triggerChange();
        this.updateStatusBar();
      }, 300));

      // Selection changes
      document.addEventListener('selectionchange', () => {
        const sel = window.getSelection();
        const range = sel && sel.rangeCount ? sel.getRangeAt(0) : null;
        const selectionInsideEditor = range && Utils.isRangeInside(range, this.contentArea);

        if (selectionInsideEditor) {
          this.saveCurrentSelection();
        }

        if (selectionInsideEditor ||
          this.contentArea.contains(document.activeElement) ||
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

      this.contentArea.addEventListener('copy', (e) => this.handleCopyCut(e, false));
      this.contentArea.addEventListener('cut', (e) => this.handleCopyCut(e, true));

      // Paste handling
      this.contentArea.addEventListener('paste', (e) => this.handlePaste(e));
    }

    handleCopyCut(e, isCut) {
      if (!this.imageResizer) return;

      const imageData = this.imageResizer.getSelectedImageClipboardData();
      if (!imageData) return;

      e.preventDefault();
      e.clipboardData.setData('text/html', imageData.html);
      e.clipboardData.setData('text/plain', imageData.text);

      if (isCut) {
        this.imageResizer.deleteSelectedImage();
      }
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
        this.saveCurrentSelection();
        this.emojiPicker.toggle(button);
        return;
      }

      // Handle special chars picker
      if (config.picker === 'specialChars') {
        this.saveCurrentSelection();
        this.specialCharsPicker.toggle(button);
        return;
      }

      // Handle modals
      if (config.modal) {
        this.saveCurrentSelection();
        let data = {};

        if (item === 'link') {
          const sel = Utils.getSelection();
          data.text = sel.toString();
        }

        this.modal.open(item, data);
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
      if ((e.key === 'Backspace' || e.key === 'Delete') &&
        this.imageResizer &&
        this.imageResizer.deleteSelectedImage()) {
        e.preventDefault();
        return;
      }

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
            this.saveCurrentSelection();
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

      // Exit blockquote at end of document
      if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        const sel = window.getSelection();
        if (sel.rangeCount) {
          const node = sel.anchorNode;
          const bq = node.nodeType === Node.TEXT_NODE
            ? node.parentElement?.closest('blockquote')
            : node.closest?.('blockquote');
          if (bq && bq === this.contentArea.lastElementChild) {
            const range = sel.getRangeAt(0);
            const bqRange = document.createRange();
            bqRange.selectNodeContents(bq);
            bqRange.setStart(range.endContainer, range.endOffset);
            if (bqRange.toString().trim() === '') {
              e.preventDefault();
              const p = document.createElement('p');
              p.innerHTML = '<br>';
              bq.after(p);
              const newRange = document.createRange();
              newRange.setStart(p, 0);
              newRange.collapse(true);
              sel.removeAllRanges();
              sel.addRange(newRange);
              this.history.record();
              this.triggerChange();
            }
          }
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
      // Check for pasted images first
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const imageFiles = Array.from(e.clipboardData.files).filter(f => f.type.startsWith('image/'));
        if (imageFiles.length > 0) {
          e.preventDefault();
          const hasUploadHandler = typeof this.config.imageUploadHandler === 'function';

          if (hasUploadHandler) {
            (async () => {
              for (const file of imageFiles) {
                try {
                  const url = await this.config.imageUploadHandler(file);
                  if (url) {
                    this.commands.insertImage(url, file.name, '');
                  }
                } catch (err) {
                  console.error('NeikiEditor: Image upload failed', err);
                }
              }
            })();
          } else {
            imageFiles.forEach(file => {
              const reader = new FileReader();
              reader.onload = (readerEvent) => {
                this.commands.insertImage(readerEvent.target.result, file.name, '');
              };
              reader.readAsDataURL(file);
            });
          }
          return;
        }
      }

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
            case 'toggleCode': {
              const sel = window.getSelection();
              if (sel && sel.rangeCount) {
                let node = sel.getRangeAt(0).startContainer;
                if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
                const inCode = node.closest && node.closest('code') && this.contentArea.contains(node.closest('code'));
                const inPre = node.closest && node.closest('pre') && this.contentArea.contains(node.closest('pre'));
                isActive = !!(inCode || inPre);
              }
              break;
            }
            case 'formatBlock':
              if (config.value === 'blockquote') {
                const sel = window.getSelection();
                if (sel && sel.rangeCount) {
                  let node = sel.getRangeAt(0).startContainer;
                  if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
                  isActive = !!(node.closest && node.closest('blockquote') && this.contentArea.contains(node.closest('blockquote')));
                }
              }
              break;
            case 'themeToggle':
              isActive = this.config.theme === 'dark' || this.config.theme === 'dark-blue' || this.config.theme === 'midnight' || this.config.theme === 'void' || this.config.theme === 'autumn';
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
      const currentIndex = THEMES.indexOf(this.config.theme);
      const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];
      this.applyTheme(nextTheme);
    }

    _updateThemeMenuItem() {
      if (this._themeMenuSelect) {
        this._themeMenuSelect.value = this.config.theme;
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
      header.innerHTML = '<span>' + t('preview.title') + '</span>';
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
      if (this.getContent().trim() && !confirm(t('confirm.clearAll'))) return;
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
      // Wrap bare text nodes and normalize non-block elements into <p>
      const BLOCK_TAGS = new Set(['P','H1','H2','H3','H4','H5','H6','UL','OL','BLOCKQUOTE','TABLE','HR','PRE','FIGURE','SECTION','ARTICLE']);
      const childNodes = Array.from(this.contentArea.childNodes);

      // First pass: convert stray <div> to <p>
      childNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DIV') {
          const p = document.createElement('p');
          while (node.firstChild) p.appendChild(node.firstChild);
          node.parentNode.replaceChild(p, node);
        }
      });

      // Second pass: group consecutive inline/text nodes into <p>
      const updatedNodes = Array.from(this.contentArea.childNodes);
      let inlineGroup = [];

      const flushGroup = () => {
        if (inlineGroup.length === 0) return;
        const p = document.createElement('p');
        const firstNode = inlineGroup[0];
        this.contentArea.insertBefore(p, firstNode);
        inlineGroup.forEach(n => p.appendChild(n));
        inlineGroup = [];
      };

      updatedNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent.trim()) {
            inlineGroup.push(node);
          } else if (inlineGroup.length > 0) {
            inlineGroup.push(node);
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (BLOCK_TAGS.has(node.tagName)) {
            flushGroup();
          } else {
            inlineGroup.push(node);
          }
        }
      });
      flushGroup();
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
      // Clone content and clean up editor UI elements
      const clone = this.contentArea.cloneNode(true);
      // Unwrap image resizer wrappers
      clone.querySelectorAll('.neiki-img-resizable').forEach(wrapper => {
        const media = wrapper.querySelector('img, video');
        if (media) wrapper.parentNode.insertBefore(media, wrapper);
        wrapper.remove();
      });
      // Remove grip handles, placeholders, resize handles
      clone.querySelectorAll('.neiki-block-grip, .neiki-block-placeholder, .neiki-table-col-resize-handle, .neiki-img-resize-handle, .neiki-img-size-label, .neiki-img-toolbar').forEach(el => el.remove());
      this.removeStrayGripSvgs(clone);
      const html = clone.innerHTML;
      // Return empty string when the editor contains only the default empty
      // block that browsers insert automatically (e.g. <p><br></p>).
      // This prevents a blank-looking editor from submitting a non-empty value.
      if (/^(\s|<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>|<br\s*\/?>)*$/i.test(html)) {
        return '';
      }
      return html;
    }

    removeStrayGripSvgs(root = this.contentArea) {
      root.querySelectorAll('svg[viewBox="0 0 24 24"]').forEach(svg => {
        if (svg.closest('.neiki-toolbar, .neiki-floating-toolbar, .neiki-img-toolbar, .neiki-block-grip, button')) return;
        const circles = Array.from(svg.children);
        const isGrip = circles.length === 8 && circles.every(child =>
          child.tagName && child.tagName.toLowerCase() === 'circle' &&
          child.getAttribute('r') === '1.5' &&
          ['9', '15'].includes(child.getAttribute('cx')) &&
          ['5', '10', '15', '20'].includes(child.getAttribute('cy'))
        );
        if (isGrip) svg.remove();
      });
    }

    setContent(html) {
      if (this.imageResizer) this.imageResizer.deselect();
      this.savedSelectionRange = null;
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

    saveCurrentSelection() {
      const sel = window.getSelection();
      if (!sel || !sel.rangeCount) return null;

      const range = sel.getRangeAt(0);
      if (!Utils.isRangeInside(range, this.contentArea)) return this.savedSelectionRange;

      this.savedSelectionRange = range.cloneRange();
      return this.savedSelectionRange;
    }

    restoreSavedSelection() {
      if (!this.savedSelectionRange || !Utils.isRangeInside(this.savedSelectionRange, this.contentArea)) {
        this.focus();
        return false;
      }

      this.focus();
      Utils.restoreSelection(this.savedSelectionRange);
      return true;
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

      if (this.imageResizer) this.imageResizer.destroy();
      if (this.tableColumnResizer) this.tableColumnResizer.destroy();
      if (this.blockDragDrop) this.blockDragDrop.destroy();

      this.container.remove();
      this.originalElement.style.display = '';

      if (this.modal.overlay) {
        this.modal.overlay.remove();
      }
    }

    setTheme(theme) {
      this.applyTheme(theme);
    }

    createStatusBar() {
      this.statusBar = Utils.createElement('div', { className: 'neiki-statusbar' });
      const left = Utils.createElement('div', { className: 'neiki-statusbar-left' });
      const right = Utils.createElement('div', { className: 'neiki-statusbar-right' });

      this.statusWordCount = Utils.createElement('span', {
        className: 'neiki-statusbar-item',
        textContent: '0 ' + t('status.words')
      });
      this.statusCharCount = Utils.createElement('span', {
        className: 'neiki-statusbar-item',
        textContent: '0 ' + t('status.chars')
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
      this.statusWordCount.textContent = words + ' ' + (words === 1 ? t('status.word') : t('status.words'));
      this.statusCharCount.textContent = chars + ' ' + (chars === 1 ? t('status.char') : t('status.chars'));
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

    formatHTMLSource(html) {
      const input = String(html || '').trim();
      if (!input) return '';

      const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
      const blockTags = new Set(['article', 'aside', 'blockquote', 'caption', 'colgroup', 'div', 'figure', 'figcaption', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main', 'ol', 'p', 'pre', 'section', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul', 'video']);
      const tokens = [];
      let index = 0;

      while (index < input.length) {
        const tagStart = input.indexOf('<', index);

        if (tagStart === -1) {
          tokens.push(input.slice(index));
          break;
        }

        if (tagStart > index) {
          tokens.push(input.slice(index, tagStart));
        }

        if (input.slice(tagStart, tagStart + 4) === '<!--') {
          const commentEnd = input.indexOf('-->', tagStart + 4);
          const end = commentEnd === -1 ? input.length : commentEnd + 3;
          tokens.push(input.slice(tagStart, end));
          index = end;
          continue;
        }

        const tagEnd = Utils.findTagEnd(input, tagStart + 1);
        if (tagEnd === -1) {
          tokens.push(input.slice(tagStart));
          break;
        }

        tokens.push(input.slice(tagStart, tagEnd + 1));
        index = tagEnd + 1;
      }

      const lines = [];
      let indent = 0;
      let inlineDepth = 0;
      let hasInlineContent = false;

      tokens.forEach(token => {
        const trimmed = token.trim();
        if (!trimmed) return;
        const textPrefix = !/^</.test(trimmed) && /^\s/.test(token) ? ' ' : '';

        const tagMatch = trimmed.match(/^<\/?\s*([a-zA-Z0-9:-]+)/);
        const tagName = tagMatch ? tagMatch[1].toLowerCase() : '';
        const isClosing = /^<\//.test(trimmed);
        const isTag = /^</.test(trimmed);
        const isSelfClosing = /\/>$/.test(trimmed) || voidTags.has(tagName);
        const isBlock = blockTags.has(tagName);

        if (isTag && isClosing) {
          if (!isBlock && lines.length > 0) {
            lines[lines.length - 1] += trimmed;
            inlineDepth = Math.max(inlineDepth - 1, 0);
            return;
          }
          indent = Math.max(indent - 1, 0);
        }

        const prefix = '  '.repeat(indent);
        if (!isTag && (inlineDepth > 0 || hasInlineContent) && lines.length > 0) {
          lines[lines.length - 1] += (textPrefix || (lines[lines.length - 1].endsWith('>') ? '' : ' ')) + trimmed;
        } else if (!isTag || isBlock || lines.length === 0 || isClosing) {
          lines.push(prefix + trimmed);
        } else {
          lines[lines.length - 1] += trimmed;
        }

        if (isTag && !isClosing && !isSelfClosing && isBlock) {
          indent++;
          hasInlineContent = false;
        } else if (isTag && !isClosing && !isSelfClosing && !isBlock) {
          inlineDepth++;
          hasInlineContent = true;
        } else if (!isTag) {
          hasInlineContent = true;
        }
      });

      return lines.join('\n');
    }

    renderCodeViewHighlight() {
      if (!this.codeViewHighlight || !this.codeViewTextarea) return;
      const source = this.codeViewTextarea.value;
      const html = Utils.escapeHTML(source).replace(/(&lt;!--[\s\S]*?--&gt;)|(&lt;\/?[\s\S]*?&gt;)/g, (match, comment) => {
        if (comment) return `<span class="neiki-html-comment">${match}</span>`;

        const tagParts = match.match(/^(&lt;\/?)([a-zA-Z0-9:-]+)([\s\S]*?)(\/?&gt;)$/);
        if (!tagParts) return match;

        const attrs = tagParts[3].replace(/(\s+)([a-zA-Z_:][-a-zA-Z0-9_:.]*)(=)(&quot;.*?&quot;|&#039;.*?&#039;|[^\s&]+)?/g, (attrMatch, space, name, eq, value) => {
          return `${space}<span class="neiki-html-attr">${name}</span>${eq}<span class="neiki-html-string">${value || ''}</span>`;
        });

        return `<span class="neiki-html-punct">${tagParts[1]}</span><span class="neiki-html-tag">${tagParts[2]}</span>${attrs}<span class="neiki-html-punct">${tagParts[4]}</span>`;
      });

      this.codeViewHighlight.innerHTML = html + (source.endsWith('\n') ? ' ' : '');
    }

    toggleCodeView() {
      if (!this.isCodeViewOpen) {
        this.codeViewTextarea.value = this.formatHTMLSource(this.contentArea.innerHTML);
        this.renderCodeViewHighlight();
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
        this.statusAutosave.textContent = t('autosave.savedLocally');
      }

      // Listen for content changes to trigger autosave
      if (!this._autosaveContentHandler) {
        this._autosaveContentHandler = Utils.debounce(() => {
          if (!this.isAutosaveEnabled) return;
          // Show "Autosaving..."
          if (this.statusAutosave) {
            this.statusAutosave.textContent = t('autosave.autosaving');
            this.statusAutosave.style.display = '';
          }
          this.storage.set('autosave_content', this.getContent());
          // Show "Saved locally" after brief delay
          setTimeout(() => {
            if (this.statusAutosave && this.isAutosaveEnabled) {
              this.statusAutosave.textContent = t('autosave.savedLocally');
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

    getCaretRangeFromPoint(x, y) {
      if (document.caretRangeFromPoint) {
        return document.caretRangeFromPoint(x, y);
      }
      if (document.caretPositionFromPoint) {
        const pos = document.caretPositionFromPoint(x, y);
        if (pos) {
          const range = document.createRange();
          range.setStart(pos.offsetNode, pos.offset);
          range.collapse(true);
          return range;
        }
      }
      return null;
    }

    showDropIndicator(range, x, y) {
      if (!this.dropIndicator) {
        this.dropIndicator = document.createElement('div');
        this.dropIndicator.className = 'neiki-drop-indicator';
        this.dropIndicator.setAttribute('aria-hidden', 'true');
        this.contentWrapper.appendChild(this.dropIndicator);
      }

      const wrapperRect = this.contentWrapper.getBoundingClientRect();
      let rect = null;

      if (range) {
        const rects = range.getClientRects();
        rect = rects.length ? rects[0] : range.getBoundingClientRect();
      }

      const left = rect && rect.left ? rect.left - wrapperRect.left : x - wrapperRect.left;
      const top = rect && rect.top ? rect.top - wrapperRect.top : y - wrapperRect.top;
      const height = rect && rect.height ? Math.max(rect.height, 18) : 22;

      this.dropIndicator.style.left = Math.max(6, Math.min(left, wrapperRect.width - 6)) + 'px';
      this.dropIndicator.style.top = Math.max(6, Math.min(top, wrapperRect.height - 6)) + 'px';
      this.dropIndicator.style.height = height + 'px';
      this.dropIndicator.classList.add('show');
    }

    hideDropIndicator() {
      if (this.dropIndicator) {
        this.dropIndicator.classList.remove('show');
      }
    }

    initSelectionDragDrop() {
      this.draggedSelectionRange = null;

      this.contentArea.addEventListener('dragstart', (e) => {
        const sel = window.getSelection();
        if (!sel || !sel.rangeCount || sel.isCollapsed) return;
        if (!this.contentArea.contains(sel.anchorNode) || !this.contentArea.contains(sel.focusNode)) return;

        const range = sel.getRangeAt(0);
        const targetNode = e.target.nodeType === Node.TEXT_NODE ? e.target.parentNode : e.target;
        try {
          if (targetNode && !range.intersectsNode(targetNode)) return;
        } catch (err) {
          return;
        }

        const container = this.cleanDraggedFragment(range.cloneContents());

        this.draggedSelectionRange = range.cloneRange();
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('application/x-neiki-selection', '1');
        e.dataTransfer.setData('text/html', container.innerHTML);
        e.dataTransfer.setData('text/plain', sel.toString());
      });

      this.contentArea.addEventListener('dragend', () => {
        this.draggedSelectionRange = null;
        this.hideDropIndicator();
      });
    }

    cleanDraggedFragment(fragment) {
      const container = document.createElement('div');
      container.appendChild(fragment);
      container.querySelectorAll('.neiki-block-grip, .neiki-block-placeholder, .neiki-table-col-resize-handle, .neiki-img-resize-handle, .neiki-img-size-label, .neiki-img-toolbar').forEach(el => el.remove());
      this.removeStrayGripSvgs(container);
      return container;
    }

    handleSelectionDrop(e) {
      if (!this.draggedSelectionRange || !e.dataTransfer.types.includes('application/x-neiki-selection')) {
        return false;
      }

      const dropRange = this.getCaretRangeFromPoint(e.clientX, e.clientY);
      if (!dropRange || !this.contentArea.contains(dropRange.startContainer)) return false;
      this.hideDropIndicator();

      const sourceRange = this.draggedSelectionRange;
      const container = this.cleanDraggedFragment(sourceRange.cloneContents());
      const fragment = document.createDocumentFragment();
      while (container.firstChild) fragment.appendChild(container.firstChild);
      const marker = document.createTextNode('');
      dropRange.insertNode(marker);

      try {
        if (sourceRange.intersectsNode(marker)) {
          marker.remove();
          this.draggedSelectionRange = null;
          this.hideDropIndicator();
          return true;
        }
      } catch (err) {}

      sourceRange.deleteContents();
      marker.parentNode.insertBefore(fragment, marker);
      marker.remove();

      this.draggedSelectionRange = null;
      this._ensureDefaultBlock();
      this.history.record();
      this.syncToOriginal();
      this.triggerChange();
      this.updateStatusBar();
      return true;
    }

    initDragDrop() {
      let dragCounter = 0;

      this.contentArea.addEventListener('dragenter', (e) => {
        e.preventDefault();
        if (!e.dataTransfer.types.includes('Files')) return;
        dragCounter++;
        this.contentArea.classList.add('neiki-drag-over');
      });

      this.contentArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        if (!e.dataTransfer.types.includes('Files')) return;
        dragCounter--;
        if (dragCounter === 0) {
          this.contentArea.classList.remove('neiki-drag-over');
          this.hideDropIndicator();
        }
      });

      this.contentArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (e.dataTransfer.types.includes('Files') || e.dataTransfer.types.includes('application/x-neiki-selection')) {
          const range = this.getCaretRangeFromPoint(e.clientX, e.clientY);
          if (range && this.contentArea.contains(range.startContainer)) {
            this.showDropIndicator(range, e.clientX, e.clientY);
          }
        }
      });

      this.contentArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dragCounter = 0;
        this.contentArea.classList.remove('neiki-drag-over');
        this.hideDropIndicator();

        if (this.handleSelectionDrop(e)) return;

        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        const videoFiles = files.filter(file => file.type.startsWith('video/'));

        if (imageFiles.length > 0 || videoFiles.length > 0) {
          // Get cursor position from drop event
          const dropX = e.clientX;
          const dropY = e.clientY;

          const setCursorAtDrop = () => {
            const range = this.getCaretRangeFromPoint(dropX, dropY);
            if (range) {
              const sel = window.getSelection();
              sel.removeAllRanges();
              sel.addRange(range);
            }
          };

          const insertFile = async (file, type) => {
            setCursorAtDrop();
            const isImage = type === 'image';
            const handler = isImage ? this.config.imageUploadHandler : this.config.videoUploadHandler;
            const hasUploadHandler = typeof handler === 'function';

            if (hasUploadHandler) {
              const url = await handler(file);
              if (url) {
                if (isImage) this.commands.insertImage(url, file.name, '');
                else this.commands.insertVideo(url, file.name, '');
              }
              return;
            }

            await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (readerEvent) => {
                setCursorAtDrop();
                if (isImage) this.commands.insertImage(readerEvent.target.result, file.name, '');
                else this.commands.insertVideo(readerEvent.target.result, file.name, '');
                resolve();
              };
              reader.readAsDataURL(file);
            });
          };

          if (typeof this.config.imageUploadHandler === 'function' || typeof this.config.videoUploadHandler === 'function') {
            (async () => {
              for (const file of imageFiles) {
                try {
                  await insertFile(file, 'image');
                } catch (err) {
                  console.error('NeikiEditor: Image upload failed', err);
                }
              }
              for (const file of videoFiles) {
                try {
                  await insertFile(file, 'video');
                } catch (err) {
                  console.error('NeikiEditor: Video upload failed', err);
                }
              }
            })();
          } else {
            [...imageFiles.map(file => [file, 'image']), ...videoFiles.map(file => [file, 'video'])].forEach(([file, type]) => {
              insertFile(file, type);
            });
          }
        }
      });
    }
  }

  // ============================================
  // SECTION 10a: IMAGE RESIZER
  // ============================================

  class ImageResizer {
    constructor(editor) {
      this.editor = editor;
      this.wrapper = null;
      this.currentImg = null;
      this.isResizing = false;
      this.startX = 0;
      this.startY = 0;
      this.startWidth = 0;
      this.startHeight = 0;
      this.aspectRatio = 1;
      this.handle = null;

      this.bindEvents();
    }

    bindEvents() {
      this._dragTimeout = null;
      this._dragStarted = false;

      this.editor.contentArea.addEventListener('mousedown', (e) => {
        const img = e.target.closest('img, video');
        if (!img || !this.editor.contentArea.contains(img) || this.isEditorUiElement(img)) return;
        if (e.target.closest('.neiki-img-resize-handle') || e.target.closest('.neiki-img-toolbar')) return;

        e.preventDefault();
        this._dragStarted = false;

        // Select image immediately
        if (!this.wrapper || this.currentImg !== img) {
          this.selectImage(img);
        }

        // After a short hold, start drag
        this._dragTimeout = setTimeout(() => {
          if (this.wrapper && this.currentImg) {
            this._dragStarted = true;
            this.startImageDrag(e);
          }
        }, 200);

        const cancelHold = () => {
          clearTimeout(this._dragTimeout);
          document.removeEventListener('mouseup', cancelHold);
          document.removeEventListener('mousemove', onMoveCheck);
        };

        let startX = e.clientX, startY = e.clientY;
        const onMoveCheck = (ev) => {
          // If moved more than 5px, start drag immediately
          if (Math.abs(ev.clientX - startX) > 5 || Math.abs(ev.clientY - startY) > 5) {
            clearTimeout(this._dragTimeout);
            if (!this._dragStarted && this.wrapper && this.currentImg) {
              this._dragStarted = true;
              this.startImageDrag(ev);
            }
            document.removeEventListener('mousemove', onMoveCheck);
            document.removeEventListener('mouseup', cancelHold);
          }
        };

        document.addEventListener('mouseup', cancelHold);
        document.addEventListener('mousemove', onMoveCheck);
      });

      this.editor.contentArea.addEventListener('click', (e) => {
        if (this._dragStarted) return;
        const img = e.target.closest('img, video');
        if (img && this.editor.contentArea.contains(img) && !this.isEditorUiElement(img)) {
          e.preventDefault();
          if (!this.wrapper || this.currentImg !== img) {
            this.selectImage(img);
          }
        } else if (!e.target.closest('.neiki-img-resize-handle') && !e.target.closest('.neiki-img-toolbar')) {
          this.deselect();
        }
      });

      // Touch: tap image to select (drag only via grip handle in img toolbar)
      this.editor.contentArea.addEventListener('touchend', (e) => {
        const img = e.target.closest('img, video');
        if (!img || !this.editor.contentArea.contains(img) || this.isEditorUiElement(img)) return;
        if (e.target.closest('.neiki-img-resize-handle') || e.target.closest('.neiki-img-toolbar')) return;
        e.preventDefault();
        if (!this.wrapper || this.currentImg !== img) {
          this.selectImage(img);
        }
      });

      // Prevent native image drag inside editor (causes duplicate on drop)
      this.editor.contentArea.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
          e.preventDefault();
        }
      });

      document.addEventListener('mousedown', (e) => {
        if (this.wrapper && !this.wrapper.contains(e.target) && !this.editor.contentArea.contains(e.target)) {
          this.deselect();
        }
      });

      document.addEventListener('touchstart', (e) => {
        if (this.wrapper && !this.wrapper.contains(e.target) && !this.editor.contentArea.contains(e.target)) {
          this.deselect();
        }
      });
    }

    isEditorUiElement(node) {
      return !!(node && node.closest && node.closest('.neiki-block-grip, .neiki-img-toolbar, .neiki-img-resize-handle, .neiki-img-size-label, .neiki-table-col-resize-handle'));
    }

    selectImage(img) {
      this.deselect();
      this.currentImg = img;
      const isVideo = img.tagName === 'VIDEO';

      // Create wrapper around image
      this.wrapper = document.createElement('span');
      this.wrapper.className = 'neiki-img-resizable';
      this.wrapper.contentEditable = 'false';
      this.wrapper.setAttribute('data-neiki-resizer', 'true');

      img.parentNode.insertBefore(this.wrapper, img);
      this.wrapper.appendChild(img);

      // Add resize handles
      ['nw', 'ne', 'sw', 'se'].forEach(pos => {
        const handle = document.createElement('span');
        handle.className = 'neiki-img-resize-handle ' + pos;
        handle.setAttribute('data-pos', pos);
        handle.addEventListener('mousedown', (e) => this.startResize(e, pos));
        handle.addEventListener('touchstart', (e) => {
          e.preventDefault();
          const touch = e.touches[0];
          this.startResize(touch, pos, true);
        }, { passive: false });
        this.wrapper.appendChild(handle);
      });

      // Add size label
      this.sizeLabel = document.createElement('span');
      this.sizeLabel.className = 'neiki-img-size-label';
      this.sizeLabel.textContent = Math.round(img.offsetWidth) + ' × ' + Math.round(img.offsetHeight);
      this.wrapper.appendChild(this.sizeLabel);

      // Add image-specific toolbar
      this.imgToolbar = document.createElement('div');
      this.imgToolbar.className = 'neiki-img-toolbar';
      this.imgToolbar.contentEditable = 'false';

      const dragHandle = document.createElement('button');
      dragHandle.className = 'neiki-img-toolbar-btn neiki-img-drag-handle';
      dragHandle.type = 'button';
      dragHandle.title = t('imageToolbar.dragToMove');
      dragHandle.innerHTML = Icons.grip;
      dragHandle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.startImageDrag(e);
      });
      dragHandle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        this.startImageDrag({ clientX: touch.clientX, clientY: touch.clientY }, true);
      }, { passive: false });

      const moveUpBtn = document.createElement('button');
      moveUpBtn.className = 'neiki-img-toolbar-btn';
      moveUpBtn.type = 'button';
      moveUpBtn.title = t('blockToolbar.moveUp');
      moveUpBtn.setAttribute('aria-label', t('blockToolbar.moveUp'));
      moveUpBtn.innerHTML = Icons.moveUp;
      moveUpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const block = this.getImageBlock();
        if (block && this.editor.blockDragDrop) {
          this.editor.blockDragDrop.moveBlockUp(block);
          this.positionImgToolbar();
        }
      });

      const moveDownBtn = document.createElement('button');
      moveDownBtn.className = 'neiki-img-toolbar-btn';
      moveDownBtn.type = 'button';
      moveDownBtn.title = t('blockToolbar.moveDown');
      moveDownBtn.setAttribute('aria-label', t('blockToolbar.moveDown'));
      moveDownBtn.innerHTML = Icons.moveDown;
      moveDownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const block = this.getImageBlock();
        if (block && this.editor.blockDragDrop) {
          this.editor.blockDragDrop.moveBlockDown(block);
          this.positionImgToolbar();
        }
      });

      const sep1 = document.createElement('span');
      sep1.className = 'neiki-img-toolbar-separator';

      const replaceBtn = document.createElement('button');
      replaceBtn.className = 'neiki-img-toolbar-btn';
      replaceBtn.type = 'button';
      replaceBtn.title = isVideo ? t('videoToolbar.replaceVideo') : t('imageToolbar.replaceImage');
      replaceBtn.innerHTML = Icons.replaceImage;
      replaceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.replaceImage();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'neiki-img-toolbar-btn neiki-img-toolbar-btn-danger';
      deleteBtn.type = 'button';
      deleteBtn.title = isVideo ? t('videoToolbar.deleteVideo') : t('imageToolbar.deleteImage');
      deleteBtn.innerHTML = Icons.trash;
      deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.deleteSelectedImage();
      });

      this.imgToolbar.appendChild(dragHandle);
      this.imgToolbar.appendChild(moveUpBtn);
      this.imgToolbar.appendChild(moveDownBtn);
      this.imgToolbar.appendChild(sep1);
      this.imgToolbar.appendChild(replaceBtn);
      this.imgToolbar.appendChild(deleteBtn);
      this.wrapper.appendChild(this.imgToolbar);

      this.positionImgToolbar();
      this.clearNativeSelection();
    }

    getImageBlock() {
      if (!this.wrapper) return null;
      let node = this.wrapper;
      while (node && node.parentNode !== this.editor.contentArea) {
        node = node.parentNode;
      }
      return node;
    }

    positionImgToolbar() {
      if (!this.imgToolbar || !this.wrapper) return;
      // Reset styles for measurement
      this.imgToolbar.style.top = '';
      this.imgToolbar.style.bottom = '';
      this.imgToolbar.style.left = '';
      this.imgToolbar.style.transform = '';

      const wrapperRect = this.wrapper.getBoundingClientRect();
      const toolbarRect = this.editor.toolbar.getBoundingClientRect();
      const spaceAbove = wrapperRect.top - toolbarRect.bottom;

      if (spaceAbove < 50) {
        // Not enough space above — show below the image
        this.imgToolbar.style.top = 'auto';
        this.imgToolbar.style.bottom = '-42px';
      } else {
        // Show above the image (default)
        this.imgToolbar.style.top = '-42px';
        this.imgToolbar.style.bottom = 'auto';
      }

      // Ensure toolbar doesn't overflow viewport horizontally
      requestAnimationFrame(() => {
        if (!this.imgToolbar) return;
        const tbRect = this.imgToolbar.getBoundingClientRect();
        if (tbRect.left < 4) {
          this.imgToolbar.style.left = '0';
          this.imgToolbar.style.transform = 'none';
        } else if (tbRect.right > window.innerWidth - 4) {
          this.imgToolbar.style.left = 'auto';
          this.imgToolbar.style.right = '0';
          this.imgToolbar.style.transform = 'none';
        }
      });
    }

    replaceImage() {
      if (!this.currentImg) return;
      const isVideo = this.currentImg.tagName === 'VIDEO';
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = isVideo ? 'video/*' : 'image/*';
      input.addEventListener('change', async () => {
        const file = input.files[0];
        if (!file) return;
        const hasUploadHandler = isVideo
          ? typeof this.editor.config.videoUploadHandler === 'function'
          : typeof this.editor.config.imageUploadHandler === 'function';
        if (hasUploadHandler) {
          try {
            const url = isVideo
              ? await this.editor.config.videoUploadHandler(file)
              : await this.editor.config.imageUploadHandler(file);
            if (url) this.currentImg.src = url;
          } catch (err) {
            console.error(`NeikiEditor: ${isVideo ? 'Video' : 'Image'} upload failed`, err);
          }
        } else {
          const reader = new FileReader();
          reader.onload = (ev) => { this.currentImg.src = ev.target.result; };
          reader.readAsDataURL(file);
        }
        this.editor.history.record();
        this.editor.syncToOriginal();
        this.editor.triggerChange();
      });
      input.click();
    }

    startImageDrag(e, isTouch = false) {
      if (!this.wrapper || !this.currentImg) return;

      const img = this.currentImg;
      const wrapper = this.wrapper;
      const contentArea = this.editor.contentArea;
      if (this.editor.blockDragDrop) this.editor.blockDragDrop.hideGrip();

      // Save image dimensions
      const imgWidth = img.style.width;
      const imgHeight = img.style.height;

      // Create ghost element
      const ghost = document.createElement('div');
      ghost.className = 'neiki-block-ghost';
      ghost.style.width = Math.min(img.offsetWidth, 200) + 'px';
      ghost.style.opacity = '0.7';
      ghost.style.pointerEvents = 'none';
      const ghostImg = img.cloneNode(true);
      ghostImg.style.width = '100%';
      ghostImg.style.height = 'auto';
      ghostImg.removeAttribute('controls');
      ghost.appendChild(ghostImg);
      document.body.appendChild(ghost);

      const offsetX = e.clientX - wrapper.getBoundingClientRect().left;
      const offsetY = e.clientY - wrapper.getBoundingClientRect().top;
      ghost.style.left = (e.clientX - offsetX) + 'px';
      ghost.style.top = (e.clientY - offsetY) + 'px';

      // Hide the original wrapper during drag
      wrapper.style.opacity = '0.3';

      // Caret marker for drop position
      let dropRange = null;

      const onMove = (ev) => {
        let cx, cy;
        if (isTouch) {
          if (ev.touches && ev.touches.length) {
            cx = ev.touches[0].clientX;
            cy = ev.touches[0].clientY;
            ev.preventDefault();
          } else return;
        } else {
          cx = ev.clientX;
          cy = ev.clientY;
        }
        ghost.style.left = (cx - offsetX) + 'px';
        ghost.style.top = (cy - offsetY) + 'px';
        const range = this.editor.getCaretRangeFromPoint(cx, cy);
        if (this.isSafeDropRange(range, wrapper)) {
          dropRange = range;
          this.editor.showDropIndicator(range, cx, cy);
        }
      };

      const onUp = () => {
        if (isTouch) {
          document.removeEventListener('touchmove', onMove);
          document.removeEventListener('touchend', onUp);
        } else {
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
        }

        // Remove image from wrapper before deselect to keep DOM clean
        const imgParent = img.parentNode;
        if (imgParent) imgParent.removeChild(img);

        // Restore saved dimensions
        if (imgWidth) img.style.width = imgWidth;
        if (imgHeight) img.style.height = imgHeight;

        // Clean up wrapper
        if (wrapper.parentNode) {
          wrapper.parentNode.removeChild(wrapper);
        }
        this.wrapper = null;
        this.currentImg = null;
        this.sizeLabel = null;
        this.imgToolbar = null;

        if (this.isSafeDropRange(dropRange, wrapper)) {
          // Insert image at the caret drop position
          dropRange.insertNode(img);
        } else {
          // No valid drop — put image back in content area
          contentArea.appendChild(img);
        }

        ghost.remove();

        // Clean up empty parent blocks left behind
        this.editor._ensureDefaultBlock();
        this.editor.removeStrayGripSvgs();

        // Re-select the image at its new position
        this.selectImage(img);

        this.editor.history.record();
        this.editor.syncToOriginal();
        this.editor.triggerChange();
      };

      if (isTouch) {
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onUp);
      } else {
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      }
    }

    isSafeDropRange(range, wrapper) {
      if (!range || !this.editor.contentArea.contains(range.startContainer)) return false;
      let node = range.startContainer;
      while (node && node !== this.editor.contentArea) {
        if (node === wrapper) return false;
        if (node.nodeType === Node.ELEMENT_NODE && node.closest && node.closest('.neiki-block-grip, .neiki-img-toolbar, .neiki-img-resize-handle, .neiki-img-size-label, .neiki-table-col-resize-handle')) {
          return false;
        }
        this.editor.hideDropIndicator();
        node = node.parentNode;
      }
      return true;
    }

    clearNativeSelection() {
      const sel = window.getSelection();
      if (sel) sel.removeAllRanges();
    }

    getSelectedImageClipboardData() {
      if (!this.currentImg || !this.wrapper || !this.editor.contentArea.contains(this.wrapper)) {
        return null;
      }

      const img = this.currentImg.cloneNode(true);
      return {
        html: img.outerHTML,
        text: img.getAttribute('src') || ''
      };
    }

    deleteSelectedImage() {
      if (!this.currentImg || !this.wrapper || !this.editor.contentArea.contains(this.wrapper)) {
        return false;
      }

      const parent = this.wrapper.parentNode;
      const marker = document.createTextNode('');
      parent.insertBefore(marker, this.wrapper);
      this.wrapper.remove();

      this.wrapper = null;
      this.currentImg = null;
      this.sizeLabel = null;

      const range = document.createRange();
      if (marker.parentNode) {
        range.setStartAfter(marker);
        marker.remove();
      } else {
        range.selectNodeContents(this.editor.contentArea);
        range.collapse(false);
      }
      range.collapse(true);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      this.editor.savedSelectionRange = range.cloneRange();
      this.editor._ensureDefaultBlock();
      this.editor.history.record();
      this.editor.syncToOriginal();
      this.editor.triggerChange();
      this.editor.updateStatusBar();
      return true;
    }

    deselect() {
      if (this.wrapper && this.currentImg) {
        const img = this.currentImg;
        const parent = this.wrapper.parentNode;
        if (parent) {
          parent.insertBefore(img, this.wrapper);
          this.wrapper.remove();
        }
      }
      this.wrapper = null;
      this.currentImg = null;
      this.sizeLabel = null;
      this.imgToolbar = null;
    }

    startResize(e, pos, isTouch = false) {
      if (e.preventDefault) { e.preventDefault(); }
      if (e.stopPropagation) { e.stopPropagation(); }

      this.isResizing = true;
      this.handle = pos;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startWidth = this.currentImg.offsetWidth;
      this.startHeight = this.currentImg.offsetHeight;
      this.aspectRatio = this.startWidth / this.startHeight;

      if (isTouch) {
        const onTouchMove = (ev) => {
          ev.preventDefault();
          this.onResize(ev.touches[0]);
        };
        const onTouchEnd = () => {
          this.isResizing = false;
          document.removeEventListener('touchmove', onTouchMove);
          document.removeEventListener('touchend', onTouchEnd);
          this.editor.history.record();
          this.editor.syncToOriginal();
          this.editor.triggerChange();
        };
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
      } else {
        const onMove = (ev) => this.onResize(ev);
        const onUp = () => {
          this.isResizing = false;
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
          this.editor.history.record();
          this.editor.syncToOriginal();
          this.editor.triggerChange();
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      }
    }

    onResize(e) {
      if (!this.isResizing || !this.currentImg) return;

      const dx = e.clientX - this.startX;

      let newWidth, newHeight;

      switch (this.handle) {
        case 'se':
          newWidth = this.startWidth + dx;
          break;
        case 'sw':
          newWidth = this.startWidth - dx;
          break;
        case 'ne':
          newWidth = this.startWidth + dx;
          break;
        case 'nw':
          newWidth = this.startWidth - dx;
          break;
      }

      newWidth = Math.max(30, newWidth);
      newHeight = Math.round(newWidth / this.aspectRatio);

      this.currentImg.style.width = newWidth + 'px';
      this.currentImg.style.height = newHeight + 'px';
      this.currentImg.removeAttribute('width');
      this.currentImg.removeAttribute('height');

      if (this.sizeLabel) {
        this.sizeLabel.textContent = Math.round(newWidth) + ' × ' + Math.round(newHeight);
      }
    }

    destroy() {
      this.deselect();
    }
  }

  // ============================================
  // SECTION 10b: TABLE COLUMN RESIZER
  // ============================================

  class TableColumnResizer {
    constructor(editor) {
      this.editor = editor;
      this.isResizing = false;
      this.currentHandle = null;
      this.startX = 0;
      this.startWidthLeft = 0;
      this.startWidthRight = 0;
      this.cellLeft = null;
      this.cellRight = null;

      this.bindEvents();
    }

    bindEvents() {
      this.editor.contentArea.addEventListener('mousemove', (e) => {
        if (this.isResizing) return;
        const cell = e.target.closest('td, th');
        if (!cell) {
          this.removeHandles();
          return;
        }
        this.showHandle(cell, e);
      });

      this.editor.contentArea.addEventListener('mouseleave', () => {
        if (!this.isResizing) this.removeHandles();
      });
    }

    showHandle(cell, e) {
      const rect = cell.getBoundingClientRect();
      const threshold = 6;
      const isNearRight = (e.clientX > rect.right - threshold);
      const isNearLeft = (e.clientX < rect.left + threshold);

      this.removeHandles();

      if (!isNearRight && !isNearLeft) return;

      const table = cell.closest('table');
      if (!table) return;

      let leftCell, rightCell;
      const row = cell.closest('tr');
      const cellIndex = Array.from(row.cells).indexOf(cell);

      if (isNearRight && cellIndex < row.cells.length - 1) {
        leftCell = cell;
        rightCell = row.cells[cellIndex + 1];
      } else if (isNearLeft && cellIndex > 0) {
        leftCell = row.cells[cellIndex - 1];
        rightCell = cell;
      } else {
        return;
      }

      const handle = document.createElement('div');
      handle.className = 'neiki-table-col-resize-handle';
      const leftRect = leftCell.getBoundingClientRect();
      const contentRect = this.editor.contentArea.getBoundingClientRect();

      handle.style.left = (leftRect.right - contentRect.left - 3 + this.editor.contentArea.scrollLeft) + 'px';
      handle.style.top = (table.getBoundingClientRect().top - contentRect.top + this.editor.contentArea.scrollTop) + 'px';
      handle.style.height = table.offsetHeight + 'px';

      handle.addEventListener('mousedown', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.startResize(ev, leftCell, rightCell, table);
      });

      this.editor.contentArea.appendChild(handle);
      this.currentHandle = handle;
    }

    removeHandles() {
      if (this.currentHandle) {
        this.currentHandle.remove();
        this.currentHandle = null;
      }
    }

    startResize(e, leftCell, rightCell, table) {
      this.isResizing = true;
      this.startX = e.clientX;
      this.cellLeft = leftCell;
      this.cellRight = rightCell;

      // Set table to fixed layout
      table.style.tableLayout = 'fixed';

      // Initialize all cell widths as px if not set
      const firstRow = table.rows[0];
      if (firstRow) {
        Array.from(firstRow.cells).forEach(c => {
          if (!c.style.width) c.style.width = c.offsetWidth + 'px';
        });
      }

      this.startWidthLeft = leftCell.offsetWidth;
      this.startWidthRight = rightCell.offsetWidth;

      this.removeHandles();

      const onMove = (ev) => {
        const dx = ev.clientX - this.startX;
        const newLeft = Math.max(40, this.startWidthLeft + dx);
        const newRight = Math.max(40, this.startWidthRight - dx);

        // Apply to all cells in same column
        const leftIdx = Array.from(leftCell.closest('tr').cells).indexOf(leftCell);
        const rightIdx = Array.from(rightCell.closest('tr').cells).indexOf(rightCell);
        Array.from(table.rows).forEach(row => {
          if (row.cells[leftIdx]) row.cells[leftIdx].style.width = newLeft + 'px';
          if (row.cells[rightIdx]) row.cells[rightIdx].style.width = newRight + 'px';
        });
      };

      const onUp = () => {
        this.isResizing = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        this.editor.history.record();
        this.editor.triggerChange();
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    }

    destroy() {
      this.removeHandles();
    }
  }

  // ============================================
  // SECTION 10c: BLOCK DRAG & DROP REORDERING
  // ============================================

  class BlockDragDrop {
    constructor(editor) {
      this.editor = editor;
      this.gripEl = null;
      this.dragBlock = null;
      this.placeholder = null;
      this.isDragging = false;
      this.offsetY = 0;
      this.ghostEl = null;

      this.bindEvents();
    }

    getTopLevelBlocks() {
      return Array.from(this.editor.contentArea.children).filter(el =>
        el.nodeType === Node.ELEMENT_NODE &&
        !el.classList.contains('neiki-block-placeholder') &&
        !el.classList.contains('neiki-block-grip')
      );
    }

    getBlockFromPoint(y) {
      const blocks = this.getTopLevelBlocks();
      for (let i = blocks.length - 1; i >= 0; i--) {
        const rect = blocks[i].getBoundingClientRect();
        if (y >= rect.top) return { block: blocks[i], index: i };
      }
      return blocks.length > 0 ? { block: blocks[0], index: 0 } : null;
    }

    bindEvents() {
      // Show grip on hover
      this.editor.contentArea.addEventListener('mousemove', (e) => {
        if (this.isDragging) return;
        const block = this.getBlockAt(e.target);
        if (block) {
          this.showGrip(block);
        } else {
          this.hideGrip();
        }
      });

      this.editor.contentArea.addEventListener('mouseleave', (e) => {
        if (this.gripEl && e.relatedTarget && this.gripEl.contains(e.relatedTarget)) return;
        if (!this.isDragging) this.hideGrip();
      });
    }

    getBlockAt(target) {
      if (!target || target === this.editor.contentArea) return null;
      let node = target;
      while (node && node.parentNode !== this.editor.contentArea) {
        node = node.parentNode;
      }
      if (node && node.nodeType === Node.ELEMENT_NODE && node.parentNode === this.editor.contentArea) {
        return node;
      }
      return null;
    }

    showGrip(block) {
      if (this.gripEl && this.gripEl._block === block) return;
      this.hideGrip();

      const grip = document.createElement('div');
      grip.className = 'neiki-block-grip';
      grip.innerHTML = Icons.grip;
      grip.title = t('blockToolbar.dragToReorder');
      grip.contentEditable = 'false';
      grip._block = block;

      // Position grip
      const wrapperRect = this.editor.contentWrapper.getBoundingClientRect();
      const blockRect = block.getBoundingClientRect();
      grip.style.top = (blockRect.top - wrapperRect.top) + 'px';
      grip.style.left = Math.max(2, blockRect.left - wrapperRect.left - 28) + 'px';

      grip.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.startDrag(e, block);
      });

      this.editor.contentWrapper.appendChild(grip);
      this.gripEl = grip;
    }

    hideGrip() {
      if (this.gripEl) {
        this.gripEl.remove();
        this.gripEl = null;
      }
    }

    startDrag(e, block) {
      this.isDragging = true;
      this.dragBlock = block;
      this.hideGrip();

      // Create ghost
      this.ghostEl = block.cloneNode(true);
      this.editor.removeStrayGripSvgs(this.ghostEl);
      this.ghostEl.querySelectorAll('.neiki-block-grip, .neiki-img-toolbar, .neiki-img-resize-handle, .neiki-img-size-label').forEach(el => el.remove());
      this.ghostEl.className = (this.ghostEl.className || '') + ' neiki-block-ghost';
      this.ghostEl.style.width = block.offsetWidth + 'px';
      document.body.appendChild(this.ghostEl);

      const rect = block.getBoundingClientRect();
      this.offsetY = e.clientY - rect.top;
      this.ghostEl.style.left = rect.left + 'px';
      this.ghostEl.style.top = (e.clientY - this.offsetY) + 'px';

      // Create placeholder
      this.placeholder = document.createElement('div');
      this.placeholder.className = 'neiki-block-placeholder';
      this.placeholder.style.height = block.offsetHeight + 'px';
      block.parentNode.insertBefore(this.placeholder, block);

      // Hide original
      block.style.display = 'none';

      const onMove = (ev) => {
        this.ghostEl.style.top = (ev.clientY - this.offsetY) + 'px';

        // Find target position
        const target = this.getBlockFromPoint(ev.clientY);
        if (target && target.block !== this.dragBlock && target.block !== this.placeholder) {
          const targetRect = target.block.getBoundingClientRect();
          const mid = targetRect.top + targetRect.height / 2;
          if (ev.clientY < mid) {
            target.block.parentNode.insertBefore(this.placeholder, target.block);
          } else {
            target.block.parentNode.insertBefore(this.placeholder, target.block.nextSibling);
          }
        }
      };

      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);

        // Move block to placeholder position
        this.placeholder.parentNode.insertBefore(this.dragBlock, this.placeholder);
        this.dragBlock.style.display = '';
        this.placeholder.remove();
        this.ghostEl.remove();

        this.isDragging = false;
        this.dragBlock = null;
        this.placeholder = null;
        this.ghostEl = null;

        this.editor.removeStrayGripSvgs();
        this.editor.history.record();
        this.editor.syncToOriginal();
        this.editor.triggerChange();
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    }

    moveBlockUp(block) {
      if (!block) block = this.getSelectedBlock();
      if (!block) return;
      const prev = block.previousElementSibling;
      if (prev && prev.parentNode === this.editor.contentArea) {
        prev.parentNode.insertBefore(block, prev);
        this.editor.history.record();
        this.editor.triggerChange();
      }
    }

    moveBlockDown(block) {
      if (!block) block = this.getSelectedBlock();
      if (!block) return;
      const next = block.nextElementSibling;
      if (next && next.parentNode === this.editor.contentArea) {
        next.parentNode.insertBefore(block, next.nextSibling);
        this.editor.history.record();
        this.editor.triggerChange();
      }
    }

    getSelectedBlock() {
      const sel = window.getSelection();
      if (!sel || !sel.rangeCount) return null;
      let node = sel.getRangeAt(0).startContainer;
      if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
      while (node && node.parentNode !== this.editor.contentArea) {
        node = node.parentNode;
      }
      if (node && node.parentNode === this.editor.contentArea) return node;
      return null;
    }

    destroy() {
      this.hideGrip();
      if (this.ghostEl) this.ghostEl.remove();
      if (this.placeholder) this.placeholder.remove();
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

      // Move block buttons (left side)
      const moveButtons = [
        { item: 'moveUp', icon: Icons.moveUp, title: t('blockToolbar.moveUp') },
        { item: 'moveDown', icon: Icons.moveDown, title: t('blockToolbar.moveDown') }
      ];

      moveButtons.forEach(({ item, icon, title }) => {
        const button = Utils.createElement('button', {
          className: 'neiki-toolbar-btn neiki-floating-btn neiki-floating-move-btn',
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

      // Divider
      const divider = Utils.createElement('span', { className: 'neiki-floating-divider' });
      this.toolbar.appendChild(divider);

      // Formatting buttons
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
      // Hide when an image is selected (image toolbar takes over)
      if (this.editor.imageResizer && this.editor.imageResizer.currentImg) {
        this.hide();
        return;
      }

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
      } else if (item === 'moveUp') {
        if (this.editor.blockDragDrop) this.editor.blockDragDrop.moveBlockUp();
      } else if (item === 'moveDown') {
        if (this.editor.blockDragDrop) this.editor.blockDragDrop.moveBlockDown();
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
                <div class="neiki-context-item" data-action="insertRowAbove">${Icons.table} ${Utils.escapeHTML(t('tableContextMenu.insertRowAbove'))}</div>
                <div class="neiki-context-item" data-action="insertRowBelow">${Icons.table} ${Utils.escapeHTML(t('tableContextMenu.insertRowBelow'))}</div>
                <div class="neiki-context-item" data-action="insertColLeft">${Icons.table} ${Utils.escapeHTML(t('tableContextMenu.insertColLeft'))}</div>
                <div class="neiki-context-item" data-action="insertColRight">${Icons.table} ${Utils.escapeHTML(t('tableContextMenu.insertColRight'))}</div>
                <div class="neiki-context-divider"></div>
                <div class="neiki-context-item" data-action="deleteRow">${Icons.eraser} ${Utils.escapeHTML(t('tableContextMenu.deleteRow'))}</div>
                <div class="neiki-context-item" data-action="deleteCol">${Icons.eraser} ${Utils.escapeHTML(t('tableContextMenu.deleteCol'))}</div>
                <div class="neiki-context-item neiki-context-danger" data-action="deleteTable">${Icons.eraser} ${Utils.escapeHTML(t('tableContextMenu.deleteTable'))}</div>
                <div class="neiki-context-divider"></div>
                <div class="neiki-context-item" data-action="mergeCells">${Icons.table} ${Utils.escapeHTML(t('tableContextMenu.mergeCells'))}</div>
                <div class="neiki-context-item" data-action="splitCell">${Icons.table} ${Utils.escapeHTML(t('tableContextMenu.splitCell'))}</div>
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

    syncThemeClasses() {
      if (!this.editor.getThemeClasses) return;
      this.menu.classList.remove('neiki-dark', 'neiki-theme-blue', 'neiki-theme-dark-blue', 'neiki-theme-midnight', 'neiki-theme-void', 'neiki-theme-autumn');
      this.editor.getThemeClasses(this.editor.config.theme).split(' ').filter(Boolean).forEach(className => {
        this.menu.classList.add(className);
      });
    }

    show(x, y) {
      this.syncThemeClasses();
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
  // EDITOR CONTEXT MENU (general right-click menu)
  // ============================================

  class EditorContextMenu {
    constructor(editor) {
      this.editor = editor;
      this.menu = null;

      this.createMenu();
      this.bindEvents();
    }

    createMenu() {
      this.menu = Utils.createElement('div', { className: 'neiki-context-menu' });
      this.menu.innerHTML = `
                <div class="neiki-context-item" data-action="undo">${Icons.undo} <span data-label="contextMenu.undo"></span></div>
                <div class="neiki-context-item" data-action="redo">${Icons.redo} <span data-label="contextMenu.redo"></span></div>
                <div class="neiki-context-divider"></div>
                <div class="neiki-context-item" data-action="cut">${Icons.cut} <span data-label="contextMenu.cut"></span></div>
                <div class="neiki-context-item" data-action="copy">${Icons.copy} <span data-label="contextMenu.copy"></span></div>
                <div class="neiki-context-item" data-action="paste">${Icons.paste} <span data-label="contextMenu.paste"></span></div>
                <div class="neiki-context-item" data-action="pasteAsPlainText">${Icons.pasteText} <span data-label="contextMenu.pasteAsPlainText"></span></div>
                <div class="neiki-context-divider"></div>
                <div class="neiki-context-item" data-action="selectAll">${Icons.selectAll} <span data-label="contextMenu.selectAll"></span></div>
                <div class="neiki-context-divider"></div>
                <div class="neiki-context-item" data-action="removeFormat">${Icons.eraser} <span data-label="contextMenu.removeFormat"></span></div>
            `;
      document.body.appendChild(this.menu);
      this.updateLabels();

      this.menu.querySelectorAll('.neiki-context-item').forEach(item => {
        item.addEventListener('click', (e) => {
          if (item.classList.contains('neiki-context-disabled')) return;
          const action = item.dataset.action;
          this.executeAction(action);
          this.hide();
        });
      });
    }

    updateLabels() {
      this.menu.querySelectorAll('[data-label]').forEach(span => {
        span.textContent = t(span.dataset.label);
      });
    }

    syncThemeClasses() {
      if (!this.editor.getThemeClasses) return;
      this.menu.classList.remove('neiki-dark', 'neiki-theme-blue', 'neiki-theme-dark-blue', 'neiki-theme-midnight', 'neiki-theme-void', 'neiki-theme-autumn');
      this.editor.getThemeClasses(this.editor.config.theme).split(' ').filter(Boolean).forEach(className => {
        this.menu.classList.add(className);
      });
    }

    updateItemStates() {
      const sel = window.getSelection();
      const hasSelection = !!(sel && sel.rangeCount && !sel.isCollapsed && this.editor.contentArea.contains(sel.anchorNode));

      ['cut', 'copy'].forEach(action => {
        const item = this.menu.querySelector(`[data-action="${action}"]`);
        if (item) item.classList.toggle('neiki-context-disabled', !hasSelection);
      });
    }

    bindEvents() {
      this.editor.contentArea.addEventListener('contextmenu', (e) => {
        if (e.target.closest('td, th')) return; // handled by TableContextMenu

        e.preventDefault();
        this.editor.saveCurrentSelection();
        this.updateLabels();
        this.updateItemStates();
        this.show(e.clientX, e.clientY);
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
      this.syncThemeClasses();
      this.menu.style.display = 'block';

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
    }

    async executeAction(action) {
      this.editor.restoreSavedSelection();

      switch (action) {
        case 'undo':
          this.editor.commands.undo();
          break;
        case 'redo':
          this.editor.commands.redo();
          break;
        case 'cut':
          document.execCommand('cut');
          this.editor.history.record();
          this.editor.triggerChange();
          break;
        case 'copy':
          document.execCommand('copy');
          break;
        case 'paste':
          await this.pasteWithFormatting();
          break;
        case 'pasteAsPlainText':
          await this.pasteAsPlainText();
          break;
        case 'selectAll':
          document.execCommand('selectAll');
          break;
        case 'removeFormat':
          this.editor.commands.removeFormat();
          break;
      }
    }

    async pasteWithFormatting() {
      try {
        if (navigator.clipboard && navigator.clipboard.read) {
          const items = await navigator.clipboard.read();
          for (const item of items) {
            if (item.types.includes('text/html')) {
              const blob = await item.getType('text/html');
              const html = await blob.text();
              document.execCommand('insertHTML', false, Utils.sanitizeHTML(html));
              this.editor.history.record();
              this.editor.triggerChange();
              return;
            }
          }
          for (const item of items) {
            if (item.types.includes('text/plain')) {
              const blob = await item.getType('text/plain');
              const text = await blob.text();
              document.execCommand('insertHTML', false, Utils.escapeHTML(text).replace(/\n/g, '<br>'));
              this.editor.history.record();
              this.editor.triggerChange();
              return;
            }
          }
        } else if (document.execCommand('paste')) {
          this.editor.history.record();
          this.editor.triggerChange();
        }
      } catch (err) {
        console.error('NeikiEditor: Paste failed', err);
      }
    }

    async pasteAsPlainText() {
      try {
        if (!navigator.clipboard || !navigator.clipboard.readText) return;
        const text = await navigator.clipboard.readText();
        document.execCommand('insertHTML', false, Utils.escapeHTML(text).replace(/\n/g, '<br>'));
        this.editor.history.record();
        this.editor.triggerChange();
      } catch (err) {
        console.error('NeikiEditor: Paste as plain text failed', err);
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

  // Static methods
  NeikiEditor.addTranslation = addTranslation;

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
