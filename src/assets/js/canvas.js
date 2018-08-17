// (function() {
//
//     var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;
//
//     // Main
//     initHeader();
//     initAnimation();
//     addListeners();
//
//     function initHeader() {
//         width = window.innerWidth;
//         height = window.innerHeight;
//         target = {x: width/2, y: height/2};
//
//         largeHeader = document.getElementById('large-header');
//         largeHeader.style.height = height+'px';
//
//         canvas = document.getElementById('demo-canvas');
//         canvas.width = width;
//         canvas.height = height;
//         ctx = canvas.getContext('2d');
//
//         // create points
//         points = [];
//         for(var x = 0; x < width; x = x + width/20) {
//             for(var y = 0; y < height; y = y + height/20) {
//                 var px = x + Math.random()*width/20;
//                 var py = y + Math.random()*height/20;
//                 var p = {x: px, originX: px, y: py, originY: py };
//                 points.push(p);
//             }
//         }
//
//         // for each point find the 5 closest points
//         for(var i = 0; i < points.length; i++) {
//             var closest = [];
//             var p1 = points[i];
//             for(var j = 0; j < points.length; j++) {
//                 var p2 = points[j]
//                 if(!(p1 == p2)) {
//                     var placed = false;
//                     for(var k = 0; k < 5; k++) {
//                         if(!placed) {
//                             if(closest[k] == undefined) {
//                                 closest[k] = p2;
//                                 placed = true;
//                             }
//                         }
//                     }
//
//                     for(var k = 0; k < 5; k++) {
//                         if(!placed) {
//                             if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
//                                 closest[k] = p2;
//                                 placed = true;
//                             }
//                         }
//                     }
//                 }
//             }
//             p1.closest = closest;
//         }
//
//         // assign a circle to each point
//         for(var i in points) {
//             var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
//             points[i].circle = c;
//         }
//     }
//
//     // Event handling
//     function addListeners() {
//         if(!('ontouchstart' in window)) {
//             window.addEventListener('mousemove', mouseMove);
//         }
//         window.addEventListener('scroll', scrollCheck);
//         window.addEventListener('resize', resize);
//     }
//
//     function mouseMove(e) {
//         var posx = posy = 0;
//         if (e.pageX || e.pageY) {
//             posx = e.pageX;
//             posy = e.pageY;
//         }
//         else if (e.clientX || e.clientY)    {
//             posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//             posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//         }
//         target.x = posx;
//         target.y = posy;
//     }
//
//     function scrollCheck() {
//         if(document.body.scrollTop > height) animateHeader = false;
//         else animateHeader = true;
//     }
//
//     function resize() {
//         width = window.innerWidth;
//         height = window.innerHeight;
//         largeHeader.style.height = height+'px';
//         canvas.width = width;
//         canvas.height = height;
//     }
//
//     // animation
//     function initAnimation() {
//         animate();
//         for(var i in points) {
//             shiftPoint(points[i]);
//         }
//     }
//
//     function animate() {
//         if(animateHeader) {
//             ctx.clearRect(0,0,width,height);
//             for(var i in points) {
//                 // detect points in range
//                 if(Math.abs(getDistance(target, points[i])) < 4000) {
//                     points[i].active = 0.3;
//                     points[i].circle.active = 0.6;
//                 } else if(Math.abs(getDistance(target, points[i])) < 20000) {
//                     points[i].active = 0.1;
//                     points[i].circle.active = 0.3;
//                 } else if(Math.abs(getDistance(target, points[i])) < 40000) {
//                     points[i].active = 0.02;
//                     points[i].circle.active = 0.1;
//                 } else {
//                     points[i].active = 0;
//                     points[i].circle.active = 0;
//                 }
//
//                 drawLines(points[i]);
//                 points[i].circle.draw();
//             }
//         }
//         requestAnimationFrame(animate);
//     }
//
//     function shiftPoint(p) {
//         TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
//             y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
//             onComplete: function() {
//                 shiftPoint(p);
//             }});
//     }
//
//     // Canvas manipulation
//     function drawLines(p) {
//         if(!p.active) return;
//         for(var i in p.closest) {
//             ctx.beginPath();
//             ctx.moveTo(p.x, p.y);
//             ctx.lineTo(p.closest[i].x, p.closest[i].y);
//             ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
//             ctx.stroke();
//         }
//     }
//
//     function Circle(pos,rad,color) {
//         var _this = this;
//
//         // constructor
//         (function() {
//             _this.pos = pos || null;
//             _this.radius = rad || null;
//             _this.color = color || null;
//         })();
//
//         this.draw = function() {
//             if(!_this.active) return;
//             ctx.beginPath();
//             ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
//             ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
//             ctx.fill();
//         };
//     }
//
//     // Util
//     function getDistance(p1, p2) {
//         return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
//     }
//
// })();


