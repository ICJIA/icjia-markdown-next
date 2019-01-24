const readme =
`# icjia-markdown

Markdown is a lightweight text format that allows writers to create documents, rich text, or HTML markup using any text editor. Markdown documents are easy to read, write, and convert into multiple formats.

This editor was created in order to facilitate ICJIA's in-house web publishing process. I used the [Markdown editor example](https://vuejs.org/v2/examples/) in the [Vue.js documentation](https://vuejs.org/) as the starting point.

This uses a [Loopback API](http://loopback.io) to store user-generated permalinks. [Code for the API is here](https://github.com/ICJIA/icjia-api).

The API is hosted by [Now](https://zeit.co/now) and uses MySQL.

An instance of MySQL is running on a [DigitalOcean](https://www.digitalocean.com/) droplet.

This markdown editor is hosted on [Netlify](https://www.netlify.com/) static hosting.

## For more information about markdown

- [https://daringfireball.net/projects/markdown/syntax](https://daringfireball.net/projects/markdown/syntax)
- [https://help.github.com/articles/basic-writing-and-formatting-syntax/](https://help.github.com/articles/basic-writing-and-formatting-syntax/)
-  [http://commonmark.org/help/tutorial/](http://commonmark.org/help/tutorial/)


## Build Setup

\`\`\` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

\`\`\`
## Main dependencies
- [Bootstrap 3.3.7](http://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [webui-popover](https://github.com/sandywalker/webui-popover)
- [Vue](https://vuejs.org/)
- [Webpack](https://webpack.js.org/)
- [Vue-CLI Webpack template](https://github.com/vuejs-templates/webpack)
- [Lodash](https://lodash.com/)
- [Moment.js](https://momentjs.com/)
- [Markdown-it](https://github.com/markdown-it/markdown-it)

### Syntax Extensions

- [Markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote)
- [Markdown-it-fontawesome](https://github.com/nunof07/markdown-it-fontawesome)
- [Markdown-it-attrs](https://github.com/arve0/markdown-it-attrs)
- [Markdown-it-katex](https://github.com/waylonflinn/markdown-it-katex)

## Live site

https://markdown.icjia.cloud


## Direct deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ICJIA/icjia-markdown)`
export {readme}
