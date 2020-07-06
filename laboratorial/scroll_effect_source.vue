<template>
  <div class="homecoming">
    <div class="com-width">
      <h3 class="top-title">同学会</h3>
      <div class="top-word">CLASSMATE</div>
      <div class="list">
        <ul>
          <li class="item block-shadow"
            v-for="(item, key) in data"
            :key="key">
            <div class="item-header">
              <div class="title">
                <span v-if="key === 0">用研</span>
                <span v-if="key === 1">交互</span>
                <span v-if="key === 2">视觉</span>
                <span v-if="key === 3">前端</span>
                <br>同学会
              </div>
              <div class="date" v-if="item.id">
                {{item.start_time.substring(0, 10)}}
              </div>
            </div>
            <div class="item-content" v-if="item.id">
              <div class="item-course"
                v-for="course in item.courses"
                :key="course.id">
                <ObliqueAuthors
                  v-if="course.lecturer_from === '公司员工'"
                  :data="course.lecturers_inner"
                  :master="course.lecturer_master"
                  :title="course.title"
                  :titleLink="`/club/detail?id=${course.id}`"
                />
                <ObliqueAuthors
                  v-else
                  :title="course.title"
                  :data="generateAuthorData(course.lecturers_guest)"
                  :master="course.lecturer_master"
                  :link="false"
                  :titleLink="`/club/detail?id=${course.id}`"
                />
              </div>
            </div>
            <div class="item-status" v-if="item.id && getStatusText(item)">
              {{getStatusText(item)}}
            </div>
            <NoData v-if="!item.id" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NoData from '@/views/common/nodata'
import ObliqueAuthors from './oblique_authors'
import services from '@/services/api'
import { dateHandler, offset, scrollTop, getClientHeight } from '@/utils'

export default {
  name: 'Homecoming',
  components: {
    NoData,
    ObliqueAuthors,
  },
  data () {
    return {
      data: [],
    }
  },
  methods: {
    setStyle (elem, translateY, opacity) {
      elem.style.transform = `translateY(${translateY / 14}rem)`
      elem.style.opacity = opacity
    },
    runEffect (elements, needParallax, offsetValue = 100, delayOffsetTop = 100) {
      const st = scrollTop(window)
      const ch = getClientHeight(window)

      Array.prototype.forEach.call(elements, (elem, i) => {
        // +100: delay display on view port
        let offsetTop = offset(elem).top + delayOffsetTop
        const offsetHeight = elem.offsetHeight

        if (needParallax) {
          offsetTop += 100 * i
        }

        // focus on view port
        if (offsetTop <= st + ch) {
          // I don't know how to explain these codes
          // tips: drawing
          const x = (st - offsetTop + ch) / offsetHeight
          const translateY = Math.max(0, (1 - x) * offsetValue)
          this.setStyle(elem, translateY, x)
        } else {
          this.setStyle(elem, offsetValue, 0)
        }
      })
    },
    scrollEffect () {
      const elements = document.querySelectorAll('.homecoming .list .item')
      const title = [
        ...document.querySelectorAll('.homecoming .top-title'),
        ...document.querySelectorAll('.homecoming .top-word'),
      ]

      this.scrollEffectHandler = () => {
        this.runEffect(title, false, 50)
        this.runEffect(elements, true, 100, 0)
      }
      this.scrollEffectHandler()
      window.addEventListener('scroll', this.scrollEffectHandler)
    },
    generateAuthorData (lecturers_guest) {
      lecturers_guest.forEach((guest) => {
        guest.real_name = guest.name
      })
      return lecturers_guest
    },
    getStatusText (item) {
      const realTime = dateHandler.getDate(item.start_time)
      const now = dateHandler.getDate()
      if (realTime === now) {
        return '今日同学会'
      } else if (realTime > now) {
        return '预告'
      }
    },
    async getData () {
      const { ok, data } = await services.homepageHomecomingData()
      if (!ok) return this.$message.error(data)
      this.data = data
      this.$nextTick(() => {
        this.scrollEffect()
      })
    },
  },
  mounted () {
    this.getData()
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollEffectHandler)
  },
}
</script>

<style lang="stylus" scoped>
@import '../../@styles/_vars.styl'

.homecoming {
  height rem(716)
  padding-top rem(60)
  background-color #292929
  .com-width {
    position relative
  }
  .top-title {
    padding-left rem(30)
    margin-bottom rem(30)
    line-height 1
    font-size rem(22)
    position relative
    text-gradient()
    &:before {
      content ''
      width rem(14)
      height rem(4)
      background-color #6a6a6a
      position absolute
      left 0
      top rem(10)
    }
  }
  .top-word {
    line-height 1
    font-family oswaldRegular
    font-size rem(100)
    color #3f3f40
  }
  .list {
    position absolute
    top rem(232)
    left 0
    right 0
    ul {
      display flex
      justify-content space-between
      align-items flex-start
    }
    .item {
      flex-shrink 0
      width rem(285)
      padding rem(46) rem(30)
      border-top rem(3) solid transparent
      background-color #fff
      position relative
      &:nth-of-type(1) {
        $color = #e51850
        border-top-color $color
        .title {
          color $color
        }
        .item-status {
          background-color $color
        }
      }
      &:nth-of-type(2) {
        $color = #50e3c1
        border-top-color $color
        .title {
          color $color
        }
        .item-status {
          background-color $color
        }
      }
      &:nth-of-type(3) {
        $color = #fe8625
        border-top-color $color
        .title {
          color $color
        }
        .item-status {
          background-color $color
        }
      }
      &:nth-of-type(4) {
        $color = #6a7fff
        border-top-color $color
        .title {
          color $color
        }
        .item-status {
          background-color $color
        }
      }
      .item-header {
        display flex
        justify-content space-between
        margin-bottom rem(46)
        .title {
          font-weight 700
          line-height 1
          font-size rem(42)
        }
        .date {
          margin-top rem(2)
          line-height 1
          font-family oswaldRegular
          color #ccc
        }
      }
      .item-content {
        max-height rem(260)
        overflow auto
        scroll-bar(#ccc, 4)
        .item-course {
          margin-bottom rem(35)
        }
      }
      .item-status {
        display flex
        align-items center
        justify-content center
        height rem(40)
        padding 0 rem(20)
        color #fff
        position absolute
        bottom  rem(-10)
        right rem(30)
      }
      /deep/ .list-no-data {
        margin rem(55) 0 rem(10)
        font-size rem(14)
        img {
          width 80%
          height auto
          margin-bottom rem(20)
        }
      }
    }
  }
}
</style>
