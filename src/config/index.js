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
  templates: {
    table: `\r\n| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |\r\n
`,
    loremipsum: `\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nibh mauris, porta ut lobortis a, laoreet id diam. Quisque euismod accumsan tempus. Quisque imperdiet urna ex. Sed dignissim non dolor eu mattis. Ut sed justo eu ipsum venenatis sodales. Nulla a felis sit amet quam facilisis pellentesque et id ante. Nulla ut neque orci. Cras faucibus semper nulla, nec condimentum arcu tempor ac. Integer eget congue ante.\r\n`
  }
};

export default config;
