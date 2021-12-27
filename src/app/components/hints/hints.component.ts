import { Component, Input } from '@angular/core';
import { Hint } from 'src/app/types/Hint';

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss'],
})
export class HintsComponent {
  /**
   * hints to display
   */
  @Input()
  public hintNumbers: Hint[];

  /**
   * should be true for column tips, false otherwise
   */
  @Input()
  public vertical = true;
}

