// main.js
import 'babel-polyfill'
import Vue from 'vue/dist/vue.js'
import Phaser from 'phaser'
export default new Vue({
  el: '#app',
  data: {
  },
  created () {
    var game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
      preload: preload, create: create, update: update
    });
    function preload () {
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
    }
    function create () { }
    function update () { }
  },
  methods: {
  }
})
