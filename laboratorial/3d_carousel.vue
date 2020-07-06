<template>
  <header class="header-root">
    <div class="header-content com-width">
      <img class="bg" src="../images/header_bg.png">
      <div class="nav">
        <div class="top">
          <NavActions />
        </div>
        <div class="bottom">
          <div class="bottom-wrapper">
            <Nav />
          </div>
        </div>
      </div>
      <div class="balls">
        <img src="../images/ball1.png">
        <img src="../images/ball2.png">
        <img src="../images/ball3.png">
      </div>
      <section class="left">
        <div class="logo">
          <img src="@/views/@images/logo.png">
        </div>
        <ul class="list" ref="list"
          @mouseover="onPictureOver"
          @mouseout="onPictureOut">
          <li class="item" v-for="doc in data" :key="doc.id">
            <h3 class="title">
              <router-link :to="getLink(doc)" target="_blank">
                <span class="title-icon">
                  <x-icon :name="getIcon(doc)" />
                </span>
                {{doc.title}}
              </router-link>
            </h3>
            <Authors :data="[doc.owner].concat(doc.authors)" />
            <Tags :data="doc.cst_tags" />
          </li>
        </ul>
        <div class="indicators" ref="indicators">
          <div
            v-for="(doc, i) in data"
            :key="doc.id"
            @click="onChangeIndicator(i)">
          </div>
        </div>
      </section>
      <section class="right-box">
        <section class="right">
          <ul class="list" ref="pictures"
              @mouseover="onPictureOver"
              @mouseout="onPictureOut">
            <li class="item"
                v-for="(doc, i) in data"
                :key="doc.id"
                @click="onPictureClick(i, doc)">
                <LoadImage :src="doc.cover_image" />
            </li>
          </ul>
        </section>
      </section>
    </div>
    <img class="outer-ball" src="../images/ball4.png">
  </header>
</template>

<script>
import Authors from '@/views/common/authors'
import Tags from '@/views/common/tags'
import mixins from '@/utils/mixins'
import Nav from '@/views/common/nav'
import NavActions from '@/views/common/nav_actions'
import services from '@/services/api'
import LoadImage from '@/views/common/load_image'
import ListCover from '@/views/common/list_cover'
import { forEach } from 'lodash'
import { routeMap } from '@/const/publish_to'

