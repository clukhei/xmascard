import { GameObjects, Scene } from 'phaser'
import { GameService } from '../game.service'
import { SCENE_CARD, IMG_BACKGROUND, IMG_DONKEY, IMG_BABY, IMG_SHEPHERDS, IMG_MARY, IMG_GABRIEL, IMG_GABRIEL_BW, IMG_JOSEPH, IMG_WISEMEN, IMG_MERRYXMAS, IMG_BONFIRE, ANIMS_BONFIRE, AUDIO_AWAY_IN_MANGER } from './constants'
import { ScreenMapper } from './scene-mapper'
import { Globals } from './constants'

export class CardScene extends Scene {
    private gabrielBW: GameObjects.Image
    private gameSvc: GameService
    constructor() {
        super(SCENE_CARD)
        this.gameSvc = Globals.injector.get(GameService)
        console.log(this.gameSvc.message)
    }
    //every scene will have preload, create and update ()


    //load resources
    preload() {
        //load background 
        this.load.image(IMG_BACKGROUND, 'assets/nativity/background.png')
        this.load.image(IMG_DONKEY, 'assets/donkey.png')
        this.load.image(IMG_BABY, 'assets/baby_jesus.png')
        this.load.image(IMG_SHEPHERDS, 'assets/shepherds.png')
        this.load.image(IMG_MARY, 'assets/mary.png')
        this.load.image(IMG_GABRIEL, 'assets/angel_gabriel.png')
        this.load.image(IMG_GABRIEL_BW, 'assets/angel_gabriel_bw.png')
        this.load.image(IMG_JOSEPH, 'assets/joseph.png')
        this.load.image(IMG_WISEMEN, 'assets/three_wise_men.png')
        this.load.image(IMG_MERRYXMAS, 'assets/merry_christmas.png')
        this.load.spritesheet(IMG_BONFIRE, 'assets/bonfire.png', {
            frameWidth: 230, frameHeight: 312
        })
        this.load.audio(AUDIO_AWAY_IN_MANGER, [
            'assets/audio/away_in_a_manger.mp3',
            'assets/audio/away_in_a_manger.ogg'
        ])
    }
    //create game objects
    create() {
        const mapper = new ScreenMapper({
            scene: this,
            columns: 11, rows: 11
        })

        mapper.placeImageAt(5, 5, IMG_BACKGROUND, { scaleX: 1.2, scaleY: 1.2 })
        mapper.placeImageAt(3,6, IMG_SHEPHERDS, {scaleX: 0.6, scaleY: 0.6})

        mapper.placeImageAt(4.8,4.8,IMG_GABRIEL, {scaleX: 0.6, scaleY: 0.6})
        mapper.placeImageAt(5.7, 5.9, IMG_JOSEPH, {scaleX: 0.6, scaleY: 0.6})
        mapper.placeImageAt(7, 6, IMG_WISEMEN, {scaleX: 0.6, scaleY: 0.6})
        mapper.placeImageAt(4.2,6.5, IMG_MARY, {scaleX: 0.4, scaleY: 0.4} )
        mapper.placeImageAt(3.5,7, IMG_DONKEY, {scaleX: 0.3, scaleY:0.3})
        mapper.placeImageAt(5,7, IMG_BABY, {scaleX: 0.25, scaleY: 0.25})
        mapper.placeImageAt(8,2.5, IMG_MERRYXMAS, {scaleX: 0.5, scaleY: 0.5})
        mapper.placeTextAt(3, 9, this.gameSvc.message)

        this.anims.create({
            key: ANIMS_BONFIRE,
            frames: this.anims.generateFrameNumbers(IMG_BONFIRE, { start: 0 }),
            frameRate: 8,
            repeat: -1 //-1 means once you end start again
        })



        mapper.drawGrids()
        this.gabrielBW = mapper.placeImageAt(4.8, 4.8, IMG_GABRIEL_BW, { scaleX: 0.6, scaleY: 0.6 })
        this.gabrielBW.setInteractive()
        this.gabrielBW.on('pointerover', () => {
            this.add.tween({
                targets: this.gabrielBW,
                duration: 500,
                //attributes
                alpha: 0,
                rotation: Phaser.Math.DegToRad(0)
            })
            // this.gabrielBW.alpha = 0
        })
        this.gabrielBW.on('pointerout', () => {
            this.gabrielBW.alpha = 1
            this.add.tween({
                targets: this.gabrielBW,
                duration: 500,
                //attributes
                alpha: 1,
                rotation: Phaser.Math.DegToRad(20)
            })
        })

        let sprite = mapper.placeSpriteAt(5, 5, IMG_BONFIRE, { scaleToWidth: .15 })

        sprite.play(ANIMS_BONFIRE)

        const music = this.sound.add(AUDIO_AWAY_IN_MANGER, {
            volume: .1, loop: true
        })
        music.play()
    }
    //game load
    update() {

    }
}