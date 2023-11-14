import { ErrorHandler, Injectable } from "@angular/core";
import { DomoBasicDialogComponent } from "@domo/domo-commons-lib";
import { MessageService } from "primeng/api";

@Injectable()
export class HttpBlackBirdErrorHandler implements ErrorHandler {

    constructor(private messageService: MessageService) {}
    
    handleError(error: any): void {
        this.showTopCenter(error.error.message);
    }

    showTopCenter(detail: string) {
        this.messageService.add({key: 'httpErrors', severity:'error', summary: 'Error', detail});
    }

}