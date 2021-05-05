class Scene1 extends Phaser.Scene {

    gameTitle;
    gameError;

    constructor() {
        super({ key: 'Scene1' })
    }

    preload() {
        this.load.image('bg', 'assets/map/road.png');
    }
    create() {
        var road = this.add.tileSprite(0, 0, 640, 1136, 'bg');
        road.setOrigin(0, 0);
        var title = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "Racing Fury", { fill: "#535353", font: '900 85px Courier', resolution: 5 }).setOrigin(0.5, 0.5);
        var error = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "Error", { fill: "#535353", font: '900 85px Courier', resolution: 5 }).setOrigin(0.5, 0.5);
        var play = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 100, "Play Game", { fill: "#535353", font: '900 35px Courier', resolution: 5 }).setOrigin(0.5, 0.5);
        var count1 = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "3", { fill: "#535353", font: '900 65px Courier', resolution: 5 }).setOrigin(0.5, 0.5).setAlpha(0);
        var count2 = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "2", { fill: "#535353", font: '900 65px Courier', resolution: 5 }).setOrigin(0.5, 0.5).setAlpha(0);
        var count3 = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "1", { fill: "#535353", font: '900 65px Courier', resolution: 5 }).setOrigin(0.5, 0.5).setAlpha(0);
        var count4 = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "GO!", { fill: "#535353", font: '900 65px Courier', resolution: 5 }).setOrigin(0.5, 0.5).setAlpha(0);

        this.gameTitle = this.add.container(0, 0);
        this.gameError = this.add.container(0, 0);
        this.gameTitle.add([title, play, count1, count2, count3, count4]).setDepth(-1);
        this.gameError.add([error]).setDepth(-1);

        // check oriention if mobile
        this.checkmb();

        // click play
        play.setInteractive();

        var blink = this.tweens.add({
            targets: play,
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            yoyo: true,
            loop: -1,
            delay: 300
        });

        var timeline = this.tweens.createTimeline();
        timeline.add({
            targets: play,
            alpha: 0,
            duration: 100,
        });
        timeline.add({
            targets: title,
            alpha: 0,
            duration: 1000,
        });
        timeline.add({
            targets: count1,
            alpha: {
                from: 1,
                to: 0
            },
            duration: 1000,
        });
        timeline.add({
            targets: count2,
            alpha: {
                from: 1,
                to: 0
            },
            duration: 1000,
        });
        timeline.add({
            targets: count3,
            alpha: {
                from: 1,
                to: 0
            },
            duration: 1000,
        });
        timeline.add({
            targets: count4,
            alpha: {
                from: 1,
                to: 0
            },
            duration: 1000,
        });
        play.on('pointerdown', (e) => {
            timeline.play();
            blink.stop();
            setTimeout(function () {
                this.game.scene.start('Scene2');
            }, 5000);
        }, this);
    }

    // check event mb
    checkmb() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.checkOriention(this.scale.orientation);
            this.scale.on('orientationchange', this.checkOriention, this);
        }
        else {
            this.gameTitle.setDepth(1);
        }
    }

    checkOriention(orientation) {
        if (orientation === Phaser.Scale.PORTRAIT) {
            this.gameTitle.setDepth(1);
            this.gameError.setDepth(-1);
            alert('PORTRAIT');
        }
        else if (orientation === Phaser.Scale.LANDSCAPE) {
            this.gameError.setDepth(1);
            this.gameTitle.setDepth(-1);
            alert('LANDSCAPE');
        }
    }
}