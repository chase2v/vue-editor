<template lang="html">
  <div class="c-bold">
    <c-button :config="config" @click.stop="emitExec()">
      <b>B</b>
    </c-button>
  </div>
</template>

<script>
import Button from '../common/button'
import Popover from '../common/popover'

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
        name: 'bold'
      })
    }
  },

  components: {
    'c-button': Button,
    'c-popover': Popover
  }
}
</script>
