const row1 = [1, 2, 3];
const row2 = [2, 3, 4];
const row3 = [4, 5, 6];
const row4 = [6, 5, 1];
const level = [
    row1,
    row2,
    row3,
    row4
];


class gameScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameScene'
        })
    }

    boxGroup;
    random = [];
    itemGroup;
    activeCard;
    waitForNewRound = false;
    matchesCount = 0;
    selectedCard = [];

    create() {
        const {
            width,
            height
        } = this.game.config;

        this.matchesCount = 0;

        this.boxGroup = this.physics.add.staticGroup();

        // Random matrix
        this.randomMatrix();

        this.createBoxes();
        this.itemGroup = this.add.group();

        // Time
        this.timer();

        this.handleInput();
    }

    randomMatrix() {
        this.ranRow1 = Phaser.Utils.Array.Shuffle(row1);
        this.ranRow2 = Phaser.Utils.Array.Shuffle(row2);
        this.ranRow3 = Phaser.Utils.Array.Shuffle(row3);
        this.ranRow4 = Phaser.Utils.Array.Shuffle(row4);
        this.random = Phaser.Utils.Array.Shuffle(level);
    }

    createBoxes() {
        const width = this.game.config.width;
        let xPer = 0.24;
        let y = 220;
        for (let row = 0; row < this.random.length; ++row) {
            for (let col = 0; col < this.random[row].length; ++col) {
                const card = this.boxGroup.get(width * xPer, y, 'backCard');
                card.setSize(105, 105).setScale(0.405).setData('itemType', this.random[row][col]);
                xPer += 0.25;
            }
            xPer = 0.24;
            y += 130;
        }
    }

    handleInput() {
        const boxGroup = this.boxGroup;
        const $ = this;

        $.input.setHitArea(boxGroup.getChildren()).on('gameobjectdown', function (pointer, box) {
            $.handleOpen(box);
        }, undefined, $);
    }

    handleOpen(box) {
        const opened = box.getData('opened');

        if (opened) {
            return
        }
        if (this.activeCard) {
            return
        }
        this.activeCard = box;
    }

    openBox(box) {
        if (!box) {
            return
        }
        const itemType = box.getData('itemType');
        let item;

        switch (itemType) {
            case 1:
                item = this.itemGroup.get(box.x, box.y)
                item.setTexture('card1').setScale(0.8);
                break

            case 2:
                item = this.itemGroup.get(box.x, box.y)
                item.setTexture('card2').setScale(0.8);
                break

            case 3:
                item = this.itemGroup.get(box.x, box.y)
                item.setTexture('card3').setScale(0.8);
                break

            case 4:
                item = this.itemGroup.get(box.x, box.y)
                item.setTexture('card4').setScale(0.8);
                break

            case 5:
                item = this.itemGroup.get(box.x, box.y)
                item.setTexture('card5').setScale(0.8);
                break
            case 6:
                item = this.itemGroup.get(box.x, box.y)
                item.setTexture('card6').setScale(0.8);
                break
        }

        if (!item) {
            return
        }

        box.setData('opened', true);
        item.setData('sorted', true);
        item.setDepth(2000);

        item.setActive(true);
        item.setVisible(true);

        this.selectedCard.push({
            box,
            item
        })

        this.time.delayedCall(300, () => {

            if (this.selectedCard.length < 2) {
                return
            }

            this.checkForMatch();
        })
    }

    checkForMatch() {
        const second = this.selectedCard.pop();
        const first = this.selectedCard.pop();

        if (first.item.texture !== second.item.texture) {
            this.time.delayedCall(300, () => {
                this.itemGroup.killAndHide(first.item);
                this.itemGroup.killAndHide(second.item);

                first.box.setData('opened', false);
                second.box.setData('opened', false);
            })
            return

        }

        ++this.matchesCount

        this.time.delayedCall(1000, () => {
            if (this.matchesCount >= 6) {
                this.gameEnd();
            }
        })
    }

    updateClick() {
        var pointerJustClicked = this.input.activePointer;
        if (this.activeCard && pointerJustClicked.isDown) {
            this.openBox(this.activeCard);
            this.activeCard = undefined;
        }
    }

    updateActiveBox() {
        if (!this.activeCard) {
            return
        }
        this.activeCard = undefined;
    }

    update() {
        this.updateClick();
        this.updateActiveBox();
        this.children.each(c => {
            const child = c;
            if (child.getData('sorted')) {
                return
            }

            child.setDepth(child.y)
        })
    }


    // -------- Timer handle -------------
    timer() {
        this.timeLimit = 20;
        this.timeText = this.add.text(this.game.config.width - 105, 20, '20', {
            fontFamily: 'Verdana Black',
            fontSize: '30px',
            fill: '#fff'
        });
        this.timeText.fill = '#ffffff';
        this.timers = this.time.addEvent({
            delay: 1000,
            loop: true,
            callbackScope: this,
            callback: this.tick,
        }, this)
    }

    tick() {
        this.timeLimit--;
        this.timeText.text = this.timeLimit;
        if (this.timeLimit === 0) {
            this.outofTime();
        }
    }

    outofTime() {
        // this.gameEnd();
        this.timeLimit = 20;
    }


    // ------------- Game Over ----------------
    gameEnd() {
        this.timers.remove();

        this.time.addEvent({
            delay: 500,
            loop: false,
            callback: () => {
                this.scene.start('gameOver', {
                    score: this.matchesCount,
                    time: this.timeLimit
                });
            }
        });
    }
};