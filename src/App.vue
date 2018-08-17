<template>
  <div id="app">
    <v-header class="header"></v-header>
    <div class="main">
      <transition name="fade" mode="out-in">
        <router-view class="main-wrapper"/>
      </transition>
    </div>
    <v-footer class="footer"></v-footer>
    <canvas id="fireworks" style="position: fixed; left: 0px; top: 0px; z-index: 1; pointer-events: none;"></canvas>
  </div>
</template>
<script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import Circle from '../static/js/Circle.js'
  import BigCircle from '../static/js/BigCircle.js'
  export default {
    name: 'App',
    components: {
      'v-header': Header,
      'v-footer': Footer
    },
    data(){
      return {
        canvas: null,
        ctx: null,
        nums: 40,
        circles: [],
        bCircle: null,
        animationId: false
      }
    },
    created(){

    },

    mounted(){
      this.canvas = document.getElementById("fireworks");
      this.canvas.width = 2 * window.innerWidth, this.canvas.height = 2 * window.innerHeight, this.canvas.style.width = window.innerWidth + "px", this.canvas.style.height = window.innerHeight + "px", this.canvas.getContext("2d").scale(2, 2)
      this.ctx = this.canvas.getContext("2d");


      window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();

      window.clearRequestTimeout = (function () {
        return window.cancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame;
      })();
      var that = this;
      $(document).click(function (e) {
        e = e || window.event;
        console.log(e.clientX, e.clientY);
        that.int(e.clientX, e.clientY);
      })
    },
    methods: {
      scrollToTop(){
        $('body,html').animate({scrollTop: 0}, 600);
      },
      int(x, y) {
        this.circles = [];

        if (this.animationId) clearRequestTimeout(this.animationId)

        for (let i = this.nums; i-- > 0;) {
          this.circles.push(new Circle(x, y))
        }

        this.bCircle = new BigCircle(x, y)
        this.create()
      },
      create(){
        var w = this.canvas.width = this.canvas.offsetWidth;
        var h = this.canvas.height = this.canvas.offsetHeight;
        this.ctx.clearRect(0, 0, w, h);
        var that = this;
        this.circles.forEach(function(v) {
          v.move();
          v.createCircle(that.ctx)
        })

        this.bCircle.changeR();
        this.bCircle.creatBigCircle(that.ctx);

        this.animationId = requestAnimationFrame(this.create)

        if (this.bCircle.complete()) {
          //以大圆为标准，清空屏幕停止动画
          this.ctx.clearRect(0, 0, w, h);
          clearRequestTimeout(this.animationId);
        }
      },
      runCanvas(e){
//        e = e || window.event;
//        int(e.clientX, e.clientY);
        console.log(e);
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

  #app .header, .footer {
    flex: 0 0 auto;
  }

  #app .footer {
    order: 3;
    display: flex;
    height: 10rem;
  }

  #app .main {
    flex: 1 0 auto;
    order: 1;
    display: flex;
    justify-content: center;
  }

  #app .main .main-wrapper {
    width: 80%;
    max-width: 940px;
    transition: all .4s;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 2rem .5rem;
  }
</style>
