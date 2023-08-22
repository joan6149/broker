import { Component, OnInit, Input } from '@angular/core';
import { NewMortage } from 'src/app/pages/user/models/NewMortage.model';
import { TemplateCollectionService } from '../template-collection.service';
import { InitFormState } from '@domo/domo-commons-lib/lib/components/forms/models/InitForm.interface';
import { AbstractDataFormComponent } from '@domo/domo-commons-lib/lib/components/forms/abstract-data-form/abstract-data-form.component';
import { AbstractMortageFormComponent } from '../abstract-mortage-form/abstract-mortage-form.component';

@Component({
  selector: 'app-country-of-residence',
  templateUrl: './country-of-residence.component.html',
  styleUrls: ['./country-of-residence.component.scss']
})
export class CountryOfResidenceComponent extends AbstractMortageFormComponent {

  constructor() {
    super();
    }

  checkForm(formState: InitFormState) {

    if(formState.formName === 'SOLICITANTE') {
      this.solicitantIsCorrect = formState.status === 'VALID' ? true : false
    }

    if(formState.formName === 'ACOMPANIANTE') {
      this.acompaniantisCorrect = formState.status === 'VALID' ? true : false;
    }

    if(this.solicitantIsCorrect === true) {
      this.mortageData.solicitante.direccion = {...this.mortageData.solicitante.direccion ,...formState.value};
    }

    
    if(this.acompaniantisCorrect === true) {
      this.mortageData.acompaniante.direccion = {...this.mortageData.acompaniante?.direccion, ...formState.value};
    }


    this.sendCheckFormIsCorrect();
  }

  override fillFormFields(): void {

    if(this.mortageData.solicitante.direccion) {
      this.solicitanteDataForm.setFormValues(this.mortageData.solicitante.direccion);
      this.solicitantIsCorrect = true;
    }

    if(this.mortageData.acompaniante.direccion) {
      this.acompanianteDataForm.setFormValues(this.mortageData.acompaniante.direccion);
      this.acompaniantisCorrect = true;
    }
    
    this.sendCheckFormIsCorrect();
  }



}
