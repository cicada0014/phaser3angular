import { Injectable } from '@angular/core';



@Injectable()
export class StageScene extends Phaser.Scene {

    player: Phaser.Physics.Arcade.Sprite;
    gamePlatform: Phaser.Physics.Arcade.StaticGroup;

    bombs: Phaser.Physics.Arcade.Group

    isPlayingBGM: boolean = false

    test: string



    scoreText: Phaser.GameObjects.Text;
    score: number = 0;


    soundFX: Phaser.Sound.BaseSound;



    cursors: CursorKeys



    constructor() {
        super({
            key: 'stage'
        })
    }

    preload() {



        this.load.image('sky', 'assets/image/sky.png');
        this.load.image('ground', 'assets/image/platform.png');

        (this as any).load.spritesheet(
            'dude',
            'assets/image/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );


        //
        this.load.image('bomb', 'assets/image/bomb.png');
        //


        this.load.audio('test', 'assets/music/testbgm.mp3')

    }


    create() {

        //



        this.soundFX = this.sound.add('test', { loop: true });
        this.soundFX.play();

        this.add.image(400, 300, 'sky').setScale(10, 1.5);

        this.scoreText =
            this.add.text(100, 100, 'score: 0', { fontSize: '32px', fill: '#000' });






        // this.soundFX = this.sound.add('test', { loop: true })
        // this.soundFX.play()



        // 물리적 그룹 설정
        this.gamePlatform = this.physics.add.staticGroup();











        this.bombs = this.physics.add.group({ key: 'bomb', repeat: 11, setXY: { x: 12, y: 0, stepX: 70 } })









        this.gamePlatform.create(400, 568, 'ground').setScale(10, 1).refreshBody();

        this.gamePlatform.create(600, 300, 'ground')

        this.player = this.physics.add.sprite(100, 350, 'dude');

        //효과
        this.player.setBounce(0.3);


        this.player.setCollideWorldBounds(false);


        this.cursors = this.input.keyboard.createCursorKeys()


        // 플레이어의 애니메이션 정의



        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        // this.test.trim();
        // this.test = "123 "




        this.input.keyboard.on(
            'keydown_D',
            (e) => {
                if (this.soundFX.isPlaying) {
                }
            },
            this)
        this.input.on('pointerdown', (event) => {
            this.player.x = event.x
            this.player.y = event.y
        })




        this.physics.add.collider(this.player, this.gamePlatform, (sprite, platform) => {
            // console.log(sprite)
            // console.log(platform)
        });

        this.physics.add.collider(this.bombs, this.gamePlatform);
        // this.bombs = this.physics.add.group({ key: 'bomb', repeat: 11, setXY: { x: 12, y: 0, stepX: 70 } })





        // this.physics.add.overlap(
        //     this.player,
        //     this.bombs,
        //     (player, bomb) => {

        //     })




        this.physics.add.overlap(this.player, this.bombs, (player, bomb) => {

            (bomb as any).disableBody(true, true)
            this.cameras.main.shake(500, 0.01)
            // this.player.setTint(0xff0000);
            this.player.setVelocityX(0)
            // this.player.anims.play('turn');
            this.score += 10;

            // "포스텔러" + this.score
            // 'Score: ' + this.score;
            this.scoreText.setText(`Score: ${this.score}`);
        })
        //빛

        // this.lights.enable().setAmbientColor(0x111111);
        // this.lights.addLight(0, 0, 100, 0xffff, 100);
        // (this.lights as any).addLight(400, 300, 300).setIntensity(0.5);


        // console.log(this.input.keyboard)
        // this.input.keyboard.on('keydown_LEFT', (e) => {
        //     console.log(this.input.keyboard)
        //     this.player.setVelocityX(-160)
        // }, this)

        // this.input.keyboard.on('keydown_RIGHT', () => {
        //     this.player.setVelocityX(160)
        // }, this)
        // this.input.keyboard.on('keyup_RIGHT', () => {
        //     console.log('up')
        //     this.player.setVelocityX(0)
        // }, this)
        // this.cameras.remove(this.cameras.getCamera(''))
        // this.cameras.add(0, 0, 800, 400, true, 'main-camera')
        // console.log(this.cameras.currentCameraId)
        // console.log(this.cameras.main)
        // this.cameras.main = this.cameras.getCamera('main-camera')
        // console.log(this.cameras.main)

        // this.cameras.add(100, 100, 300, 300, false, 'test-camera')
        // this.cameras.main.startFollow(this.player)

        // this.cameras.main.setBounds(100, 100, 100, 100)

        // this.cameras.main.followOffset.x = 100
        this.cameras.main.startFollow(this.player, true, 1000, 0, 0, 65)





    }
    update() {
        // this.cameras.main.x++
        if (this.cursors.right.isDown) {
            // this.player.x = this.player.x + 5
            this.player.setVelocityX(160)
            this.player.anims.play('right', true)
        }
        else if (this.cursors.left.isDown) {
            // this.player.x = this.player.x - 5
            this.player.setVelocityX(-160)
            this.player.anims.play('left', true)
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn', true);
        }



        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }

    }
}




