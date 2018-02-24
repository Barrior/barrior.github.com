<template>
  <div class="user">
    <h2>User {{ $route.params.id }}</h2>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.transitionName = to.path.toLowerCase() === '/User/Profile'.toLowerCase()
      ? 'slide-right'
      : 'slide-left'
    next()
  }
}
</script>

<style lang="scss" scoped>
.slide-left-leave-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 3s ease-out;
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-left-enter-active {
  opacity: 0;
  transform: translateX(100%);
  transition: all 3s ease-out;
}
.slide-left-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-right-leave-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 3s ease-out;
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.slide-right-enter-active {
  opacity: 0;
  transform: translateX(-100%);
  transition: all 3s ease-out;
}
.slide-right-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
