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
  templateUrl: './new-mortgage.component.html',
  styleUrls: ['./new-mortgage.component.scss']
})
export class NewMortgageComponent extends AbstractStepPageComponent<NewMortage> implements OnInit, AfterViewInit, OnDestroy {

  

  /** Plantillas */
  @ViewChild('civilStateS') civilStateS!: TemplateRef<any>;
  @ViewChild('civilStateA') civilStateA!: TemplateRef<any>;
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
  

  EstadosCivilesSolicitante!: SelectListItem[];
  EstadosCivilesAcompanante!: SelectListItem[];

  numDeHijosSolicitante: string = '0';
  numDeHijosAcompaniante: string = '0';

  allowNextStepBySolicitant: boolean = false;
  allowNextStepByAcompaniant: boolean = false;


  constructor() {
    super();
    this.numberOfSteps = 5;
    this.setearEstadosCiviles();
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
      console.log("RECIBO MORTAGE DESDE NEW_MORTAGE ==> ", mortageData);
    }));

    // Me suscribo a cambios en el Template
    this.subscriptions.push(this.templateCollectionService.getTemplates().subscribe((mortageTemplate: MortageTemplate) => {
      this.templateCollection.set(mortageTemplate.name || '9999', mortageTemplate);
      console.log("VEAMOS LA TENPLATE ==> ", mortageTemplate);
    }))
  }

  nextStep(nextStep: number) {
    this.templateCollectionService.setMortageData(this.mortageData);
    this.nextForm(nextStep);
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
  }

  setTemplates() {
    this.templates.set('1', this.templateCollection.get('typeOfPetition') ?? {solicitanTemplate: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('2', this.templateCollection.get('basicInformation') ?? {solicitanTemplate: this.EmptyTemplate} as MortageTemplate);
    this.templates.set('3', {solicitanTemplate:this.civilStateS } as MortageTemplate);
    this.templates.set('4', {solicitanTemplate:this.paisResS, solicitantOptions: {mandatory: true } } as MortageTemplate);
    this.templates.set('5', {solicitanTemplate:this.hijosS } as MortageTemplate);
  }

  submit() {
    console.log('Finalizado');
  }

  setPetitionType(petitionType: PetitionType) {
    this.mortageData.petitionType = petitionType;
  }

  private setearEstadosCiviles(): void {

    this.EstadosCivilesSolicitante = Object.values(EstadoCivil).map((val: string) => {
      return {
        name: val,
        isSelected: val === EstadoCivil.CASADO ? true : false,
      } as SelectListItem
    })

    this.EstadosCivilesAcompanante = Object.values(EstadoCivil).map((val: string) => {
      return {
        name: val,
        isSelected: val === EstadoCivil.CASADO ? true : false,
      } as SelectListItem
    })
  }

  override getTemplate(): void {
    this.container.clear();
    const template: MortageTemplate | undefined = this.templates.get(this.currentStep);
    if(template) {
      this.container.createEmbeddedView(template.solicitanTemplate);
    }
  }

  private setAllowByProfiles(status: string, profile: string) {
    if(profile === 'SOLICITANTE') {
      if(status === 'VALID') {
        this.allowNextStepBySolicitant = true;
      } else {
        this.allowNextStepBySolicitant = false;
      }
    }

    if(profile === 'ACOMPANIANTE') {
      if(status === 'VALID') {
        this.allowNextStepByAcompaniant = true;
      } else {
        this.allowNextStepByAcompaniant = false;
      }
    }
  }

  private setAllowbyPetitionType() {
    if(this.mortageData.petitionType === PetitionType.CONJUNTA) {
      this.allowNextStep = this.allowNextStepBySolicitant && this.allowNextStepByAcompaniant;
    } else {
      this.allowNextStep = this.allowNextStepBySolicitant;
    }
  }

  checkFormDirection(formState: InitFormState) {
    if(formState.status === 'INVALID') {
      this.allowNextStep = false;
    }


    if(formState.formName === 'SOLICITANTE') {
      this.mortageData.solicitante.direccion = {...this.mortageData.solicitante.direccion ,...formState.value};
      this.setAllowByProfiles(formState.status, formState.formName);
    }

    
    if(formState.formName === 'ACOMPANIANTE') {
      const acompaniante = this.mortageData.acompaniante
      if(acompaniante) {
        acompaniante.direccion = {...this.mortageData.acompaniante?.direccion, ...formState.value};
        this.mortageData.acompaniante = {...acompaniante};
      }
      this.setAllowByProfiles(formState.status, formState.formName);
    }

    this.setAllowbyPetitionType();

    //this.allowNextStep = this.mortageData.petitionType === PetitionType.CONJUNTA ? this.correctSolicitanteData && this.correctAcompanianteData : this.correctSolicitanteData;
    console.log("FORMSTATE ==> ", formState);
    console.log("MORTAGEE ==> ", this.mortageData);
    //console.log("PASOOOO ==> ", this.allowNextStep);
  }

  sameOtherFormInit(source: string, dataForm: AbstractDataFormComponent) {
    if(source === 'SOLICITANTE') {
      dataForm.setFormValues(this.mortageData.solicitante);
    }

    if(source === 'ACOMPANIANTE') {
      dataForm.setFormValues(this.mortageData.acompaniante);
    }
  }

  sameOtherFormDirection(source: string, dataForm: AbstractDataFormComponent) {
    if(source === 'SOLICITANTE') {
      dataForm.setFormValues(this.mortageData.solicitante.direccion);
    }

    if(source === 'ACOMPANIANTE') {
      dataForm.setFormValues(this.mortageData.acompaniante?.direccion);
    }
  }

  sameOtherCivilState(source: string, selectList: SelectListComponent) {
    if(source === 'SOLICITANTE') {
      selectList.typeSelected({
        name: this.mortageData.solicitante.estadoCivil,
        isSelected: true
      } as SelectListItem, false)
    }

    if(source === 'ACOMPANIANTE') {
      selectList.typeSelected({
        name: this.mortageData.acompaniante !== null ? this.mortageData.acompaniante.estadoCivil : 'CASADO',
        isSelected: true
      } as SelectListItem, false)
    }
  }

  sameOtherHijos(source: string) {
    
    if(source === 'SOLICITANTE') {
      this.mortageData.acompaniante.hijosAcargo = this.mortageData.solicitante.hijosAcargo;
    }

    if(source === 'ACOMPANIANTE') {
      this.mortageData.solicitante.hijosAcargo = this.mortageData.acompaniante.hijosAcargo;
    }
  }

  setEstadoCivil(estado: any) {
    this.mortageData.solicitante.estadoCivil = estado.name;
    if(this.mortageData.acompaniante !== null) {
      this.mortageData.acompaniante.estadoCivil = estado.name;
    }
    console.log("ESTADO CIVIL ==> ", estado);
    console.log("MORTAGE CIVIL ==> ")
  }



}
