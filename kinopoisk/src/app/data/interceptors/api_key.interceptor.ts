import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { api_key } from "../API-KEY";

export function api_keyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn){
    req = req.clone({
        headers: req.headers.set('X-API-KEY', api_key),
    })

    return next(req)
}

 