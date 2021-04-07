class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' })
    }
    preload() {
        this.load.image('map', 'assets/map/map.png');
        this.load.image('grass', 'assets/map/grass.png');
        this.load.image('road', 'assets/map/road.png');
        this.load.image('cars', 'assets/objects/cars.png');
        this.load.image('star', 'assets/objects/star.png');
        this.load.spritesheet('player', 'assets/objects/player.png', { frameWidth: 71, frameHeight: 131 });
    }
    create() {
        this.scene.start('Play');
    }
}