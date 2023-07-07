import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstadoCivil, NewMortage, PetitionType } from '../../models/NewMortage.model';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { AbstractStepPageComponent, MortageTemplate } from 'src/app/components/abstract-step-page/abstract-step-page.component';
import { InitFormState } from '@domo/domo-commons-lib/lib/components/forms/models/InitForm.interface';
import { InitDataFormComponent, SelectListComponent } from '@domo/domo-commons-lib';
import { AbstractDataFormComponent } from '@domo/domo-commons-lib/lib/components/forms/abstract-data-form/abstract-data-form.component';

@Component({
  selector: 'app-new-mortgage',
  templateUrl: './new-mortgage.component.html',
  styleUrls: ['./new-mortgage.component.scss']
})
export class NewMortgageComponent extends AbstractStepPageComponent<NewMortage> implements OnInit, AfterViewInit {

  

  /** Plantillas */
  @ViewChild('typeOfPetition') typeOfPetition!: TemplateRef<any>;
  @ViewChild('initDataFormS') initDataFormS!: TemplateRef<any>;
  @ViewChild('initDataFormA') initDataFormA!: TemplateRef<any>;
  @ViewChild('civilStateS') civilStateS!: TemplateRef<any>;
  @ViewChild('civilStateA') civilStateA!: TemplateRef<any>;
  @ViewChild('paisResS') paisResS!: TemplateRef<any>;
  @ViewChild('paisResA') paisResA!: TemplateRef<any>;


  /** Send values betwen solicitants */
  values: any;
  

  EstadosCivilesSolicitante!: SelectListItem[];
  EstadosCivilesAcompanante!: SelectListItem[];

  allowNextStepBySolicitant: boolean = false;
  allowNextStepByAcompaniant: boolean = false;


  constructor() {
    super();
    this.setearEstadosCiviles();
    this.setTitles();
    this.mortageData = new NewMortage();
  }

  @Inject(ActivatedRoute) private route!: ActivatedRoute;

  ngOnInit(): void {
    
  }

  override ngAfterViewInit() {
    this.setTemplates();
    this.getTemplate();
  }

  setTitles() {
    this.titles.set('1', 'Tipo de solicitud');
    this.titles.set('2', 'Datos');
    this.titles.set('3', 'Estado civil');
    this.titles.set('4', 'Direccion');
  }

  setTemplates() {
    this.templates.set('1', {template:this.typeOfPetition } as MortageTemplate);
    this.templates.set('2', {template:this.initDataFormS, optons: {mandatory: true } } as MortageTemplate);
    this.templates.set('3', {template:this.civilStateS } as MortageTemplate);
    this.templates.set('4', {template:this.paisResS, optons: {mandatory: true } } as MortageTemplate);

    this.templatesA.set('2', {template: this.initDataFormA, optons: {mandatory: true }} as MortageTemplate);
    this.templatesA.set('3', {template: this.civilStateA} as MortageTemplate);
    this.templatesA.set('4', {template: this.paisResA, optons: {mandatory: true }} as MortageTemplate);
  }

  submit() {
    console.log('Finalizado');
  }

  setPetitionType(petitionType: PetitionType) {
    console.log('PETITIONNN', petitionType);
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
    this.container_1.clear();
    const template: MortageTemplate | undefined = this.templates.get(this.currentStep);
    const templateA: MortageTemplate | undefined = this.templatesA.get(this.currentStep);
    if(template) {
      this.container.createEmbeddedView(template.template);
    }

    if(templateA && this.mortageData.petitionType === PetitionType.CONJUNTA) {
      this.container_1.createEmbeddedView(templateA.template);
    }

    console.log("MORTAGE ==> ", this.mortageData);
  }

  public checkForm(formState: InitFormState) {

    if(formState.status === 'INVALID') {
      this.allowNextStep = false;
    }


    if(formState.formName === 'SOLICITANTE') {
      this.mortageData.solicitante = {...this.mortageData.solicitante ,...formState.value};
      this.setAllowByProfiles(formState.status, formState.formName);
    }

    
    if(formState.formName === 'ACOMPANIANTE') {
      this.mortageData.acompaniante = {...this.mortageData.acompaniante, ...formState.value};
      this.setAllowByProfiles(formState.status, formState.formName);
    }

    this.setAllowbyPetitionType();

    //this.allowNextStep = this.mortageData.petitionType === PetitionType.CONJUNTA ? this.correctSolicitanteData && this.correctAcompanianteData : this.correctSolicitanteData;
    console.log("FORMSTATE ==> ", formState);
    console.log("MORTAGEE ==> ", this.mortageData);
    //console.log("PASOOOO ==> ", this.allowNextStep);
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

  isMandatory(): boolean {
    let isMandatoryForm: boolean = false;
    let templateMandatory: boolean | undefined = this.templates.get(this.currentStep)?.optons?.mandatory;
    let templateAMandatory: boolean | undefined = this.templatesA.get(this.currentStep)?.optons?.mandatory

    if(templateMandatory) {
      isMandatoryForm = isMandatoryForm || templateMandatory;
    }

    if(templateAMandatory) {
      isMandatoryForm = isMandatoryForm || templateAMandatory;
    }

    return isMandatoryForm;
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

  setEstadoCivil(estado: any) {
    this.mortageData.solicitante.estadoCivil = estado.name;
    if(this.mortageData.acompaniante !== null) {
      this.mortageData.acompaniante.estadoCivil = estado.name;
    }
    console.log("ESTADO CIVIL ==> ", estado);
    console.log("MORTAGE CIVIL ==> ")
  }



}
