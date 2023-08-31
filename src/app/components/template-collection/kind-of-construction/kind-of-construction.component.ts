import { Component, OnInit } from '@angular/core';
import { AbstractCombolistComponent } from '../abstract-combolist/abstract-combolist.component';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { Source, TiposDeConstruccion } from 'src/app/pages/user/models/NewMortage.model';

@Component({
  selector: 'app-kind-of-construction',
  templateUrl: '../abstract-combolist/./abstract-combolist.component.html',
  styleUrls: ['./kind-of-construction.component.scss']
})
export class KindOfConstructionComponent extends AbstractCombolistComponent {

  constructor() {
    super();

    this.setValue({
      name: this.mortageData.hipoteca.vivienda.tipoConstruccion ? this.mortageData.hipoteca.vivienda.tipoConstruccion : TiposDeConstruccion.get(0) || '',
      isSelected: true
    }, Source.SOLICITANTE)

   }


  protected override setAllValues(): void {

    this.listSolicitant = [...TiposDeConstruccion.values()].map((val: string) => {
      return {
        name: val,
        isSelected: val === this.currentSolicitantSelectedValue?.name ? true : false,
      } as SelectListItem
    });

    this.listAcompaniant = [];
    
  }
  protected override setValue(estado: SelectListItem, source?: string | undefined): void {
    if(source && source === Source.SOLICITANTE) {
      this.currentSolicitantSelectedValue = estado;
      this.mortageData.hipoteca.vivienda.tipoConstruccion = estado.name;
    }
  }

}
