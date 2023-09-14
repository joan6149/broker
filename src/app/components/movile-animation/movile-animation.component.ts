import { Component, OnInit } from '@angular/core';
import { infiniteMovileAnimation } from './animation/movileAnimation.animation';

@Component({
  selector: 'app-movile-animation',
  templateUrl: './movile-animation.component.html',
  styleUrls: ['./movile-animation.component.scss'],
  animations: [
    infiniteMovileAnimation
  ]
})
export class MovileAnimationComponent implements OnInit {
  currentState = 'initial';

  constructor() { }

  ngOnInit(): void {
  }

}
