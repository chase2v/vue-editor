<template lang="html">
  <div class="c-italic">
    <c-button :config="config" @click.stop="emitExec()">
      I
    </c-button>
  </div>
</template>

<script>
import Button from '../common/button'

export default {
  data () {
    return {
      config: {
        type: 'trigger'
      }
    }
  },

  methods: {
    emitExec () {
      this.$emit('exec', {
        name: 'italic'
      })
    }
  },

  components: {
    'c-button': Button
  }
}
</script>
