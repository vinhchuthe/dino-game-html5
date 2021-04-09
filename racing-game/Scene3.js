class Scene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene3' })
    }
    init(data) {
        console.log(data);
        this.score = data.score;
        this.highScore = data.highScore;
    }
    preload() {
        this.load.image('bg', 'assets/map/map.png');
    }
    create() {
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        this.gameTitle = this.add.text(220, 200, 'Game Over', { fontSize: '62px', fill: '#000' });
        this.gameScore = this.add.text(290, 400, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });
        this.gameHighScore = this.add.text(255, 500, 'HighScore: ' + this.highScore, { fontSize: '32px', fill: '#000' });
        this.restart = this.add.rectangle(195, 600, 32, 32, 0xff00ff);
        this.restart.setInteractive();

        this.restart.on('pointerdown', () => {
            this.scene.start('Scene2');
        });
    }
}