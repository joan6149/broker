import { Component, OnInit } from '@angular/core';
import { TimeclockService } from 'src/app/services/timeclock.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  constructor(private timeclockService:TimeclockService) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.timeclockService.setShowForm(false);
  }

}
