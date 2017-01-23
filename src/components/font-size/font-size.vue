<template lang="html">
<div class="font-size">
  <Dropdown :config="config" @selected="emitExec($event)" />
</div>
</template>

<script>
import Dropdown from '../common/dropdown.vue'

export default {
  props: {
    sizes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      config: {
        list: this.sizes,
        defaultValue: 0
      }
    }
  },
  methods: {
    emitExec (selectedItem) {
      this.$emit('exec', {
        name: 'fontSize',
        arg: selectedItem
      })
    }
  },
  components: {
    Dropdown
  },
  mounted () {
    this.emitExec(this.sizes[0].name)
  }
}
</script>
