import { Injectable } from "@angular/core";
import { Game } from 'phaser'
import { CardScene } from "./scenes/card.scene";
@Injectable()
export class GameService{
    created=false
    game: Game
    message =''
    constructor(){}

    createGame(width = 800, height = 600){
        if (this.created) {
            return
        }

        //create the game
        this.game = new Game({
            width, height,
            type: Phaser.AUTO,  // type of canvas to use, auto allows phaser to determine the best way to draw on screen
            parent: 'card' ,// html id name <div id ="card">
            scene: [CardScene ]// start scene of the game
        })        
    }
}