<template lang="html">
  <div class="c-table">
    <c-button :config="buttonConfig" @click.stop="onClickButton()">
      <b>T</b>
    </c-button>
    <c-panel :config="panelConfig">
      <div class="title">{{ title + '表格'}}</div>
      <div class="select-panel" @mouseleave.stop="onMouseleavePanel()">
        <div class="row" v-for="r in 6">
          <span
            class="grid"
            v-for="c in 8"
            @mouseover.stop="onMouseoverGrid(r, c)"
            @click.stop="onClickGrid(r, c)"
            :class="{ hover: col >= c && row >= r }">
          </span>
        </div>
      <div>
    </c-panel>
  </div>
</template>

<script>
import Button from '../common/button'
import Panel from '../common/panel'
// import Table from '../common/table'

export default {
  data () {
    return {
      title: '插入',
      row: 0,
      col: 0,
      focusNode: null,
      // table: Table,
      buttonConfig: {

      },
      panelConfig: {
        show: false,
        className: 'table-panel',
        style: {
          position: 'absolute',
          left: 0,
          top: '24px'
        }
      }
    }
  },

  methods: {
    onClickButton () {
      let selection = document.getSelection()
      this.focusNode = selection.focusNode

      this.panelConfig.show = !this.panelConfig.show
    },
    onMouseoverGrid (row, col) {
      this.row = row
      this.col = col
    },
    onMouseleavePanel () {
      this.row = 0
      this.col = 0
    },
    onClickGrid (row, col) {
      // 添加表格
      let table = this.getTable(row, col)
      let currentNode = this.getCurrentNode()
      if (currentNode) {
        currentNode.append(table)
        // table.$mount(div)
      } else {
        let editZone = document.querySelector('.edit-zone')
        editZone.appendChild(table)
        // table.$mount(div)
      }

      // 重置状态
      this.row = 0
      this.col = 0
      this.panelConfig.show = false
    },
    getCurrentNode (node) {
      if (!node) {
        node = this.focusNode
      } else {

      }

      if (node.className === 'edit-zone') {
        return false
      } else if (!this.getCurrentNode(node.parentNode)) {
        return node
      }
    },
    getTable (row, col) {
      // let Table = this.table
      // return new Table({
      //   propsData: {
      //     config: {
      //       data: {
      //         row: row,
      //         col: col
      //       }
      //     }
      //   }
      // })

      let div = document.createElement('div')
      let table = document.createElement('table')
      table.style.width = '100%'
      table.style.lineHeight = '20px'
      let tbody = document.createElement('tbody')

      for (let i = 0; i < row; i++) {
        let tr = document.createElement('tr')

        for (let j = 0; j < col; j++) {
          let td = document.createElement('td')
          td.style.padding = '8px'
          td.style.border = '1px solid #ccc'
          td.style.lineHeight = '20px'
          tr.appendChild(td)
        }

        tbody.appendChild(tr)
      }
      table.appendChild(tbody)
      div.appendChild(table)
      return div
    }
  },

  components: {
    'c-button': Button,
    'c-panel': Panel
  }
}
</script>
