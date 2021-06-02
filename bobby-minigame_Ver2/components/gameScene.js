var isGameRunning = false;
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
        this.maxVelocity = 720;
        score = 0;
        highScore = 0;
        scoreLimit = 0;
        this.gameSpeed = 4.5;
        this.respawnTime = 0;
        this.livesCounter = 5;
        this.lives = null;
        isGameRunning = true;


        // background
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'game-bg').setOrigin(0, 0);

        // physics platform
        this.platform = this.physics.add.sprite(0, this.game.config.height, 'platform');
        this.platform.setSize(this.game.config.width * 3, this.game.config.height / 5);
        this.platform.setDepth(6);
        this.platform.setImmovable();
        this.platform.setAlpha(0);


        // player
        this.player = this.physics.add.sprite(100, this.game.config.height - 480, 'bobby');
        this.player.body.setSize(this.player.width + 5, this.player.height, true);
        this.player.body.offset.y = 0;
        this.player.body.offset.x = 10;
        this.player.setDepth(6);
        this.player.setScale(0.8);
        this.player.setBounce(0);
        this.player.body.gravity.y = this.gravity;
        this.player.setCollideWorldBounds(true);

        // gameOver Text
        this.gameOverText = this.add.image(this.game.config.width / 2 - 1600, this.game.config.height / 2, 'gameover').setOrigin(0.5, 0.5).setScale(0.8).setDepth(7);

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
            delay: 3000,
            callback: this.lowItemsPay,
            callbackScope: this,
            loop: true
        }, this);

        // score
        this.scoreBg = this.add.image(this.game.config.width / 2 - 210, 40, 'score-bg').setOrigin(0.5, 0.5).setScale(0.5);
        this.scoreText = this.add.text(this.game.config.width / 2 - 210, 25, '0', {
            fontSize: '35px',
            fill: '#000'
        });

        // lives
        this.liveBg = this.add.image(130, 40, 'heart-bg').setOrigin(0.5, 0.5).setScale(0.5);
        this.lives = this.add.group();
        var liveX = 215;
        var liveY = 40;
        for (var i = 0; i < 4; i++) {
            var liveSprite = this.lives.create(liveX - 100 + 30 * i, liveY, 'heart');
            liveSprite.setOrigin(0.5, 0.5).setScale(0.5);
        }


        // input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointerdown', () => {
            if (this.player.body.onFloor()) {
                this.player.body.velocity.y = -this.maxVelocity;
                this.player.anims.play('player-jump');
            }
        }, null, this);


        // anims
        this.animation();

        // Timer
        this.timer();

        // // Obsticle
        this.placeObsticle();

        // // enviroment
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
                people = this.peoples.create(this.game.config.width + distance, this.game.config.height - 180, 'people1')
                    .setOrigin(0, 1).setScale(0.9);
                break;
            case 2:
                people = this.peoples.create(this.game.config.width + distance, this.game.config.height - 180, 'people2')
                    .setOrigin(0, 1).setScale(0.9);
                break;
            case 3:
                people = this.peoples.create(this.game.config.width + distance, this.game.config.height - 180, 'people3')
                    .setOrigin(0, 1).setScale(0.9);
                break;
            case 4:
                people = this.peoples.create(this.game.config.width + distance, this.game.config.height - 180, 'people4')
                    .setOrigin(0, 1).setScale(0.9);
                break;
            case 5:
                people = this.peoples.create(this.game.config.width + distance, this.game.config.height - 180, 'people5')
                    .setOrigin(0, 1).setScale(0.9);
                break;
            default:
                // code block
                people = this.peoples.create(this.game.config.width + distance, this.game.config.height - 180, 'people1')
                    .setOrigin(0, 1).setScale(0.9);

        }
    }

    // --------------- placeObsticle -----------------
    placeObsticle() {
        const obsticleNum = Math.floor(Math.random() * 7) + 1;
        const distance = Phaser.Math.Between(200, 400);
        let obsticle;
        if (obsticleNum > 0 && obsticleNum <= 3) {
            obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - 80, 'object1')
                .setOrigin(0, 1).setScale(0.8);
        } else if (obsticleNum > 3 && obsticleNum <= 6) {
            obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - 80, 'object2')
                .setOrigin(0, 1).setScale(0.8);
        } else {
            obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - 80, 'object3')
                .setOrigin(0, 1).setScale(0.8);
        }
        obsticle.setImmovable();
    }



    // --------------- highpay Items -----------------
    highItemsPay() {
        let highItemsGroup;
        const distance = Phaser.Math.Between(650, 750);
        highItemsGroup = this.highItems.create(this.game.config.width + distance, this.game.config.height / 2 - 195, `highItem`).setOrigin(0, 0).setScale(1);
    }



    // --------------- midpay Items -----------------
    midItemsPay() {
        let midItemsGroup;
        const distance = Phaser.Math.Between(350, 450);
        midItemsGroup = this.midItems.create(this.game.config.width + distance, this.game.config.height / 2 - 260, `midItem`).setOrigin(0, 0).setScale(1);
    }



    // --------------- lowpay Items -----------------
    lowItemsPay() {
        let lowGroupItem1, lowGroupItem2, lowGroupItem3;
        lowGroupItem1 = this.lowItems.create(this.game.config.width + 160, this.game.config.height / 5 * 4, `lowItem1`).setOrigin(0, 0).setScale(0.55);
        lowGroupItem2 = this.lowItems.create(this.game.config.width + 70, this.game.config.height / 5 * 4, `lowItem2`).setOrigin(0, 0).setScale(0.55);
        lowGroupItem3 = this.lowItems.create(this.game.config.width + 230, this.game.config.height / 5 * 4, `lowItem3`).setOrigin(0, 0).setScale(0.55);
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
        this.scoreText.setText(score);
    }

    collectMidItems(player, midItems) {
        midItems.disableBody(true, true);
        score += 30;
        scoreLimit += 30;
        this.scoreText.setText(score);
    }

    collectHighItems(player, highItems) {
        highItems.disableBody(true, true);
        score += 50;
        scoreLimit += 50;
        this.scoreText.setText(score);
    }

    hurtPlayer(player, obsticles) {
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
            this.player.anims.play('player-hurt', true);
            obsticles.destroy();
        } else {
            this.player.anims.play('player-hurt', true);
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
            this.gameSpeed += 0.7;
            this.maxVelocity -= 10;
            this.gravity += 100;
            scoreLimit = 0;
        }



        if (this.respawnTime >= 1200) {
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
                this.player.body.velocity.y = -this.maxVelocity;
                this.player.anims.play('player-jump');
            }
        }

    }


    // ---------- anims -----------
    animation() {
        this.anims.create({
            key: "player-run",
            frames: this.anims.generateFrameNames('bobby', {
                prefix: 'bobby-run_',
                suffix: '.png',
                start: 1,
                end: 4
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "player-jump",
            frames: [{
                key: 'bobby',
                frame: 'bobby-jump_2.png'
            }],
            frameRate: 10
        });

        this.anims.create({
            key: "player-hurt",
            frames: [{
                key: 'bobby',
                frame: 'bobby-dead.png'
            }],
            frameRate: 10
        });

    }


    // -------- Timer handle -------------
    timer() {
        this.timeLimit = 90;
        this.timeBg = this.add.image(this.game.config.width - 110, 35, 'clock-bg').setOrigin(0.5, 0.5).setScale(0.45);
        this.timeText = this.add.text(this.game.config.width - 105, 23, '90', {
            fontSize: '30px',
            fill: '#000'
        });
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

        this.endText = this.tweens.add({
            targets: this.gameOverText,
            x: 600,
            ease: 'Power2',
            duration: 1000,
        });


        this.time.addEvent({
            delay: 1500,
            loop: false,
            callback: () => {
                this.scene.start('gameOver', {
                    score: score,
                    highScore: highScore,
                    time: this.timeLimit
                });
            }
        });
    }
}