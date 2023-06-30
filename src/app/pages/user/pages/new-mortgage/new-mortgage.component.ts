import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewMortage, PetitionType } from '../../models/NewMortage.model';

@Component({
  selector: 'app-new-mortgage',
  templateUrl: './new-mortgage.component.html',
  styleUrls: ['./new-mortgage.component.scss']
})
export class NewMortgageComponent implements OnInit, AfterViewInit {

  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;
  @ViewChild('container_1', {read: ViewContainerRef}) container_1!: ViewContainerRef;
  @ViewChild('typeOfPetition') typeOfPetition!: TemplateRef<any>;
  @ViewChild('initDataForm') initDataForm!: TemplateRef<any>;

  currentStep: string = '1';
  numberOfSteps: number = 4;
  titles: Map<string, string> = new Map<string, string>();
  templates: Map<string, TemplateRef<any>> = new Map<string, TemplateRef<any>>();
  mortageData: NewMortage = new NewMortage();

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.setTitles();
    this.route.paramMap.subscribe(params => {
      this.currentStep = params.get('step') ?? '1';
    });
  }

  ngAfterViewInit(): void {
    this.setTemplates();
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

  setTitles() {
    this.titles.set('1', 'Tipo de solicitud');
    this.titles.set('2', 'Datos');
  }

  setTemplates() {
    this.templates.set('1', this.typeOfPetition);
    this.templates.set('2', this.initDataForm);
  }

  getTemplate() {
    console.log(this.currentStep);
    console.log(this.templates);
    this.container.clear();
    this.container_1.clear();
    this.container.createEmbeddedView(this.templates.get(this.currentStep) || this.typeOfPetition);

    if(this.mortageData.petitionType === PetitionType.CONJUNTA && this.currentStep !== '1') {
      this.container_1.createEmbeddedView(this.templates.get(this.currentStep) || this.typeOfPetition);
    }
  }

  submit() {
    console.log('Finalizado');
  }

  setPetitionType(petitionType: PetitionType) {
    console.log(petitionType);
    this.mortageData.petitionType = petitionType;
  }

}
