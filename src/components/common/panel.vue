<template lang="html">
  <div class="c-panel" :class="config.className" v-popover :style="config.style">
    <slot></slot>
  </div>
</template>

<script>
import Post from './post'
import Vue from 'vue'

export default {
  computed: {
    isShow () {
      return this.config.show
    }
  },

  props: {
    config: {
      type: Object,
      required: true
    }
  },

  watch: {
    isShow (nV, oV) {
      if (nV) {
        Post.$emit('showPopover')
        this.$el.style.opacity = 1
      } else {
        Post.$emit('hidePopover')
      }
    }
  },

  mounted () {
    Post.$on('isPopoverHidden', function () {
      this.$options.propsData.config.show = false
    }.bind(this))
  }
}
</script>
