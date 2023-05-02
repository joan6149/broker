import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-ofert',
  templateUrl: './best-ofert.component.html',
  styleUrls: ['./best-ofert.component.scss']
})
export class BestOfertComponent implements OnInit {

  @Input() title: string ="";
  @Input() price: string ="";
  @Input() description: string ="";
  
  constructor() { }

  ngOnInit(): void {
  }

}
