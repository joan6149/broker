import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BaseForm } from '../base-form-component/base-form';
import { TemplateCollectionService } from '../template-collection.service';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { TimeclockService } from 'src/app/services/timeclock.service';
import { ValidationCode } from '../models/initData.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent extends BaseForm implements OnInit, OnDestroy {

  @ViewChildren('inputs') inputs: QueryList<ElementRef<HTMLInputElement>> = new QueryList<ElementRef<HTMLInputElement>>();
  showAdvice: boolean = false;

  constructor(private templateCollectionService: TemplateCollectionService, 
              private cookieService: CookieService, private timeclockService: TimeclockService) {
    super();
  }

  ngOnInit(): void {
    if(environment.production === true) {
      this.subscriptions.push(this.templateCollectionService.sendValidationCode(JSON.parse(this.cookieService.get('token')).userId).subscribe((res: ValidationCode) => {
        const caduked: number = (new Date().getTime() - new Date(res.createdAt!).getTime())/1000;
        if(caduked > 300) {
          this.timeclockService.showToastMessage('Codigo de validación enviado');
        }
        this.showAdvice = true;
      }));
    } else {
      this.timeclockService.showToastMessage('Mete 2222 para avanzar');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeInput(evt:KeyboardEvent, index: number): void {
    let input: HTMLInputElement = evt.target as HTMLInputElement;
    if(input.value.length > 0 && index < 4) {
      this.inputs.get(index+1)?.nativeElement.focus();
    }
    this.checkAllInputs();
  }

  checkAllInputs(): void {
    const haveVoids: boolean = this.inputs.some(c => c.nativeElement.value.length === 0);
    if(!haveVoids) {
      this.isValid(true);
      this.templateCollectionService.verificationCode = this.getVerificationCode();
    } else {
      this.isValid(false);
    }
  }

  getVerificationCode(): string {
    return this.inputs.map(c => c.nativeElement.value).join('');
  }



}
