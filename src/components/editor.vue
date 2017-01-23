<template lang="html">
  <div class="editor" @click.stop="onClick">
    <div class="tool-bar" @exec="exec($event)">
      <slot>This is default slot.</slot>
    </div>
    <div
      ref="editZone"
      class="edit-zone"
      contenteditable="true">
    </div>
  </div>
</template>

<script>
import PanelManager from './common/panel/panelManager'

export default {
  methods: {
    onClick (e) {
      PanelManager.closeAll()
    }
  }
}
</script>
