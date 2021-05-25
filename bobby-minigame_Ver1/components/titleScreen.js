class titleScreen extends Phaser.Scene {

    gameTitle;
    gameError;
    is_landscape = false;
    blink;

    constructor() {
        super({ key: 'titleScreen' })
    }
    create() {
        this.editorCreate();



        // check oriention if mobile
        this.checkmb();

        if (this.is_landscape = true) {
            this.btn_text.on('pointerdown', () => {
                this.blink.stop();
                this.scene.start('gameScene');
            });
        }
    }

    editorCreate() {
        var bg = this.add.image(0, 0, 'title-bg').setScale(2);

        var title = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'title').setOrigin(0.5, 0.5);
        this.btn_bg = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 100, 'btn-bg').setScale(0.5);
        this.btn_text = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 100, 'btn-text').setScale(0.5).setInteractive();
        var error = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "Xoay ngang màn hình", { fill: "#535353", font: '900 30px Courier', resolution: 5 }).setOrigin(0.5, 0.5);


        this.gameTitle = this.add.container(0, 0);
        this.gameError = this.add.container(0, 0);
        this.gameTitle.add([title, this.btn_bg, this.btn_text]).setDepth(-1);
        this.gameError.add([error]).setDepth(-1);

        this.blink = this.tweens.add({
            targets: this.btn_text,
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            yoyo: true,
            loop: -1,
            delay: 300
        });
    }

    // check event mb
    checkmb() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.checkOriention(this.scale.orientation);
            this.scale.on('orientationchange', this.checkOriention, this);
        }
        else {
            this.gameTitle.setDepth(1);
            this.is_landscape = true;
        }
    }

    checkOriention(orientation) {
        if (orientation === Phaser.Scale.PORTRAIT) {
            this.gameTitle.setDepth(-1);
            this.gameError.setDepth(1);
            this.is_landscape = false
            alert('PORTRAIT');
        }
        else if (orientation === Phaser.Scale.LANDSCAPE) {
            this.gameError.setDepth(-1);
            this.gameTitle.setDepth(1);
            this.is_landscape = true;
            alert('LANDSCAPE');
        }
    }
}