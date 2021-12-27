import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Sound, SoundService } from 'src/app/sound.service';
import { CellCoordinate } from 'src/app/types/CellCoordinate';
import { CellState } from 'src/app/types/CellState';
import { GameSettings } from 'src/app/types/GameSettings';
import { Hint } from 'src/app/types/Hint';
import { Hints } from 'src/app/types/Hints';
import { InputMode } from 'src/app/types/InputMode';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() 
  public gameSettings: GameSettings = {
    difficulty: 50,
    enableScore: true,
    errorLimit: -1,
    gridSize: 10
  }

  public inputMode: InputMode = InputMode.SET

  /**
   * controlled by input toggle in the bottom
   */
  public inputModeIsSet: boolean = true;

  /**
   * solution to the puzzle
   */
  public gridSolution: Array<Array<CellState>> = [[]]

  /**
   * used for user inputs
   */
  public actualGrid: Array<Array<CellState>> = [[]]

  /**
   * values for hints next to rows and colomns
   */
  public hints: Hints = {
    rows: [],
    cols: []
  }

  /**
   * user's game score
   */
  public score: number = 0;

  /**
   * true if mouse is clicked or finger is held down
   */
  public mouseIsDown: boolean = false;

  /**
   * true if all fields that are supposed to be set are actually set or if the error limit is reached
   */
  public gameFinished: boolean = false;

  /**
   * number of time user tried to set a field incorrectly (e.g. user set it when it was supposed to be blocked and vice versa)
   */
  public errors: number = 0;

  /**
   * second to last screen coordinates touched/clicked by user. 
   * used for finding direction in which to lock.
   */
  private prevTarget?: {x: number, y: number} = undefined;

  /**
   * if set, all markCell() attempts will be forced to use this as row index
   */
  private lockRow?: number = undefined;

  /**
   * if set, all markCell() attempts will be forced to use this as col index
   */
  private lockCol?: number = undefined;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private soundService: SoundService
    ) { 
  }

  /**
   * generate a new grid based on gameSettings
   */
  public generateGrid(): void {
    //generate supposed states
    this.gridSolution = Array.from(
      { 
        length: this.gameSettings.gridSize 
      },
      () => 
        Array.from(
          { 
            length: this.gameSettings.gridSize 
          }, 
          () => Math.random() > (this.gameSettings.difficulty / 100) ? CellState.SET : CellState.BLOCKED
        )
    );

    //init actual cell values
    this.actualGrid = Array.from(
      { 
        length: this.gameSettings.gridSize 
      },
      () => 
        Array.from(
          { 
            length: this.gameSettings.gridSize 
          }, 
          () => CellState.UNSET 
        )
    );

    //generate hint numbers
    this.hints = {
      rows: Array.from({length: this.gameSettings.gridSize}, (x,i) => this.calculateHints(i, true)),
      cols: Array.from({length: this.gameSettings.gridSize}, (x,i) => this.calculateHints(i, false)),
    }

    //css 
    //@ts-ignore
    document.querySelector(":root").style.setProperty('--grid-size', this.gameSettings.gridSize)
  }

  ngOnInit(): void {
    this.generateGrid()
  }

  /**
   * toggles input mode. SET <-> BLOCK
   */
  public handleInputModeChange() {
    if(this.inputModeIsSet) {
      this.inputMode = InputMode.SET
    } else {
      this.inputMode = InputMode.BLOCK
    }
  }

  /**
   * calculate hint values based on gridSolution
   * @param index row or colomn index
   * @param row  if true, index is treated as row index, else as col index
   * @returns 
   */
  public calculateHints(index: number, row = true) {
    const line: CellState[] = row ? this.gridSolution[index] : Array.from(
      {
        length: this.gridSolution.length,
      }, 
      (x, i) => this.gridSolution[i][index]
    )

    return Array.from(
      line
        .map(state => state === CellState.SET ? 'a' : 'b')
        .join("")
        .matchAll(/(a+)/g)
    )
    .map(match => {
      return {
        length: match[0].length,
        done: false,
        start: {
          row: row ? index : match.index,
          col: row ? match.index : index 
        },
        end: {
          row: row ? index : match.index + match[0].length - 1,
          col: row ? match.index + match[0].length - 1 : index
        }
      }
    })
  }

  private alert?: HTMLIonAlertElement
  private alertActive = false

  /**
   * checks if user input was correct, adapts score acoordingly.
   * also checks if game is finished
   * @param row row index of the cell
   * @param col colomn index of the cell
   */
  public async onCellStateChange(row: number, col: number) {
    let lineWasCleared = false;
    if(this.gridSolution[row][col] == this.actualGrid[row][col]) {
      if(!this.checkGroups(row, col)) {
        this.soundService.playSound(Sound.HIT)
      } else {
        lineWasCleared = true
      }
    
      this.score += 20
    } else {
      this.soundService.playSound(Sound.MISS)
      this.score -= 50
      this.errors++
      this.actualGrid[row][col] = this.gridSolution[row][col]
    }

    if(this.gameSettings.errorLimit >= 0 && this.errors > this.gameSettings.errorLimit) {
      this.gameFinished = true;
    }

    if(this.gameFinished && !this.alertActive) {
      this.alertActive = true
      const failed = this.gameSettings.errorLimit >= 0 && this.errors > this.gameSettings.errorLimit;
      this.soundService.playSound(failed ? Sound.GAME_OVER : Sound.GRID_SOLVED );
      this.alert = await this.alertController.create({
        header: failed ? 'Game Over' : 'Grid Completed',
        message: failed ? "You've run out of lives" : "You've solved the grid!",
        buttons: [
          {
            text: "New Game",
            handler: () => this.reload()
          },
          {
            text: "Back",
            handler: () => this.router.navigate(["/"])
          }
        ],
        backdropDismiss: true
      });
      await this.alert.present()

      if(await this.alert.onDidDismiss()) {
        this.reload()
      }
    } else if(lineWasCleared) {
      this.soundService.playSound(Sound.LINE_CLEAR)
    }
  }
  
  /**
   * checks if the user finished any hints and if any lines can be auto cleared
   * @param row row index of cell 
   * @param col colomn index of cell
   * @returns true if any lines were cleared
   */
  public checkGroups(row: number, col: number): boolean {
    //rows
    for(const hint of this.hints.rows[row]){
      if(hint.start.col <= col && col <= hint.end.col) {       
        let entireGroupDone = true;
        for(let i = hint.start.col; i <= hint.end.col; i++) {
          if(this.actualGrid[row][i] != this.gridSolution[row][i]) {
            entireGroupDone = false
          }
        }
        
        hint.done = entireGroupDone
      
        if(entireGroupDone) {
          if(hint.start.col == 0  && hint.end.col !== (this.gameSettings.gridSize - 1)) {
            this.actualGrid[row][hint.end.col + 1] = CellState.BLOCKED
          }

          if(hint.end.col == (this.gameSettings.gridSize - 1) && hint.start.col !== 0) {
            this.actualGrid[row][hint.start.col - 1] = CellState.BLOCKED
          }            
        } 
      } 
    }

    let lineCleared = false;
    let allGroupsFound = this.hints.rows[row]
      .map(hint => hint.done)
      .reduce((prev, current) => prev && current)

    if(allGroupsFound) {
      lineCleared = true

      for(let i = 0; i < this.gameSettings.gridSize; i++) {
        this.actualGrid[row][i] = this.gridSolution[row][i]
      }
    }  


    //cols
    for(const hint of this.hints.cols[col]){
      if(hint.start.row <= row && row <= hint.end.row) {       
        let entireGroupDone = true;
        for(let i = hint.start.row; i <= hint.end.row; i++) {
          if(this.actualGrid[i][col] != this.gridSolution[i][col]) {
            entireGroupDone = false
          }
        }
        
        hint.done = entireGroupDone

        if(entireGroupDone) {
          if(hint.start.row == 0 && hint.end.row !== (this.gameSettings.gridSize - 1) ) {
            this.actualGrid[hint.end.row + 1][col] = CellState.BLOCKED
          }

          if(hint.end.row == (this.gameSettings.gridSize - 1) && hint.start.row !== 0) {
            this.actualGrid[hint.start.row - 1][col] = CellState.BLOCKED
          }            
        } 
      } 
    }

    allGroupsFound = this.hints.cols[col]
      .map(hint => hint.done)
      .reduce((prev, current) => prev && current)

    if(allGroupsFound) {
      lineCleared = true

      for(let i = 0; i < this.gameSettings.gridSize; i++) {
        this.actualGrid[i][col] = this.gridSolution[i][col]
      }
      
    }  

    let finished = true 
    for(let i = 0; i < this.gameSettings.gridSize; i++) {
      for(let j = 0; j < this.gameSettings.gridSize; j++) {
        if(this.gridSolution[i][j] == CellState.SET) {
          if(this.gridSolution[i][j] != this.actualGrid[i][j]) {
            finished = false
          }
        }
      }
    }

    if(finished) {
      this.gameFinished = true
    }

    return lineCleared
  }

  /**
   * sets mouseIsDown flag
   */
  public handleMouseDown(): void {
    this.mouseIsDown = true
  }

  /**
   * tries to mark cell (based on this.inputModeIsSet)
   * @param row row index of the cell
   * @param col colomn index of the cell
   */
  public markCell(row,col): void {
    if(this.lockCol !== undefined) {
      col = this.lockCol
    } 

    if(this.lockRow !== undefined){
      row = this.lockRow
    }

    if(this.actualGrid[row][col] === CellState.UNSET) {
      this.actualGrid[row][col] = this.inputModeIsSet ? CellState.SET : CellState.BLOCKED;
      this.onCellStateChange(row, col)
    }
  }

  /**
   * resets mouseIsDown flag and variables used for locking
   */
  public handleMouseUp() {
    this.mouseIsDown = false
    this.lockRow = undefined;
    this.lockCol = undefined;
    this.prevTarget = undefined
  }



  /**
   * this mechanism prevents users from drifting to the wrong row or colomn when swiping.
   * especially on small screens like mobile phones and with large grid sizes this can happen easily.
   * if the user's finger or pointer moved further horizontally than vertically, 
   * all inputs until the next mouseUp / touchend event will be forced to target the row first clicked/touch.
   * the same principle applies to colomns as well.
   * @param event 
   */
  public checkIfLockHasToBeSet(event): void {
    //dont bother executing the checks if a lock is already present
    if(this.lockCol || this.lockRow) {
      return;
    }

    if(event.touches) {
      event = event.touches[0]
    }

    const x = event.clientX 
    const y = event.clientY

    if(this.prevTarget && !this.lockCol && !this.lockRow) {
      const deltaX = Math.abs(this.prevTarget.x - x)
      const deltaY = Math.abs(this.prevTarget.y - y)

      const {col, row} = this.screenCoordinatesToGridIndices(event.clientX, event.clientY);

      if(deltaX < deltaY) {
        this.lockCol = col
        this.lockRow = undefined
      } else {
        this.lockCol = undefined
        this.lockRow = row
      }
    }

    this.prevTarget = {
      x,
      y
    }
  }

  /**
   * swiping on touch screens basically.
   * @param event 
   * @param row 
   * @param col 
   */
  public handleTouchMove(event: any): void {
    const touch = event.touches[0];
    const {col, row} = this.screenCoordinatesToGridIndices(touch.clientX, touch.clientY);

    if(col >= 0 && row >= 0) {
      this.markCell(row, col)
    }

    event.preventDefault()
  }

  /**
   * finds row and column index of the field at the specfied coordinates
   * @param screenX 
   * @param screenY 
   * @returns row and column index of field 
   */
  private screenCoordinatesToGridIndices(screenX: number, screenY: number): CellCoordinate {
    const targetId = document.elementFromPoint(screenX, screenY)?.parentElement?.id
    const row = Math.floor( parseInt(targetId) / this.gameSettings.gridSize )
    const col = parseInt(targetId) % this.gameSettings.gridSize
    return {row, col};
  }

  /**
   * reload the page
   */
  public reload(): void {
    window.location.reload();
  }

  /**
   * generate a new grid
   */
  public reset(): void {
    this.generateGrid();
  }

  /**
   * convert the index number of the field (which is (gridSize + 1)^2 because hints are included) to the row index
   * @param index 
   * @returns corresponding row index
   */
  public getRowIndex(index: number): number {
    return Math.floor(index / (this.gameSettings.gridSize + 1));
  }

  /**
   * convert the index number of the field (which is (gridSize + 1)^2 because hints are included) to the colomn index
   * @param index 
   * @returns corresponding colomn index
   */
  public getColIndex(index: number): number {
    return Math.floor(index % (this.gameSettings.gridSize + 1));
  }

  
  public lineIsCleared(index, row=true) {
    let cleared = true;
    
    for(const hint of row ? this.hints.rows[index] : this.hints.cols[index]) {
      if(!hint.done){
        cleared = false 
      }
    }

    return cleared
  }

}
