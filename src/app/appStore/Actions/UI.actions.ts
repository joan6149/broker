import { createAction } from "@ngrx/store";
import { environment } from "src/environments/environment";


export const loading = createAction(`[${environment.appName}] Loading`);
export const Stoploading = createAction(`[${environment.appName}] Stop Loading`);