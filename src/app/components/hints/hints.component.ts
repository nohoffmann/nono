import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Hint } from 'src/app/types/Hint';

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss'],
})
export class HintsComponent {
  @Input()
  public hintNumbers: Hint[]

  @Input()
  public vertical: boolean = true

  public lineCleared(): boolean {
    let lineCleared = true 
    for(const hint of this.hintNumbers) {
      if(!hint.done) {
        lineCleared = false
      }
    }
    return lineCleared
  }

}
 