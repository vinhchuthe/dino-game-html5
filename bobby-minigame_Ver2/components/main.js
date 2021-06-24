document.addEventListener("DOMContentLoaded", function () {

    var game = new Phaser.Game({
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            parent: 'game-content',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1200,
            height: 800
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 0
                },
                fps: 60,
                fixedStep: true,
                debug: true
            }
        },
        scene: [Preload, titleScreen, gameScene, gameOver]
        // scene: [Preload, gameOver]
    });
});