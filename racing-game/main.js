// config
var config = {
    type: Phaser.AUTO,

    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game-content',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 640,
        height: 1136,
        min: {
            width: 320,
            height: 480
        },
        max: {
            width: 640,
            height: 1136
        }
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100 },
            debug: true
        }
    },
    scene: [Scene1, Scene2, Scene3]
}

var game = new Phaser.Game(config);
