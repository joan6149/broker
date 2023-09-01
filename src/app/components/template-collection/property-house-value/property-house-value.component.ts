import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TemplateCollectionService } from '../template-collection.service';
import { NewMortage } from 'src/app/pages/user/models/NewMortage.model';

@Component({
  selector: 'app-property-house-value',
  templateUrl: './property-house-value.component.html',
  styleUrls: ['./property-house-value.component.scss']
})
export class PropertyHouseValueComponent implements OnInit {

  @ViewChild('totalEntry') totalEntry!: ElementRef<any>;
  mortageData!: NewMortage;

  MAX_MORTAGE: number = environment.MortageValues.maxMortage;
  MIN_MORTAGE: number = environment.MortageValues.minMortage;
  MAX_YEARS: number = environment.MortageValues.maxYears;
  MIN_YEARS: number = environment.MortageValues.minYears;

  MIN_TO_CONTRIBUTE: number = Number((1 - environment.MortageValues.maxPercentage).toFixed(1));



  _propertyValue: number = this.MIN_MORTAGE;
  entryValue: number = this.propertyValue*this.MIN_TO_CONTRIBUTE;
  taxAndCost: number = this.propertyValue*0.12;
  _totalEntryAportation: number = this.entryValue + this.taxAndCost;
  _yearsToMortage: number = this.MIN_YEARS;
  mortageImport: number = this.updateMortageImport();
  mortagePercentage: number = this.updateMortagePercentageImport();

  isCorrectForm: boolean = this.validateForm();
  showErrorDialog: boolean = false;

  MIN_ENTRY_CONTRIBUTE: number = this.propertyValue*this.MIN_TO_CONTRIBUTE;
  MAX_ENTRY_CONTRIBUTE: number = this.propertyValue;
  MIN_TOTAL_ENTRY_CONTRIBUTE: number = this.propertyValue*this.MIN_TO_CONTRIBUTE + this.propertyValue*0.12;
  MAX_TOTAL_ENTRY_CONTRIBUTE: number = this.propertyValue + this.propertyValue*0.12;

  ERROR_MSG: string = '';
  ERROR_TITLE: string = 'Error en el campo ';



  constructor(private templateService: TemplateCollectionService) {

  }

  ngOnInit(): void {
    this.mortageData = this.templateService.mortageData;
    this.mortageData.hipoteca.importeHipoteca = this.updateMortageImport();
    this.mortageData.hipoteca.porcentageHipotecar = this.updateMortagePercentageImport();
  }

  set totalEntryAportation(totalEntryAportation: number) {
    this._totalEntryAportation = totalEntryAportation;
    if(!this.minMaxValueExceded(this.totalEntryAportation, this.MIN_TOTAL_ENTRY_CONTRIBUTE, this.MAX_TOTAL_ENTRY_CONTRIBUTE)) {
      this.mortageImport = this.updateMortageImport();
      this.mortageData.hipoteca.importeHipoteca = this.mortageImport;
      this.mortagePercentage = this.updateMortagePercentageImport();
      this.mortageData.hipoteca.porcentageHipotecar = this.mortagePercentage;
      this.entryValue = this._totalEntryAportation - this.taxAndCost;
    }
  }

  set yearsToMortage(yearsToMortageValue: number) {
    this._yearsToMortage = yearsToMortageValue;
    this.mortageData.hipoteca.anos = yearsToMortageValue;
  }

  get yearsToMortage(): number {
    return this._yearsToMortage;
  }

  get totalEntryAportation(): number {
    return this._totalEntryAportation;
  }

  set propertyValue(propertyValue: number) {
    this._propertyValue = propertyValue;
    this.mortageData.hipoteca.valorPropiedad = propertyValue;
    this.mortageData.hipoteca.vivienda.valorVivienda = propertyValue;
    this.entryValue = this.propertyValue*this.MIN_TO_CONTRIBUTE;
    this.mortageData.hipoteca.valorEntrada = this.entryValue;
    this.taxAndCost = this.propertyValue*0.12;
    this.mortageData.hipoteca.costesImpuestos = this.taxAndCost;
    this.totalEntryAportation = this.entryValue + this.taxAndCost;
    this.mortageData.hipoteca.valorTotalEntradaAportar = this.totalEntryAportation;
    this.mortageImport = this.updateMortageImport();
    this.mortageData.hipoteca.importeHipoteca = this.mortageImport;
    this.mortagePercentage = this.updateMortagePercentageImport();
    this.mortageData.hipoteca.porcentageHipotecar = this.mortagePercentage;
    this.MAX_TOTAL_ENTRY_CONTRIBUTE = this.propertyValue + this.propertyValue*0.12;
    this.MIN_TOTAL_ENTRY_CONTRIBUTE = this.propertyValue*this.MIN_TO_CONTRIBUTE + this.propertyValue*0.12;
    this.MIN_ENTRY_CONTRIBUTE = this.propertyValue*this.MIN_TO_CONTRIBUTE;
    this.MAX_ENTRY_CONTRIBUTE = this.propertyValue;
  }

  get propertyValue(): number {
    return this._propertyValue;
  }

  sliderPropertyValue(event: any) {
    this.propertyValue = +event.value;
    this.validatePropertyValue();
  }

  sliderEntryValue(event: any) {
    this.entryValue = +event.value;
    this.mortageData.hipoteca.valorEntrada = this.entryValue;
    this.totalEntryAportation = this.entryValue + this.taxAndCost;
    this.mortageData.hipoteca.valorTotalEntradaAportar = this.totalEntryAportation;
    this.mortageImport = this.updateMortageImport();
    this.mortageData.hipoteca.importeHipoteca = this.mortageImport;
    this.mortagePercentage = this.updateMortagePercentageImport();
    this.mortageData.hipoteca.porcentageHipotecar = this.mortagePercentage;
    this.validateEntryValue();
  }

