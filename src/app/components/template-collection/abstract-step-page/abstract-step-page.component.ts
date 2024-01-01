import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit, inject, OnDestroy, ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
import { TemplateCollectionService } from '../template-collection.service';
import { Observable, Subscription, of, tap } from 'rxjs';
import { tag } from 'rxjs-spy/operators';
import { UserState } from 'src/app/pages/user/UserState/user-state.reducer';
import { Store } from '@ngrx/store';
import { NewMortageActions } from 'src/app/pages/user/UserState/NewMortageState/new-mortage-state.actions';
import { selectIsFinished, selectNewMortageCurrenttemplate } from 'src/app/pages/user/UserState/user-state.selectors';



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
  userStore: Store<UserState> = inject(Store<UserState>);

  /** Map de inputs de cada template (step-{input:value})*/
  templateInputs: Map<string, {[key: string]: any}> = new Map<string, {[key: string]: any}>();

  /** State Observables */
  isFinished$: Observable<boolean> = new Observable<boolean>();

   /** Subscriptnions */
   subscriptions: Subscription[] = [];
   validationSubscription: Subscription = new Subscription();

  constructor() {
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.isFinished$ = this.userStore.select(selectIsFinished).pipe(
      tap(res => console.log(res))
    );
    this.userStore.select(selectNewMortageCurrenttemplate).subscribe(res => {
      console.log(res);
      if(res && res !== null) {
        this.getTemplate(res);
      }
    })
  }

  nextForm() {
    this.userStore.dispatch(NewMortageActions.nextTemplate());
  }

  previousForm() {
    this.userStore.dispatch(NewMortageActions.previousTemplate());
  }

  getTemplate(template: MortageTemplate): void {
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
