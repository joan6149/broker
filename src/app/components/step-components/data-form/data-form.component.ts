import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  @Input() title: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
