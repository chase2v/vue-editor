<template lang="html">
  <div class="color">
    <c-button :config="config">
      a
    </c-button>
    <c-panel :config="configPanel" class="color-panel-main">
      <c-row v-for="arr in colors">
        <span class="color-block" v-for="color in arr" :style="{'background-color': color}" @click.stop="emitExec(color)"></span>
      </c-row>
      <div class="color-button-palette" @click.stop="onClickPalette">
        调色板
      </div>
      <c-panel :config="configPalette" class="color-panel-child">
        <c-palette />
      </c-panel>
    </c-panel>
  </div>
</template>

<script>
import Palette from 'vvc-palette'

export default {
  props: {
    colors: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isShowPanel: false,
      config: {
        handler (e) {
          this.configPanel.sign = !this.configPanel.sign
        }
      },
      configPanel: {
        sign: false
      },
      configPalette: {
        sign: false
      }
    }
  },

  methods: {
    emitExec (color) {
      this.$emit('exec', {
        name: 'foreColor',
        arg: color
      })

      this.configPanel.sign = false
    },
    onClickPalette (e) {
      this.configPalette.sign = !this.configPalette.sign
    }
  },

  components: {
    'c-palette': Palette
  }
}
</script>

<style lang="scss">
.color {
  position: relative;
  margin-left: 6px;

  display: inline-block;
  height: 24px;
  line-height: 24px;

  .c-row {
    width: 244px;
    padding-bottom: 4px;

    &:last-child {
      padding-bottom: 0;
    }
  }

  .color-block {
    box-sizing: border-box;
    display: inline-block;
    width: 20px;
    height: 20px;

    border: 1px solid #ccc;
    cursor: pointer;
  }

  .c-panel.color-panel-main {
    position: absolute;
    top: 31px;
    left: 4px;

    padding: 5px 5px;

    background-color: #fff;
    border: 1px solid #ccc;

    &:before {
      position: absolute;
      top: -6px;
      left: 0;

      content: '';

      border-bottom: 5px solid #ccc;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
    }
    &:after {
      position: absolute;
      top: -5px;
      left: 0;

      content: '';

      border-bottom: 5px solid #fff;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
    }
  }

  .c-panel.color-panel-child {
    margin-top: 5px;
    // position: relative;
    // top: 16px;

    .c-palette-preview {
      text-align: center;
      font-family: Microsoft Yahei;
    }
  }

  .color-button-palette {
    box-sizing: border-box;
    width: 100%;

    border: 1px solid #ccc;
    cursor: pointer;
    background-color: #fff;

    font-size: 12px;
    font-family: Microsoft Yahei;
    text-align: center;
  }
}
</style>
