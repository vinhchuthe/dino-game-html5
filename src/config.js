var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 340,
    pixleArt: true,
    transparent: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);
var ground;
var dino;
var cursors;
var gameSpeed = 10;
var keySpace;
var environment;
var obsticles;
var obsticle;
var respawnTime = 0;
var scoreText;
var highScoreText;
var isGameRunning = false;
var cursors;
var gameOverScreen;
var gameOverText;
var restart;
var stars;



function preload() {
    this.load.audio('jump', 'assets/jump.m4a');
    this.load.audio('hit', 'assets/hit.m4a');
    this.load.audio('reach', 'assets/reach.m4a');

    this.load.image('ground', 'assets/ground.png');
    this.load.image('dino-idle', 'assets/dino-idle.png');
    this.load.image('dino-hurt', 'assets/dino-hurt.png');
    this.load.image('restart', 'assets/restart.png');
    this.load.image('game-over', 'assets/game-over.png');
    this.load.image('cloud', 'assets/cloud.png');

    this.load.spritesheet('star', 'assets/stars.png', { frameWidth: 20, frameHeight: 9 });
    this.load.spritesheet('moon', 'assets/moon.png', { frameWidth: 20, frameHeight: 40 });
    this.load.spritesheet('dino', 'assets/dino-run.png', { frameWidth: 88, frameHeight: 94 });
    this.load.spritesheet('dino-down', 'assets/dino-down.png', { frameWidth: 118, frameHeight: 57 });
    this.load.spritesheet('enemy-bird', 'assets/enemy-bird.png', { frameWidth: 92, frameHeight: 77 });

    this.load.image('obsticle-1', 'assets/cactuses_small_1.png');
    this.load.image('obsticle-2', 'assets/cactuses_small_2.png');
    this.load.image('obsticle-3', 'assets/cactuses_small_3.png');
    this.load.image('obsticle-4', 'assets/cactuses_big_1.png');
    this.load.image('obsticle-5', 'assets/cactuses_big_2.png');
    this.load.image('obsticle-6', 'assets/cactuses_big_3.png');
    this.load.image('star', 'assets/star.png');
}
function create() {
    const { height, width } = this.game.config;

    // background
    ground = this.add.tileSprite(0, height, width, 26, 'ground').setOrigin(0, 1); // add repeating texture

    // dino
    dino = this.physics.add.sprite(0, height, 'dino-idle');
    dino.setCollideWorldBounds(true);
    dino.setGravityY(5000);
    dino.setOrigin(0, 1);

    // star
    stars = this.physics.add.group({
        key: 'star',
        repeat: 4,
        setXY: { x: 12, y: 100, stepX: 70 }
    })
    stars.children.

    // environment
    environment = this.add.group();
    environment.addMultiple([
        this.add.image(width / 2, 170, 'cloud'),
        this.add.image(width - 80, 80, 'cloud'),
        this.add.image((width / 1.3), 100, 'cloud')
    ]);
    environment.setAlpha(1);

    // game over
    gameOverScreen = this.add.container(width / 2, height / 2 - 50).setAlpha(0);
    gameOverText = this.add.image(0, 0, 'game-over');
    restart = this.add.image(0, 80, 'restart').setInteractive();
    gameOverScreen.add([
        gameOverText,
        restart
    ])


    // score
    scoreText = this.add.text(width, 0, "00000", { fill: "#535353", font: '900 35px Courier', resolution: 5 });
    scoreText.setOrigin(1, 0);
    scoreText.setAlpha(1);

    highScoreText = this.add.text(0, 0, "00000", { fill: "#535353", font: '900 35px Courier', resolution: 5 })
    highScoreText.setOrigin(1, 0);
    highScoreText.setAlpha(1);


    initAnims();

    // input
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    cursors = this.input.keyboard.createCursorKeys();


    // placeObsticle
    obsticles = this.physics.add.group();
    placeObsticle();

    // collider
    this.physics.add.collider(dino, obsticles, collider, null, this);
    // this.physics.add.overlap(startTrigger, dino, initStartTrigger, null, this);


};

function update(time, delta) {

    // background run
    ground.tilePositionX += gameSpeed;
    Phaser.Actions.IncX(obsticles.getChildren(), -gameSpeed);
    Phaser.Actions.IncX(environment.getChildren(), - 0.5);

    respawnTime += delta * gameSpeed * 0.08;
    if (respawnTime >= 1500) {
        placeObsticle();
        respawnTime = 0;
    }

    obsticles.getChildren().forEach(obsticle => {
        if (obsticle.getBounds().right < 0) {
            obsticles.killAndHide(obsticle);
        }
    })

    environment.getChildren().forEach(env => {
        if (env.getBounds().right < 0) {
            env.x = this.game.config.width + 30;
        }
    })

    // controller
    if (cursors.space.isDown) {
        if (!dino.body.onFloor() || dino.body.velocity.x > 0) { return; }
        dino.setTexture('dino', 0);
        dino.setVelocityY(-1600);
        dino.body.height = 92;
        dino.body.offset.y = 0;
    }

    // dino jump
    if (dino.body.deltaAbsY() > 0) {
        dino.anims.stop();
        dino.setTexture('dino', 0);
    } else {
        dino.play('dino-run', true);
    }

    // restart
    restart.on('pointerdown', () => {
        dino.setVelocityY(0);
        dino.body.height = 92;
        dino.body.offset.y = 0;
        this.physics.resume();
        obsticles.clear(true, true);
        isGameRunning = true;
        gameOverScreen.setAlpha(0);
        this.anims.resumeAll();
    })
}

function placeObsticle() {
    const obsticleNum = Math.floor(Math.random() * 7) + 1;
    const distance = Phaser.Math.Between(600, 900);
    if (obsticleNum > 6) {
        const enemyHeight = [20, 50];
        obsticle = obsticles.create(this.game.config.width + distance, this.game.config.height - enemyHeight[Math.floor(Math.random() * 2)], `enemy-bird`).setOrigin(0, 1);
        obsticle.play('enemy-dino-fly', 1);
        obsticle.body.height = obsticle.body.height / 1.5;
    } else {
        obsticle = obsticles.create(this.game.config.width + distance, this.game.config.height, `obsticle-${obsticleNum}`).setOrigin(0, 1);
        obsticle.body.offset.y = +10;
    }
    obsticle.setImmovable();
}
function initAnims() {
    this.game.anims.create({
        key: 'dino-run',
        frames: this.game.anims.generateFrameNumbers('dino',
            { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    })
    this.game.anims.create({
        key: 'enemy-dino-fly',
        frames: this.game.anims.generateFrameNumbers('enemy-bird', { start: 0, end: 1 }),
        frameRate: 6,
        repeat: -1
    })
    this.game.anims.create({
        key: 'dino-down-anim',
        frames: this.game.anims.generateFrameNumbers('dino-down', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    })
}
function collider(dino, obsticles) {
    highScoreText.x = scoreText.x - scoreText.width - 20;
    const highScore = highScoreText.text.substr(highScoreText.text.length - 5);
    const newScore = Number(scoreText.text) > Number(highScore) ? scoreText.text : highScore;
    highScoreText.setText('HI' + newScore);
    highScoreText.setAlpha(1);
    this.physics.pause();
    isGameRunning = false;
    dino.setTexture('dino-hurt');
    respawnTime = 0;
    gameOverScreen.setAlpha(1);
    this.game.anims.pauseAll();
    gameSpeed = 10;
    score = 0;
}
