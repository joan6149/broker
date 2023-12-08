import { Component, TemplateRef, ViewChild, Inject, OnInit, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewMortage, PetitionType } from '../../models/NewMortage.model';
import { AbstractStepPageComponent, MortageTemplate } from 'src/app/components/template-collection/abstract-step-page/abstract-step-page.component';
import { IndOrColectiveComponent } from 'src/app/components/template-collection/ind-or-colective/ind-or-colective.component';
import { InitDataFormAppComponent } from 'src/app/components/template-collection/init-data-form/init-data-form.component';
import { CivilStateComponent } from 'src/app/components/template-collection/civil-state/civil-state.component';
import { SonsComponent } from 'src/app/components/template-collection/sons/sons.component';
import { ResidencePermitComponent } from 'src/app/components/template-collection/residence-permit/residence-permit.component';
import { CurrentHousingSituationComponent } from 'src/app/components/template-collection/current-housing-situation/current-housing-situation.component';
import { CountryOfResidenceComponent } from 'src/app/components/template-collection/country-of-residence/country-of-residence.component';
import { environment } from 'src/environments/environment';
import { Observable, map, of, tap } from 'rxjs';
import { TimeclockService } from 'src/app/services/timeclock.service';
import { ValidationCode } from 'src/app/components/template-collection/models/initData.interface';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { UserState } from '../../UserState/user-state.reducer';
import { UserStateActions } from '../../UserState/user-state.actions';

@Component({
  selector: 'app-new-mortgage',
  templateUrl: '../../../../components/template-collection/abstract-step-page/abstract-step-page.component.html',
  styleUrls: ['../../../../components/template-collection/abstract-step-page/abstract-step-page.component.scss']
})
export class NewMortgageComponent extends AbstractStepPageComponent<NewMortage> implements OnInit {

  /** Plantillas */
  @ViewChild('EmptyTemplate') EmptyTemplate!: TemplateRef<any>;

  /** Injections */
  timeClockService: TimeclockService = inject(TimeclockService);
  cookieService: CookieService = inject(CookieService);
  userStore: Store<UserState> = inject(Store<UserState>);

  /** Template collection */
  templateCollection: Map<String, MortageTemplate> = new Map<String, MortageTemplate>();


  /** Send values betwen solicitants */
  values: any;

  numDeHijosSolicitante: string = '0';
  numDeHijosAcompaniante: string = '0';

  allowNextStepBySolicitant: boolean = false;
  allowNextStepByAcompaniant: boolean = false;

  private static FORM_ID: string = '1';


  constructor() {
    super();
    this.numberOfSteps = 1;
    this.mortageData = this.templateCollectionService.mortageData;
  }

  ngOnInit(): void {
    // Metemos para cada step los inputs que necesitemos si es que necesitamos, en el siguiente caso el template que se llama directionForm le meto el input shortDirection a true
    this.templateInputs.set('directionForm', {'shortDirection': true});
  }

  @Inject(ActivatedRoute) private route!: ActivatedRoute;

  setTemplates():Observable<boolean> {
    return this.templateCollectionService.getNewMortageTemplates(NewMortgageComponent.FORM_ID).pipe(
      tap((templates: MortageTemplate[]) => {
        this.numberOfSteps = templates.length;
        templates.forEach((template: MortageTemplate, index: number) => {
          this.mortageData.petitionType === PetitionType.INDIVIDUAL ? template.typeOfPetition = PetitionType.INDIVIDUAL : template.typeOfPetition = PetitionType.CONJUNTA;
          this.templates.set(`${index+1}`, template);
        })
      }),
      map(res => true));
  }

  /** Este metodo se llama al otener una nueva template para configurar atributos adicionales en este caso 
   * decirle si es conjunta o individual y de es desacoplar esta decision de los componentes puestoq que es responsabilidad
   * de este componente saber que tiene que pintar y no de los componentes individuales */
  override configureTemplate(template: MortageTemplate): void {
    this.mortageData.petitionType === PetitionType.INDIVIDUAL ? template.typeOfPetition = PetitionType.INDIVIDUAL : template.typeOfPetition = PetitionType.CONJUNTA;
  }

  checkVerificationCode(): Observable<boolean> {
    if(environment.production === false && this.templateCollectionService.verificationCode === '2222') {
      return of(true);
    }

    if(environment.production === true) {
      const validationCode: ValidationCode = {code: Number(this.templateCollectionService.verificationCode), userId: JSON.parse(this.cookieService.get('token')).userId}
      return this.templateCollectionService.checkValidationCode(validationCode);
    }

    return of(false);
  }

  submit() {
    console.log('Finalizado');
    console.log('MORTAGE FINALIZADO ==> ', this.templateCollectionService.mortageData)
    console.log('CODIGO DE VERIFICACION INTRODUCIDO ==> ', this.templateCollectionService.verificationCode);
    const userId: string | null = this.cookieService.check('token') ? JSON.parse(this.cookieService.get('token')).userId : null;
    this.templateCollectionService.mortageData.launchedByUser = userId;
    // checkea codigo de verificacion
    this.subscriptions.push(this.checkVerificationCode().subscribe((res: boolean) => {
      if(!res) {
        this.timeClockService.showToastError('Código de verificación incorrecto')
      } else {
        console.log('Ospes => ', res);
        this.userStore.dispatch(UserStateActions.loadRequest({request: this.templateCollectionService.mortageData}));
        // seria ideal guardarlo en el estado por lo tanto usar ngrx
        // Ir a mis solicitudes
      }
    }))
  }

}
