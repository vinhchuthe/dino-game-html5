document.addEventListener("DOMContentLoaded", function () {
    var game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 700,
        height: 400,
        scale: {
            mode: Phaser.Scale.FIT,
            parent: 'game-content',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            // zoom: 2
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: true
            }
        },
        scene: [Preload, titleScreen, gameScene]
    });
});