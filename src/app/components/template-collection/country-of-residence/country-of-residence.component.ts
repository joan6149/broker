import { Component} from '@angular/core';
import { InitFormState } from '@domo/domo-commons-lib/lib/components/forms/models/InitForm.interface';
import { AbstractMortageFormComponent } from '../abstract-mortage-form/abstract-mortage-form.component';
import { Ca } from '@domo/domo-commons-lib/lib/components/forms/models/direction.interface';

@Component({
  selector: 'app-country-of-residence',
  templateUrl: './country-of-residence.component.html',
  styleUrls: ['./country-of-residence.component.scss']
})
export class CountryOfResidenceComponent extends AbstractMortageFormComponent {

  shortDirection = false;
  ca: Ca[] = this.templateCollectionService.comunidadesAutonomas;

  constructor() {
    super();
    this.templateCollectionService.getAllCitiesData().subscribe(cas => this.ca = cas);
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
    }

    if(this.mortageData.acompaniante.direccion) {
      this.acompanianteDataForm.setFormValues(this.mortageData.acompaniante.direccion);
    }
    
    this.sendCheckFormIsCorrect();
  }



}
