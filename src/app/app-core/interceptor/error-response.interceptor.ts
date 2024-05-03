import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import exp from "constants";
import { catchError, throwError } from "rxjs";
import HttpStatusCode from "./http-status-code";
import { Router } from "express";
import { inject } from "@angular/core";
import { CustomMessageService } from "../../services/custom-message.service";

export const ErrorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => handleErrorResponse(error, req))
  );
};

function handleErrorResponse(error: HttpErrorResponse, req: HttpRequest<any>) {
  const router = inject(Router);
  const messageServiceCustom= inject(CustomMessageService);

  if (error.status === HttpStatusCode.FORBIDDEN) {
    if (req.method === 'GET') {
      router.navigate([HttpStatusCode.PAGE, error.status]);
    }
  } else if (error.status === HttpStatusCode.UNAUTHORIZED) {
    router.navigate([HttpStatusCode.PAGE, error.status]);
  } else if (
    error.status === HttpStatusCode.INTERNAL_SERVER_ERROR ||
    error.status === HttpStatusCode.BAD_REQUEST
    || error.status === HttpStatusCode.NO_CONTENT
  ) {
    if (error.error?.tagMensaje === 'ErrUsuarioNoRegistrado') {
      router.navigate(['welcome']);
    } else if (error.error?.tagMensaje === 'ErrUsuarioNoTienePermisos') {
      router.navigate([HttpStatusCode.PAGE, HttpStatusCode.FORBIDDEN]);
    }
    else {
      messageServiceCustom.showError(
        'Error',
        'Algo salió mal editando el Area'
      );
    }
  }

  return throwError(error);
}

