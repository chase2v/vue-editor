<template lang="html">
<div class="c-align">
  <Dropdown :config="config" @selected="emitExec($event)" />
</div>
</template>

<script>
import Dropdown from '../common/dropdown.vue'

export default {
  data () {
    return {
      config: {
        list: [
          {label: '左', name: 'justifyLeft'},
          {label: '中', name: 'justifyCenter'},
          {label: '右', name: 'justifyRight'}
        ],
        defaultValue: 0
      }
    }
  },

  methods: {
    emitExec (selectedItem) {
      this.$emit('exec', {
        name: selectedItem
      })
    }
  },

  components: {
    Dropdown
  }
}
</script>
