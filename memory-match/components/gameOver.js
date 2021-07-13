class gameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameOver'
        })
    }
    init(data) {
        this.score = data.score;
        this.time = data.time;
    }
    create() {
        this.checkResult();

        this.reset = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 200, 'card1').setScale(0.5).setInteractive();

        this.reset.on('pointerdown', () => {
            this.scene.start('gameScene');
        }, null, this);
    }

    checkResult() {
        if (this.score >= 4) {
            this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'You Win!!!', {
                fontFamily: 'Verdana Black',
                fontSize: '50px',
                fill: '#fff'
            }).setOrigin(0.5);

            this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 100, 'Matched: ' + this.score + '/6', {
                fontFamily: 'Verdana Black',
                fontSize: '50px',
                fill: '#fff'
            }).setOrigin(0.5);
        } else {
            this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'You Lost!!!', {
                fontFamily: 'Verdana Black',
                fontSize: '50px',
                fill: '#fff'
            }).setOrigin(0.5);

            this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 100, 'Matched: ' + this.score + '/6', {
                fontFamily: 'Verdana Black',
                fontSize: '50px',
                fill: '#fff'
            }).setOrigin(0.5);
        }
    }
}