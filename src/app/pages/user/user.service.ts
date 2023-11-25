import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewMortage, Request } from './models/NewMortage.model';
import { Observable, of } from 'rxjs';
import { DomoLoggerService } from '@domo/domo-commons-lib';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private httpClient: HttpClient, private logger: DomoLoggerService) { }

  loadRequest(request: Request): Observable<Request> {
    console.log(request);
    if(request instanceof NewMortage) {
      this.logger.getLogger().info('Cargando instancia de Nueva hipoteca');
      return of(new NewMortage())
    }
    this.logger.getLogger().error('Error de tipo de petición');
    throw new Error('Letal')
  }
}
