import { Component, OnInit } from '@angular/core';
import { TimeclockService } from 'src/app/services/timeclock.service';

@Component({
  selector: 'app-main-announcement',
  templateUrl: './main-announcement.component.html',
  styleUrls: ['./main-announcement.component.scss']
})
export class MainAnnouncementComponent implements OnInit {

  constructor(private timeclockService: TimeclockService) { }

  ngOnInit(): void {
  }

  showForm() {
    this.timeclockService.setShowForm(true);
  }

}
