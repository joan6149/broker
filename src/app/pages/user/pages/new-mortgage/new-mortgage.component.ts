import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstadoCivil, NewMortage, PetitionType } from '../../models/NewMortage.model';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { AbstractStepPageComponent, MortageTemplate } from 'src/app/components/abstract-step-page/abstract-step-page.component';
import { InitFormState } from '@domo/domo-commons-lib/lib/components/forms/models/InitForm.interface';
import { InitDataFormComponent, SelectListComponent } from '@domo/domo-commons-lib';
import { AbstractDataFormComponent } from '@domo/domo-commons-lib/lib/components/forms/abstract-data-form/abstract-data-form.component';
import { TemplateCollectionService } from 'src/app/components/template-collection/template-collection.service';
import { Subscription, last } from 'rxjs';

@Component({
  selector: 'app-new-mortgage',
  templateUrl: '../../../../components/abstract-step-page/abstract-step-page.component.html',
  styleUrls: ['./new-mortgage.component.scss']
})
export class NewMortgageComponent extends AbstractStepPageComponent<NewMortage> implements OnInit, AfterViewInit, OnDestroy {

  

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

  /** Subscriptnions */
  subscriptions: Subscription[] = [];

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
      console.log("VEAMOS LA TENPLATE ==> ", mortageTemplate);
      console.log("Lista ==> ", this.templateCollection);
    }))
  }

  override ngAfterViewInit() {
    this.setTemplates();
    this.getTemplate();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  setTitles() {
    this.titles.set('1', 'Tipo de solicitud');
    this.titles.set('2', 'Datos');
    this.titles.set('3', 'Estado civil');
    this.titles.set('4', 'Direccion');
    this.titles.set('5', 'Hijos a Cargo');
    this.titles.set('6', 'Permiso de residencia');
  }

  setTemplates() {
    this.templates.set('1', this.templateCollection.get('typeOfPetition') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('2', this.templateCollection.get('basicInformation') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('3', this.templateCollection.get('civilState') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('4', this.templateCollection.get('directionForm') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('5', this.templateCollection.get('sons') ?? {template: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('6', this.templateCollection.get('residencePermit') ?? {template: this.EmptyTemplate} as MortageTemplate);

    this.numberOfSteps = this.templates.size;
  }

  submit() {
    console.log('Finalizado');
    console.log('MORTAGE FINALIZADO ==> ', this.templateCollectionService.mortageData)
    // Guardar NewMortage en la bbdd (kisas una accion de ngrx?) lo mismo no nnose pensemos
    // seria ideal guardarlo en el estado por lo tanto usar ngrx
    // Ir a mis solicitudes
  }

}
