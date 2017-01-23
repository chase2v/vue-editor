import Vue from 'vue'
import Post from './post'

const INIT_ZINDEX = 10000

class ZIndex {
  zIndex = 0;

  static getZIndex () {
    if (!this.zIndex) {
      this.zIndex = INIT_ZINDEX
    } else {

    }

    return this.zIndex++
  }

  static resetZIndex () {
    this.zIndex = 0
  }
}

Vue.directive('popover', {
  inserted (el) {
    let div = document.createElement('div')
    div.className = 'c-popover'

    let elPos = el.getBoundingClientRect()
    el.style.position = 'absolute'
    el.style.left = elPos.left + 'px'
    el.style.top = elPos.top + 'px'
    div.appendChild(el)

    Post.$on('showPopover', () => {
      document.documentElement.appendChild(div)

      div.style.zIndex = ZIndex.getZIndex()
      el.style.zIndex = ZIndex.getZIndex()
    })

    Post.$on('hidePopover', () => {
      if (parseInt(div.style.zIndex) === 10000) {
        ZIndex.resetZIndex()
      }

      document.documentElement.removeChild(div)
    })

    div.addEventListener('click', () => {
      Post.$emit('isPopoverHidden')
    })
  }
})