  sliderTaxAndCostValue(event: any) {
    this.taxAndCost = +event.value;
    this.mortageData.hipoteca.costesImpuestos = this.taxAndCost;
    this.totalEntryAportation = this.entryValue + this.taxAndCost;
    this.mortageData.hipoteca.valorTotalEntradaAportar = this.totalEntryAportation;
  }

  checkIfNumber(event: KeyboardEvent) {
    if(!/^[0-9]$/.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
      return
    }
  }

  updateMortageImport(): number {
    return this.propertyValue - this.entryValue;
  }

  updateMortagePercentageImport(): number {
    return (this.mortageImport / this.propertyValue) * 100;
  }

  recalculateImports() {
    this.mortageImport = this.updateMortageImport();
    this.mortageData.hipoteca.importeHipoteca = this.mortageImport;
    this.mortagePercentage = this.updateMortagePercentageImport();
    this.mortageData.hipoteca.porcentageHipotecar = this.mortagePercentage;
  }

  sliderTotalAportationValue(event: any) {
    this.totalEntryAportation = +event.value;
    this.mortageData.hipoteca.valorTotalEntradaAportar = this.totalEntryAportation;
    this.validateTotalEntryValue();
  }

  sliderYearsValue(event: any) {
    this.yearsToMortage = +event.value;
    this.validateTotalYearsValue();
  }

  minMaxValueExceded(value: number, minValue?: number, maxValue?: number): boolean {

    if(maxValue && value > maxValue) {
      return true;
    }

    if(minValue && value < minValue) {
      return true;
    }

    return false;
  }

  closeErrorDialog() {
    this.showErrorDialog = false;
    console.log(this.showErrorDialog);
  }

  /**
   * Funciones de validacion de valores
   */

  validateForm(): boolean {
    return !(this.minMaxValueExceded(this.propertyValue, this.MIN_MORTAGE, this.MAX_MORTAGE) || 
             this.minMaxValueExceded(this.yearsToMortage, this.MIN_YEARS, this.MAX_YEARS) ||
             this.minMaxValueExceded(this.totalEntryAportation, this.MIN_TOTAL_ENTRY_CONTRIBUTE, this.MAX_TOTAL_ENTRY_CONTRIBUTE) ||
             this.minMaxValueExceded(this.entryValue, this.MIN_ENTRY_CONTRIBUTE, this.MAX_ENTRY_CONTRIBUTE));
  }

  validatePropertyValue() {
    if(this.minMaxValueExceded(this.propertyValue, this.MIN_MORTAGE, this.MAX_MORTAGE)) {
      this.ERROR_TITLE = this.ERROR_TITLE+'Valor de la propiedad'
      this.ERROR_MSG = 'Valor de la propedad incorrecto'; 
      this.showErrorDialog = true;
      this.isCorrectForm = false;
      this.templateService.setCurrentTemplateIsCorrect(this.isCorrectForm);
    } else {
      this.isCorrectForm = true;
      this.templateService.setCurrentTemplateIsCorrect(this.isCorrectForm);
    }
  }

  validateEntryValue() {
    if(this.minMaxValueExceded(this.entryValue, this.MIN_ENTRY_CONTRIBUTE, this.MAX_ENTRY_CONTRIBUTE)) {
      this.ERROR_TITLE = this.ERROR_TITLE+'valor de entrada'
      this.ERROR_MSG = 'Valor de entrada incorrecto'; 
      this.showErrorDialog = true;
      this.isCorrectForm = false;
      this.templateService.setCurrentTemplateIsCorrect(this.isCorrectForm);
    } else {
      this.isCorrectForm = true;
      this.templateService.setCurrentTemplateIsCorrect(this.isCorrectForm);
    }
  }

  validateTotalEntryValue() {
    if(this.minMaxValueExceded(this.totalEntryAportation, this.MIN_TOTAL_ENTRY_CONTRIBUTE, this.MAX_TOTAL_ENTRY_CONTRIBUTE)) {
      this.ERROR_TITLE = this.ERROR_TITLE+'total valor de entrada'
      this.ERROR_MSG = `Para el importe ${this.propertyValue}€ el campo valor de entrada debe estar entre ${this.MIN_TOTAL_ENTRY_CONTRIBUTE}€ y ${this.MAX_TOTAL_ENTRY_CONTRIBUTE}€`; 
      this.showErrorDialog = true;
      this.isCorrectForm = false;
      this.templateService.setCurrentTemplateIsCorrect(this.isCorrectForm);
    } else {
      this.isCorrectForm = true;
      this.templateService.setCurrentTemplateIsCorrect(this.isCorrectForm);
    }
  }

  validateTotalYearsValue() {
    if(this.minMaxValueExceded(this.yearsToMortage, this.MIN_YEARS, this.MAX_YEARS)) {
      this.ERROR_TITLE = this.ERROR_TITLE+'Años'
      this.ERROR_MSG = 'Total de años incorrecto'; 
      this.showErrorDialog = true;
      this.isCorrectForm = false;
      this.templateService.setCurrentTemplateIsCorrect(this.isCorrectForm);
    } else {
      this.isCorrectForm = true;
      this.templateService.setCurrentTemplateIsCorrect(this.isCorrectForm);
    }
  }

}
