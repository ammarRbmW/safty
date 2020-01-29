import {animate, animateChild, query, stagger, style, transition, trigger} from '@angular/animations';

export const ListAnimation = [
  trigger('items', [
    transition(':enter', [
      style({transform: 'scale(0.5)', opacity: 0}),  // initial
      animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
        style({transform: 'scale(1)', opacity: 1}))  // final
    ]),
    transition(':leave', [
      style({transform: 'scale(1)', opacity: 1, height: '*'}),
      animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
        style({
          transform: 'scale(0.5)', opacity: 0,
          height: '0px', margin: '0px'
        }))
    ])
  ]),
  trigger('list', [
    transition(':enter', [
      query('@items', stagger(300, animateChild()))
    ]),
  ])
];
