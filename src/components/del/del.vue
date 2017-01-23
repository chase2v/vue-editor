<template lang="html">
  <div class="c-del">
    <c-button :config="config" @click.stop="emitExec()">
      <span>T</span>
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
        name: 'strikeThrough'
      })
    }
  },

  components: {
    'c-button': Button
  }
}
</script>
