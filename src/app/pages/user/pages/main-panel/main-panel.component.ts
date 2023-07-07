import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoRoute(url: any) {
    console.log(url);
    this.router.navigate([`user/${url}`])
  }

}
