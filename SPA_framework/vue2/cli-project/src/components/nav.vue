<template>
  <div class="nav">
    <ul>
      <li>
        <a @click="redirect('/')">Home</a>
      </li>
      <li>
        <a @click="redirect('/Archive')">Archive</a>
      </li>
      <li>
        <a @click="redirect('/User/Profile')">Profile</a>
      </li>
      <li>
        <a @click="redirect('/User/About')">About</a>
      </li>
    </ul>
    <div style="font-size: 60px;" v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirect (path) {
      const value = Math.random().toFixed(2)
      if (value > 0.1) {
        this.$router.push({path})
      } else {
        alert(`随机值比较小(value:${value} <= 0.1)，先不跳转`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  height: 40px;
  box-shadow: 0 2px 3px 0 #ccc;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  ul {
    display: flex;
    height: 100%;
    padding: 0;
    margin: 0;
    li {
      list-style: none;
      flex-grow: 1;
      a {
        display: block;
        cursor: pointer;
        line-height: 40px;
        width: 100%;
        height: 100%;
        color: #333;
        &:hover {
          color: green;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
