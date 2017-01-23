<template lang="html">
  <div class="c-panel" v-if="signRoot" v-show="signLeaf">
    <slot>This is default slot.</slot>
  </div>
</template>

<script>
import PanelManager from './panelManager'

export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      init: false,
      signRoot: false,
      signLeaf: false
    }
  },

  watch: {
    'config.sign' (newV) {
      if (newV) {
        if (!this.init) {
          this.init = true
          PanelManager.init.call(this)
        }
        // else {}
        PanelManager.open.call(this)
      } else {
        PanelManager.close.call(this)
      }
    }
  },

  created () {
    this.panelId = PanelManager.getId()
  }
}
</script>

<style lang="scss" scoped>
</style>
