import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuScene } from './scene/menu/menu.scene';
import { StageScene } from './scene/stage/stage.scene';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    MenuScene,
    StageScene
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
