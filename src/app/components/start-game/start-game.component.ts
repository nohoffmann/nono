import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from 'src/app/services/db/db.service';
import { defaultPreferences } from 'src/app/sites/settings/settings.component';
import { GameSettings } from 'src/app/types/GameSettings';
import { Preferences } from 'src/app/types/Preferences';
import { generateGridSizeOptions } from 'src/app/utils/GenerateGridSizeOptions';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent {
  /**
   * settings for the game to be started
   */
  public settings: GameSettings = defaultPreferences.defaultGameSettings;

  /**
   * the user's preferences
   */
  public preferences: Preferences = defaultPreferences;

  constructor(private modalController: ModalController, private dbService: DbService) {
    this.init();
  }

  /**
   * fetches user's preferences from IDB
   */
  public async init(): Promise<void> {
    try {
      this.preferences = await this.dbService.getPreferences();
      this.settings = this.preferences.defaultGameSettings;
    } catch {

    }
  }

  /**
   * close the modal
   */
  public dismissModal(): void  {
    this.modalController.dismiss();
  }

  /**
   * @returns grid size options based on user's preferences
   */
  public generateGridSizeOptions() {
    return generateGridSizeOptions(this.preferences);
  }
}
