const config = {
  codeMirrorOptionsMarkdown: {
    lineNumbers: true,
    mode: "markdown",
    tabSize: "2",
    indentWithTabs: true,
    lineWrapping: true
  },
  codeMirrorOptionsHtml: {
    lineNumbers: true,
    name: "htmlmixed",
    tabSize: "2",
    indentWithTabs: true,
    lineWrapping: true
  },
  /**
   *
   *
   * Markdown-it defaults
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
   * Scroll sync options
   *
   *
   */

  scrollOffset: 500,
  viewerBottomPadding: 150,

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
  maxVisibleTools: 10,
  buttons: {
    announcement: {
      text: "Button 1",
      icon: "announcement",
      size: "sm",
      action: "announcement"
    },

    assessment: {
      text: "Button 2",
      icon: "assessment",
      size: "sm",
      action: "assessment"
    },
    book: {
      text: "Button 3",
      icon: "book",
      size: "lg",
      action: "book"
    },
    "|": {},
    snippets: {
      text: "Snippets & Examples",
      icon: "vert",
      size: "sm",
      component: "Snippets"
    }
  },

  modes: {
    standard: {
      markdownButtons:
        "announcement assessment announcement assessment announcement assessment announcement assessment snippets | book book book |"
    },
    research: {
      markdownButtons:
        "announcement assessment announcement assessment announcement assessment announcement assessment snippets | book book book |"
    },
    grants: {
      markdownButtons:
        "announcement assessment announcement assessment announcement assessment announcement assessment snippets | book book book |"
    }
  },

  /**
   *
   *
   * Session  defaults
   *
   *
   */
  session: {
    mode: "standard",
    convertedMarkdown: "",
    markdownInProgress: ""
  }
};

export default config;
