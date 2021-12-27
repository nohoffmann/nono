import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldComponent } from 'src/app/components/field/field.component';
import { GameSettings } from 'src/app/types/GameSettings';
import { defaultPreferences } from '../settings/settings.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  /**
   * component with actual game content
   */
  @ViewChild('field')
  public field: FieldComponent;

  /**
   * settings for the game
   */
  public gameSettings: GameSettings = defaultPreferences.defaultGameSettings;

  constructor(private route: ActivatedRoute) { }

  /**
   * parses game settings from url parameters
   */
  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.field?.reload();
      this.gameSettings.difficulty = parseInt(params.difficulty, 10);
      this.gameSettings.enableScore = JSON.parse(params.enableScore);
      this.gameSettings.errorLimit = parseInt(params.errorLimit, 10);
      this.gameSettings.gridSize = parseInt(params.gridSize, 10);
    });
  }
}
