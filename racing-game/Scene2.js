var rndCarTime = 1;
var rndStarTime = 1;
var xVelocity = 70;
var yVelocity = 30;
var angleVar = 0;
var maxVel = 300;
var drag = 1000;
var interval = [0.5, 1, 2];
var respawnTime = 0;
var score = 0
var highScore = 0;

class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2' })
    }
    preload() {
        this.load.image('grass', 'assets/map/grass.png');
        this.load.image('road', 'assets/map/road.png');
        this.load.image('cars', 'assets/objects/cars.png');
        this.load.image('stars', 'assets/objects/star.png');
        this.load.image('rocks', 'assets/objects/rock.png');
        this.load.spritesheet('player', 'assets/objects/player.png', { frameWidth: 71, frameHeight: 131 });
    }
    create() {
        this.scrollSpeed = 0;
        this.carSpeed = 175;
        this.isDead = false;

        // add keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // background
        this.grass1 = this.add.tileSprite(0, 0, 128, 896, 'grass');
        this.grass1.setOrigin(0, 0);
        this.grass2 = this.add.tileSprite(this.game.config.width - 128, 0, 128, 896, 'grass');
        this.grass2.setOrigin(0, 0);
        this.road = this.add.tileSprite(128, 0, 512, 896, 'road');
        this.road.setOrigin(0, 0);

        // player
        this.player = this.physics.add.sprite(384, 900, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.body.maxVelocity.set(maxVel);
        this.player.body.drag.set(drag);

        // generateCar
        this.cars = this.physics.add.group();
        this.carTimer = this.time.addEvent({ delay: 1000 * rndCarTime, callback: this.generateCars, callbackScope: this, loop: true }, this);

        // generateStar
        this.stars = this.physics.add.group();
        this.starTimer = this.time.addEvent({ delay: 1500 * rndStarTime, callback: this.generateStars, callbackScope: this, loop: true }, this);

        // generateRock
        this.rocks = this.physics.add.group();
        this.rockTimer = this.time.addEvent({ delay: 3000, callback: this.generateRocks, callbackScope: this, loop: true }, this);

        // score
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        // gameOverScreen
        // this.gameOverScreen = this.add.container(0, 0);
        // this.gameOverScreen.setAlpha(0);
        // this.gameOverBg = this.add.image(0, 0, 'map');
        // this.gameOverScreen.add(this.gameOverBg);

        this.initCollider();
    }

    initCollider() {
        this.physics.add.collider(this.player, this.cars, this.gameOver, null, this);
        this.physics.add.collider(this.player, this.rocks, this.gameOver, null, this);
        this.physics.add.collider(this.stars, this.cars);
        this.physics.add.overlap(this.stars, this.cars, function (star, car) {
            star.disableBody(true, true);
        }, null, this);

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    }

    update(time, delta) {
        if (this.isDead) {
            this.tileSpeed = 0;
            this.carSpeed = 0;
            this.scrollSpeed = 0;

        } else {
            this.tileSpeed = 6 + this.scrollSpeed;
            this.carSpeed += this.scrollSpeed / 50;
            this.scrollSpeed += 0.005;
        }

        this.player.angle = angleVar;

        // Background movement
        this.grass1.tilePositionY += -this.tileSpeed;
        this.grass2.tilePositionY += -this.tileSpeed;
        this.road.tilePositionY += -this.tileSpeed;

        // Speed object overtime
        this.cars.setVelocityY(yVelocity * this.tileSpeed);
        this.stars.setVelocityY(yVelocity * this.tileSpeed);
        this.rocks.setVelocityY(yVelocity * this.tileSpeed);

        // handleinput
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= xVelocity;
            angleVar = -15;
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += xVelocity;
            angleVar = 15;
        } else {
            angleVar = 0;
        }
    }

    generateCars() {
        let randomCar;
        var carPos = Math.floor(Math.random() * 4);
        randomCar = this.cars.create(163 + (128 * carPos), -131, `cars`).setOrigin(0, 0);
        // randomCar.setImmovable();
        rndCarTime = Phaser.Math.RND.pick(interval);

    }

    generateStars() {
        var starTime = [0.75, 1.5, 2.5];
        let randomStar;
        var starPos = Math.floor(Math.random() * 4);
        randomStar = this.stars.create(170 + (128 * starPos), -131, `stars`).setOrigin(0, 0);
        rndStarTime = Phaser.Math.RND.pick(starTime);
        // randomStar.setImmovable();
    }

    generateRocks() {
        var rockPos = [64, 704];
        let randomRock;
        randomRock = this.rocks.create(Phaser.Math.RND.pick(rockPos), -300, `rocks`);
        // randomRock.setImmovable();
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        score += 10;
        this.scoreText.setText('score: ' + score);
    }
    gameOver() {
        this.physics.pause();
        this.isDead = true;
        if (highScore < score) {
            highScore = score;
        }
        this.scene.start('Scene3', { score: score, highScore: highScore });
    }
}