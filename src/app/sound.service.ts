import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }

  /**
   * play a sound file from the assets folder
   * @param sound 
   */
  public playSound(sound: Sound) {
    const audio = new Audio()
    audio.src = `assets/${sound}.mp3`;
    audio.volume = 0.5;
    audio.load();
    audio.play();
  }
  
}

export enum Sound {
  HIT = 'hit',
  MISS = 'miss',
  LINE_CLEAR = 'line_clear',
  MENU_CLICK = 'menu_click',
  GRID_SOLVED = 'grid_solved',
  GAME_OVER = 'game_over',
}