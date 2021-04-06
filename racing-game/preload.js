class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' })
    }
    preload() {
        this.load.image('map', 'assets/map/map.png');
        this.load.spritesheet('player', 'assets/objects/player.png', { frameWidth: 71, frameHeight: 131 });
    }
    create() {
        this.scene.start('Play');
    }
}