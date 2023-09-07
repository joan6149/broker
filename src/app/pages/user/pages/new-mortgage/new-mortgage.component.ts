import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewMortage, PetitionType } from '../../models/NewMortage.model';
import { AbstractStepPageComponent, MortageTemplate } from 'src/app/components/abstract-step-page/abstract-step-page.component';
import { Subscription, skip } from 'rxjs';

@Component({
  selector: 'app-new-mortgage',
  templateUrl: '../../../../components/abstract-step-page/abstract-step-page.component.html',
  styleUrls: ['../../../../components/abstract-step-page/abstract-step-page.component.scss']
})
export class NewMortgageComponent extends AbstractStepPageComponent<NewMortage> implements OnInit {

  

  /** Plantillas */
  @ViewChild('paisResS') paisResS!: TemplateRef<any>;
  @ViewChild('paisResA') paisResA!: TemplateRef<any>;
  @ViewChild('hijosS') hijosS!: TemplateRef<any>;
  @ViewChild('hijosA') hijosA!: TemplateRef<any>;
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
    this.setTitles();
    this.mortageData = new NewMortage();

  }

  @Inject(ActivatedRoute) private route!: ActivatedRoute;

  ngOnInit(): void {
    this.mortageData = this.templateCollectionService.mortageData;
    this.templateCollectionService.templateList.forEach((mortageTemplate: MortageTemplate) => {
      this.templateCollection.set(mortageTemplate.name || '9999', mortageTemplate)
    })

    // Me suscribo a cambios en el Mortagedata
    this.subscriptions.push(this.templateCollectionService.getMortageData().subscribe((mortageData: NewMortage) => {
      this.mortageData = mortageData;
    }));

    // Me suscribo a cambios en el Template
    this.subscriptions.push(this.templateCollectionService.getTemplates().subscribe((mortageTemplate: MortageTemplate) => {
      this.templateCollection.set(mortageTemplate.name || '9999', mortageTemplate);
    }))

    // Me subscribo a los nextSteps de los componentes que pueden cambiar de step sin next
    this.subscriptions.push(this.templateCollectionService.getNextTemplate().pipe(
      skip(1)
    ).subscribe((next: number) => {
      this.nextStep(+this.currentStep+next);
    }))
  }

  setTitles() {
    this.titles.set('1', 'Tipo de solicitud');
    this.titles.set('2', 'Datos');
    this.titles.set('3', 'Estado civil');
    this.titles.set('4', 'Direccion');
    this.titles.set('5', 'Hijos a Cargo');
    this.titles.set('6', 'Permiso de residencia');
    this.titles.set('7', 'Situacion residencia actual');
    this.titles.set('8', 'Situacion laboral');
    this.titles.set('9', '¿Sera vivienda habitual?');
    this.titles.set('10', '¿Cuál es el valor de la propiedad?');
  }

  setTemplates() {
    this.templates.set('1', this.templateCollection.get('typeOfPetition') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('10', this.templateCollection.get('basicInformation') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('3', this.templateCollection.get('civilState') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('4', this.templateCollection.get('directionForm') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('5', this.templateCollection.get('sons') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('6', this.templateCollection.get('residencePermit') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('7', this.templateCollection.get('currentSituationHouse') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('8', this.templateCollection.get('labSituation') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('9', this.templateCollection.get('isUsuallyHouse') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('2', this.templateCollection.get('propertyValue') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('11', this.templateCollection.get('kindOfHouse') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('12', this.templateCollection.get('currentHiringState') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('13', this.templateCollection.get('addressNewProperty') ?? {template: this.EmptyTemplate} as MortageTemplate);
    /** Por hacer */
    this.templates.set('14', this.templateCollection.get('m2House') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('15', this.templateCollection.get('kindOfConstruction') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('16', this.templateCollection.get('isAval') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('17', this.templateCollection.get('isHaciendaLastYear') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('18', this.templateCollection.get('previousRequest') ?? {template: this.EmptyTemplate} as MortageTemplate);

    this.numberOfSteps = this.templates.size;

    if(this.templates.get(this.currentStep)?.templateOptions === undefined || this.templates.get(this.currentStep)?.templateOptions?.isCorrect === true) {
      this.currentStepIsCorrect = true
    }
  }

  submit() {
    console.log('Finalizado');
    console.log('MORTAGE FINALIZADO ==> ', this.templateCollectionService.mortageData)
    // Guardar NewMortage en la bbdd (kisas una accion de ngrx?) lo mismo no nnose pensemos
    // seria ideal guardarlo en el estado por lo tanto usar ngrx
    // Ir a mis solicitudes
  }

}
