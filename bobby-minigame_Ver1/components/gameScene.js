var interval = [100, 200, 300];
var isGameRunning = false;
var rndhighItemsTime = 1;
var rndmidItemsTime = 1;
var rndlowItemsTime = 1;
var score;
var highScore = 0;


class gameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' })
    }
    create() {
        this.scrollSpeed = 0;
        this.isHit = false;
        this.isDead = false;
        score = 0;
        this.gameSpeed = 2;
        this.respawnTime = 0;
        this.gameTime = 0;
        this.times = 0;
        this.livesCounter = 5;
        this.lives = null;


        // background
        this.bg = this.add.image(0, 0, 'title-bg').setScale(2);
        this.background = this.add.tileSprite(0, this.game.config.height * 1 / 5, this.game.config.width, this.game.config.height, 'game-bg').setOrigin(0, 0);

        // physics platform
        this.platform = this.physics.add.sprite(0, this.game.config.height, 'platform');
        this.platform.setSize(this.game.config.width * 2, 15);
        this.platform.setImmovable();
        this.platform.setAlpha(0);


        // player
        this.player = this.physics.add.sprite(50, this.game.config.height - 60, 'robo');
        this.player.body.setSize(this.player.width * 0.7, this.player.height * 0.8);
        this.player.body.offset.y = 54;
        this.player.setScale(0.4);
        this.player.setBounce(0);
        this.player.body.gravity.y = 750;
        this.player.setCollideWorldBounds(true);

        // input
        this.cursors = this.input.keyboard.createCursorKeys();

        // collider
        this.physics.add.collider(this.player, this.platform);

        // obsticles
        this.obsticles = this.physics.add.group();

        // // highpay Items
        this.highItems = this.physics.add.group();
        rndhighItemsTime = Phaser.Math.Between(5, 10);
        this.highItemsTimer = this.time.addEvent({ delay: 27000, callback: this.highItemsPay, callbackScope: this, loop: false, repeat: 1 }, this);

        // // midpay Items
        this.midItems = this.physics.add.group();
        this.midItemsTimer = this.time.addEvent({ delay: 17000, callback: this.midItemsPay, callbackScope: this, loop: false, repeat: 3 }, this);

        // lowpay Items
        this.lowItems = this.physics.add.group();
        // this.lowItemsTimer = this.time.addEvent({ delay: 1500 * rndlowItemsTime, callback: this.lowItemsPay, callbackScope: this, loop: true }, this);
        this.lowItemsTimer = this.time.addEvent({ delay: 5000, callback: this.lowItemsPay, callbackScope: this, loop: true }, this);

        // score
        this.scoreText = this.add.text(this.game.config.width - 110, 30, 'score: 0', { fontSize: '16px', fill: '#000' });

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

        // collider
        this.initCollider();

    }

    // --------------- placeObsticle -----------------
    placeObsticle() {
        const obsticleNum = Math.floor(Math.random() * 7) + 1;
        const distance = Phaser.Math.Between(300, 500);
        let obsticle;
        if (obsticleNum > 0 && obsticleNum <= 3) {
            obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - 10, 'cars')
                .setOrigin(0, 1);
        } else if (obsticleNum > 3 && obsticleNum <= 6) {
            obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - 10, 'people')
                .setOrigin(0, 1);
        } else {
            obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - 10, 'store')
                .setOrigin(0, 1);
        }
        obsticle.setImmovable();
    }



    // --------------- highpay Items -----------------
    highItemsPay() {
        let highItemsGroup;
        const distance = Phaser.Math.Between(300, 500);
        highItemsGroup = this.highItems.create(this.game.config.width + distance, 160, `cars`).setOrigin(0, 0);
    }



    // --------------- midpay Items -----------------
    midItemsPay() {
        let midItemsGroup;
        const distance = Phaser.Math.Between(300, 500);
        midItemsGroup = this.midItems.create(this.game.config.width + distance, 160, `items1`).setOrigin(0, 0).setScale(2);
    }



    // --------------- lowpay Items -----------------
    lowItemsPay() {
        let lowGroupItem1, lowGroupItem2, lowGroupItem3;
        const distance = Phaser.Math.Between(300, 500);
        // lowGroupItem1 = this.lowItems.create(this.game.config.width + distance, 180, `items2`).setOrigin(0, 0);
        lowGroupItem1 = this.lowItems.create(this.game.config.width + 105, 160, `items2`).setOrigin(0, 0);
        lowGroupItem2 = this.lowItems.create(this.game.config.width + 70, 190, `items2`).setOrigin(0, 0);
        lowGroupItem3 = this.lowItems.create(this.game.config.width + 140, 190, `items2`).setOrigin(0, 0);
    }



    // --------------- OverlayItems ------------------
    initCollider() {
        this.physics.add.overlap(this.lowItems, this.midItems, function (low, mid) {
            low.disableBody(true, true);
        }, null, this);
        this.physics.add.overlap(this.lowItems, this.highItems, function (low, mid) {
            low.disableBody(true, true);
        }, null, this);
        this.physics.add.overlap(this.player, this.lowItems, this.collectLowItems, null, this);
        this.physics.add.overlap(this.player, this.midItems, this.collectMidItems, null, this);
        this.physics.add.overlap(this.player, this.highItems, this.collectHighItems, null, this);
        this.physics.add.overlap(this.player, this.obsticles, this.hurtPlayer, null, this)
    }

    collectLowItems(player, lowItems) {
        lowItems.disableBody(true, true);
        score += 10;
        this.scoreText.setText('score: ' + score);
    }
    collectMidItems(player, midItems) {
        midItems.disableBody(true, true);
        score += 30;
        this.scoreText.setText('score: ' + score);
    }
    collectHighItems(player, highItems) {
        highItems.disableBody(true, true);
        score += 50;
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
            alert('gameover');
        }
        obsticles.destroy();
    }


    update(time, delta) {

        // if (!isGameRunning) { return; }
        this.background.tilePositionX += this.gameSpeed;
        Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed);
        Phaser.Actions.IncX(this.highItems.getChildren(), -this.gameSpeed);
        Phaser.Actions.IncX(this.midItems.getChildren(), -this.gameSpeed);
        Phaser.Actions.IncX(this.lowItems.getChildren(), -this.gameSpeed);

        this.respawnTime += delta * this.gameSpeed * 0.08;
        if (this.respawnTime >= 2000) {
            this.placeObsticle();
            this.respawnTime = 0;
        }

        this.times += delta;
        if (this.times > 1000) {
            this.gameTime += 1;
            this.times = 0;
        }


        this.obsticles.getChildren().forEach(obsticle => {
            if (obsticle.getBounds().right < 0) {
                this.obsticles.killAndHide(obsticle);
            }
        });


        isGameRunning = true;

        if (isGameRunning) {
            if (this.player.body.onFloor()) {
                this.player.anims.play('player-run', true);
            }
        }


        if (this.cursors.space.isDown) {
            if (this.player.body.onFloor()) {
                this.player.body.velocity.y = -550;
                this.player.anims.play('player-jump');
            }
        }
    }






    // ------------ lives counter ---------------
    // livesCounter() {
    //     this.lives = 3;
    //     this.maxLives = 5;
    //     this.livesCount;
    //     this.livesIcon;
    //     this.livesCrop;

    //     // change position if necessary
    //     this.livesCount = this.add.image(20, 20, 'carrot');
    //     this.livesCount.fixedToCamera = true;

    //     // add text label to left of bar
    //     this.livesLabel = this.add.text(50, 20, 'Lives', { fontSize: '20px', fill: '#ffffff' });
    //     this.livesLabel.fixedToCamera = true;

    //     this.livesIcon = this.livesCount.width / this.maxLives;
    //     this.livesCrop = new Phaser.Rectangle(0, 0, this.lives * this.livesIcon, this.livesCount.height);
    //     this.livesCount.crop(this.livesCrop);
    // }
    // ------------ lives counter ---------------


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
    // ---------- anims -----------


    // -------- Timer handle -------------
    timer() {
        this.timeLimit = 90;
        this.timeText = this.add.text(this.game.config.width - 110, 10, '90');
        this.timeText.fill = '#000000';
        this.timer = this.time.addEvent({
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

    addZeros(num) {
        if (num < 10) {
            num = "0" + num;
        }
        return num;
    }

    outofTime() {
        this.scene.restart('gameScene');
    }
    // -------- Timer handle -------------
}