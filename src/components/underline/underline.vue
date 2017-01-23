<template lang="html">
  <div class="c-underline">
    <c-button :config="config" @click.stop="emitExec()">
      <span>U</span>
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
        name: 'underline'
      })
    }
  },

  components: {
    'c-button': Button
  }
}
</script>
