<template>
  <div class="hello">
    <Nav></Nav>
    <h3>
      About Page
    </h3>
    <div>
      <router-link class="router" to="/">Go To Index</router-link>
    </div>
  </div>
</template>

<script>
import Nav from './nav.vue'

export default {
  name: 'about',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Nav
  }
}
</script>

<style scoped>
h3 {
  font-size: 60px;
  color: yellowgreen;
}
</style>
