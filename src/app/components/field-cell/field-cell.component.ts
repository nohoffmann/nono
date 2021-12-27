import { Component, Input } from '@angular/core';
import { CellState } from 'src/app/types/CellState';

@Component({
  selector: 'app-field-cell',
  templateUrl: './field-cell.component.html',
  styleUrls: ['./field-cell.component.scss']
})
export class FieldCellComponent {
  /**
   * type for usage in template
   */
  public CellState = CellState;

  /**
   * current cell state
   */
  @Input()
  public state: CellState = CellState.UNSET;
}


