import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseForm } from '../base-form-component/base-form';
import { PetitionType } from 'src/app/pages/user/models/NewMortage.model';
import { TemplateCollectionService } from '../template-collection.service';
import { InExValue, IncomeAndExpensesFormArrayComponent } from './income-and-expenses-form-array/income-and-expenses-form-array.component';

@Component({
  selector: 'app-income-and-expenses',
  templateUrl: './income-and-expenses.component.html',
  styleUrls: ['./income-and-expenses.component.scss']
})
export class IncomeAndExpensesComponent extends BaseForm implements OnInit, OnDestroy {

  @ViewChild('ingresosSolicitante') ingresosSolicitante!: IncomeAndExpensesFormArrayComponent;
  @ViewChild('degresosSolicitante') degresosSolicitante!: IncomeAndExpensesFormArrayComponent;

  ingresoSolicitante: Map<string, number> = new Map<string, number>(); 
  degresoSolicitante: Map<string, number> = new Map<string, number>();
  ingresoAcompaniante: Map<string, number> = new Map<string, number>(); 
  degresoAcompaniante: Map<string, number> = new Map<string, number>();
  solicitanteInitIngresValues: InExValue[] = [];
  solicitanteInitDegresValues: InExValue[] = [];
  acompanianteInitIngresValues: InExValue[] = [];
  acompanianteInitDegresValues: InExValue[] = [];
  petitionType: string = PetitionType.INDIVIDUAL;

  ingresosTotales: number = 0;
  gastosTotales: number = 0;

  ingressConceptValues: string[] = [
    'Salario neto mensual',
    'Rentas inmobiliarias',
    'Dividendos de acciones',
    'Negocio',
    'Pension',
    'Otros'
  ]

  gastosConceptValue: string[] = [
    'Hipoteca existente',
    'Prestamos personales',
    'Financiaciones',
    'Renta de alquiler',
    'Manutención',
    'Pensión compensatoria',
    'Targeta de crédito',
    'Otros'
  ]

  constructor(private templateCollectionService: TemplateCollectionService) {
    super();
    this.petitionType = this.templateCollectionService.mortageData.petitionType;
   }

  ngOnInit(): void {
    this.getIniValues()
    this.isValid(true);
  }

  ngOnDestroy(): void {
  }

  addIngresValue(value: InExValue[], solicitante: string): void {
    if(solicitante === 'SOLICITANTE') {
      this.templateCollectionService.mortageData.solicitante.totalIngresos = value.map(val => val.quantity).reduce((prev: number, curr: number) => {
        return prev + curr;
      },0);

      this.templateCollectionService.mortageData.solicitante.ingresos = value;
    }

    if(solicitante === 'ACOMPANIANTE') {
      this.templateCollectionService.mortageData.acompaniante.totalIngresos = value.map(val => val.quantity).reduce((prev: number, curr: number) => {
        return prev + curr;
      },0);
      this.templateCollectionService.mortageData.acompaniante.ingresos = value;
    }
    this.ingresosTotales = this.templateCollectionService.mortageData.solicitante.totalIngresos + (this.templateCollectionService.mortageData.acompaniante.totalIngresos || 0); 
  }

  addExValue(value: InExValue[], solicitante: string): void {
    if(solicitante === 'SOLICITANTE') {
      this.templateCollectionService.mortageData.solicitante.totalGastos = value.map(val => val.quantity).reduce((prev: number, curr: number) => {
        return prev + curr;
      },0);
      this.templateCollectionService.mortageData.solicitante.gastos = value;
    }

    if(solicitante === 'ACOMPANIANTE') {
      this.templateCollectionService.mortageData.acompaniante.totalGastos = value.map(val => val.quantity).reduce((prev: number, curr: number) => {
        return prev + curr;
      },0);
      this.templateCollectionService.mortageData.acompaniante.gastos = value;
    }
    this.gastosTotales = this.templateCollectionService.mortageData.solicitante.totalGastos + (this.templateCollectionService.mortageData.acompaniante.totalGastos || 0); 
  }

  private getIniValues(): void {
    this.solicitanteInitIngresValues = this.templateCollectionService.mortageData.solicitante.ingresos;
    this.solicitanteInitDegresValues = this.templateCollectionService.mortageData.solicitante.gastos;
    this.acompanianteInitIngresValues = this.templateCollectionService.mortageData.acompaniante.ingresos;
    this.acompanianteInitDegresValues = this.templateCollectionService.mortageData.acompaniante.gastos;
    
  }

  public calcRatio(): number {
    if(this.ingresosTotales && this.gastosTotales) {
      return Math.round((this.gastosTotales/this.ingresosTotales)*100);
    }
    return 0;
  }

}
