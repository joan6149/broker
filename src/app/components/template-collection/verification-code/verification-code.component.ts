import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BaseForm } from '../base-form-component/base-form';
import { TemplateCollectionService } from '../template-collection.service';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent extends BaseForm implements OnInit {

  @ViewChildren('inputs') inputs: QueryList<ElementRef<HTMLInputElement>> = new QueryList<ElementRef<HTMLInputElement>>();

  constructor(private templateCollectionService: TemplateCollectionService) {
    super();
  }

  ngOnInit(): void {
    //Enviar codigoVerificación
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