export default {
  name: 'HomeHeader',
  mixins: [ mixins ],
  components: {
    Authors,
    Tags,
    Nav,
    NavActions,
    LoadImage,
    ListCover,
  },
  data () {
    return {
      data: [],
      activeIndex: 0,
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    },
  },
  methods: {
    async getData () {
      const { ok, data } = await services.hpBanner()
      if (!ok) {
        return this.$message.error(data)
      }
      this.data = data
      this.$nextTick(() => {
        setTimeout(() => {
          this.initPlayer()
        })
      }, 50)
    },
    getIcon (doc) {
      return `type_${routeMap[doc.publish_to]}`
    },
    getLink (doc) {
      return `/${routeMap[doc.publish_to] || 'potpourri'}/detail?id=${doc.id}`
    },
    setText (elem, { zIndex, opacity, transform, pointerEvents }) {
      elem.style.zIndex = zIndex
      elem.style.opacity = opacity
      elem.style.transform = transform
      elem.style.pointerEvents = pointerEvents
      elem.style.display = 'block'
    },
    setPicture (elem, { zIndex, opacity, transform }) {
      elem.style.zIndex = zIndex
      elem.style.opacity = opacity
      elem.style.transform = transform
    },
    setIndicator () {
      forEach(this.$indicators, (elem) => {
        elem.classList.remove('active')
      })
      this.$indicators[this.activeIndex].classList.add('active')
    },
    initPlayer () {
      this.$indicators = this.$refs.indicators.querySelectorAll('div')
      this.$text = this.$refs.list.querySelectorAll('li')
      this.$pictures = this.$refs.pictures.querySelectorAll('li')

      this.remDivisor = 14
      const length = this.$pictures.length

      // init position of all pictures
      this.comTransform = 'rotateY(-30deg) rotateX(17deg) rotateZ(-4.5deg) skewY(2deg)'
      this.positions = []

      forEach(this.$pictures, (elem, i) => {
        // Don't add attributes of the last element into "positions"
        if (i >= length - 1) return

        let value = 0
        if (i < 3) {
          value = ((2 - i) * -30) / this.remDivisor
        }
        const attr = {
          zIndex: length - i,
          opacity: i < 3 ? 1 : 0,
          transform: `${this.comTransform} translate(${value}rem, ${value}rem)`,
          value,
        }

        this.setPicture(elem, attr)
        this.positions.push(attr)
      })

      this.positions.push({
        zIndex: 9,
        opacity: 0,
        transform: `${this.comTransform} translate(-50rem, ${this.positions[0].value}rem)`,
      })

      // init text's position
      this.textPositions = []

      forEach(this.$text, (elem, i) => {
        if (i >= length - 1) return
        const attr = {
          zIndex: length - i,
          opacity: i === 0 ? 1 : 0,
          transform: 'translate(0, 0)',
          pointerEvents: i === 0 ? 'auto' : 'none',
        }
        this.setText(elem, attr)
        this.textPositions.push(attr)
      })

      this.textPositions.push({
        zIndex: 9,
        opacity: 0,
        transform: 'translate(-10rem, 0)',
        pointerEvents: 'none',
      })

      this.motionConfig = [{
        key: 'text',
        elements: this.$text,
        method: this.setText,
        positions: this.textPositions,
      }, {
        elements: this.$pictures,
        method: this.setPicture,
        positions: this.positions,
      }]

      // init indicators
      this.setIndicator()

      this.loopPlayback()

      // optimizing
      this.addVisibilityEvent()
    },
    loopPlayback () {
      this.pausePlayer()
      this.timer = setInterval(() => {
        this.activeIndex++
        if (this.activeIndex === this.$text.length) {
          this.activeIndex = 0
        }
        this.runPlayer()
      }, 3000)
    },
    pausePlayer () {
      clearInterval(this.timer)
    },
    runPlayer () {
      this.setIndicator()

      // calc new positions
      forEach(this.motionConfig, (item) => {
        const len = item.positions.length
        item.newPositions = []

        // calc right
        const rightLen = len - this.activeIndex
        for (let i = 0; i < rightLen; i++) {
          item.newPositions[this.activeIndex + i] = item.positions[i]
        }

        // calc left
        for (let i = 0; i < this.activeIndex; i++) {
          item.newPositions[i] = item.positions[rightLen + i]
        }
      })

      // re-set position of all pictures with new positions
      forEach(this.motionConfig, (item) => {
        forEach(item.elements, (elem, i) => {
          item['method'](elem, item.newPositions[i])
        })
      })
    },
    onChangeIndicator (i) {
      if (this.activeIndex !== i) {
        this.activeIndex = i
        this.pausePlayer()
        this.runPlayer()
        this.loopPlayback()
      }
    },
    onPictureClick (i, doc) {
      if (this.activeIndex === i) {
        const link = this.getLink(doc)
        window.open(link)
      } else {
        this.activeIndex = i
        this.pausePlayer()
        this.runPlayer()
        this.loopPlayback()
      }
    },
    onPictureOver () {
      this.pausePlayer()
    },
    onPictureOut () {
      this.loopPlayback()
    },
    removeVisibilityEvent () {
      if (this.visibilityHandler) {
        document.removeEventListener('visibilitychange', this.visibilityHandler)
      }
    },
    addVisibilityEvent () {
      if (typeof document.hidden !== 'undefined') {
        this.removeVisibilityEvent()
        this.visibilityHandler = () => {
          if (document.visibilityState === 'visible') {
            this.loopPlayback()
          } else {
            this.pausePlayer()
          }
        }
        document.addEventListener('visibilitychange', this.visibilityHandler)
      }
    },
  },
  mounted () {
    this.getData()
  },
  destroyed () {
    this.removeVisibilityEvent()
  },
}
</script>

