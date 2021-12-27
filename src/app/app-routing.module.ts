import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GameComponent } from './sites/game/game.component';
import { MenuComponent } from './sites/menu/menu.component';
import { SettingsComponent } from './sites/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component: MenuComponent,
    data: {
      title: "Nonogram"
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      title: "Settings"
    }
  },
  {
    path: 'game',
    component: GameComponent,
    data: {
      title: "Nonogram"
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes/* , { preloadingStrategy: PreloadAllModules  } */)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
