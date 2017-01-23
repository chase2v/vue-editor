<template lang="html">
  <div class="c-unordered-list">
    <c-button :config="config" @click="emitExec()">
      <span>u</span>
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
        name: 'insertUnorderedList'
      })
    }
  },

  components: {
    'c-button': Button
  }
}
</script>
