const row1 = [1, 0, 3];
const row2 = [2, 4, 1];
const row3 = [3, 4, 2];
const level = [
    row1,
    row2,
    row3
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
    matchesCount = 0;
    selectedCard = [];

    create() {
        const {
            width,
            height
        } = this.game.config;

        this.boxGroup = this.physics.add.staticGroup();

        // Random matrix
        this.randomMatrix();

        console.log(this.random);

        this.createBoxes();
        this.itemGroup = this.add.group();

        this.handleInput();
    }

    randomMatrix() {
        this.ranRow1 = Phaser.Utils.Array.Shuffle(row1);
        this.ranRow2 = Phaser.Utils.Array.Shuffle(row2);
        this.ranRow3 = Phaser.Utils.Array.Shuffle(row3);
        this.random = Phaser.Utils.Array.Shuffle(level);
    }

    createBoxes() {
        const width = this.game.config.width;
        let xPer = 0.25;
        let y = 200;
        for (let row = 0; row < this.random.length; ++row) {
            for (let col = 0; col < this.random[row].length; ++col) {
                const card = this.boxGroup.get(width * xPer, y, 'backCard');
                card.setSize(106, 150).setScale(0.85).setData('itemType', this.random[row][col]);
                xPer += 0.25;
            }
            xPer = 0.25;
            y += 170;
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
            case 0:
                item = this.itemGroup.get(box.x, box.y)
                item.setTexture('frontCard')
                break

            case 1:
                item = this.itemGroup.get(box.x, box.y)
                item.setTexture('card1')
                break

            case 2:
                item = this.itemGroup.get(box.x, box.y)
                item.setTexture('card2')
                break

            case 3:
                item = this.itemGroup.get(box.x, box.y)
                item.setTexture('card3')
                break

            case 4:
                item = this.itemGroup.get(box.x, box.y)
                item.setTexture('card4')
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

        this.time.delayedCall(500, () => {
            if (itemType === 0) {
                this.handleTrapSelected();
                return;
            }

            if (this.selectedCard.length < 2) {
                return
            }
            this.checkForMatch();
        })
    }

    handleTrapSelected() {
        const {
            box,
            item
        } = this.selectedCard.pop();

        item.setTint(0xff0000);

        this.time.delayedCall(500, () => {
            item.setTint(0xffffff);
            box.setData('opened', false);
        })
    }

    checkForMatch() {
        const second = this.selectedCard.pop();
        const first = this.selectedCard.pop();

        if (first.item.texture !== second.item.texture) {
            this.time.delayedCall(500, () => {
                this.itemGroup.killAndHide(first.item);
                this.itemGroup.killAndHide(second.item);

                first.box.setData('opened', false);
                second.box.setData('opened', false);
            })
            return
        }

        ++this.matchesCount

        this.time.delayedCall(1000, () => {
            if (this.matchesCount >= 4) {
                // this.countdown.stop();
                // this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.5, 'You Win!', {
                //     fonstSize: 48
                // }).setOrigin(0.5).setDepth(3000)
                console.log('You Win!');
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
};