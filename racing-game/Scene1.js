class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' })
    }

    preload() {
        this.load.image('bg', 'assets/map/map.png');
    }
    create() {
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        var title = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "Racing Fury", { fill: "#535353", font: '900 85px Courier', resolution: 5 }).setOrigin(0.5, 0.5);
        var count1 = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "3", { fill: "#535353", font: '900 65px Courier', resolution: 5 }).setOrigin(0.5, 0.5).setAlpha(0);
        var count2 = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "2", { fill: "#535353", font: '900 65px Courier', resolution: 5 }).setOrigin(0.5, 0.5).setAlpha(0);
        var count3 = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "1", { fill: "#535353", font: '900 65px Courier', resolution: 5 }).setOrigin(0.5, 0.5).setAlpha(0);
        var count4 = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "GO!", { fill: "#535353", font: '900 65px Courier', resolution: 5 }).setOrigin(0.5, 0.5).setAlpha(0);

        var timeline = this.tweens.createTimeline();
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
        this.input.on('pointerdown', (e) => {
            timeline.play();
            setTimeout(function () {
                this.game.scene.start('Scene2');
            }, 5000);
        }, this);
    }
}