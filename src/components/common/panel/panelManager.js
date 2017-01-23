let _id = 0
let _instances = {}
let _instancesActiveKey = []

const getId = () => {
  return 'cPanel_' + _id++
}

const getZIndex = () => {

}

const init = function () {
  _instances[this.panelId] = this
  this.signRoot = true
}

const open = function () {
  let spliceIdx = 0
  for (let i = _instancesActiveKey.length - 1; i >= 0; i--) {
    if (this.$parent.panelId === _instancesActiveKey[i]) {
      spliceIdx = i + 1
      break
    }
    // else {}
  }

  if (spliceIdx !== _instancesActiveKey.length) {
    let spliceArr = _instancesActiveKey.splice(spliceIdx)

    if (spliceArr) {
      for (let i = 0; i < spliceArr.length; i++) {
        _instances[spliceArr[i]].signLeaf = false
        _instances[spliceArr[i]].$options.propsData.config.sign = false
      }
    }
    // else {}
  }
  // else {}

  _instances[this.panelId].signLeaf = true
  _instancesActiveKey.push(this.panelId)
}

const close = function () {
  if (_instances.hasOwnProperty(this.panelId)) {
    _instances[this.panelId].signLeaf = false

    let idx = _instancesActiveKey.indexOf(this.panelId)
    _instancesActiveKey.splice(idx)
  }
  // else {}
}

const closeAll = function () {
  for (let key in _instances) {
    _instances[key].signLeaf = false
    _instances[key].$options.propsData.config.sign = false
  }
}

const destroy = (id) => {

}

const PanelManager = {
  getId,
  open,
  close,
  destroy,
  init,
  closeAll
}

export default PanelManager
