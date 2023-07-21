import { Component, OnInit, Input } from '@angular/core';
import { NewMortage } from 'src/app/pages/user/models/NewMortage.model';
import { TemplateCollectionService } from '../template-collection.service';

@Component({
  selector: 'app-sons',
  templateUrl: './sons.component.html',
  styleUrls: ['./sons.component.scss']
})
export class SonsComponent implements OnInit {

  @Input('petitionType') petitionType!: string;
  mortageData!: NewMortage;

  constructor(private templateCollectionService: TemplateCollectionService) { }

  ngOnInit(): void {
    this.mortageData = this.templateCollectionService.mortageData;
  }

  sameOtherHijos(source: string) {
    
    if(source === 'SOLICITANTE') {
      this.mortageData.acompaniante.hijosAcargo = this.mortageData.solicitante.hijosAcargo;
    }

    if(source === 'ACOMPANIANTE') {
      this.mortageData.solicitante.hijosAcargo = this.mortageData.acompaniante.hijosAcargo;
    }
  }

}
