const expandable =
`# Expandable details

<p>
<details><summary>React / Preact</summary><br>

\`\`\`js
import React from 'react'
import { render } from 'react-dom'

const App = () => <h1>Hello React.</h1>

render(<App />, document.getElementById('app'))
\`\`\`

Note: You need to install \`react\` \`react-dom\` and desired babel preset like \`babel-preset-react-app\`. For convenience, here's also [poi-preset-react](https://github.com/egoist/poi/tree/master/packages/poi-preset-react) you can use.

It's similar for other React-like framework.
</details>

<details><summary>Vue</summary><br>

\`\`\`js
import Vue from 'vue'

new Vue({
  el: '#app',
  render() {
    return <h1>Hello Vue.</h1>
  }
})
\`\`\`

Note: You don't need to install any dependencies, \`vue\` is already brought by \`Poi\`. And single-file component is also supported by default.
</details>

## FAQ

<details><summary>How's it different from a boilerplate?</summary><br>

It's hard to upgrade your project if you're using a boilerplate since you might change the code to suit your needs. However you can easily upgrade your project to use latest version of Poi by simply updating the dependency.

You can also get rid of boilerplate code in this way.
</details>`

export {expandable}
