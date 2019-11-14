import { Scene } from 'phaser'
// import ball from '@/game/assets/ball.png'
import paddle from '@/game/assets/paddle.png'
import brick from '@/game/assets/brick.png'
import ball from '@/game/assets/wobble.png'
import button from '@/game/assets/button.png'
// import thudOgg from '@/game/assets/thud.ogg'

const json = {
    // 'ball': ball,
    'paddle': paddle,
    'brick': brick
}
export default class BootScene extends Scene {
    constructor() {
        super({ key: 'BootScene' })
    }

    preload () {
        // console.log(ball)
        this.loadAssets(json)
        // this.load.image('bomb', bomb)
        // this.load.audio('thud', [thudMp3, thudOgg])
    }

    create () {
        this.scene.start('PlayScene')
    }

    loadAssets (json) {
        Object.keys(json).forEach((key) => {
            this.load.image(key, `${json[key]}`)
        })

        this.load.spritesheet('ball', ball, { frameWidth: 20, frameHeight: 20 });
        this.load.spritesheet('button', button, { frameWidth: 120, frameHeight: 40 });
    }
}