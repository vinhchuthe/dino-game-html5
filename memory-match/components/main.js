var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game-content',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
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
    scene: [preload, gameScene]
};

var game = new Phaser.Game(config);