import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StartGameComponent } from 'src/app/components/start-game/start-game.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(private modalController: ModalController) { }

  /**
   * presents modal with game settings
   */
  public async startGame(): Promise<void> {
    const modal = await this.modalController.create({
      component: StartGameComponent,
      backdropDismiss: true,
      cssClass: 'nono-modal'
    });
    await modal.present();
  }
}
