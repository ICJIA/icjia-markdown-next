const config = {
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
        {
          name: "header",
          action: "header",
          icon: "title",
          tooltip: "Header",
          display: "icon"
        },
        {
          name: "bold",
          action: "bold",
          icon: "format_bold",
          tooltip: "Bold",
          display: "icon"
        },
        {
          name: "italicize",
          action: "italicize",
          icon: "format_italic",
          tooltip: "Italicize",
          display: "icon"
        },
        {
          name: "blockquote",
          action: "blockquote",
          icon: "format_quote",
          tooltip: "Blockquote",
          display: "icon"
        },
        {
          name: "link",
          action: "link",
          icon: "link",
          tooltip: "Link",
          display: "icon"
        },
        {
          name: "image",
          action: "image",
          icon: "insert_photo",
          tooltip: "Image",
          display: "icon"
        },
        {
          name: "unorderedList",
          action: "unorderedList",
          icon: "format_list_bulleted",
          tooltip: "Bulleted List",
          display: "icon"
        },

        {
          name: "footnote",
          action: "footnote",
          icon: "short_text",
          tooltip: "Footnote",
          display: "icon"
        },
        {
          name: "table",
          action: "table",
          icon: "table_chart",
          tooltip: "Table",
          display: "icon"
        },
        {
          name: "loremipsum",
          action: "loremipsum",

          tooltip: "Lorem Ipsum chunk",
          display: "icon"
        }
      ]
    },
    research: {
      description:
        "Includes ICJIA-specific shortcuts and snippets for Research & Analysis authors.",
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
        }
      ]
    }
  }
};

export default config;
