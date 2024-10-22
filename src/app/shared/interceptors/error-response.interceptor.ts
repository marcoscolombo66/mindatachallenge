import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs';
import { UrlConfigService } from '@services/url-config.service';

export const ErrorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const urlConfigService = inject(UrlConfigService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 200) {
        console.error('Se cambiara de Url en el endpoint: ' + error.message);
        // Cambiar a la URL de fallback
        urlConfigService.setFallbackUrl();
        const newReq = req.clone({
          url: urlConfigService.getFullUrl(),
        });

        // Reintentar la petición con la nueva URL
        return next(newReq).pipe(
          catchError((retryError: HttpErrorResponse) => {
            // Manejar el error del reintento aquí si es necesario
            const errorResponse = `Reintento fallido - status: ${retryError.status}, message: ${retryError.message}`;
            throw new Error(errorResponse);
          })
        );
      }

      // Si no es un 404 o 500, lanza el error original
      const errorResponse = `Interceptor Error status: ${error.status}, message: ${error.message}`;
      throw new Error(errorResponse);
    })
  );
};
