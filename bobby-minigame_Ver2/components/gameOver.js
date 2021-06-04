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
        this.scoreboard = this.add.container(this.game.config.width / 2, this.game.config.height / 2);
        this.scoreBg = this.add.image(0, 0, 'result-bg').setOrigin(0.5).setScale(0.7);
        this.gameScore = this.add.bitmapText(this.scoreBg.width / 2, this.scoreBg.height / 2, 'customFont', '');
        this.gameScore.text = this.score;
        this.scoreboard.add([
            this.scoreBg, this.gameScore
        ]);
        // this.gameScore = this.add.text(this.game.config.width / 2, 100, 'Score: ' + this.score, {
        //     fontSize: '32px',
        //     fill: '#fff'
        // }).setOrigin(0.5, 0.5);
        // this.gameHighScore = this.add.text(this.game.config.width / 2, 200, 'HighScore: ' + this.highScore, {
        //     fontSize: '32px',
        //     fill: '#fff'
        // }).setOrigin(0.5, 0.5);
        // this.gameHighScore = this.add.text(this.game.config.width / 2, 300, 'Time: ' + this.time, {
        //     fontSize: '32px',
        //     fill: '#fff'
        // }).setOrigin(0.5, 0.5);

    }
}