import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

export const movileAnimation = trigger('santander', [
    state('initial',style({transform: 'translate(0, 0)'})),
    state('secondPos',style({transform: 'translate(0, 55px)'})),
    state('thirdPos',style({transform: 'translate(0, 114px)'})),
    state('fortyPos',style({transform: 'translate(0, 169px)'})),
    transition('initial => secondPos', [
        animate('1s')
    ])
])

export const infiniteMovileAnimation = trigger('santanderInf', [
    transition('* => *', [
        animate('1s', keyframes([
          style({ transform: 'translate(0, 0)', offset: 0 }),
          style({ transform: 'translate(0, 55px)', offset: 0.5 }),
          style({ transform: 'translate(0, 114px)', offset: 1 })
        ]))
      ])
    ])