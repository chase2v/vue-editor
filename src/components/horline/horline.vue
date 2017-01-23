<template lang="html">
  <div class="c-horline">
    <c-button :config="config" @click.stop="emitExec()">
      <b>-</b>
    </c-button>
  </div>
</template>

<script>
import Button from '../common/button'

export default {
  data () {
    return {
      config: {
      }
    }
  },

  methods: {
    emitExec () {
      this.$emit('exec', {
        name: 'insertHorizontalRule'
      })
    }
  },

  components: {
    'c-button': Button
  }
}
</script>
