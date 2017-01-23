import Vue from 'vue'

import Editor from './components/editor'
import config from './config'
import './styles/index.scss'
import FontFamily from './components/font-family/font-family'
import FontSize from './components/font-size/font-size'
import Color from './components/color/color'
import Bold from './components/bold/bold'
import Italic from './components/italic/italic'
import Underline from './components/underline/underline'
import Del from './components/del/del'
import Unordered from './components/unordered/unordered'
import Ordered from './components/ordered/ordered'
import Align from './components/align/align'
import Horline from './components/horline/horline'
import Table from './components/table-button/table-button'

import Panel from './components/common/panel/panel'
import Row from './components/common/row'
import Button from './components/common/button'

Vue.component('c-panel', Panel)
Vue.component('c-row', Row)
Vue.component('c-button', Button)

export default {
  render (h) {
    const modules = config.components

    return (
      <Editor>

        <Font-family
          onExec={ this.exec }
          fonts={ modules['font-family'].fonts }
          v-show={ modules['font-family'].show }
        />

        <Font-size
          onExec={ this.exec }
          sizes={ modules['font-size'].sizes }
          v-show={ modules['font-size'].show }
        />

        <Color
          onExec={ this.exec }
          colors={ modules.color.colors }
          v-show={ modules.color.show }
        />

        <Bold
          onExec={ this.exec }
          v-show={ modules.bold.show }
        />

        <Italic
          onExec={ this.exec }
          v-show={ modules.italic.show }
        />

        <Underline
          onExec={ this.exec }
          v-show={ modules.underline.show }
        />

        <Del
          onExec={ this.exec }
          v-show={ modules.del.show }
        />

        <span class="cut-line">|</span>

        <Unordered
          onExec={ this.exec }
          v-show={ modules.unordered.show }
        />

        <Ordered
          onExec={ this.exec }
          v-show={ modules.ordered.show }
        />

        <Align
          onExec={ this.exec }
          v-show={ modules.align.show }
        />

        <span class="cut-line">|</span>

        <Horline
          onExec={ this.exec }
          v-show={ modules.horline.show }
        />

        <Table
          onExec={ this.exec }
          v-show={ modules.table.show }
        />

      </Editor>
    )
  },

  methods: {
    exec (command) {
      this.$el.querySelector('.edit-zone').focus()
      let rst = document.execCommand(command.name, false, command.arg)
      console.log(command)
      if (!rst) {
        console.error('执行命令 -> ' + command.name + '错误')
      } else {

      }
    }
  },

  components: {
    'Font-family': FontFamily,
    'Font-size': FontSize
  }
}
