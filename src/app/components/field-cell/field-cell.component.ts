import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CellState } from 'src/app/types/CellState';
import { InputMode } from 'src/app/types/InputMode';

@Component({
  selector: 'app-field-cell',
  templateUrl: './field-cell.component.html',
  styleUrls: ['./field-cell.component.scss']
})
export class FieldCellComponent {
  public CellState = CellState

  @Input()
  public state: CellState = CellState.UNSET

  @ViewChild("cell") 
  public cell: ElementRef
}


