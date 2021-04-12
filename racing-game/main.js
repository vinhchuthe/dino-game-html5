var config = {
    type: Phaser.AUTO,
    // pixleArt: true,
    width: 768,
    height: window.innerHeight,
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
