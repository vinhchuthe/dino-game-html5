class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play' });
    }
    create() {
        this.xVelocity = 70;
        this.angleVar = 0;
        this.scrollSpeed = 0;
        this.carSpeed = 175;
        this.isDead = false;
        this.maxVel = 300;
        this.drag = 1000;

        // add keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // background
        this.map = this.add.tileSprite(0, 0, 768, 896, 'map');
        this.map.setOrigin(0, 0);

        // player
        this.player = this.physics.add.sprite(384, 900, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.body.maxVelocity.set(this.maxVel);
        this.player.body.drag.set(this.drag);


    }

    update() {
        if (this.isDead) {
            this.tileSpeed = 0;
            this.carSpeed = 0;
            this.scrollSpeed = 0;

        } else {
            this.tileSpeed = 3 + this.scrollSpeed;
            this.carSpeed += this.scrollSpeed / 50;
            // this.scrollSpeed += 0.005;
        }

        this.player.angle = this.angleVar;

        // Background movement
        this.map.tilePositionY -= this.tileSpeed;

        // handleinput
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= this.xVelocity;
            this.angleVar = -15;
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += this.xVelocity;
            this.angleVar = 15;
        } else {
            this.angleVar = 0;
        }
    }
}