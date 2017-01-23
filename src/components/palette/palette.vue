<template lang="html">
  <div class="c-palette">
    <canvas
      ref="cvsMap"
      style="width: 200px; height: 200px; cursor: crosshair;">
    </canvas>
    <div class="cvs-gray">
      <canvas ref="cvsOpacity"></canvas>
    </div>
    <div class="cvs-primary" @dragover.prevent="">
      <div
        class="c-palette-slider"
        draggable="true"
        @dragstart.stop="onDragstartPaletteSlider"
        @drag.stop="onDragPaletteSlider"
        @dragend.stop="onDragendPaletteSlider">
      </div>
      <canvas ref="cvs"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    onDragstartPaletteSlider (e) {
      if (!e.currentTarget.dataset.y) {
        e.currentTarget.dataset.y = e.y
      }
      // else {}
    },
    onDragPaletteSlider (e) {
      let dis = e.y - e.currentTarget.dataset.y
      e.currentTarget.style.transform = 'translateY(' + dis + 'px)'
    },
    onDragendPaletteSlider (e) {
      let dis = e.y - e.currentTarget.dataset.y
      e.currentTarget.style.transform = 'translateY(' + dis + 'px)'

      let cvsLeft = this.$refs.cvs.getBoundingClientRect().left
      let x = e.clientX - cvsLeft
      let y = dis
      console.log(x, y)
      this.pickColor(x, y)
    },
    pickColor (x, y) {
      let imageData = this.ctx.getImageData(x * 50 / 20, y * 256 * 6 / 200, 1, 1)
      this.createImage([
        {
          r: imageData.data[0],
          g: imageData.data[1],
          b: imageData.data[2],
          a: imageData.data[3]
        },
        {
          r: imageData.data[0],
          g: imageData.data[1],
          b: imageData.data[2],
          a: imageData.data[3]
        },
        {
          r: imageData.data[0],
          g: imageData.data[1],
          b: imageData.data[2],
          a: 0
        },
        {
          r: imageData.data[0],
          g: imageData.data[1],
          b: imageData.data[2],
          a: 0
        }
      ], 20, 100, this.$refs.cvsOpacity)
      this.createImage([
        {
          r: 255,
          g: 255,
          b: 255,
          a: 255
        },
        {
          r: imageData.data[0],
          g: imageData.data[1],
          b: imageData.data[2],
          a: imageData.data[3]
        },
        {
          r: 0,
          g: 0,
          b: 0,
          a: 255
        },
        {
          r: 0,
          g: 0,
          b: 0,
          a: 255
        }
      ], 256, 256, this.$refs.cvsMap)
    },
    /**
     * 创建 ImageData
     *
     * @param colorArray {Array} [leftTopColor, rightTopColor, rightBottomColor, leftBottomColor]
     * @param width {Number} 图片宽度
     * @param height {Number} 图片高度
     * @param cvs {HTMLCanvasElement} canvas's domElm
     */
    createImage (colorArray, width, height, cvs) {
      cvs.width = width
      cvs.height = height

      let ctx = cvs.getContext('2d')
      let imageData = ctx.createImageData(width, height)
      let arr = this.createImageDataArray(colorArray, width, height)

      for (let i = 0; i < width * height * 4; i++) {
        imageData.data[i] = arr[i]
      }
      ctx.putImageData(imageData, 0, 0)
    },
    /**
     * 创建 ImageData 的 data 数组
     *
     * @param colorArray {Array} [leftTopColor, rightTopColor, rightBottomColor, leftBottomColor]
     * @param width {Number} 图片宽度
     * @param height {Number} 图片高度
     */
    createImageDataArray (colorArray, width, height) {
      let arr = []
      let gapHead = { // 计算首列像素差距
        r: colorArray[0].r - colorArray[3].r,
        g: colorArray[0].g - colorArray[3].g,
        b: colorArray[0].b - colorArray[3].b,
        a: colorArray[0].a - colorArray[3].a
      }
      let gapTail = { // 计算尾列像素差距
        r: colorArray[1].r - colorArray[2].r,
        g: colorArray[1].g - colorArray[2].g,
        b: colorArray[1].b - colorArray[2].b,
        a: colorArray[1].a - colorArray[2].a
      }
      for (let i = 0; i < height; i++) {
        let colorStart = { // 计算每行的起始像素
          r: colorArray[0].r - Math.ceil((gapHead.r / (height - 1)) * i),
          g: colorArray[0].g - Math.ceil((gapHead.g / (height - 1)) * i),
          b: colorArray[0].b - Math.ceil((gapHead.b / (height - 1)) * i),
          a: colorArray[0].a - Math.ceil((gapHead.a / (height - 1)) * i)
        }
        let colorEnd = { // 计算每行的结束像素
          r: colorArray[1].r - Math.ceil((gapTail.r / (height - 1)) * i),
          g: colorArray[1].g - Math.ceil((gapTail.g / (height - 1)) * i),
          b: colorArray[1].b - Math.ceil((gapTail.b / (height - 1)) * i),
          a: colorArray[1].a - Math.ceil((gapTail.a / (height - 1)) * i)
        }
        for (let j = 0; j < width; j++) {
          let color = { // 计算每一像素点
            r: colorStart.r - Math.ceil(((colorStart.r - colorEnd.r) / (width - 1)) * j),
            g: colorStart.g - Math.ceil(((colorStart.g - colorEnd.g) / (width - 1)) * j),
            b: colorStart.b - Math.ceil(((colorStart.b - colorEnd.b) / (width - 1)) * j),
            a: colorStart.a - Math.ceil(((colorStart.a - colorEnd.a) / (width - 1)) * j)
          }
          for (let k in color) {
            arr.push(color[k])
          }
        }
      }

      return arr
    }
  },
  mounted () {
    this.$refs.cvs.width = 50
    this.$refs.cvs.height = 256 * 6
    let ctx = this.$refs.cvs.getContext('2d')
    this.ctx = ctx

    let imageData = ctx.createImageData(50, 256 * 6)
    createDataPrimary(50)
    console.log(imageData)
    ctx.putImageData(imageData, 0, 0)

    // 生成 imageData 的数据集
    // w: 图片的宽度
    function createDataPrimary (w) {
      let color = {
        r: 255,
        g: 0,
        b: 0,
        a: 255
      }
      let j = 0

      _loop(1, 'g')
      _loop(0, 'r')
      _loop(1, 'b')
      _loop(0, 'g')
      _loop(1, 'r')
      _loop(0, 'b')

      function _loop (type, c) {
        if (type) {
          __increase()
        } else {
          __decrease()
        }

        function __increase () {
          for (; color[c] <= 255; color[c]++) {
            __same()
          }
          color[c] = 255
        }

        function __decrease () {
          for (; color[c] >= 0; color[c]--) {
            __same()
          }
          color[c] = 0
        }

        function __push (v) {
          imageData.data[j] = v
          j++
        }

        function __same () {
          for (let i = w; i > 0; i--) {
            __push(color.r)
            __push(color.g)
            __push(color.b)
            __push(color.a)
          }
        }
      }
    }
  }
}
</script>
