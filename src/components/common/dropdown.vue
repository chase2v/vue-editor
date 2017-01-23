<template lang="html">
  <div class="dropdown">
    <input class="dropdown-window" type="text" v-model="currentItem" :disabled="config.type === 'icon'"/>
    <span class="dropdown-button">
      <i @click.stop="onClickButton()" :class="panelConfig.sign ? 'fa-angle-up' : 'fa-angle-down'" class="fa"></i>
    </span>
    <c-panel :config="panelConfig" class="dropdown-panel">
      <ul>
        <li v-for="item in config.list" @click.stop="onClickItem(item)">{{ item.label }}</li>
      </ul>
    </c-panel>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      currentItem: this.config.list[this.config.defaultValue].label,
      panelConfig: {
        sign: false
      }
    }
  },

  methods: {
    onClickButton () {
      this.panelConfig.sign = !this.panelConfig.sign
    },
    onClickItem (item) {
      this.currentItem = item.label
      this.panelConfig.sign = false
      this.$emit('selected', item.name)
    }
  }
}
</script>

<style lang="scss">
.dropdown {
  position: relative;

  box-sizing: border-box;
  width: 100%;
  height: 100%;

  .dropdown-window {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-left: 6px;

    border: 1px solid #ccc;

    font-size: 14px;

    &:disabled {
      background-color: #fff;
    }
  }

  .dropdown-button {
    position: absolute;
    right: 0;
    top: 1px;
    z-index: 1;

    box-sizing: border-box;
    width: 16px;
    height: 100%;
    line-height: 22px;

    border: 1px solid transparent;
    cursor: pointer;

    font-size: 16px;

    transition: all .2s ease-in-out;

    .fa:before {
      position: relative;

      left: 2px;
    }


    &:hover {
      background-color: rgb(229, 241, 251);
      border: 1px solid rgb(0, 120, 215);
    }
  }

  .dropdown-panel {
    position: absolute;
    top: 24px;
    left: 0;

    box-sizing: border-box;
    width: 100%;
    max-height: 500px;

    background-color: #fff;
    border: 1px solid #ccc;

    li {
      box-sizing: border-box;
      width: 100%;
      height: 22px;
      line-height: 22px;
      padding-left: 6px;

      list-style: none;
      cursor: pointer;

      font-size: 14px;

      &:hover {
        background-color: rgb(51, 153, 255);
        color: #fff;
      }
    }
  }
}
</style>
