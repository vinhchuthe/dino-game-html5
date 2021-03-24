var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 340,
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