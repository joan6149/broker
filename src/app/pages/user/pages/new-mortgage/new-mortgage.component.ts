import { Component, TemplateRef, ViewChild, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewMortage, PetitionType } from '../../models/NewMortage.model';
import { AbstractStepPageComponent, MortageTemplate } from 'src/app/components/template-collection/abstract-step-page/abstract-step-page.component';
import { IndOrColectiveComponent } from 'src/app/components/template-collection/ind-or-colective/ind-or-colective.component';
import { InitDataFormAppComponent } from 'src/app/components/template-collection/init-data-form/init-data-form.component';
import { CivilStateComponent } from 'src/app/components/template-collection/civil-state/civil-state.component';
import { SonsComponent } from 'src/app/components/template-collection/sons/sons.component';
import { ResidencePermitComponent } from 'src/app/components/template-collection/residence-permit/residence-permit.component';
import { CurrentHousingSituationComponent } from 'src/app/components/template-collection/current-housing-situation/current-housing-situation.component';
import { CountryOfResidenceComponent } from 'src/app/components/template-collection/country-of-residence/country-of-residence.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-mortgage',
  templateUrl: '../../../../components/template-collection/abstract-step-page/abstract-step-page.component.html',
  styleUrls: ['../../../../components/template-collection/abstract-step-page/abstract-step-page.component.scss']
})
export class NewMortgageComponent extends AbstractStepPageComponent<NewMortage> implements OnInit {

  /** Plantillas */
  @ViewChild('EmptyTemplate') EmptyTemplate!: TemplateRef<any>;

  /** Template collection */
  templateCollection: Map<String, MortageTemplate> = new Map<String, MortageTemplate>();


  /** Send values betwen solicitants */
  values: any;

  numDeHijosSolicitante: string = '0';
  numDeHijosAcompaniante: string = '0';

  allowNextStepBySolicitant: boolean = false;
  allowNextStepByAcompaniant: boolean = false;


  constructor() {
    super();
    this.numberOfSteps = 1;
    this.mortageData = this.templateCollectionService.mortageData;
  }

  ngOnInit(): void {
    
  }

  @Inject(ActivatedRoute) private route!: ActivatedRoute;

  setTemplates() {
    this.templateCollectionService.getNewMortageTemplates().subscribe((templates: MortageTemplate[]) => {
      this.numberOfSteps = templates.length;
      templates.forEach((template: MortageTemplate, index: number) => {
        this.mortageData.petitionType === PetitionType.INDIVIDUAL ? template.typeOfPetition = PetitionType.INDIVIDUAL : template.typeOfPetition = PetitionType.CONJUNTA;
        this.templates.set(`${index+1}`, template);
      })
    });
  }

  /** Este metodo se llama al otener una nueva template para configurar atributos adicionales en este caso 
   * decirle si es conjunta o individual y de es desacoplar esta decision de los componentes puestoq que es responsabilidad
   * de este componente saber que tiene que pintar y no de los componentes individuales */
  override configureTemplate(template: MortageTemplate): void {
    this.mortageData.petitionType === PetitionType.INDIVIDUAL ? template.typeOfPetition = PetitionType.INDIVIDUAL : template.typeOfPetition = PetitionType.CONJUNTA;
  }

  checkVerificationCode(): boolean {
    if(environment.production === false && this.templateCollectionService.verificationCode === '2222') {
      return true;
    }
    // Checkear codigo mediante peticion al back
    return false;
  }

  submit() {
    console.log('Finalizado');
    console.log('MORTAGE FINALIZADO ==> ', this.templateCollectionService.mortageData)
    console.log('CODIGO DE VERIFICACION INTRODUCIDO ==> ', this.templateCollectionService.verificationCode);
    // checkea codigo de verificacion
    if(!this.checkVerificationCode()) {
      console.log("Error de verificacion muestra un dialog");
    }
    // Guardar NewMortage en la bbdd (kisas una accion de ngrx?) lo mismo no nnose pensemos
    // seria ideal guardarlo en el estado por lo tanto usar ngrx
    // Ir a mis solicitudes
  }

}
