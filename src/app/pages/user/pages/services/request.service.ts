import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewMortage, Request } from '../../models/NewMortage.model';
import { Observable, map, of, tap } from 'rxjs';
import { DomoLoggerService } from '@domo/domo-commons-lib';
import { NGXLogger } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { tag } from 'rxjs-spy/cjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  urlSlice: string = 'request';
  
  constructor(private httpClient: HttpClient, private logger: DomoLoggerService) { }

  loadRequest(request: Request): Observable<Request> {
    console.log(request);
    if(request instanceof NewMortage) {
      this.logger.getLogger().info('Cargando instancia de Nueva hipoteca');
      return this.httpClient.post<NewMortage>(`${environment.backend}/${this.urlSlice}`, request);
    }
    this.logger.getLogger().error('Error de tipo de petición');
    throw new Error('Letal')
  }
}
