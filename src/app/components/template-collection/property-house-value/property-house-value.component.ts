import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-property-house-value',
  templateUrl: './property-house-value.component.html',
  styleUrls: ['./property-house-value.component.scss']
})
export class PropertyHouseValueComponent implements OnInit {

  @ViewChild('totalEntry') totalEntry!: ElementRef<any>;

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

  MIN_ENTRY_CONTRIBUTE: number = this.propertyValue*this.MIN_TO_CONTRIBUTE;
  MAX_ENTRY_CONTRIBUTE: number = this.propertyValue;
  MIN_TOTAL_ENTRY_CONTRIBUTE: number = this.propertyValue*this.MIN_TO_CONTRIBUTE + this.propertyValue*0.12;
  MAX_TOTAL_ENTRY_CONTRIBUTE: number = this.propertyValue + this.propertyValue*0.12;



  constructor() {}

  ngOnInit(): void {
    
  }

  set totalEntryAportation(totalEntryAportation: number) {
    this._totalEntryAportation = totalEntryAportation;
    this.mortageImport = this.updateMortageImport();
    this.mortagePercentage = this.updateMortagePercentageImport();
    this.entryValue = this._totalEntryAportation - this.taxAndCost;
  }

  set yearsToMortage(yearsToMortageValue: number) {
    this._yearsToMortage = yearsToMortageValue;
  }

  get yearsToMortage(): number {
    return this._yearsToMortage;
  }

  get totalEntryAportation(): number {
    return this._totalEntryAportation;
  }

  set propertyValue(propertyValue: number) {
    this._propertyValue = propertyValue;
    this.entryValue = this.propertyValue*this.MIN_TO_CONTRIBUTE;
    this.taxAndCost = this.propertyValue*0.12;
    this.totalEntryAportation = this.entryValue + this.taxAndCost;
    this.mortageImport = this.updateMortageImport();
    this.mortagePercentage = this.updateMortagePercentageImport();
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
  }

  sliderEntryValue(event: any) {
    this.entryValue = +event.value;
    this.totalEntryAportation = this.entryValue + this.taxAndCost;
    this.mortageImport = this.updateMortageImport();
    this.mortagePercentage = this.updateMortagePercentageImport();
  }

  sliderTaxAndCostValue(event: any) {
    this.taxAndCost = +event.value;
    this.totalEntryAportation = this.entryValue + this.taxAndCost;
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
    this.mortagePercentage = this.updateMortagePercentageImport();
  }

  sliderTotalAportationValue(event: any) {
    this.totalEntryAportation = +event.value;
  }

  sliderYearsValue(event: any) {
    this.yearsToMortage = +event.value;
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

  validateForm(): boolean {
    return !(this.minMaxValueExceded(this.MIN_MORTAGE, this.MAX_MORTAGE, this.propertyValue) || 
             this.minMaxValueExceded(this.MIN_YEARS, this.MAX_YEARS, this.yearsToMortage) ||
             this.minMaxValueExceded(this.MIN_TOTAL_ENTRY_CONTRIBUTE, this.MAX_TOTAL_ENTRY_CONTRIBUTE, this.totalEntryAportation) ||
             this.minMaxValueExceded(this.entryValue, this.MIN_ENTRY_CONTRIBUTE, this.MAX_ENTRY_CONTRIBUTE));
  }

}
