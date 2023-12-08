import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewMortage, Request } from '../../models/NewMortage.model';
import { EMPTY, Observable, map, of, tap } from 'rxjs';
import { DomoLoggerService } from '@domo/domo-commons-lib';
import { NGXLogger } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { tag } from 'rxjs-spy/cjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  urlSlice: string = 'request';
  
  constructor(private httpClient: HttpClient, private logger: DomoLoggerService, private cookieService: CookieService) { }

  loadRequest(request: Request): Observable<Request> {
    console.log(request);
    if(request instanceof NewMortage) {
      this.logger.getLogger().info('Cargando instancia de Nueva hipoteca');
      return this.httpClient.post<NewMortage>(`${environment.backend}/${this.urlSlice}`, request);
    }
    this.logger.getLogger().error('Error de tipo de petición');
    throw new Error('Letal')
  }

  getAllRequestsByUser(published: boolean): Observable<Request[]> {
    const userId: string | null = this.cookieService.check('token') ? JSON.parse(this.cookieService.get('token')).userId : null;
    if(userId === null) {
      throw new Error("User id is null");
    }
    return this.httpClient.get<NewMortage[]>(`${environment.backend}/${this.urlSlice}/${userId}?published=${published}`);
  }

  publishRequest(requestId: string, publish:boolean):Observable<Request> {
    return this.httpClient.post<Request>(`${environment.backend}/${this.urlSlice}/publishRequest`, {requestId, publish});
  }
}
