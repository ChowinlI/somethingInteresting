<template>
  <header id="header">
    <nav class="nav">
      <div class="search-wrap"><div class="search-input-wrap"><input type="text" name="search" id="search" value=""></div><div class="search-btn"><i class="iconfont icon-search"></i></div></div>
      <div class="nav-list">
        <template v-for="(item,index) in nav_list">
          <div :class="{ 'nav-list-item':true, 'nav-list-item-active': nav_active==item }" @click="toRouterLink(item)">{{item.name}}</div>
        </template>
      </div>
    </nav>
    <canvas id="header-canvas" width="1920" height="60"></canvas>
  </header>
</template>


<script type="text/ecmascript-6">

  export default{

    props: [],
    data(){
      return {
        nav_list:[{name:'首页',link:'/home'},{name:'真皮沙发',link:'/roast'},{name:'胡里花哨',link:'/article'},{name:'有点东西',link:'/about'}],
        nav_active:{name:'首页',link:'/home'},
        canvas: null,
        ctx: null,
        waves: ["rgba(157, 187, 210, 0.2)", "rgba(171, 216, 201, 0.2)", "rgba(157,192,249, 0.2)", "rgba(0,222,255, 0.2)"],
        step: 0
      }
    },
    mounted(){
      this.canvas = document.getElementById('header-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = this.canvas.parentNode.offsetWidth;
      this.canvas.height = this.canvas.parentNode.offsetHeight;
//      帧动画封装
      window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();

      this.loop();
      for(var i in this.nav_list){
        if(this.nav_list[i].link.indexOf(window.location.pathname)>=0){
          this.nav_active = this.nav_list[i];
          break;
        }
      }
    },
    created(){

    },
    methods: {
      loop() {
        this.step++;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (var j = this.waves.length - 1; j >= 0; j--) {
//          var offset = step + j * Math.PI * 12;
          this.ctx.fillStyle = this.waves[j];
          var angle = (this.step + j * 45) * Math.PI / 180;
          var deltaHeight = Math.sin(angle) * 30;
          var deltaHeightRight = Math.cos(angle) * 30;
          this.ctx.beginPath();
          this.ctx.moveTo(0, 50 + deltaHeight);
          // ctx.lineTo(canvas.width, canvas.height/2 + deltaHeightRight);
          this.ctx.bezierCurveTo(this.canvas.width / 3, 50 + deltaHeight, this.canvas.width * 2 / 3, 50 + deltaHeightRight, this.canvas.width, 50 + deltaHeightRight);
          this.ctx.lineTo(this.canvas.width, this.canvas.height);
          this.ctx.lineTo(0, this.canvas.height);
          this.ctx.lineTo(0, this.canvas.height / 2 + deltaHeight);
          this.ctx.closePath();
          this.ctx.fill();
        }
        //注：帧动画，方法内调用
        requestAnimFrame(this.loop);
      },

      toRouterLink(item){
          this.nav_active = item;
          this.$router.push({path: item.link});
      }

    }
  }
</script>


<style>
  @import "../assets/css/header.css";

  #header-canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: -1;
    filter: alpha(opacity=50);
    -moz-opacity: .5;
    -khtml-opacity: .5;
    opacity: .5;
  }
</style>
