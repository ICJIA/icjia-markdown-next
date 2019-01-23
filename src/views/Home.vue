<template>
  <v-content style="margin-left: 0; margin-right: 0;">
    <v-container fluid grid-list-md class="markdown-container">
      <v-layout row wrap>
        <v-flex xs12 sm12 md6>
          <textarea id="editor"></textarea>
        </v-flex>
        <v-flex xs12 sm12 md6>
          <div class="renderedText">
            <div class="renderbar" id="renderbar"></div>
            <div class="markdown-body">
              <div v-html="model"></div>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="showHtml" width="90%">
      <v-card>
        <v-toolbar dark color="indigo">
          <v-btn icon @click.native="toggleHtml" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="copyHtmlToClipboard" dark>
            <v-icon>assignment</v-icon>
          </v-btn>
        </v-toolbar>

        <v-layout row wrap>
          <v-flex xs12>
            <pre><code class="raw">{{raw}}
              </code></pre>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import config from "@/config";

/* Thanks to: https://github.com/musicbed/mirrormark/blob/master/src/js/mirrormark.js */
const beautify_html = require("js-beautify").html;
let codeMirror = require("codemirror");
let md = require("markdown-it")(config.markdownItOptions)
  .use(require("markdown-it-footnote"))
  .use(require("markdown-it-named-headers"));
require("codemirror/mode/markdown/markdown");
require("codemirror/addon/edit/closebrackets");
//require("codemirror/theme/lesser-dark.css");

const table = `
\r\n| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |\r\n
`;

