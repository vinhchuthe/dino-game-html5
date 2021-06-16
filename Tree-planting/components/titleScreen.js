class titleScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'titleScreen'
        })
    }
    create() {
        // background
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'game-bg');

        // logo
        this.add.image(this.game.config.width / 2, 100, 'logo').setScale(0.7).setOrigin(0.5, 0);

        // Button
        this.btn_bg = this.add.image(this.game.config.width / 2, this.game.config.height * (2 / 3), 'btn-bg');
        this.btn_text = this.add.image(this.game.config.width / 2, this.game.config.height * (2 / 3), 'btn-text').setInteractive();

        this.btn_text.on('pointerdown', () => {
            this.scene.start('gameScene');
        }, null, this);
    }
}