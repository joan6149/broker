import { ErrorHandler, Injectable } from "@angular/core";
import { DomoBasicDialogComponent } from "@domo/domo-commons-lib";
import { MessageService } from "primeng/api";
import { TimeclockService } from "../services/timeclock.service";

@Injectable()
export class HttpBlackBirdErrorHandler implements ErrorHandler {

    constructor(private timeclockService: TimeclockService) {}
    
    handleError(error: any): void {
        
        this.timeclockService.showToastError(error.error.message)
    }

}