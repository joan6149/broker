import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  inject,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { TemplateCollectionService } from '../template-collection.service';
import { Observable, Subscription, tap } from 'rxjs';
import { UserState } from 'src/app/pages/user/UserState/user-state.reducer';
import { Store } from '@ngrx/store';
import { NewMortageActions } from 'src/app/pages/user/UserState/NewMortageState/new-mortage-state.actions';
import { selectCurrentStep, selectCurrentStepisCorrect, selectIsFinished, selectNewMortageCurrenttemplate } from 'src/app/pages/user/UserState/user-state.selectors';


export interface MortageTemplate {
  name?: string,
  title: string,
  template?: TemplateRef<any>,
  component: any,
  isValid: boolean,
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
  currentStep$: Observable<number> = new Observable<number>();

  /** State subscribed data */
  isValid: boolean = true;
  templateTitle: string = '';

   /** Subscriptnions */
   subscriptions: Subscription[] = [];
   validationSubscription: Subscription = new Subscription();

  constructor() {
    
  }

  ngOnDestroy(): void {
    this.validationSubscription.unsubscribe();
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.isFinished$ = this.userStore.select(selectIsFinished);
    this.currentStep$ = this.userStore.select(selectCurrentStep).pipe(
      tap(step => this.currentStep = String(step))
    );
    this.validationSubscription = this.userStore.select(selectCurrentStepisCorrect).subscribe(res => this.isValid = res);
    this.subscriptions.push(this.userStore.select(selectNewMortageCurrenttemplate).subscribe(res => {
      this.templateTitle = res?.title ?? '';
      if(res && res !== null) {
        this.getTemplate(res);
      }
    }));
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
      this.container.clear();
      const component: any = this.setInputValuesForComponent(this.container.createComponent<any>(template.component).instance, template);
      this.cdrService.detectChanges();
      console.log(`Step: ${this.currentStep}: ${JSON.stringify(template)}`);
    }
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
  abstract configureTemplate(template: MortageTemplate): void

}
