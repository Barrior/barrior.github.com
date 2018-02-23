<template>
  <div class="nav">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/Profile">Profile</router-link>
      </li>
      <li>
        <router-link to="/About">About</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

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
        line-height: 40px;
        width: 100%;
        height: 100%;
        color: #333;
        &:hover {
          color: green;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
