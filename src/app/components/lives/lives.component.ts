import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lives',
  templateUrl: './lives.component.html',
  styleUrls: ['./lives.component.scss'],
})
export class LivesComponent  {
  /**
   * number of wrong inputs
   */
  @Input()
  public errors = 0;

  /**
   * limit for wrong inputs
   */
  @Input()
  public limit = 3;
}