"use strict";
function updateCoords(e) {
  pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left, pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top
}
function setParticuleDirection(e) {
  var t = anime.random(0, 360) * Math.PI / 180, a = anime.random(50, 180), n = [-1, 1][anime.random(0, 1)] * a;
  return {x: e.x + n * Math.cos(t), y: e.y + n * Math.sin(t)}
}
function createParticule(e, t) {
  var a = {};
  return a.x = e, a.y = t, a.color = colors[anime.random(0, colors.length - 1)], a.radius = anime.random(16, 32), a.endPos = setParticuleDirection(a), a.draw = function () {
    ctx.beginPath(), ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0), ctx.fillStyle = a.color, ctx.fill()
  }, a
}
function createCircle(e, t) {
  var a = {};
  return a.x = e, a.y = t, a.color = "#F00", a.radius = .1, a.alpha = .5, a.lineWidth = 6, a.draw = function () {
    ctx.globalAlpha = a.alpha, ctx.beginPath(), ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0), ctx.lineWidth = a.lineWidth, ctx.strokeStyle = a.color, ctx.stroke(), ctx.globalAlpha = 1
  }, a
}
function renderParticule(e) {
  for (var t = 0; t < e.animatables.length; t++)e.animatables[t].target.draw()
}
function animateParticules(e, t) {
  for (var a = createCircle(e, t), n = [], i = 0; i < numberOfParticules; i++)n.push(createParticule(e, t));
  anime.timeline().add({
    targets: n, x: function (e) {
      return e.endPos.x
    }, y: function (e) {
      return e.endPos.y
    }, radius: .1, duration: anime.random(1200, 1800), easing: "easeOutExpo", update: renderParticule
  }).add({
    targets: a,
    radius: anime.random(80, 160),
    lineWidth: 0,
    alpha: {value: 0, easing: "linear", duration: anime.random(600, 800)},
    duration: anime.random(1200, 1800),
    easing: "easeOutExpo",
    update: renderParticule,
    offset: 0
  })
}
function debounce(e, t) {
  var a;
  return function () {
    var n = this, i = arguments;
    clearTimeout(a), a = setTimeout(function () {
      e.apply(n, i)
    }, t)
  }
}
var canvasEl = document.querySelector(".fireworks");
if (canvasEl) {
  var ctx = canvasEl.getContext("2d"), numberOfParticules = 30, pointerX = 0, pointerY = 0, tap = "mousedown", colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"], setCanvasSize = debounce(function () {
    canvasEl.width = 2 * window.innerWidth, canvasEl.height = 2 * window.innerHeight, canvasEl.style.width = window.innerWidth + "px", canvasEl.style.height = window.innerHeight + "px", canvasEl.getContext("2d").scale(2, 2)
  }, 500), render = anime({
    duration: 1 / 0, update: function () {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    }
  });
  document.addEventListener(tap, function (e) {
    "sidebar" !== e.target.id && "toggle-sidebar" !== e.target.id && "A" !== e.target.nodeName && "IMG" !== e.target.nodeName && (render.play(), updateCoords(e), animateParticules(pointerX, pointerY))
  }, !1), setCanvasSize(), window.addEventListener("resize", setCanvasSize, !1)
}
