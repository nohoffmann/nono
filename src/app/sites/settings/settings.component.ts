import { Component } from '@angular/core';
import { DbService } from 'src/app/services/db/db.service';
import { Preferences } from 'src/app/types/Preferences';
import { generateGridSizeOptions } from 'src/app/utils/GenerateGridSizeOptions';
import { hexToRgb } from 'src/app/utils/HexToRgb';

export const defaultPreferences = {
  defaultGameSettings: {
    difficulty : 50,
    gridSize: 10,
    errorLimit: 3,
    enableScore: true
  },
  volume: 100,
  accentColor: document.body.style.getPropertyValue('--ion-color-primary'),
  gridSettings: {
    supportLineInterval: 5,
    onlyMultiplesOfSupportLineInterval: true,
    minimum: 5,
    maximum: 15,
  }
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  /**
   * the user's preferences
   */
  public preferences: Preferences = defaultPreferences;

  constructor(private dbService: DbService) {
    this.init();
  }

  /**
   * fetches user's preferences
   */
  public async init(): Promise<void> {
    try {
      this.preferences = await this.dbService.getPreferences() || this.preferences;
    } catch(e) {
      console.debug(e);
    }
  }

  /**
   * writes changes back to IDB
   */
  public writeChangesToDatabase(): void {
    try {
      this.dbService.setPreferences(this.preferences);
    } catch(e) {
      console.debug(e);
    }
  }

  /**
   * instantly reflect changes of accent color
   */
  public onColorUpdate(): void {
    //@ts-ignore
    document.body.style.setProperty('--ion-color-primary', this.preferences.accentColor);
    document.body.style.setProperty('--ion-color-primary-rgb', hexToRgb(this.preferences.accentColor));
  }

  /**
   * @returns array with grid size options based on user's preferences
   */
  public generateGridSizeOptions() {
    return generateGridSizeOptions(this.preferences);
  }
}

