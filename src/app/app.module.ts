import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FieldCellComponent } from './components/field-cell/field-cell.component';
import { FieldComponent } from './components/field/field.component';
import { HintsComponent } from './components/hints/hints.component';
import { SettingsComponent } from './sites/settings/settings.component';
import { GameComponent } from './sites/game/game.component';
import { FormsModule } from '@angular/forms';
import { LivesComponent } from './components/lives/lives.component';
import { MenuComponent } from './sites/menu/menu.component';
import { StartGameComponent } from './components/start-game/start-game.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldCellComponent,
    FieldComponent,
    HintsComponent,
    SettingsComponent,
    GameComponent,
    LivesComponent,
    MenuComponent,
    StartGameComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({animated: false}), 
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
