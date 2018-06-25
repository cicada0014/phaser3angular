import { Component } from '@angular/core';
import { MenuScene } from './scene/menu/menu.scene';
import * as Phaser from 'phaser';
import { StageScene } from './scene/stage/stage.scene';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  gameConfig




  phaserGame: Phaser.Game

  constructor(
    private menuScene: MenuScene,
    private stageScene: StageScene,
  ) {




    this.gameConfig = {
      type: Phaser.CANVAS,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {
            y: 200
          }
        }

      },

      parent: 'app-root',
      scene: [
        menuScene,
        stageScene
      ]
    }


    this.phaserGame = new Phaser.Game(this.gameConfig)


  }



}


