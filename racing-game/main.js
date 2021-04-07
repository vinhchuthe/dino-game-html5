var config = {
    type: Phaser.AUTO,
    // pixleArt: true,
    width: 768,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100 },
            debug: true
        }
    },
    scene: [Preload, Play]
}

var game = new Phaser.Game(config);

// // Declare global variables 
// var score;
// var scoreText;
// var cursors;
// var maxVel = 300;
// var drag = 1000;
// var xVelocity = 70;
// var yVelocity = 30;
// var inGrass;
// var rndCarTime = 1;
// var rndRockTime = 1;
// var interval = [0.5, 1, 2];
// var copInterval = 5;
// var rockSprites = ['rock1', 'rock2', 'rock3'];
// var arrested;
// var highScore = 0;

// var playState = {

//     create: function () {

//         if (!metallica1.isPlaying) metallica1.play();

//         score = 0;

//         this.scrollSpeed = 0;
//         this.carSpeed = 175;
//         this.tileSpeed;
//         this.copSpeed = 30;
//         this.isDead = false;
//         this.copAlive = false;
//         this.spawnCop = true;
//         this.angleVar = 0;
//         this.firstCop = true;
//         arrested = false;

//         // Add keys
//         cursors = game.input.keyboard.createCursorKeys();

//         // Create grass 
//         grass1 = game.add.tileSprite(0, 0, 128, 896, 'grass');
//         grass2 = game.add.tileSprite(game.world.width - 128, 0, 128, 896, 'grass');

//         // Create roads
//         road = game.add.tileSprite(128, 0, 512, 896, 'road');

//         // Create player
//         player = game.add.sprite(game.world.width / 2 - 35, 750, 'playerCar');
//         player.anchor.setTo(0.5, 0.5);

//         // Player physics
//         game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
//         player.enableBody = true;
//         player.body.collideWorldBounds = true;
//         player.body.maxVelocity.set(maxVel);
//         player.body.drag.set(drag);

//         // Create group of cars
//         cars = game.add.group();
//         game.physics.arcade.enable(cars, Phaser.Physics.ARCADE);
//         cars.enableBody = true;
//         cars.setAll('anchor.x', 0.5);
//         cars.setAll('anchor.y', 0.5);
//         cars.setAll('outOfBoundsKill', true);
//         cars.setAll('checkWorldBounds', true);


//         // Create group of rocks
//         rocks = game.add.group();
//         game.physics.arcade.enable(rocks, Phaser.Physics.ARCADE);
//         rocks.enableBody = true;
//         rocks.setAll('anchor.x', 0.5);
//         rocks.setAll('anchor.y', 0.5);
//         rocks.setAll('outOfBoundsKill', true);
//         rocks.setAll('checkWorldBounds', true);

//         // Create group of cop cars
//         cops = game.add.group();
//         game.physics.arcade.enable(cops, Phaser.Physics.ARCADE);
//         cops.enableBody = true;
//         cops.setAll('anchor.x', 0.5);
//         cops.setAll('anchor.y', 0.5);
//         cops.setAll('outOfBoundsKill', true);
//         cops.setAll('checkWorldBounds', true);

//         // Timed loop that spawns cars
//         carTimer = game.time.events.loop(1000 * rndCarTime, this.generateCars, this);

//         // Timed loop that spawns rocks
//         rockTimer = game.time.events.loop(1000 * rndRockTime, this.generateRocks, this);

//         // Score text
//         scoreText = game.add.text(16, 16, 'Score: ' + score, { font: '25px Arial', fill: '#000000' });

//         // Create Audio
//         carEngine = game.add.audio('carEngine', 1, true);
//         carEngine.play();
//         explode = game.add.audio('explosion', 1, false);
//         siren = game.add.audio('siren', 0.7, true);

//         this.copTimer();

//         console.log('In play');
//     },

//     update: function () {

//         // Stop everything if player dies, else keep going
//         if (this.isDead) {
//             this.tileSpeed = 0;
//             this.carSpeed = 0;
//             this.scrollSpeed = 0;
//             this.copSpeed = 0;
//             if (this.copAlive) {
//                 this.cop.body.velocity.x = 0;
//                 this.cop.body.velocity.y = 0;
//             }
//         } else {
//             score += 1;
//             this.tileSpeed = 6 + this.scrollSpeed;
//             this.carSpeed += this.scrollSpeed / 50;
//             this.scrollSpeed += 0.005;
//         }

//         // Make cop follow player
//         if (this.copAlive && !this.isDead) {
//             this.cop.body.velocity.y = -30;
//             this.moveToPlayer(this.cop, player, this.copSpeed);
//             this.rotateCop(this.cop);
//             game.physics.arcade.overlap(player, cops, this.arrested, null, this);
//             game.physics.arcade.overlap(cops, cars, this.killCop, null, this);
//             game.physics.arcade.overlap(cops, rocks, this.killCop, null, this);
//         }

//         // Player's car rotation
//         player.angle = this.angleVar;

//         // Set speed of objects
//         cars.setAll('body.velocity.y', this.carSpeed * 2);
//         rocks.setAll('body.velocity.y', this.tileSpeed * 60);

//         // Background movement
//         grass1.tilePosition.y += this.tileSpeed;
//         grass2.tilePosition.y += this.tileSpeed;
//         road.tilePosition.y += this.tileSpeed;

