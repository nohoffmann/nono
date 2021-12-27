import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-lives',
  templateUrl: './lives.component.html',
  styleUrls: ['./lives.component.scss'],
})
export class LivesComponent implements OnInit {

  @Input()
  public errors: number = 0;

  @Input()
  public limit: number = 3;

  @Output()
  public errorsChange: EventEmitter<number> = new EventEmitter()

  constructor() { }

  ngOnInit() {}

}
