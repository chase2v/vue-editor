<template lang="html">
<div class="font-family">
  <Dropdown :config="config" @selected="emitExec($event)"/>
</div>
</template>

<script>
import Dropdown from '../common/dropdown.vue'

export default {
  props: {
    fonts: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      config: {
        list: this.fonts,
        defaultValue: 0
      }
    }
  },
  methods: {
    emitExec (selectedItem) {
      this.$emit('exec', {
        name: 'fontName',
        arg: selectedItem
      })
    }
  },
  components: {
    Dropdown
  },
  mounted () {
    this.emitExec(this.fonts[0].name)
  }
}
</script>
