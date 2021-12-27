import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameSettings } from 'src/app/types/GameSettings';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent {
  constructor(private modalController: ModalController) {

  }

  public settings: GameSettings = {
    difficulty : 50,
    gridSize: 10,
    errorLimit: 3,
    enableScore: true
  }

  public onDifficultyChange(event): void {
    this.settings.difficulty = event.target.value
  }

  public onGridSizeChange(event): void {
    this.settings.gridSize = event.target.value
  }

  public onErrorLimitChange(event): void {
    this.settings.errorLimit = event.target.value
  }

  public onEnableScoreChange(event): void {
    this.settings.enableScore = event.target.checked;
  }

  public dismissModal(): void  {
    this.modalController.dismiss()
  }
}
