import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { MortageTemplate } from "src/app/components/template-collection/abstract-step-page/abstract-step-page.component";
import { PetitionType } from "../../models/NewMortage.model";
import { TemplateRef } from "@angular/core";
import { BaseForm } from "src/app/components/template-collection/base-form-component/base-form";

export const NewMortageActions = createActionGroup({
    source: 'NewMortageActions',
    events: {
      'Set Petition Type': props<{petitionType: PetitionType}>(),
      'Get all templates': props<{ formId: String }>(),
      'Get all templates Success': props<{ templates: MortageTemplate[]}>(),
      'Next template': emptyProps(),
      'Previous template': emptyProps(),
      'NewMortageError':props<{error: string}>()
    }
  });