import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit, inject } from '@angular/core';
import { TemplateCollectionService } from '../template-collection/template-collection.service';
import { NewMortage } from 'src/app/pages/user/models/NewMortage.model';



enum Perfil {
  SOLICITANTE,
  ACOMPANIANTE
}

export interface MortageTemplate {
  name?: string,
  solicitanTemplate: TemplateRef<any>,
  acompaniantTemplate?: TemplateRef<any>,
  solicitantOptions?: MortageTemplateOptions,
  acompaniantOptions?: MortageTemplateOptions
}

export interface MortageTemplateOptions {
  mandatory: boolean
  isCorrect: boolean
}



@Component({
  selector: 'app-abstract-step-page',
  templateUrl: './abstract-step-page.component.html',
  styleUrls: ['./abstract-step-page.component.scss']
})
export abstract class AbstractStepPageComponent<T> implements AfterViewInit {

  /** Contenedores */
  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  /** Parent template */
  @ViewChild(AbstractStepPageComponent) parentComponent!: AbstractStepPageComponent<any>;
  @ViewChild('steps') steps!: TemplateRef<any>;

  /** Mapa de Templates */
  templates: Map<string, MortageTemplate> = new Map<string, MortageTemplate>();
  //templatesA: Map<string, MortageTemplate> = new Map<string, MortageTemplate>();

  currentStep: string = '1';
  numberOfSteps: number = 4;
  mortageData!: T;
  allowNextStep: boolean = false;
  titles: Map<string, string> = new Map<string, string>();
  
  templateCollectionService: TemplateCollectionService = inject(TemplateCollectionService);

  constructor() { }

  ngAfterViewInit(): void {
    this.getTemplate();
  }

  nextForm(nextStep:number) {
    if(this.currentStep != null) {
      if(nextStep < 0) {
        if(+this.currentStep > 1) {
          this.currentStep = String(+this.currentStep + nextStep);
          this.getTemplate();
        }
      } else {
        if(+this.currentStep < this.numberOfSteps) {
          this.currentStep = String(+this.currentStep + nextStep);
          this.getTemplate();
        }
      }
    }
  }

  getTemplate() {
    console.log(this.currentStep);
    console.log(this.templates);
    this.container.clear();
    const template = this.templates.get(this.currentStep);
    //const templateA = this.templatesA.get(this.currentStep);
    if(template) {
      this.container.createEmbeddedView(template.solicitanTemplate);
    }

  }

  hasTemplateByCurrentStep(perfil: Perfil): boolean {
    if(perfil === Perfil.SOLICITANTE) {
      return this.templates.get(this.currentStep) === undefined ? false : true;
    }

    return false;
  }

  isMandatory(): boolean {
    let isMandatoryForm: boolean = false;
    let templateMandatory: boolean | undefined = this.templates.get(this.currentStep)?.solicitantOptions?.mandatory;

    if(templateMandatory) {
      isMandatoryForm = isMandatoryForm || templateMandatory;
    }


    return isMandatoryForm;
  }


  abstract submit(): void;

}
