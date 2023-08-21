import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit, inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TemplateCollectionService } from '../template-collection/template-collection.service';
import { NewMortage } from 'src/app/pages/user/models/NewMortage.model';
import { Subscription } from 'rxjs';



enum Perfil {
  SOLICITANTE,
  ACOMPANIANTE
}

export interface MortageTemplate {
  name?: string,
  template: TemplateRef<any>,
  templateOptions?: MortageTemplateOptions,
  autoNext?:boolean
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
export abstract class AbstractStepPageComponent<T> implements AfterViewInit, OnDestroy {

  /** Contenedores */
  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  /** Parent template */
  @ViewChild(AbstractStepPageComponent) parentComponent!: AbstractStepPageComponent<any>;
  @ViewChild('steps') steps!: TemplateRef<any>;

  /** Mapa de Templates */
  templates: Map<string, MortageTemplate> = new Map<string, MortageTemplate>();
  //templatesA: Map<string, MortageTemplate> = new Map<string, MortageTemplate>();

  currentStep: string = '1';
  currentStepIsCorrect: boolean = false;
  numberOfSteps: number = 4;
  mortageData!: T;
  allowNextStep: boolean = false;
  titles: Map<string, string> = new Map<string, string>();
  
  templateCollectionService: TemplateCollectionService = inject(TemplateCollectionService);
  cdrService: ChangeDetectorRef = inject(ChangeDetectorRef);

   /** Subscriptnions */
   subscriptions: Subscription[] = [];

  constructor() { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.setTemplates();
    this.getTemplate();
    // Me subscribo a las validaciones de las templates
    this.subscriptions.push(this.templateCollectionService.getCurrentTemplateisCorrect().subscribe((isCorrect: boolean) => {
      this.currentStepIsCorrect = isCorrect;
      this.cdrService.detectChanges();
    }))
  }

  nextForm(nextStep:number) {
    if(this.currentStep != null) {
      if(nextStep < 0) {
        if(+this.currentStep > 1) {
          this.currentStep = String(+this.currentStep + nextStep);
          this.currentStepIsCorrect = true;
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

  getTemplate(): void {
    this.container.clear();
    const template: MortageTemplate | undefined = this.templates.get(this.currentStep);
    if(template) {
      this.container.createEmbeddedView(template.template);
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
    let templateMandatory: boolean | undefined = this.templates.get(this.currentStep)?.templateOptions?.mandatory;

    if(templateMandatory) {
      isMandatoryForm = isMandatoryForm || templateMandatory;
    }


    return isMandatoryForm;
  }

  nextStep(nextStep: number) {
    //this.templateCollectionService.setMortageData(this.mortageData);
    this.nextForm(nextStep);
  }

  abstract submit(): void;
  abstract setTemplates(): void;

}
