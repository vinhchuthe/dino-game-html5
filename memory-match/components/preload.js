class preload extends Phaser.Scene {
    constructor() {
        super({
            key: 'preload'
        })
    }
    preload() {
        this.load.image('backCard', 'assets/image/back.png');
        this.load.image('frontCard', 'assets/image/front.png');
        this.load.image('card1', 'assets/image/card1.png');
        this.load.image('card2', 'assets/image/card2.png');
        this.load.image('card3', 'assets/image/card3.png');
        this.load.image('card4', 'assets/image/card4.png');

    }
    create() {
        this.scene.start('gameScene');
    }
}