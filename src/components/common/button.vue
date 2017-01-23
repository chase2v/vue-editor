<template lang="html">
  <div class="c-button" :class="{'c-button-active': isActive}" @click.stop="handler($event)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    handler (e) {
      if (this.config.type === 'trigger') {
        this.isActive = !this.isActive
      } else {

      }

      if (this.config.handler) {
        this.config.handler.call(this.$parent, e)
      } else {
        this.$emit('click', e)
      }
    }
  }
}
</script>
