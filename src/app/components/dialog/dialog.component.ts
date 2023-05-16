import { Component, Input, OnInit } from '@angular/core';
import { TimeclockService } from 'src/app/services/timeclock.service';
import { DialogAction } from '../contact-form/models/contact.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() correct: boolean = false;
  @Input() id: string = "";
  constructor(private timeClockService: TimeclockService) { }

  ngOnInit(): void {
  }

  okey() {
    this.timeClockService.setShowDialog({
      id: this.id,
      show: false,
      state: this.correct
    } as DialogAction)
  }

}
