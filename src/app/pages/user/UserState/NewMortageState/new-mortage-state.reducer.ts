import { ActionReducerMap, createFeature, createReducer, on } from "@ngrx/store";
import { MortageTemplate } from "src/app/components/template-collection/abstract-step-page/abstract-step-page.component";
import { NewMortageActions } from "./new-mortage-state.actions";
import { PetitionType } from "../../models/NewMortage.model";

export const NewMortageStateFeatureKey = 'NewMortageState';


// falta hacer el selector de los templates y de petitiontype para sustituirlo en la newmortage

export interface NewMortageState {
    error: string | null,
    loading: boolean;
    formId: string | null,
    petitiontype: PetitionType | null,
    currentStep: number,
    numberOfSteps: number,
    isCorrect: boolean,
    isFinished: boolean,
    currentTemplate: MortageTemplate | null,
    templates: MortageTemplate[]
}

export const initialNewMortageState: NewMortageState = {
    error: null,
    loading: false,
    formId: null,
    petitiontype: null,
    currentStep: 0,
    numberOfSteps: 0,
    isCorrect: true,
    isFinished: false,
    currentTemplate: null,
    templates: []
}

export const newMortageStateReducer = createReducer(
    initialNewMortageState,
    on(NewMortageActions.setPetitionType, (state, {petitionType}) => ({...state, petitionType})),
    on(NewMortageActions.getAllTemplates, (state, {formId: string}) => state),
    on(NewMortageActions.getAllTemplatesSuccess, (state, {templates, formId}) => ({
      ...state, 
      formId,
      petitiontype: PetitionType.INDIVIDUAL,
      numberOfSteps: templates.length ,
      currentTemplate: {...templates[state.currentStep]},
      templates: [...templates]})),
    on(NewMortageActions.nextTemplate, (state) => ({
      ...state,
      currentStep: state.currentStep+1,
      isFinished: state.currentStep === (state.numberOfSteps - 2),
      currentTemplate: state.templates[state.currentStep+1]
    })),
    on(NewMortageActions.previousTemplate, (state) => ({
      ...state,
      currentStep: state.currentStep-1,
      currentTemplate: state.templates[state.currentStep-1]
    })),
    on(NewMortageActions.isValidTemplate, (state, {valid}) => ({
      ...state,
      isCorrect: valid
    })),
    on(NewMortageActions.goToStep, (state, {stepNumber}) => ({
      ...state,
      currentStep: stepNumber,
      isFinished: stepNumber === (state.numberOfSteps - 2),
      currentTemplate: state.templates[stepNumber]
    })),
    on(NewMortageActions.newMortageError, (state, {error}) => ({...state, error}))
  );