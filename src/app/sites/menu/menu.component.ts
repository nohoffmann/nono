import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { StartGameComponent } from 'src/app/components/start-game/start-game.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  public async startGame(): Promise<void> {
    const modal = await this.modalController.create({
      component: StartGameComponent,
      backdropDismiss: true,
      cssClass: "nono-modal"
    });
    await modal.present()

  }

}
