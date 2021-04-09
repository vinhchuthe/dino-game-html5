class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' })
    }

    preload() {
        this.load.image('bg', 'assets/map/map.png');
    }
    create() {
        this.add.image(0, 0, 'bg').setOrigin(0, 0);

        // start game
        this.input.on('pointerdown', (e) => {
            this.scene.start('Scene2');
        }, this);
    }
}