<template lang="html">
  <div class="c-ordered-list">
    <c-button :config="config" @click="emitExec()">
      <span>o</span>
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
        name: 'insertOrderedList'
      })
    }
  },

  components: {
    'c-button': Button
  }
}
</script>
