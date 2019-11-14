// main.js
import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

// export default new Vue({
//   el: '#app',
//   data: {
//     game: null,
//     ball: null,
//   },
//   mounted () {
//     setTimeout(() => {
//       this.game = new Phaser.Game({
//         width: 480,
//         height: 320,
//         type: Phaser.FIT,
//         physics: null,
//         scene: {
//           preload: this.preload,
//           create: this.prcreateeload,
//           update: this.update
//         },
//         scale: {
//           mode: Phaser.Scale.ScaleModes.FIT,
//           autoCenter: Phaser.Scale.Center.CENTER_BOTH
//         },
//         backgroundColor: '#eee'
//       });
//     }, 1000)

//   },
//   methods: {
//     preload () {
//       console.log(Phaser, this.game, this.game.load)
//       this.game.load.image('ball', 'static/ball.png');
//       console.log(123)
//     },
//     create () { console.log(123) },
//     update () { console.log(123) }
//   }
// })
