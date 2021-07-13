var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game-content',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 500,
        height: 700,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: true
        }
    },
    scene: [preload, gameScene, gameOver]
};

var game = new Phaser.Game(config);