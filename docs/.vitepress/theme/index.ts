import DefaultTheme from 'vitepress/theme'
import CopyMarkdownButton from './components/CopyMarkdownButton.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CopyMarkdownButton', CopyMarkdownButton)
  }
}
