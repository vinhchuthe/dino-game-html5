class gameScene extends Phaser.Scene {

    treeIndex;
    treeStatus;
    treeSize;
    tree;
    Btn1_allowClick;
    Btn2_allowClick;


    constructor() {
        super({
            key: 'gameScene'
        })
    }
    create() {
        this.treeIndex = 0;
        this.treeStatus = 0;
        this.tree = null;
        this.Btn1_allowClick = true;
        this.Btn2_allowClick = true;

        // game background
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'game-bg');

        // Pick tree
        this.pickTreeContainer = this.add.container(0, 0).setSize(this.game.config.width, this.game.config.height).setDepth(2);
        this.pickTreeBack = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'game-bg');
        this.pickTreeBg = this.add.image(this.pickTreeContainer.width / 2, this.pickTreeContainer.height / 2, 'popup-bg').setOrigin(0.5).setScale(1.5);
        this.picktreeIcon1 = this.add.image(this.pickTreeContainer.width * (1 / 3), this.pickTreeContainer.height * (1.35 / 3), 'tree1-icon').setOrigin(0.5).setScale(0.7).setInteractive();
        this.picktreeIcon2 = this.add.image(this.pickTreeContainer.width * (2 / 3), this.pickTreeContainer.height * (1.35 / 3), 'tree2-icon').setOrigin(0.5).setScale(0.7).setInteractive();
        this.picktreeIcon3 = this.add.image(this.pickTreeContainer.width * (1 / 3), this.pickTreeContainer.height * (2.1 / 3), 'tree3-icon').setOrigin(0.5).setScale(0.7).setInteractive();
        this.pickTreeTitle = this.add.text(this.pickTreeContainer.width / 2, this.pickTreeContainer.width * (1 / 3) + 90, 'Chọn Cây', {
            fontFamily: 'Verdana Black',
            fontSize: '60px',
            fill: '#000'
        }).setOrigin(0.5);

        this.pickTreeContainer.add([
            this.pickTreeBack,
            this.pickTreeBg,
            this.picktreeIcon1,
            this.picktreeIcon2,
            this.picktreeIcon3,
            this.pickTreeTitle,
        ]);


        // Game UI
        this.gameUIContainer = this.add.container(0, this.game.config.height * (2 / 3)).setSize(this.game.config.width, this.game.config.height * (1 / 3)).setDepth(1);
        this.gamebtn1 = this.add.image(this.gameUIContainer.width * (1 / 10), 0, 'button1').setOrigin(0.5).setInteractive();
        this.gamebtn2 = this.add.image(this.gameUIContainer.width * (1 / 10), 140, 'button2').setOrigin(0.5).setInteractive();

        this.gameUIContainer.add([
            this.gamebtn1,
            this.gamebtn2,
        ]);

        // HandleInput
        this.handleInput();
    }

    handleInput() {

        // Pick tree
        this.picktreeIcon1.on('pointerdown', () => {
            this.treeIndex = 1;
            this.pickTree();
        }, null, this);

        this.picktreeIcon2.on('pointerdown', () => {
            this.treeIndex = 2;
            this.pickTree();
        }, null, this);

        this.picktreeIcon3.on('pointerdown', () => {
            this.treeIndex = 3;
            this.pickTree();
        }, null, this);


        // Grow tree
        this.gamebtn1.on('pointerdown', () => {
            let fullGrow = this.treeIndex;
            if (this.Btn1_allowClick == true) {
                this.growTree(fullGrow);
            }
            this.Btn1_allowClick = false;
        }, null, this);

        this.gamebtn2.on('pointerdown', () => {
            let fullGrow = this.treeIndex;
            if (this.Btn2_allowClick == true) {
                this.growTree(fullGrow);
            }
            this.Btn2_allowClick = false;
        }, null, this);
    }

    pickTree() {
        this.treeStatus = 1;
        this.tree = this.add.image(this.game.config.width / 2, this.game.config.height * (7.5 / 9), 'tree-small').setOrigin(0.5).setScale(0.45);

        var target = this.pickTreeContainer;
        var tween = this.tweens.add({
            targets: target,
            callbackScope: tween,
            duration: 500,
            ease: 'Linear',
            alpha: 0,
            completeDelay: 0,
            onComplete: function () {
                target.destroy();
            },
            onCompleteScope: tween,
        });
    }

    growTree(index) {
        this.treeStatus += 1;
        this.tree.destroy();
        this.tree = null;
        console.log('treeIndex: ' + this.treeIndex);

        if (this.treeStatus == 2) {
            this.tree = this.add.image(this.game.config.width / 2, this.game.config.height * (6.5 / 9), 'tree-mid').setOrigin(0.5).setScale(0.45);
        } else if (this.treeStatus == 3) {
            this.tree = this.add.image(this.game.config.width / 2, this.game.config.height * (5.5 / 9), 'tree-large').setOrigin(0.5).setScale(0.45);
        }
    }
}