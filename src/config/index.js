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
  scrollSyncDescription:
    "Synchronize the scrolling between the markdown and result windows.",
  scrollOffset: 500,
  viewerBottomPadding: 150,
  /**
   *
   *
   * Mode defaults
   *
   *
   */
  maxVisibleTools: 8,
  defaultMode: "standard",
  modes: {
    standard: {
      description: "Default Markdown mode.",
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
          name: "table",
          action: "table",
          icon: "table_chart",
          tooltip: "Table"
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
      description:
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
          name: "table",
          action: "table",
          icon: "table_chart",
          tooltip: "Table"
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
