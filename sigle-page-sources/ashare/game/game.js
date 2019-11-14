import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'


function launch (containerId) {
    this.game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: containerId,
        physics: {
            default: 'arcade',
            arcade: {
                // gravity: { y: 300 },
                debug: false
            }
        },
        scene: [BootScene, PlayScene],
        scale: {
            mode: Phaser.Scale.ScaleModes.FIT,
            autoCenter: Phaser.Scale.Center.CENTER_BOTH
        },
        backgroundColor: '#eee'
    })
}

export default launch
export { launch }