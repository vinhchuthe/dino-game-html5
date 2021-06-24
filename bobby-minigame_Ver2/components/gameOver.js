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
        this.scoreBg = this.add.image(0, 0, 'result-bg').setOrigin(0.5).setScale(0.8);

        this.click = this.sound.add('click-sound', {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });


        this.gameScore = this.add.text(-300, -40, 'Điểm: ' + this.score, {
            fontFamily: 'Verdana Black',
            fontSize: '50px',
            fill: '#000'
        }).setOrigin(0, 0.5);
        this.gameHighScore = this.add.text(-300, 35, 'Điểm cao nhất: ' + this.highScore, {
            fontFamily: 'Verdana Black',
            fontSize: '50px',
            fill: '#000'
        }).setOrigin(0, 0.5);
        this.gameTime = this.add.text(-300, 110, 'Thời gian: ' + this.time, {
            fontFamily: 'Verdana Black',
            fontSize: '50px',
            fill: '#000'
        }).setOrigin(0, 0.5);

        this.reset = this.add.image(150, 190, 'reset-btn').setOrigin(0.5, 0).setScale(0.9).setInteractive();
        this.finish = this.add.image(-150, 190, 'finish-btn').setOrigin(0.5, 0).setScale(0.9).setInteractive();

        this.reset.on('pointerdown', () => {
            this.click.play();
            this.scene.start('gameScene');
        }, null, this);

        this.finish.on('pointerdown', () => {
            this.click.play();
            document.getElementById('ranking-popup').classList.add("visible");
            setTimeout(function () {
                document.getElementById('ranking-popup').classList.add("active");
            }, 200);
        }, null, this);


        this.scoreboard.add([
            this.scoreBg,
            this.gameScore,
            this.gameHighScore,
            this.gameTime,
            this.reset,
            this.finish
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