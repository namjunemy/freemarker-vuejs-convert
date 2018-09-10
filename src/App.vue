<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container-fluid">
      <div id="wrapper" class="toggled">
        <Sidebar></Sidebar>
        <div id="page-content-wrapper">
          <div class="container-fluid">
            <Main></Main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar";
  import Sidebar from "./components/Sidebar"
  import Main from "./components/Main"
  import Index from "./components/index/Index"
  import ContentParent from './components/content/ContentParent';
  import PromotionParent from './components/promotion/PromotionParent';

  export default {
    components: {
      'Navbar': Navbar,
      'Sidebar': Sidebar,
      'Main': Main,
      'Index': Index,
      'ContentParent': ContentParent,
      'PromotionParent': PromotionParent
    }
  }
</script>

<style>
</style>
