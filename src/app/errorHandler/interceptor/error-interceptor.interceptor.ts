import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpBlackBirdErrorHandler } from '../HttpBlackBirdErrorHandler';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private readonly httpBlackBirdErrorHandler: HttpBlackBirdErrorHandler) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.httpBlackBirdErrorHandler.handleError(err)
        return throwError(() => err);
      })
    );
  }
}
