document.addEventListener("DOMContentLoaded", function () {

    var game = new Phaser.Game({
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            parent: 'game-content',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 710,
            height: 1280
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 0
                },
                fps: 60,
                fixedStep: true,
                debug: false
            }
        },
        scene: [Preload, titleScreen, gameScene]
    });
});