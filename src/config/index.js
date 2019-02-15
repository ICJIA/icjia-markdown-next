const config = {
  markdownItOptions: {
    html: true, // Enable HTML tags in source
    xhtmlOut: false, // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: true, // Convert '\n' in paragraphs into <br>
    langPrefix: "language-", // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    linkify: true, // Autoconvert URL-like text to links
    // Enable some language-neutral replacement + quotes beautification
    typographer: false,
    quotes: "“”‘’"
  },
  autoSaveInterval: 15000,
  localStorageKey: "icjia-markdown-autosave",
  stylesheets: [
    { text: "Default", value: "default.css" },
    { text: "Github", value: "github.css" }
    // { text: "ICJIA", value: "icjia.css" }
  ],
  loremIpsum: {
    count: 10, // Number of words, sentences, or paragraphs to generate.
    units: "sentences", // Generate words, sentences, or paragraphs.
    sentenceLowerBound: 5, // Minimum words per sentence.
    sentenceUpperBound: 15, // Maximum words per sentence.
    paragraphLowerBound: 3, // Minimum sentences per paragraph.
    paragraphUpperBound: 7, // Maximum sentences per paragraph.
    format: "plain"
  },

  modes: {
    standard: {
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
          icon: "texture",
          tooltip: "Lorem Ipsum chunk",
          display: "icon"
        },
        {
          name: "mdToClipboard",
          action: "mdToClipboard",
          icon: "assignment",
          tooltip: "Copy Markdown to clipboard",
          display: "icon"
        }
      ],
      stylesheets: [
        { name: "Standard", filename: "standard.css" },
        { name: "Github", filename: "github.css" }
      ],
      color: "green",
      icon: "create"
    },
    research: {
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
          name: "mdToClipboard",
          action: "mdToClipboard",
          icon: "assignment",
          tooltip: "Copy Markdown to clipboard"
        },
        {
          name: "clear",
          action: "clear",
          icon: "clear",
          tooltip: "Clear all"
        }
      ],
      stylesheets: [
        { name: "Research", filename: "research.css" },
        { name: "Github", filename: "github.css" }
      ],
      color: "red",
      icon: "insert_chart_outlined"
    }
  }
};

export default config;
