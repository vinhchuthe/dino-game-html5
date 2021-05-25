class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' })
    }
    preload() {
        this.load.image('title-bg', 'assets/sky.png');
        this.load.image('title', 'assets/logo.png');
        this.load.image('platform', 'assets/sf2floor.png');
        this.load.image('game-bg', 'assets/ms3-trees.png');
        this.load.image('carrot', 'assets/carrot.png');
        this.load.image('cars', 'assets/car.png');
        this.load.image('people', 'assets/people.png');
        this.load.image('store', 'assets/store.png');
        this.load.image('items1', 'assets/aqua_ball.png');
        this.load.image('items2', 'assets/blue_ball.png');
        this.load.image('btn-bg', 'assets/button-bg.png');
        this.load.image('btn-text', 'assets/button-text.png');

        this.load.atlas('robo', 'assets/player.png', 'assets/player.json');

    }
    create() {
        this.scene.start('titleScreen');
    }
}