<style lang="stylus" scoped>
@import '../../@styles/_vars.styl'

header-transition()
  transition 0.6s ease

.header-root {
  overflow hidden
  position relative
  height rem(616)
  background #213183
  .outer-ball {
    pointer-events none
    position absolute
    right 0
    bottom 0
    z-index 9
  }
  .header-content {
    height 100%
    position relative
    > *:not(.left) {
      position absolute
    }
  }
  .bg {
    pointer-events none
    height 100%
    bottom 0
    right rem(-380)
  }
  .nav {
    width 100%
    z-index 15
    > * {
      display flex
      justify-content flex-end
    }
    .bottom {
      font-size rem(16)
      .bottom-wrapper {
        border-top 1px solid rgba(0,0,0,0.2)
      }
    }
  }
  .balls {
    width 100%
    height 100%
    pointer-events none
    z-index 9
    img {
      position absolute
      &:nth-of-type(1) {
        top rem(122)
        right rem(545)
      }
      &:nth-of-type(2) {
        top rem(422)
        right rem(750)
      }
      &:nth-of-type(3) {
        top rem(200)
        right rem(0)
      }
    }
  }
  .left {
    position relative
    width rem(300)
    height 100%
    padding-top rem(254)
    background linear-gradient(rgba(58,68,205,1), rgba(58,68,205,0))
    .logo {
      position absolute
      z-index 6
      top 0
      left rem(-36)
      img {
        width rem(399)
      }
    }
    .list {
      width rem(550)
      position relative
      z-index 8
    }
    .item {
      padding-left rem(50)
      position absolute
      opacity 0
      header-transition()
      &,
      >>> a {
        color #fff
      }
      .title {
        a {
          line-height 1.3125
          font-size rem(48)
          line-clamp(2)
        }
        .title-icon {
          display inline-block
          width rem(48)
          height rem(48)
          border-radius rem(10)
          background-color #fff
          color #2d3eac
          vertical-align text-top
          text-align center
          line-height 1
        }
        >>> .x-icon {
          width rem(30)
          height auto
          position relative
          top rem(-2)
          svg {
            *[fill] {
              fill currentColor
            }
            *[stroke] {
              stroke currentColor
            }
          }
        }
      }
    }
    >>> .authors-root {
      margin rem(15) 0
      .authors-multi,
      .authors-single {
        font-size rem(16)
      }
      .authors-multi-more,
      .avatar-wrapper {
        width rem(60)
        height rem(60)
      }
    }
    >>> .tag {
      background-color rgba(0,0,0,0.1)
      + .tag {
        margin-left rem(10)
      }
    }
    .indicators {
      position absolute
      bottom rem(40)
      left rem(50)
      display flex
      div {
        flex-shrink 0
        width rem(10)
        height rem(6)
        background rgba(255,255,255,0.6)
        cursor pointer
        header-transition()
        &:hover {
          background-color #fff
        }
        &.active {
          width rem(32)
          background #ff3c00
        }
        &:not(:first-of-type) {
          margin-left rem(14)
        }
      }
    }
  }
  .right-box {
    overflow hidden
    padding-top rem(40)
    z-index 5
    left rem(600)
    top rem(110)
    right 0
    bottom 0
    transform skewX(-8deg)
  }
  .right {
    height 100%
    transform skewX(8deg)
    transform-style preserve-3d
    perspective 2000px
    .list {
      position relative
    }
    .item {
      $width = 484
      overflow hidden
      width rem($width)
      height rem($width * 500 / 900)
      border-radius rem(10)
      box-shadow rem(3) rem(3) rem(30) 0 rgba(0, 0, 0, 0.6)
      position absolute
      top rem(60)
      left rem(110)
      transform rotateY(-30deg) rotateX(17deg) rotateZ(-4.5deg) skewY(2deg)
      transform-origin left center
      cursor pointer
      header-transition()
    }
  }
}

@media all and (max-width: 1600px) {
  .header-root {
    .outer-ball {
      display none
    }
  }
}
</style>
