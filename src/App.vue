<template>
  <div id="app">
    <v-header class="header"></v-header>
    <div class="main">
      <transition name="fade" mode="out-in">
        <router-view class="main-wrapper" />
      </transition>
    </div>
    <v-footer class="footer"></v-footer>

  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components:{
      'v-header': Header,
      'v-footer': Footer
  },
  created(){

  },
  methods:{
      scrollToTop(){
          $('body,html').animate({ scrollTop: 0 },600);
      }
  }
}
</script>

<style lang="less">
  @import "//at.alicdn.com/t/font_694553_rglpkm3axpj.css";
  @import "./assets/css/common.css";
  #app {
    display: flex;
    flex-flow: column;
    height: 100%;
  }
  #app .header,.footer{
    flex: 0 0 auto;
  }
  #app .footer{
    order: 3;
    display: flex;
    height: 10rem;
  }
  #app .main{
    flex: 1 0 auto;
    order: 1;
    display: flex;
    justify-content: center;
  }
  #app .main .main-wrapper{
    width: 80%;
    max-width: 940px;
    transition: all .4s;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 2rem .5rem;
  }
</style>
