// var interval = [100, 200, 300];
var isGameRunning = false;
// var rndhighItemsTime = 1;
// var rndmidItemsTime = 1;
// var rndlowItemsTime = 1;
var score;
var scoreLimit;
var highScore = 0;


class gameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameScene'
        })
    }
    create() {
        this.scrollSpeed = 0;
        this.isHit = false;
        this.isDead = false;
        this.gravity = 750
        score = 0;
        highScore = 0;
        scoreLimit = 0;
        this.gameSpeed = 3;
        this.respawnTime = 0;
        this.livesCounter = 5;
        this.lives = null;
        isGameRunning = true;


        // background
        // this.bg = this.add.image(0, 0, 'title-bg').setScale(2);
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'game-bg').setOrigin(0, 0);

        // physics platform
        this.platform = this.physics.add.sprite(0, this.game.config.height, 'platform');
        this.platform.setSize(this.game.config.width * 2, 70);
        this.platform.setImmovable();
        this.platform.setAlpha(0);


        // player
        this.player = this.physics.add.sprite(50, this.game.config.height - 90, 'robo');
        this.player.body.setSize(this.player.width * 0.7, this.player.height * 0.8);
        this.player.body.offset.y = 54;
        this.player.setDepth(6);
        this.player.setScale(0.4);
        this.player.setBounce(0);
        this.player.body.gravity.y = this.gravity;
        this.player.setCollideWorldBounds(true);

        // input
        this.cursors = this.input.keyboard.createCursorKeys();

        // collider
        this.physics.add.collider(this.player, this.platform);

        // obsticles
        this.obsticles = this.physics.add.group();
        // people
        this.peoples = this.physics.add.group();

        // highpay Items
        this.highItems = this.physics.add.group();
        this.highItemsTimer = this.time.addEvent({
            delay: 27000,
            callback: this.highItemsPay,
            callbackScope: this,
            loop: false,
            repeat: 1
        }, this);

        // midpay Items
        this.midItems = this.physics.add.group();
        this.midItemsTimer = this.time.addEvent({
            delay: 17000,
            callback: this.midItemsPay,
            callbackScope: this,
            loop: false,
            repeat: 3
        }, this);

        // lowpay Items
        this.lowItems = this.physics.add.group();
        this.lowItemsTimer = this.time.addEvent({
            delay: 4000,
            callback: this.lowItemsPay,
            callbackScope: this,
            loop: true
        }, this);

        // score
        this.scoreText = this.add.text(this.game.config.width - 110, 30, 'score: 0', {
            fontSize: '16px',
            fill: '#000'
        });

        // lives
        this.lives = this.add.group();
        var liveX = 130;
        var liveY = 20;
        for (var i = 0; i < 4; i++) {
            var liveSprite = this.lives.create(liveX - 100 + 30 * i, liveY, 'carrot');
            liveSprite.setOrigin(0.5, 0.5);
        }



        // anims
        this.animation();

        // Timer
        this.timer();

        // Obsticle
        this.placeObsticle();

        // enviroment
        this.placeEnviroment();

        // collider
        this.initCollider();

    }

    // -------------- placeEnviroment ----------------
    placeEnviroment() {
        const envirNum = Math.floor(Math.random() * 5) + 1;
        const distance = Phaser.Math.Between(500, 700);
        let people;
        switch (envirNum) {
            case 1:
                people = this.peoples.create(this.game.config.width + distance, this.game.config.height - 90, 'people1')
                    .setOrigin(0, 1).setScale(0.4);
                break;
            case 2:
                people = this.peoples.create(this.game.config.width + distance, this.game.config.height - 90, 'people2')
                    .setOrigin(0, 1).setScale(0.4);
                break;
            case 3:
                people = this.peoples.create(this.game.config.width + distance, this.game.config.height - 90, 'people3')
                    .setOrigin(0, 1).setScale(0.4);
                break;
            case 4:
                people = this.peoples.create(this.game.config.width + distance, this.game.config.height - 90, 'people4')
                    .setOrigin(0, 1).setScale(0.4);
                break;
            case 5:
                people = this.peoples.create(this.game.config.width + distance, this.game.config.height - 90, 'people5')
                    .setOrigin(0, 1).setScale(0.4);
                break;
            default:
                // code block
                people = this.peoples.create(this.game.config.width + distance, this.game.config.height - 90, 'people1')
                    .setOrigin(0, 1).setScale(0.4);

        }
    }

    // --------------- placeObsticle -----------------
    placeObsticle() {
        const obsticleNum = Math.floor(Math.random() * 7) + 1;
        const distance = Phaser.Math.Between(200, 400);
        let obsticle;
        if (obsticleNum > 0 && obsticleNum <= 3) {
            obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - 40, 'object1')
                .setOrigin(0, 1).setScale(0.4);
        } else if (obsticleNum > 3 && obsticleNum <= 6) {
            obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - 40, 'object2')
                .setOrigin(0, 1).setScale(0.4);
        } else {
            obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - 40, 'object3')
                .setOrigin(0, 1).setScale(0.4);
        }
        obsticle.setImmovable();
    }



    // --------------- highpay Items -----------------
    highItemsPay() {
        let highItemsGroup;
        const distance = Phaser.Math.Between(650, 750);
        highItemsGroup = this.highItems.create(this.game.config.width + distance, 160, `highItem`).setOrigin(0, 0).setScale(0.4);
    }



    // --------------- midpay Items -----------------
    midItemsPay() {
        let midItemsGroup;
        const distance = Phaser.Math.Between(350, 450);
        midItemsGroup = this.midItems.create(this.game.config.width + distance, 90, `midItem`).setOrigin(0, 0).setScale(0.5);
    }



    // --------------- lowpay Items -----------------
    lowItemsPay() {
        let lowGroupItem1, lowGroupItem2, lowGroupItem3;
        lowGroupItem1 = this.lowItems.create(this.game.config.width + 120, 310, `lowItem1`).setOrigin(0, 0).setScale(0.3);
        lowGroupItem2 = this.lowItems.create(this.game.config.width + 80, 310, `lowItem2`).setOrigin(0, 0).setScale(0.3);
        lowGroupItem3 = this.lowItems.create(this.game.config.width + 160, 310, `lowItem3`).setOrigin(0, 0).setScale(0.3);
    }



    // --------------- CollideItems ------------------
    initCollider() {
        this.physics.add.overlap(this.lowItems, this.midItems, function (low, mid) {
            low.disableBody(true, true);
        }, null, this);
        this.physics.add.overlap(this.lowItems, this.highItems, function (low, mid) {
            low.disableBody(true, true);
        }, null, this);
        this.physics.add.overlap(this.lowItems, this.obsticles, function (low, obsticles) {
            low.disableBody(true, true);
        }, null, this);
        this.physics.add.overlap(this.peoples, this.highItems, function (peoples, highItems) {
            peoples.disableBody(true, true);
        }, null, this);
        this.physics.add.overlap(this.peoples, this.highItems, function (peoples, midItems) {
            peoples.disableBody(true, true);
        }, null, this);
        this.physics.add.overlap(this.peoples, this.highItems, function (peoples, obsticles) {
            peoples.disableBody(true, true);
        }, null, this);
        this.physics.add.overlap(this.player, this.lowItems, this.collectLowItems, null, this);
        this.physics.add.overlap(this.player, this.midItems, this.collectMidItems, null, this);
        this.physics.add.overlap(this.player, this.highItems, this.collectHighItems, null, this);
        this.physics.add.overlap(this.player, this.obsticles, this.hurtPlayer, null, this)
    }

    collectLowItems(player, lowItems) {
        lowItems.disableBody(true, true);
        score += 10;
        scoreLimit += 10;
        this.scoreText.setText('score: ' + score);
    }

    collectMidItems(player, midItems) {
        midItems.disableBody(true, true);
        score += 30;
        scoreLimit += 30;
        this.scoreText.setText('score: ' + score);
    }

    collectHighItems(player, highItems) {
        highItems.disableBody(true, true);
        score += 50;
        scoreLimit += 50;
        this.scoreText.setText('score: ' + score);
    }

    hurtPlayer(player, obsticles) {
        console.log(this.livesCounter);
        this.isHit = true;
        var live;
        live = this.lives.getFirstAlive();
        if (live) {
            live.destroy();
        }
        this.livesCounter--;
        if (this.livesCounter == 0) {
            this.gameEnd();
        }

        this.blink = this.tweens.add({
            targets: this.player,
            alpha: 0,
            duration: 100,
            ease: 'Power2',
            yoyo: true,
            loop: 3,
        });

        if (this.player.body.onFloor()) {
            obsticles.destroy();
        } else {
            this.player.body.velocity.y = -320;
            obsticles.destroy();
        }
    }


    // -------------- update ---------------
    update(time, delta) {
        if (!isGameRunning) {
            return;
        }
        if (this.isDead) {
            this.gameSpeed = 0;
        } else {
            this.background.tilePositionX += this.gameSpeed;
            Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed);
            Phaser.Actions.IncX(this.peoples.getChildren(), -this.gameSpeed);
            Phaser.Actions.IncX(this.highItems.getChildren(), -this.gameSpeed);
            Phaser.Actions.IncX(this.midItems.getChildren(), -this.gameSpeed);
            Phaser.Actions.IncX(this.lowItems.getChildren(), -this.gameSpeed);
        }


        this.respawnTime += delta * this.gameSpeed * 0.08;

        if (scoreLimit >= 100) {
            this.gameSpeed += 0.5;
            this.gravity += 150;
            scoreLimit = 0;
        }
        if (this.respawnTime >= 700) {
            this.placeEnviroment();
            this.placeObsticle();
            this.respawnTime = 0;
        }


        this.obsticles.getChildren().forEach(obsticle => {
            if (obsticle.getBounds().right < 0) {
                this.obsticles.killAndHide(obsticle);
            }
        });

        if (isGameRunning) {
            if (this.player.body.onFloor()) {
                this.player.anims.play('player-run', true);
            }
        }


        if (this.cursors.space.isDown) {
            if (this.player.body.onFloor()) {
                this.player.body.velocity.y = -520;
                this.player.anims.play('player-jump');
            }
        }
    }


    // ---------- anims -----------
    animation() {
        this.anims.create({
            key: "player-run",
            frames: this.anims.generateFrameNames('robo', {
                prefix: 'character_robot_walk',
                suffix: '.png',
                start: 0,
                end: 7
            }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: "player-jump",
            frames: [{
                key: 'robo',
                frame: 'character_robot_fall.png'
            }],
            frameRate: 12
        });
    }


    // -------- Timer handle -------------
    timer() {
        this.timeLimit = 90;
        this.timeText = this.add.text(this.game.config.width - 110, 10, '90');
        this.timeText.fill = '#000000';
        this.timers = this.time.addEvent({
            delay: 1000,
            loop: true,
            callbackScope: this,
            callback: this.tick,
        }, this)
    }

    tick() {
        this.timeLimit--;
        // var minutes = Math.floor(this.timeLimit / 60);
        // var seconds = this.timeLimit - (minutes * 60);
        // var timeString = this.addZeros(minutes) + ":" + this.addZeros(seconds);
        this.timeText.text = this.timeLimit;
        if (this.timeLimit === 0) {
            this.outofTime();
        }
    }

    // addZeros(num) {
    //     if (num < 10) {
    //         num = "0" + num;
    //     }
    //     return num;
    // }

    outofTime() {
        this.gameEnd();
        // this.timeLimit = 90;
    }


    // ------------- Game Over ----------------
    gameEnd() {
        this.isDead = true;
        this.isGameRunning = false;
        this.physics.pause();
        this.timers.remove();

        if (highScore < score) {
            highScore = score;
        }

        this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: () => {
                this.scene.start('gameOver', {
                    score: score,
                    highScore: highScore,
                    time: this.timeLimit
                });
            }
        })
    }
}