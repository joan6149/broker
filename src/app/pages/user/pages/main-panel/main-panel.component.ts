import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as UISelectors from 'src/app/appStore/Selectors/AppSelectors';
import { UIState } from 'src/app/appStore/States';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  isLoading$: Observable<boolean> = new Observable<boolean>();

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(UISelectors.UISelector).subscribe(val => console.log(val))
  }

  gotoRoute(url: any) {
    this.router.navigate([`user/${url}`])
  }

}
