var config = {
    type: Phaser.AUTO,
    // pixleArt: true,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 768,
        height: 757,
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
