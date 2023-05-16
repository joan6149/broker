import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact, DialogAction } from '../components/contact-form/models/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class TimeclockService {

  showForm$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  showDialog$: BehaviorSubject<DialogAction> = new BehaviorSubject<DialogAction>({id: '', show: false} as DialogAction);
  
  constructor(private httpClient: HttpClient) { }

  setShowForm(isShow: Boolean) {
    this.showForm$.next(isShow);
  }

  getShowForm(): Observable<Boolean> {
    return this.showForm$.asObservable();
  }

  setShowDialog(dialogAction: DialogAction) {
    this.showDialog$.next(dialogAction);
  }

  getShowDialog(): Observable<DialogAction> {
    return this.showDialog$.asObservable();
  }

  sendMail(contact: Contact): Observable<any> {
    console.log("Contacto -> ", contact);

    const templateToSend: string = this.templateCreate(contact);
    console.log("BodyToSend ->", templateToSend);

    const parameters: HttpParams = new HttpParams()
                      .set('apikey', environment.mailerSendOptions.apikey)
                      .set('subject', 'TimeClockClient')
                      .set('from', environment.mailerSendOptions.from)
                      .set('to', environment.mailerSendOptions.to)
                      .set('bodyHtml', templateToSend)
    
    return this.httpClient.post<any>(`${environment.mailerSendOptions.baseUrl}/v2/email/send`, null, {params: parameters});
  }

  templateCreate(contact: Contact): string {
    return `<h3><strong>Nombre: </strong> ${contact.nombre}</h3><br>
            <h3><strong>Apellidos: </strong>${contact.apellidos}</h3><br>
            <h3><strong>Email: </strong>${contact.email}</h3><br>
            <h3><strong>Telefono: </strong>${contact.telefono}</h3><br>
            <h3><strong>Tipo de hipoteca que quiere: </strong>${contact.tipo}</h3><br>
            <h3><strong>Descripcion: </strong>${contact.descripcion}</h3><br>
            <h3><strong>Permite que se le llame: </strong>${contact.acepto ? 'Si' : 'No'}</h3>`;
  }
    
}
