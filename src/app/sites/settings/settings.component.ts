import { Component, OnInit } from '@angular/core';
import { GameSettings } from 'src/app/types/GameSettings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
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
}

