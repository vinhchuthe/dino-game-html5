var rndCarTime = 1;
var xVelocity = 70;
var yVelocity = 30;
var angleVar = 0;
var maxVel = 300;
var drag = 1000;
var respawnTime = 0;

class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play' });
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
    }

    update(time, delta) {
        if (this.isDead) {
            this.tileSpeed = 0;
            this.carSpeed = 0;
            this.scrollSpeed = 0;

        } else {
            this.tileSpeed = 3 + this.scrollSpeed;
            this.carSpeed += this.scrollSpeed / 50;
            this.scrollSpeed += 0.005;
        }

        respawnTime += delta + this.tileSpeed;
        if (respawnTime >= 2000) {
            this.generateCars();
            respawnTime = 0;
        }

        this.player.angle = angleVar;

        // Background movement
        this.grass1.tilePositionY -= this.tileSpeed;
        this.grass2.tilePositionY -= this.tileSpeed;
        this.road.tilePositionY -= this.tileSpeed;

        // Speed object overtime
        this.cars.setVelocityY(yVelocity * this.tileSpeed);

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
        randomCar.setImmovable();

        console.log('gen car');
    }
    generateStars() {
        let randomStar;
        var starPos = Math.floor(Math.random() * 4);
    }
}