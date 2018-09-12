<template>
  <div id="sidebar-wrapper">
    <ul class="sidebar-nav">
      <li class="sidebar-brand">
        관리 기능
      </li>
      <li>
        <router-link to="/promotion">홈 상단 프로모션 문구 관리</router-link>
      </li>
      <li>
        <router-link to="/content">홈 메인 노출 컨텐츠 관리</router-link>
      </li>
      <li>
        <a href="http://localhost:9090/view" target="_blank">뷰 페이지 미리보기</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Sidebar"
  }
</script>

<style>
  body {
    overflow-x: hidden;
  }

  #wrapper {
    padding-left: 0;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }

  #wrapper.toggled {
    padding-left: 250px;
  }

  #sidebar-wrapper {
    z-index: 1000;
    position: fixed;
    left: 250px;
    width: 0;
    height: 100%;
    margin-left: -250px;
    overflow-y: auto;
    background: whitesmoke;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }

  #wrapper.toggled #sidebar-wrapper {
    width: 250px;
  }

  #page-content-wrapper {
    width: 100%;
    position: absolute;
    padding: 15px;
  }

  #wrapper.toggled #page-content-wrapper {
    position: absolute;
    margin-right: -250px;
  }

  /* Sidebar Styles */

  .sidebar-nav {
    position: absolute;
    top: 0;
    width: 250px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .sidebar-nav li {
    text-indent: 20px;
    line-height: 40px;
  }

  .sidebar-nav li a {
    display: block;
    text-decoration: none;
    color: #999999;
  }

  .sidebar-nav li a:hover {
    text-decoration: none;
    color: #464646;
    background: rgba(255, 255, 255, 0.9);
  }

  .sidebar-nav li a:active, .sidebar-nav li a:focus {
    text-decoration: none;
  }

  .sidebar-nav > .sidebar-brand {
    height: 65px;
    font-size: 16px;
    line-height: 60px;
  }

  .sidebar-nav > .sidebar-brand a {
    color: #999999;
  }

  .sidebar-nav > .sidebar-brand a:hover {
    color: #fff;
    background: none;
  }

  @media (min-width: 768px) {
    #wrapper {
      padding-left: 0;
    }

    #wrapper.toggled {
      padding-left: 250px;
    }

    #sidebar-wrapper {
      width: 0;
    }

    #wrapper.toggled #sidebar-wrapper {
      width: 250px;
    }

    #page-content-wrapper {
      padding: 20px;
      position: relative;
    }

    #wrapper.toggled #page-content-wrapper {
      position: relative;
      margin-right: 0;
    }
  }
</style>
