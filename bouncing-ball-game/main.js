var game;
var gameOption = {
    bounceHeight: 300,
    ballGravity: 1200,
    ballPower: 1200,
    ballPosition: 0.2,
    platformSpeed: 250,
    platformDistanceRange: [150, 250],
    platformHeightRange: [-50, 50],
    platformLengthRange: [60, 80],
    localStorageName: "bestballscore2"
};

class playGame extends Phaser.Scene {
    constructor() {
        super({ key: 'playGame' })
    }
    preload() {
        this.load.image('ball', 'assets/image/ball.png');
        this.load.image('ground', 'assets/image/ground.png');
    }
    create() {
        this.platformGroup = this.physics.add.group();
        this.firstBounce = 0;
        this.gameStart = false;
        this.ball = this.physics.add.sprite(game.config.width * gameOption.ballPosition, game.config.height / 4 * 3.5 - gameOption.bounceHeight, 'ball');
        this.ball.body.gravity.y = gameOption.ballGravity;
        this.ball.setBounce(1);
        this.ball.body.checkCollision.down = true;
        this.ball.body.checkCollision.up = false;
        this.ball.body.checkCollision.left = false;
        this.ball.body.checkCollision.right = false;
        this.ball.setSize(30, 50, true);
        let platformX = this.ball.x;
        for (let i = 0; i < 10; i++) {
            let platform = this.platformGroup.create(platformX, game.config.height / 4 * 3.5 + Phaser.Math.Between(gameOption.platformHeightRange[0], gameOption.platformHeightRange[1]), 'ground');
            platform.setOrigin(0.5, 1);
            platform.setImmovable(true);
            platform.displayWidth = Phaser.Math.Between(gameOption.platformLengthRange[0], gameOption.platformLengthRange[1]);
            platformX += Phaser.Math.Between(gameOption.platformDistanceRange[0], gameOption.platformDistanceRange[1]);
        }
        this.input.on('pointerdown', this.boost, this);
    }

    getRightmostPlatform() {
        let rightmostPlatform = 0;
        this.platformGroup.getChildren().forEach(function (platform) {
            rightmostPlatform = Math.max(rightmostPlatform, platform.x);
        });
        return rightmostPlatform;
    }

    update() {
        this.physics.add.collider(this.platformGroup, this.ball, function () {
            if (this.firstBounce == 0) {
                this.firstBounce = this.ball.body.velocity.y;
            } else {
                this.ball.body.velocity.y = this.firstBounce;
                if (this.gameStart) {
                    this.platformGroup.setVelocityX(-gameOption.platformSpeed);
                }
            }
        }, null, this);
        this.platformGroup.getChildren().forEach(function (platform) {
            if (platform.getBounds().right < 0) {
                // this.updateScore(1);
                platform.x = this.getRightmostPlatform() + Phaser.Math.Between(gameOption.platformDistanceRange[0], gameOption.platformDistanceRange[1]);
                platform.displayWidth = Phaser.Math.Between(gameOption.platformLengthRange[0], gameOption.platformLengthRange[1]);
            }
        }, this);
        if(this.ball.y > game.config.height) {
            this.scene.start('playGame');
        }
    }

    boost() {
        if (this.firstBounce != 0) {
            this.gameStart = true;
            this.ball.body.velocity.y = gameOption.ballPower;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: 0x87ceeb,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-content',
        width: 750,
        height: 500,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: playGame
}

game = new Phaser.Game(config);