import { Scene } from 'phaser'

export default class PlayScene extends Scene {
    // Sprite
    // ArcadeSprite
    constructor() {
        super({ key: 'PlayScene' })

        this.playing = false;
        this.startButton;
        this.cursors

        this.ball//球
        this.paddle//挡板
        this.bricks;
        this.newBrick;
        this.brickInfo;
        // 积分
        this.scoreText;
        this.score = 0;

        // 机会
        this.lives = 3;
        this.livesText;
        this.lifeLostText;

        this.textStyle = { font: '18px Arial', fill: '#0095DD' };

    }

    create () {
        this.physics.world.checkCollision.down = false

        this.scoreText = this.add.text(5, 5, 'Points: 0', this.textStyle);

        this.livesText = this.add.text(this.physics.world.bounds.width - 5, 5, 'Lives: ' + this.lives, this.textStyle);
        this.livesText.setOrigin(1, 0);
        this.lifeLostText = this.add.text(this.physics.world.bounds.width * 0.5, this.physics.world.bounds.height * 0.5, 'Life lost, click to continue', this.textStyle);
        this.lifeLostText.setOrigin(0.5);
        this.lifeLostText.visible = false;

        this.startButton = this.add.image(this.physics.world.bounds.width * 0.5, this.physics.world.bounds.height * 0.5, 'button').setInteractive();
        this.startButton.on('pointerdown', () => {
            this.startGame()
        });

        this.anims.create({
            key: 'wobble',
            frames: this.anims.generateFrameNumbers('ball', { frames: [0, 1, 0, 2, 0, 1, 0, 2, 0] }),
            frameRate: 24,
            repeat: 3
        })
        this.cursors = this.input.keyboard.createCursorKeys();

        this.ball = this.add.sprite(this.physics.world.bounds.width * 0.5, this.physics.world.bounds.height - 25, 'ball');

        this.physics.add.existing(this.ball, false);
        this.ball.body.setBounce(1, 1).setCollideWorldBounds(true);

        this.paddle = this.add.sprite(this.physics.world.bounds.width * 0.5, this.physics.world.bounds.height - 5, 'paddle');
        this.physics.add.existing(this.paddle, false);
        this.paddle.body.setImmovable(true).setCollideWorldBounds(true);
        this.initBricks();

    }

    update () {
        this.physics.add.collider(this.ball, this.paddle, (ball, paddle) => {
            this.ballHitPaddle(ball, paddle)
        });
        this.physics.add.collider(this.ball, this.bricks, (ball, brick) => {
            this.ballHitBrick(ball, brick)
        });

        if (this.playing) {
            let _x = this.paddle.x
            let _speed = 5
            if (this.input.isOver) {
                _x = this.input.x || this.physics.world.bounds.width * 0.5
            } else if (this.cursors.left.isDown) {
                _x -= _speed
            } else if (this.cursors.right.isDown) {
                _x += _speed
            }
            this.paddle.setX(_x)
        }

        if (this.ball.y > 590) {
            // this.physics.remove(this.ball)
            this.lives--;
            if (this.lives) {
                this.livesText.setText('Lives: ' + this.lives);
                this.lifeLostText.visible = true;
                this.ball.body.reset(this.physics.world.bounds.width * 0.5, this.physics.world.bounds.height - 25);
                this.paddle.body.reset(this.physics.world.bounds.width * 0.5, this.physics.world.bounds.height - 5);
                this.input.once('pointerdown', function () {
                    this.lifeLostText.visible = false;
                    this.ball.body.setVelocity(150, -150);
                }, this);
            }
            else {
                alert('You lost, game over!');
                location.reload();
            }
            // this.scene.stop()
            // alert('Game over!');
            // location.reload();
        }
    }

    startGame () {
        this.startButton.destroy();
        this.ball.body.setVelocity(150, -150);
        this.playing = true;
    }

    initBricks () {
        this.brickInfo = {
            width: 60,
            height: 20,
            count: {
                row: 7,
                col: 3
            },
            offset: {
                top: 50,
                left: 60
            },
            padding: 10
        };
        this.bricks = this.add.group();
        let brickInfo = this.brickInfo
        for (let c = 0; c < brickInfo.count.col; c++) {
            for (let r = 0; r < brickInfo.count.row; r++) {
                var brickX = (r * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
                var brickY = (c * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;
                this.newBrick = this.physics.add.sprite(brickX, brickY, 'brick');
                // this.physics.add.existing(this.newBrick, false);
                // this.physics.physics.enable(this.newBrick, this.Phaser.Physics.ARCADE);
                this.newBrick.setImmovable(true);
                // this.newBrick.anchor.set(0.5);
                this.bricks.add(this.newBrick);
            }
        }
    }

    ballHitPaddle (ball, paddle) {
        this.ball.play('wobble');
        this.ball.body.setVelocityX(-1 * 5 * (paddle.x - ball.x))
    }

    ballHitBrick (ball, brick) {
        this.add.tween({
            targets: brick,
            scaleX: 0,
            scaleY: 0,
            yoyo: false,
            duration: 200,
            ease: 'Linear',
            repeat: 0,
            onComplete: () => {
                brick.disableBody(true, true);
            }
        });

        this.score += 10;
        this.scoreText.setText('Points: ' + this.score);
        // var count_alive = 0;
        // for (let i = 0; i < this.bricks.children.length; i++) {
        //     if (this.bricks.children[i].alive == true) {
        //         count_alive++;
        //     }
        // }
        // console.log(this.bricks.countActive(true))
        if (this.bricks.countActive(true) === 0) {
            alert('You won the game, congratulations!');
            // location.reload();
        }
    }
}