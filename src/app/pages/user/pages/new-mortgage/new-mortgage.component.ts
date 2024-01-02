import { Component, TemplateRef, ViewChild, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewMortage, PetitionType } from '../../models/NewMortage.model';
import { AbstractStepPageComponent, MortageTemplate } from 'src/app/components/template-collection/abstract-step-page/abstract-step-page.component';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { TimeclockService } from 'src/app/services/timeclock.service';
import { ValidationCode } from 'src/app/components/template-collection/models/initData.interface';
import { CookieService } from 'ngx-cookie-service';
import { RequestStateActions } from '../../UserState/RequestsState/requests-state.actions';
import { NewMortageActions } from '../../UserState/NewMortageState/new-mortage-state.actions';

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

  /** Template collection */
  templateCollection: Map<String, MortageTemplate> = new Map<String, MortageTemplate>();


  /** Send values betwen solicitants */
  values: any;

  numDeHijosSolicitante: string = '0';
  numDeHijosAcompaniante: string = '0';

  allowNextStepBySolicitant: boolean = false;
  allowNextStepByAcompaniant: boolean = false;

  public static FORM_ID: string = '1';


  constructor() {
    super();
    this.mortageData = this.templateCollectionService.mortageData;
  }

  ngOnInit(): void {
    // Metemos para cada step los inputs que necesitemos si es que necesitamos, en el siguiente caso el template que se llama directionForm le meto el input shortDirection a true
    //this.templateInputs.set('directionForm', {'shortDirection': true});
    //this.userStore.select(selectNewMortage).subscribe(templates => console.log(templates));
  }

  @Inject(ActivatedRoute) private route!: ActivatedRoute;

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
    const userId: string | null = this.cookieService.check('token') ? JSON.parse(this.cookieService.get('token')).userId : null;
    this.templateCollectionService.mortageData.launchedByUser = userId;
    // checkea codigo de verificacion
    this.subscriptions.push(this.checkVerificationCode().subscribe((res: boolean) => {
      if(!res) {
        this.timeClockService.showToastError('Código de verificación incorrecto')
      } else {
        this.userStore.dispatch(RequestStateActions.loadRequest({request: this.templateCollectionService.mortageData}));
      }
    }))
  }

}
