const config = {
  codeMirrorOptionsMarkdown: {
    lineNumbers: true,
    mode: "markdown",
    tabSize: "2",
    indentWithTabs: true,
    lineWrapping: true,
    gutters: ["CodeMirror-linenumbers", "breakpoints"]
  },
  codeMirrorOptionsHtml: {
    lineNumbers: true,
    mode: "html",
    tabSize: "2",
    indentWithTabs: true,
    lineWrapping: true,
    gutters: ["CodeMirror-linenumbers", "breakpoints"]
  },
  /**
   *
   *
   * Markdown defaults
   *
   *
   */
  markdownItOptions: {
    html: true,
    xhtmlOut: false,
    breaks: true,
    langPrefix: "language-",
    linkify: true,
    typographer: false,
    quotes: "“”‘’"
  },
  /**
   *
   *
   * Misc. tooltips
   *
   *
   */
  tooltips: {
    icjia: {
      text: "Illinois Criminal Justice Information Authority"
    },
    saveMd: {
      text: "Save to markdown (.md) file"
    },
    loadMd: {
      text: "Load markdown (.md) file"
    },
    copyMd: {
      text: "Copy markdown to clipboard"
    },
    showYaml: {
      text:
        "If YAML data exists, this button is enabled.<br><br><strong>YAML</strong> (<strong>Y</strong>AML <strong>A</strong>in't <strong>M</strong>arkup <strong>L</strong>anguage) is a human friendly data serialization standard.<br><br>YAML is frequently used at the beginning of a markdown file to insert document-specific metadata.<br><br>"
    },
    saveHtml: {
      text: "Save as HTML"
    },
    showHtml: {
      text: "Show HTML"
    },
    copyHtml: {
      text: "Copy HTML to clipboard"
    },
    scrollSync: {
      text: "Synchronize the scrollng between the markdown and result windows"
    },
    wordCount: {
      text: "Show text statistics"
    },
    github: {
      text: "Github"
    },
    launchLegacyEditor: {
      text: "Access the original ICJIA markdown editor"
    },
    linting: {
      text:
        "<strong>LINTING ALERT</strong><br><br>Click alert for more information.<br><br>A linter is a tool that analyzes a text to indicate errors, bugs, or stylistic discrepencies.<br><br>To enable or disable real-time linting notifications, click the settings icon in the upper left."
    },
    lintWindow: {
      text: "Show linting alerts"
    },
    settingsWindow: {
      text: "Settings"
    },
    close: {
      text: "Close"
    },
    htmlToMarkdown: {
      text: "Convert HTML to Markdown"
    },
    exportMdToEditor: {
      text: "Open Converted Markdown in Editor"
    }
  },
  /**
   *
   * Local storage defaults
   *
   *
   */
  autoSaveInterval: 15000,
  localStorageKey: "icjia-markdown-autosave",
  /**
   *
   *
   * Stylesheet defaults
   *
   *
   */
  stylesheets: [
    { text: "standard", value: "standard.css", display: "Standard" },
    { text: "research", value: "research.css", display: "Research" },
    { text: "grants", value: "grants.css", display: "Grants" }
  ],
  defaultStylesheet: {
    text: "standard",
    value: "standard.css",
    display: "Standard"
  },
  stylesheetStaticPath: "/css/",
  allowManualStyleSelection: false,
  /**
   *
   *
   * Lorem Ipsum generator defaults
   *
   *
   */
  loremIpsum: {
    count: 10,
    units: "sentences",
    sentenceLowerBound: 5,
    sentenceUpperBound: 15,
    paragraphLowerBound: 3,
    paragraphUpperBound: 7,
    format: "plain"
  },
  /**
   *
   *
   * Scroll sync options
   *
   *
   */

  scrollOffset: 500,
  viewerBottomPadding: 150,
  /**
   *
   *
   * Snippets & Menu options
   *
   *
   */
  displaySnippets: true,
  displayUtilities: true,
  snippets: [
    { name: "Welcome", filename: "welcome.md" },
    { name: "Table Example", filename: "table.md" },
    { name: "Image Example", filename: "fillerImage.md" },
    { name: "Article Example", filename: "article.md" },
    { name: "NOFO Example", filename: "nofo.md" }
  ],
  /**
   *
   *
   * External Resources
   *
   *
   */
  displayExternalResources: true,
  externalResources: [
    { name: "Markdown Guide", url: "https://www.markdownguide.org/" },
    {
      name: "Markdown Quick Reference",
      url: "https://en.support.wordpress.com/markdown-quick-reference/"
    },
    {
      name: "ICJIA Style Guide",
      url: "http://www.icjia.state.il.us/sandbox/typography"
    },
    {
      name: "ICJIA Home Page",
      url: "http://www.icjia.state.il.us"
    },
    {
      name: "Go to the old Markdown Editor",
      url: "https://legacy-markdown.icjia.cloud/"
    }
  ],
  /**
   *
   *
   * Styles for rendered HTML
   *
   *
   */
  centerText: "{.text-center}",
  centerImage: "{.img-center}",
  /**
   *
   *
   * Markdown linting
   *
   *
   */
  isLintingEnabled: true,
  isLintingAutoAlertEnabled: false,
  lintingDefault: "relaxed.json",
  lintingRulePath: "config/markdownlint/",

  /**
   *
   *
   * Mode defaults
   *
   *
   */
  maxVisibleTools: 11,
  defaultMode: "standard",
  modes: {
    standard: {
      tooltip:
        "<strong>Standard mode is still in development.</strong><br><br>Includes shortcuts, styles, and snippets suitable for any markdown document.<br><br>This is the default mode.",
      color: "white",
      icon: "create",
      display: "Standard",
      tools: [
        { name: "header", action: "header", icon: "title", tooltip: "Header" },
        { name: "bold", action: "bold", icon: "format_bold", tooltip: "Bold" },
        {
          name: "italicize",
          action: "italicize",
          icon: "format_italic",
          tooltip: "Italicize"
        },
        {
          name: "blockquote",
          action: "blockquote",
          icon: "format_quote",
          tooltip: "Blockquote"
        },
        {
          name: "unorderedList",
          action: "unorderedList",
          icon: "format_list_bulleted",
          tooltip: "Bulleted List"
        },
        {
          name: "orderedList",
          action: "orderedList",
          icon: "format_list_numbered",
          tooltip: "Numbered List"
        },
        { name: "link", action: "link", icon: "link", tooltip: "Link" },
        {
          name: "shortenLink",
          action: "shortenLink",
          icon: "offline_bolt",
          tooltip: "Create bit.ly short link from URL"
        },
        {
          name: "image",
          action: "image",
          icon: "insert_photo",
          tooltip: "Image"
        },
        // {
        //   name: "footnote",
        //   action: "footnote",
        //   icon: "short_text",
        //   tooltip: "Footnote"
        // },

        {
          name: "loremipsum",
          action: "loremipsum",
          icon: "line_style",
          tooltip: "Lorem Ipsum chunk",
          display: "icon"
        },
        {
          name: "clear",
          action: "clear",
          icon: "clear",
          tooltip: "Clear all content"
        }
      ]
    },
    research: {
      tooltip:
        "<strong>Research mode is still in development.</strong><br><br>Includes shortcuts, styles, and markdown snippets for ICJIA's researchers.<br><br>",
      display: "Research",
      color: "#f41d56",
      icon: "insert_chart_outlined",
      tools: [
        { name: "header", action: "header", icon: "title", tooltip: "Header" },
        { name: "bold", action: "bold", icon: "format_bold", tooltip: "Bold" },
        {
          name: "italicize",
          action: "italicize",
          icon: "format_italic",
          tooltip: "Italicize"
        },
        {
          name: "blockquote",
          action: "blockquote",
          icon: "format_quote",
          tooltip: "Blockquote"
        },
        {
          name: "unorderedList",
          action: "unorderedList",
          icon: "format_list_bulleted",
          tooltip: "Bulleted List"
        },
        {
          name: "orderedList",
          action: "orderedList",
          icon: "format_list_numbered",
          tooltip: "Numbered List"
        },
        { name: "link", action: "link", icon: "link", tooltip: "Link" },
        {
          name: "shortenLink",
          action: "shortenLink",
          icon: "offline_bolt",
          tooltip: "Create bit.ly short link from URL"
        },
        {
          name: "image",
          action: "image",
          icon: "insert_photo",
          tooltip: "Image"
        },
        // {
        //   name: "footnote",
        //   action: "footnote",
        //   icon: "short_text",
        //   tooltip: "Footnote"
        // },

        {
          name: "loremipsum",
          action: "loremipsum",
          icon: "line_style",
          tooltip: "Lorem Ipsum chunk",
          display: "icon"
        },
        {
          name: "clear",
          action: "clear",
          icon: "clear",
          tooltip: "Clear all content"
        }
      ]
    },
    grants: {
      tooltip:
        "<strong>Grants mode is still in development.</strong><br><br>Includes shortcuts, styles, and markdown snippets for FSGU.<br><br>",
      display: "Grants",
      color: "#f41d56",
      icon: "attach_money",
      tools: [
        { name: "header", action: "header", icon: "title", tooltip: "Header" },
        { name: "bold", action: "bold", icon: "format_bold", tooltip: "Bold" },
        {
          name: "italicize",
          action: "italicize",
          icon: "format_italic",
          tooltip: "Italicize"
        },
        {
          name: "blockquote",
          action: "blockquote",
          icon: "format_quote",
          tooltip: "Blockquote"
        },
        {
          name: "unorderedList",
          action: "unorderedList",
          icon: "format_list_bulleted",
          tooltip: "Bulleted List"
        },
        {
          name: "orderedList",
          action: "orderedList",
          icon: "format_list_numbered",
          tooltip: "Numbered List"
        },
        { name: "link", action: "link", icon: "link", tooltip: "Link" },
        {
          name: "shortenLink",
          action: "shortenLink",
          icon: "offline_bolt",
          tooltip: "Create bit.ly short link from URL"
        },
        {
          name: "image",
          action: "image",
          icon: "insert_photo",
          tooltip: "Image"
        },
        // {
        //   name: "footnote",
        //   action: "footnote",
        //   icon: "short_text",
        //   tooltip: "Footnote"
        // },

        {
          name: "loremipsum",
          action: "loremipsum",
          icon: "line_style",
          tooltip: "Lorem Ipsum chunk",
          display: "icon"
        },
        {
          name: "clear",
          action: "clear",
          icon: "clear",
          tooltip: "Clear all content"
        }
      ]
    }
  },
  /**
   *
   *
   * Misc config
   *
   *
   */
  allowSaveAsHtml: false,
  /**
   *
   *
   * Session state defaults
   *
   *
   */
  session: {
    mode: "standard",
    displayHtmlPreview: false,
    convertedMarkdown: "",
    markdownInProgress: ""
  }
};

export default config;
