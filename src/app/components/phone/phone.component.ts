import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

  @Input() phoneNumber: string = "";
  @Input() srcColor: string = "call.svg";
  @Input() textColor: string = "";
  @Input() text:string = "Consulta gratis";

  constructor() {
    
   }

  ngOnInit(): void {
    this.srcColor = `assets/${this.srcColor}`;
  }

  openCall() {
    window.location.href = `tel:${this.phoneNumber}`;
  }

}