//         // Update score
//         scoreText.text = 'Score: ' + score;

//         // Check if player in grass
//         if (this.checkOverlap(player, grass1) || this.checkOverlap(player, grass2)) {
//             inGrass = true;
//         } else inGrass = false;

//         // Check collisions with cars
//         game.physics.arcade.overlap(player, cars, this.gameOver, null, this);

//         // Check collisions with rocks
//         game.physics.arcade.overlap(player, rocks, this.gameOver, null, this);

//         // Input --------------------------------------------------------------------------------
//         if (cursors.left.isDown) {
//             if (inGrass) player.body.velocity.x -= xVelocity * 0.3;
//             else player.body.velocity.x -= xVelocity;
//             this.angleVar = -15;
//         } else if (cursors.right.isDown) {
//             if (inGrass) player.body.velocity.x += xVelocity * 0.3;
//             else player.body.velocity.x += xVelocity;
//             this.angleVar = 15
//         } else {
//             this.angleVar = 0;
//         }

//         if (cursors.up.isDown) {
//             if (inGrass) player.body.velocity.y -= yVelocity * 0.6;
//             else player.body.velocity.y -= yVelocity;
//         } else if (cursors.down.isDown) {
//             if (inGrass) player.body.velocity.y += yVelocity;
//             else player.body.velocity.y += yVelocity * 2;
//         }

//     },

//     // Random car generator
//     // Creates random cars at random positions on the road and changes the timer interval.
//     generateCars: function () {
//         var numCar = game.rnd.integerInRange(1, 8);
//         var carPos = game.rnd.integerInRange(0, 3);
//         rndCarTime = Phaser.ArrayUtils.getRandomItem(interval);
//         randomCar = cars.create(163 + (128 * carPos), -131, 'cars');
//         randomCar.frame = numCar;
//         carTimer.delay = 1000 * rndCarTime;
//     },

//     // Random rock generator
//     // Creates random rocks at the sides of the road.
//     generateRocks: function () {
//         var rockPos = [20, 660];
//         rock = rocks.create(Phaser.ArrayUtils.getRandomItem(rockPos), -100, Phaser.ArrayUtils.getRandomItem(rockSprites));
//         rndRockTime = game.rnd.integerInRange(1, 3);
//         rockTimer.delay = 1000 * rndRockTime;
//     },

//     copTimer: function () {
//         copTimer = game.time.events.add(1000 * copInterval, this.generateCops, this);
//     },

//     // Cop car generator
//     generateCops: function () {
//         if (!this.isDead && !this.copAlive) {
//             this.copAlive = true;
//             this.cop = cops.create(player.x, game.world.height, 'copCar');
//             this.cop.anchor.setTo(0.5);
//             this.copAlive = true;
//             siren.play();
//         }
//     },

//     // Check if two sprites are overlapping
//     checkOverlap: function (spriteA, spriteB) {
//         var boundsA = spriteA.getBounds();
//         var boundsB = spriteB.getBounds();

//         return Phaser.Rectangle.intersects(boundsA, boundsB);
//     },

//     // Kill cop function with explosion 
//     killCop: function () {
//         this.explosion = game.add.sprite(this.cop.body.x, this.cop.body.y, 'explosion');
//         this.explosion.anchor.setTo(0.5, 0.5);
//         game.physics.arcade.enable(this.explosion);
//         this.explosion.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, false);
//         this.explosion.animations.play('explode', 8, false, true);
//         this.explosion.body.velocity.y = this.tileSpeed * 60;
//         this.cop.kill();
//         this.copAlive = false;
//         score += 1000;
//         siren.stop();
//         explode.play();
//         this.copTimer();
//     },

//     arrested: function () {
//         arrested = true;
//         carEngine.stop();
//         metallica1.stop();
//         this.isDead = true;
//         if (highScore < score) {
//             highScore = score;
//         }
//         game.state.start('lose');
//     },

//     moveToPlayer: function (cop, player, speed) {
//         if (cop.x < player.x - 30) cop.body.velocity.x += 6;

//         else if (cop.x > player.x + 30) cop.body.velocity.x -= 6;

//         else if (cop.x > player.x - 30 && cop.x < player.x + 30)
//             if (cop.body.velocity.x != 0) cop.body.velocity.x -= cop.body.velocity.x / 6;
//     },

//     rotateCop: function (cop) {
//         if (cop.body.velocity.x < -20) {
//             cop.angle = -15;
//         } else if (cop.body.velocity.x > 20) {
//             cop.angle = 15;
//         } else cop.angle = 0;
//     },

//     // Kill player function that takes player to gameOver screen
//     gameOver: function () {
//         this.explosion = game.add.sprite(player.body.x, player.body.y, 'explosion');
//         this.explosion.anchor.setTo(0.5, 0.5);
//         this.explosion.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, false);
//         this.explosion.animations.play('explode', 8, false, true);
//         explode.play();
//         player.kill();
//         carEngine.stop();
//         siren.stop();
//         metallica1.stop();
//         this.isDead = true;
//         if (highScore < score) {
//             highScore = score;
//         }
//         game.time.events.add(Phaser.Timer.SECOND * 2, function () { game.state.start('lose') });
//     }
// };