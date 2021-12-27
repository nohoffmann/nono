import { Injectable } from '@angular/core';
import { defaultPreferences } from 'src/app/sites/settings/settings.component';
import { Preferences } from 'src/app/types/Preferences';
import { DbService } from '../db/db.service';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  /**
   * the user's preferences
   */
  private prefernces: Preferences = defaultPreferences;

  constructor(private dbService: DbService) {
    this.dbService.getPreferences().then(preferences => this.prefernces = preferences);
  }

  /**
   * play a sound file from the assets folder
   *
   * @param sound
   */
  public playSound(sound: Sound) {
    const audio = new Audio();
    audio.src = `assets/${sound}.mp3`;
    audio.volume = 0.5 * (this.prefernces.volume / 100);
    audio.load();
    audio.play();
  }
};

/**
 * every available sound
 */
export enum Sound {
  HIT = 'hit',
  MISS = 'miss',
  LINE_CLEAR = 'line_clear',
  MENU_CLICK = 'menu_click',
  GRID_SOLVED = 'grid_solved',
  GAME_OVER = 'game_over',
};
