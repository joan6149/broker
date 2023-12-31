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
    isCorrect: false,
    isFinished: false,
    currentTemplate: null,
    templates: []
}

export const newMortageStateReducer = createReducer(
    initialNewMortageState,
    on(NewMortageActions.setPetitionType, (state, {petitionType}) => ({...state, petitionType})),
    on(NewMortageActions.getAllTemplates, (state, {formId: string}) => state),
    on(NewMortageActions.getAllTemplatesSuccess, (state, {templates}) => ({
      ...state, 
      petitiontype: PetitionType.INDIVIDUAL,
      numberOfSteps: templates.length ,
      currentTemplate: {...templates[state.currentStep]},
      templates: [...templates]})),
    on(NewMortageActions.nextTemplate, (state) => ({
      ...state,
      currentStep: state.currentStep+1,
      currentTemplate: state.templates[state.currentStep]
    })),
    on(NewMortageActions.previousTemplate, (state) => ({
      ...state,
      currentStep: state.currentStep-1,
      currentTemplate: state.templates[state.currentStep]
    })),
    on(NewMortageActions.newmortageerror, (state, {error}) => ({...state, error}))
  );