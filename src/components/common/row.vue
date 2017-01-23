<template lang="html">
  <div class="c-row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$slots.default.forEach(v => {
      v.elm.className += ' c-row-item'
    })
  }
}
</script>
