import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthInterseptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // intersept every request by adding the token to it

        // copy the req since it can't be directly edited
        const copiedReq = req.clone({params: req.params.set('auth', this.authService.getToken())});

        return next.handle(copiedReq);
    }
}