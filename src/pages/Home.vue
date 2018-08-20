<template>
    <div id="home">

      <canvas id="canvas"></canvas>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: [],
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
      mounted(){
//        var canvas = require('../../static/js/canvasTime');
      },

      methods:{
      }
    }
</script>

<style scoped>

</style>
