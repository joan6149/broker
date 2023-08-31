import { Component, OnInit, inject } from '@angular/core';
import { NewMortage } from 'src/app/pages/user/models/NewMortage.model';
import { TemplateCollectionService } from '../template-collection.service';

@Component({
  selector: 'app-m2-house',
  templateUrl: './m2-house.component.html',
  styleUrls: ['./m2-house.component.scss']
})
export class M2HouseComponent implements OnInit {

  mortageData!: NewMortage;
  templateCollectionService: TemplateCollectionService = inject(TemplateCollectionService);
  
  constructor() {
    this.mortageData = this.templateCollectionService.mortageData;
   }

  ngOnInit(): void {
  }

  doGetM2Value(evt: number) {
    console.log(evt);
    this.mortageData.hipoteca.vivienda.m2 = evt;
  }

}
