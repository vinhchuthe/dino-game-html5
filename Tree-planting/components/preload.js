class Preload extends Phaser.Scene {
    constructor() {
        super({
            key: 'Preload'
        })
    }
    preload() {
        this.load.image('game-bg', 'assets/image/game-bg.png');
        this.load.image('logo', 'assets/image/tree-logo.png');
        this.load.image('tree-small', 'assets/image/tree-small.png');
        this.load.image('tree-mid', 'assets/image/tree-mid.png');
        this.load.image('tree-large', 'assets/image/tree-large.png');
        this.load.image('tree1-icon', 'assets/image/tree-icon-box1.png');
        this.load.image('tree2-icon', 'assets/image/tree-icon-box2.png');
        this.load.image('tree3-icon', 'assets/image/tree-icon-box3.png');

        this.load.image('btn-bg', 'assets/image/button-bg.png');
        this.load.image('btn-text', 'assets/image/button-text.png');
        this.load.image('button1', 'assets/image/blocka.png');
        this.load.image('button2', 'assets/image/blockb.png');
        this.load.image('button3', 'assets/image/blockc.png');
        this.load.image('popup-bg', 'assets/image/popup-bg.png');
    }
    create() {
        this.scene.start('gameScene');
    }
}