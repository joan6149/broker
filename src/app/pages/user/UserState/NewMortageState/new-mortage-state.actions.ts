import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { MortageTemplate } from "src/app/components/template-collection/abstract-step-page/abstract-step-page.component";
import { PetitionType } from "../../models/NewMortage.model";

export const NewMortageActions = createActionGroup({
    source: 'NewMortageActions',
    events: {
      'Set Petition Type': props<{petitionType: PetitionType}>(),
      'Get all templates': props<{ formId: String }>(),
      'Get all templates Success': props<{ templates: MortageTemplate[], formId: string}>(),
      'Next template': emptyProps(),
      'Previous template': emptyProps(),
      'Go to step': props<{stepNumber: number}>(),
      'Is Valid template': props<{valid: boolean}>(),
      'NewMortageError':props<{error: string}>()
    }
  });