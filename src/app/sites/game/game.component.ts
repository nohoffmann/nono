import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldComponent } from 'src/app/components/field/field.component';
import { GameSettings } from 'src/app/types/GameSettings';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  @ViewChild("field")
  public field: FieldComponent

  public gameSettings: GameSettings = {
    difficulty: 50,
    enableScore: true,
    gridSize: 10,
    errorLimit: -1
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
     console.log("routing params", params)
      this.field?.reload()
      this.gameSettings.difficulty = parseInt(params.difficulty);
      this.gameSettings.enableScore = JSON.parse(params.enableScore);
      this.gameSettings.errorLimit = parseInt(params.errorLimit);
      this.gameSettings.gridSize = parseInt(params.gridSize);
      
    });

    
  }

}
