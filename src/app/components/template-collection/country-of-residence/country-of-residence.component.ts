import { Component, OnInit, Input } from '@angular/core';
import { NewMortage } from 'src/app/pages/user/models/NewMortage.model';
import { TemplateCollectionService } from '../template-collection.service';
import { InitFormState } from '@domo/domo-commons-lib/lib/components/forms/models/InitForm.interface';
import { AbstractDataFormComponent } from '@domo/domo-commons-lib/lib/components/forms/abstract-data-form/abstract-data-form.component';

@Component({
  selector: 'app-country-of-residence',
  templateUrl: './country-of-residence.component.html',
  styleUrls: ['./country-of-residence.component.scss']
})
export class CountryOfResidenceComponent implements OnInit {

  @Input('petitionType') petitionType!: string;
  mortageData!: NewMortage;
  allowNextStep = false;

  constructor(private templateCollectionService: TemplateCollectionService) { }

  ngOnInit(): void {
    this.mortageData = this.templateCollectionService.mortageData;
  }

  checkFormDirection(formState: InitFormState) {
    if(formState.status === 'INVALID') {
      this.allowNextStep = false;
    }


    if(formState.formName === 'SOLICITANTE') {
      this.mortageData.solicitante.direccion = {...this.mortageData.solicitante.direccion ,...formState.value};
      //this.setAllowByProfiles(formState.status, formState.formName);
    }

    
    if(formState.formName === 'ACOMPANIANTE') {
      const acompaniante = this.mortageData.acompaniante
      if(acompaniante) {
        acompaniante.direccion = {...this.mortageData.acompaniante?.direccion, ...formState.value};
        this.mortageData.acompaniante = {...acompaniante};
      }
      //this.setAllowByProfiles(formState.status, formState.formName);
    }

    //this.setAllowbyPetitionType();

    //this.allowNextStep = this.mortageData.petitionType === PetitionType.CONJUNTA ? this.correctSolicitanteData && this.correctAcompanianteData : this.correctSolicitanteData;
    console.log("FORMSTATE ==> ", formState);
    if(formState.status === 'INVALID') {
      this.templateCollectionService.setCurrentTemplateIsCorrect(false);
    }

    if(formState.status === 'VALID') {
      this.templateCollectionService.setCurrentTemplateIsCorrect(true);
    }


    console.log("MORTAGEE ==> ", this.mortageData);
    //console.log("PASOOOO ==> ", this.allowNextStep);
  }

  sameOtherFormDirection(source: string, dataForm: AbstractDataFormComponent) {
    if(source === 'SOLICITANTE') {
      dataForm.setFormValues(this.mortageData.solicitante.direccion);
    }

    if(source === 'ACOMPANIANTE') {
      dataForm.setFormValues(this.mortageData.acompaniante?.direccion);
    }
  }



}
