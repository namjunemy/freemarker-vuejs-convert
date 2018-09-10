<template>
  <div>
    <nav class="navbar sticky-top navbar-dark bg-primary">
      <router-link to="/" class="navbar-brand" style="font-size: 2rem;" href="/">TV 줌 CMS</router-link>
      <form class="form-inline">
        <div class="nav-item text-light nav-link">김남준
          <a class="text-dark" href="#"><u>로그아웃</u></a>
        </div>
      </form>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "Navbar"
  }
</script>

<style scoped>

</style>
