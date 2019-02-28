const config = {
  codeMirrorOptions: {
    lineNumbers: true,
    mode: "markdown",
    tabSize: "2",
    indentWithTabs: true,
    lineWrapping: true
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
        "Display YAML info.<br><br><strong>YAML</strong> (<strong>Y</strong>AML <strong>A</strong>in't <strong>M</strong>arkup <strong>L</strong>anguage) is a human friendly data serialization standard."
    },
    saveHtml: {
      text: "Save as HTML"
    },
    showHtml: {
      text: "Show HTML"
    },
    copyHtml: {
      text: "Copy HTML to clipboard."
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
    { text: "research", value: "research.css", display: "Research" }
  ],
  defaultStylesheet: {
    text: "standard",
    value: "standard.css",
    display: "Standard"
  },
  stylesheetStaticPath: "/css/",
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
   * Snippets
   *
   *
   */
  displaySnippets: true,
  snippets: [
    { name: "Welcome", filename: "welcome.md" },
    { name: "Sample Table", filename: "table.md" }
  ],
  /**
   *
   *
   * Mode defaults
   *
   *
   */
  maxVisibleTools: 6,
  defaultMode: "standard",
  modes: {
    standard: {
      tooltip: "Default Markdown mode.",
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
        { name: "link", action: "link", icon: "link", tooltip: "Link" },
        {
          name: "image",
          action: "image",
          icon: "insert_photo",
          tooltip: "Image"
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
        {
          name: "clear",
          action: "clear",
          icon: "clear",
          tooltip: "Clear all"
        },

        {
          name: "footnote",
          action: "footnote",
          icon: "short_text",
          tooltip: "Footnote"
        },

        {
          name: "loremipsum",
          action: "loremipsum",
          icon: "line_style",
          tooltip: "Lorem Ipsum chunk",
          display: "icon"
        }
      ]
    },
    research: {
      tooltip:
        "<strong>Research mode is still in development.</strong><br><br>Includes shortcuts and markdown snippets for ICJIA's researchers.<br><br>For now, Research and Standard modes are identical.",
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
        { name: "link", action: "link", icon: "link", tooltip: "Link" },
        {
          name: "image",
          action: "image",
          icon: "insert_photo",
          tooltip: "Image"
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
        {
          name: "clear",
          action: "clear",
          icon: "clear",
          tooltip: "Clear all"
        },

        {
          name: "footnote",
          action: "footnote",
          icon: "short_text",
          tooltip: "Footnote"
        },

        {
          name: "loremipsum",
          action: "loremipsum",
          icon: "line_style",
          tooltip: "Lorem Ipsum chunk",
          display: "icon"
        }
      ]
    }
  }
};

export default config;
