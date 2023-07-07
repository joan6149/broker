import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';



enum Perfil {
  SOLICITANTE,
  ACOMPANIANTE
}

export interface MortageTemplate {
  template: TemplateRef<any>,
  optons?: MortageTemplateOptions
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
  @ViewChild('container_1', {read: ViewContainerRef}) container_1!: ViewContainerRef;

  /** Parent template */
  @ViewChild(AbstractStepPageComponent) parentComponent!: AbstractStepPageComponent<any>;
  @ViewChild('steps') steps!: TemplateRef<any>;

  /** Templates comunes */
  @ViewChild('EmptyTemplate') EmptyTemplate!: TemplateRef<any>;

  /** Mapa de Templates */
  templates: Map<string, MortageTemplate> = new Map<string, MortageTemplate>();
  templatesA: Map<string, MortageTemplate> = new Map<string, MortageTemplate>();

  currentStep: string = '1';
  numberOfSteps: number = 4;
  mortageData!: T;
  allowNextStep: boolean = false;
  titles: Map<string, string> = new Map<string, string>();
  

  constructor() { }

  ngAfterViewInit(): void {
    this.getTemplate();
  }

  nextForm(nextStep:number) {
    if(this.currentStep != null) {
      if(nextStep < 0) {
        if(+this.currentStep > 1) {
          this.currentStep = String(+this.currentStep + nextStep);
          this.allowNextStep = false;
          this.getTemplate();
        }
      } else {
        if(+this.currentStep < this.numberOfSteps) {
          this.currentStep = String(+this.currentStep + nextStep);
          this.allowNextStep = false;
          this.getTemplate();
        }
      }
    }
  }

  getTemplate() {
    console.log(this.currentStep);
    console.log(this.templates);
    this.container.clear();
    this.container_1.clear();
    console.log("EMPTY TENPLATE ==> ", this.EmptyTemplate);
    const template = this.templates.get(this.currentStep);
    const templateA = this.templatesA.get(this.currentStep);
    if(template) {
      this.container.createEmbeddedView(template.template);
    }

    if(templateA) {
      this.container_1.createEmbeddedView(templateA.template);
    }
  }

  hasTemplateByCurrentStep(perfil: Perfil): boolean {
    if(perfil === Perfil.SOLICITANTE) {
      return this.templates.get(this.currentStep) === undefined ? false : true;
    }

    if(perfil === Perfil.ACOMPANIANTE) {
      return this.templatesA.get(this.currentStep) === undefined ? false : true;
    }

    return false;
  }

  abstract submit(): void;

}
