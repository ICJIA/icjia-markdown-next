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
  loremIpsumOptions: {
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  },
  stylesheets: [
    { text: "Default", value: "default.css" },
    { text: "Github", value: "github.css" }
    // { text: "ICJIA", value: "icjia.css" }
  ],

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
    // {
    //   name: "orderedList",
    //   action: "orderedList",
    //   icon: "format_list_numbered",
    //   tooltip: "Numbered List"
    // },

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
      icon: "texture",
      tooltip: "Lorem Ipsum paragraph"
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
  //   renderTools: [
  //     {
  //       name: "showHtml",
  //       action: "showHtml",
  //       icon: "code",
  //       tooltip: "Show HTML"
  //     },
  //     {
  //       name: "saveHtml",
  //       action: "saveHtml",
  //       icon: "save_alt",
  //       tooltip: "Save HTML"
  //     }
  //   ],
  templates: {
    table: `\r\n| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |\r\n
`,
    loremipsum: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nibh mauris, porta ut lobortis a, laoreet id diam. Quisque euismod accumsan tempus. Quisque imperdiet urna ex. Sed dignissim non dolor eu mattis. Ut sed justo eu ipsum venenatis sodales. Nulla a felis sit amet quam facilisis pellentesque et id ante. Nulla ut neque orci. Cras faucibus semper nulla, nec condimentum arcu tempor ac. Integer eget congue ante.\r\n`,
    welcome: `
# H1 Header

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and \`monospace\`. 

## H2 Header

### H3 Header

Itemized lists look like:

* this one
* that one
* the other one
    * indented four spaces
# Footnotes
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget turpis nec justo volutpat efficitur. Sed ac sapien in magna faucibus faucibus eu sed nisl. Aenean non tristique odio, eu condimentum nisl. Suspendisse porttitor ante id lectus pharetra, id pretium odio lacinia. Vestibulum auctor volutpat pharetra. Nam rhoncus dapibus enim eget ornare.[^1] Phasellus convallis nisi a efficitur iaculis.[^2] Etiam tempus massa diam, sit amet lacinia metus suscipit sit amet. Nunc consequat ligula ac auctor mollis. Integer accumsan ornare neque, id dapibus elit. Ut accumsan lacinia metus nec luctus.[^3]
[^1]: Here is the footnote.
[^2]: Here is the second footnote.
[^3]: Here's one with multiple blocks.
    Subsequent paragraphs are indented to show that they
belong to the previous footnote.
`
  }
};

export default config;
