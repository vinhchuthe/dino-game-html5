class gameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameOver'
        })
    }
    init(data) {
        this.score = data.score;
        this.highScore = data.highScore;
        this.time = data.time;
    }
    create() {
        this.scoreboard = this.add.container(this.game.config.width / 2, -500).setDepth(1);
        this.bg = this.add.image(0, 0, 'game-bg').setOrigin(0);
        this.scoreBg = this.add.image(0, 0, 'result-bg').setOrigin(0.5).setScale(0.7);
        
        this.gameScore = this.add.text(0, -50, 'Score: ' + this.score, {
            fontFamily: 'Arial Black',
            fontSize: '50px',
            fill: '#000'
        }).setOrigin(0.5);
        this.gameHighScore = this.add.text(0, 20, 'HighScore: ' + this.highScore, {
            fontFamily: 'Arial Black',
            fontSize: '50px',
            fill: '#000'
        }).setOrigin(0.5);
        this.gameTime = this.add.text(0, 100, 'Time: ' + this.time, {
            fontFamily: 'Arial Black',
            fontSize: '50px',
            fill: '#000'
        }).setOrigin(0.5);

        this.reset = this.add.image(0, 200, 'reset-btn').setOrigin(0.5).setScale(0.9).setInteractive();

        this.reset.on('pointerdown', () => {
            this.scene.start('gameScene');
        }, null, this);

        this.scoreboard.add([
            this.scoreBg,
            this.gameScore,
            this.gameHighScore,
            this.gameTime,
            this.reset
        ]);

        this.tweens.add({
            targets: this.scoreboard,
            y: this.game.config.height / 2,
            offset: 500,
            duration: 1000,
            ease: 'Power2',
            repeat: 0,
            yoyo: false,
            loop: false,
            delay: 500
        });
    }
}