import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit, inject, OnDestroy, ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
import { TemplateCollectionService } from '../template-collection.service';
import { Observable, Subscription, of } from 'rxjs';
import { tag } from 'rxjs-spy/operators';



enum Perfil {
  SOLICITANTE,
  ACOMPANIANTE
}

export interface MortageTemplate {
  name?: string,
  title: string,
  template?: TemplateRef<any>,
  component: any,
  templateOptions?: MortageTemplateOptions,
  typeOfPetition?: string,
  autoNext?:boolean
}

export interface MortageTemplateOptions {
  mandatory: boolean
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

  /** Map de inputs de cada template (step-{input:value})*/
  templateInputs: Map<string, {[key: string]: any}> = new Map<string, {[key: string]: any}>();

   /** Subscriptnions */
   subscriptions: Subscription[] = [];
   validationSubscription: Subscription = new Subscription();

  constructor() {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.setTemplates().subscribe((res) => {
      if(res) {
        this.getTemplate();
      }
    });
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
    const template: MortageTemplate | undefined = this.templates.get(this.currentStep);
    if(template) {
      this.configureTemplate(template);
      this.validationSubscription.unsubscribe();
      this.container.clear();
      const component: any = this.setInputValuesForComponent(this.container.createComponent<any>(template.component).instance, template);
      this.cdrService.detectChanges();
      this.validationSubscription = component.templateIsValid().pipe(
        tag('validTemplate')
      ).subscribe((valid: boolean) => {
        this.currentStepIsCorrect = valid;
        // Mirate esto parece que no actualiza
      })
      console.log(`Step: ${this.currentStep}: ${JSON.stringify(template)}`);
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

  private setInputValuesForComponent(component: any, template: MortageTemplate): any {
    const componentInputs: {[key: string]: any} | undefined = this.templateInputs!.get(template.name!);
      for (const key in componentInputs) {
        if (componentInputs.hasOwnProperty(key)) {
          const value = componentInputs[key];
          component[key] = value
        }
      }
    return component;
  }

  abstract submit(): void;
  abstract setTemplates(): Observable<boolean>;
  abstract configureTemplate(template: MortageTemplate): void

}