export default {
  name: "Home",
  mounted() {
    this.initializeEditor();
    this.initializeToolbar(this.tools);
    this.initializeRenderbar(this.renderTools);
    this.initializeEditorEvents();
    // this.initializeAutoSave();
    let el = document.getElementById("showHtml");
    el.classList.remove("showHtml");
  },

  computed: {
    raw: function() {
      return beautify_html(`${this.model}`);
    }
  },
  methods: {
    initializeEditor: function() {
      this.editor = codeMirror.fromTextArea(document.getElementById("editor"), {
        lineNumbers: true,
        mode: "markdown",
        // theme: "lesser-dark",
        // viewportMargin: Infinity,
        tabSize: "2",
        indentWithTabs: true,
        lineWrapping: true
      });
    },
    initializeEditorEvents: function() {
      this.editor.on("change", cm => {
        this.model = md.render(cm.getValue());
        this.line = cm.getCursor(true);

        let doc = cm.getDoc();
        let cursor = doc.getCursor();
      });
    },
    // initializeAutoSave: function () {
    //   window.setInterval(() => {
    //     var time = new Date();
    //     let myMd = this.editor.getValue();
    //     localStorage.setItem('markdown', myMd);
    //     let message = 'Auto saved to local storage: ' + time;
    //   }, 15000);

    //},
    initializeToolbar: function(tools) {
      let toolbar = document.createElement("ul");
      toolbar.className = "icjia" + "-" + "toolbar";

      let t = this.generateToolList(tools);

      t.forEach(function(tool) {
        toolbar.appendChild(tool);
      });

      let cmWrapper = this.editor.getWrapperElement();
      cmWrapper.parentNode.insertBefore(toolbar, cmWrapper);
    },
    initializeRenderbar: function(tools) {
      let toolbar = document.createElement("ul");
      toolbar.className = "icjia" + "-" + "renderbar";

      let t = this.generateToolList(tools);

      t.forEach(function(tool) {
        toolbar.appendChild(tool);
      });
      let renderWrapper = document.getElementById("renderbar");
      renderWrapper.parentNode.insertBefore(toolbar, renderWrapper);
    },

    generateToolList: function(tools) {
      return tools.map(tool => {
        let item = document.createElement("li"),
          anchor = document.createElement("a");

        item.className = tool.name;

        if (tool.className) {
          anchor.className = tool.className;
        }

        if (tool.id) {
          anchor.id = tool.id;
        }

        if (tool.showName) {
          let text = document.createTextNode(tool.name);
          anchor.appendChild(text);
        }

        if (tool.action) {
          anchor.onclick = e => {
            this.editor.focus();
            //console.log(tool.action)
            this.initiateAction(tool.action);
          };
        }
        item.appendChild(anchor);

        if (tool.nested) {
          item.className += " has-nested";
          let ul = document.createElement("ul");
          ul.className = "icjia" + "-toolbar-list";
          let nested = this.generateToolList.call(this, tool.nested);
          nested.forEach(function(nestedItem) {
            ul.appendChild(nestedItem);
          });

          item.appendChild(ul);
        }

        return item;
      });
    },
    initiateAction: function(action) {
      console.log("Action: ", action);
      switch (action) {
        case "header":
          this.insertBefore("# ", 3);
          break;
        case "bold":
          this.insertAround("**", "**");
          break;
        case "italicize":
          this.insertAround("*", "*");
          break;
        case "blockquote":
          this.insertBefore("> ", 2);
          break;
        case "link":
          this.insertAround("[", "](http://)");
          break;
        case "image":
          this.insertBefore("![](http://)", 2);
          break;
        case "unorderedList":
          this.insertBefore("* ", 2);
          break;
        case "orderedList":
          this.insertBefore("1 ", 2);
          break;
        case "code":
          this.insertAround("```\r\n", "\r\n```");
          break;
        case "hr":
          this.insert("---");
          break;
        case "footnote":
          this.insert(`[^${this.footnote}] `);
          this.footnote++;
          break;
        case "table":
          this.insert(`${config.templates.table}`);
          break;
        case "mdToClipboard":
          this.copyMarkdownToClipboard();
          break;
        case "showHtml":
          this.toggleHtml();
          break;
        // case 'reference':
        //   this.insertBefore('\r\n[^1]: ')
        //   break;
        default:
          break;
      }
    },
    insert: function(insertion) {
      let doc = this.editor.getDoc();
      let cursor = doc.getCursor();
      doc.replaceRange(insertion, { line: cursor.line, ch: cursor.ch });
    },
    insertAround: function(start, end) {
      let doc = this.editor.getDoc();
      let cursor = doc.getCursor();

      if (doc.somethingSelected()) {
        let selection = doc.getSelection();
        doc.replaceSelection(start + selection + end);
      } else {
        // If no selection then insert start and end args and set cursor position between the two.
        doc.replaceRange(start + end, { line: cursor.line, ch: cursor.ch });
        doc.setCursor({ line: cursor.line, ch: cursor.ch + start.length });
      }
    },

    insertBefore: function insertBefore(insertion, cursorOffset) {
      let doc = this.editor.getDoc();
      let cursor = doc.getCursor();

      if (doc.somethingSelected()) {
        let selections = doc.listSelections();
        selections.forEach(function(selection) {
          let pos = [selection.head.line, selection.anchor.line].sort();

          for (var i = pos[0]; i <= pos[1]; i++) {
            doc.replaceRange(insertion, { line: i, ch: 0 });
          }

          doc.setCursor({ line: pos[0], ch: cursorOffset || 0 });
        });
      } else {
        doc.replaceRange(insertion, { line: cursor.line, ch: 0 });
        doc.setCursor({ line: cursor.line, ch: cursorOffset || 0 });
      }
    },
    toggleHtml: function() {
      this.showHtml = !this.showHtml;
    },
    closeDialog: function() {
      this.showHtml = false;
    },
    copyHtmlToClipboard() {
      this.$copyText(this.raw).then(
        function(e) {
          alert("Copied HTML to clipboard");
        },
        function(e) {
          alert("ERROR: Can not copy to clipboard");
        }
      );
    },
    copyMarkdownToClipboard() {
      this.$copyText(this.editor.getValue()).then(
        function(e) {
          alert("Copied markdown to clipboard");
        },
        function(e) {
          alert("ERROR: Can not copy to clipboard");
        }
      );
    }
  },

  data() {
    return {
      model: "",
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      showHtml: false,
      line: 0,
      toolbar: [],
      footnote: 1,
      editor: null,
      tools: [
        { name: "header", action: "header", className: "fa fa-heading" },
        { name: "bold", action: "bold", className: "fa fa-bold" },
        { name: "italicize", action: "italicize", className: "fa fa-italic" },
        // { name: "blockquote", action: "blockquote", className: "fa fa-quote-left" },
        { name: "link", action: "link", className: "fa fa-link" },
        { name: "image", action: "image", className: "fa fa-image" },
        {
          name: "unorderedList",
          action: "unorderedList",
          className: "fa fa-list"
        },
        {
          name: "orderedList",
          action: "orderedList",
          className: "fa fa-list-ol"
        },
        { name: "code", action: "code", className: "fa fa-terminal" },
        { name: "hr", action: "hr", className: "fa fa-ellipsis-h" },

        // { name: "spacer", action: "", className: "spacer" },
        {
          name: "footnote",
          action: "footnote",
          className: "fa fa-superscript"
        },
        { name: "table", action: "table", className: "fa fa-table" },
        // {
        //   name: "frontmatter",
        //   action: "frontmatter",
        //   className: "fa fa-database"
        // },
        {
          name: "mdToClipboard",
          action: "mdToClipboard",
          className: "fa fa-clipboard"
        }
        // { name: "ref", action: "reference", className: "reference", text: 'ref', showName: true },
      ],
      renderTools: [
        {
          name: "showHtml",
          action: "showHtml",
          className: "fa fa-code showHtml",
          id: "showHtml"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("../../node_modules/codemirror/lib/codemirror.css");
@import url("../../node_modules/github-markdown-css/github-markdown.css");

.markdown-container {
  padding: 0 !important;
  margin: 0 !important;
}

.CodeMirror {
  border: 1px solid #eee;
  /* height: auto; */
  height: 100vh;
  font-size: 18px;
  overflow-y: auto;
}

.markdown-body {
  height: 100vh;
  background: #fff;
  overflow-y: auto;
}

/* Toolbar Theme */

.icjia-toolbar,
.icjia-renderbar {
  background: #f5f5f5;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: block;
  width: 100%;
  margin-top: 0px;
  margin-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  height: 50px;
}

/* First level */

.icjia-toolbar li {
  display: inline-block;
  position: relative;
  z-index: 1;
}

.icjia-renderbar li {
  display: block;
  position: relative;
  z-index: 1;
}

.icjia-toolbar li a,
.icjia-renderbar li a {
  background-color: #f5f5f5;
  color: #888;
  cursor: pointer;
  display: block;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  transition: color 0.2s linear;
  width: 36px;
}

.icjia-toolbar li.has-nested:after {
  content: "\2304";
  color: #888;
  position: absolute;
  bottom: 3px;
  right: 3px;
  font-size: 11px;
  transform: scale(1.3, 1);
}

.icjia-toolbar li:hover a,
.icjia-toolbar li.has-nested:hover:after,
.icjia-renderbar li:hover a,
.icjia-renderbar li.has-nested:hover:after {
  color: #000;
}

.icjia-toolbar li:hover ul,
.icjia-renderbar li:hover ul {
  display: block;
}

/* Second Level */

.icjia-toolbar ul {
  background: #e5e5e5;
  display: none;
  position: absolute;
  top: 41px;
  width: 150px;
  z-index: 1000;
}

.icjia-toolbar ul li {
  float: none;
  width: 100%;
}

.icjia-toolbar ul li a {
  background: transparent;
  color: #888 !important;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 12px;
  height: auto;
  line-height: normal;
  padding: 0.25rem 0.75rem;
  text-align: left;
  width: auto;
}

.icjia-toolbar ul li:hover a {
  color: black !important;
}

.icjia-renderbar li {
  float: right !important;
}

.renderedText {
  height: 100vh;
}

#showHtml {
  font-weight: 900;
}

code:after,
code:before,
kbd:after,
kbd:before {
  content: "";
  /* letter-spacing: -1px; */
}

code {
  background-color: #f5f5f5;
  color: #333;
  box-shadow: none;
}

code.raw {
  font-size: 18px;
  background: #fff;
  margin-top: 50px;
  padding-left: 30px;
  padding-right: 30px;
  font-weight: 400;
}
</style>
