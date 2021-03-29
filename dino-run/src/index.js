var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
        width: 1000,
        height: 340,
        max: {
            width: 1000,
            height: 340,
        }
    },
    pixleArt: true,
    transparent: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [PreloadScene, PlayScene]
}

var game = new Phaser.Game(config);

