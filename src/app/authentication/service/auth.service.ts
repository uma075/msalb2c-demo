import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { MSALService } from './msal.service';
import { HttpRequest } from '@angular/common/http';
@Injectable()
export class AuthService {
    cachedRequests: Array<HttpRequest<any>> = [];
    constructor(private msalService: MSALService, public jwtHelper: JwtHelper) { }

    public getToken(): string {
        const token: string = window.sessionStorage.getItem('msal.idtoken');
        // if (token == null || token === undefined || token=='null' || !tokenNotExpired('msal.idtoken',token)) {
        //     this.msalService.login();
        // }
        // else {
        //     return token;
        // }
        return token;
    }

    public login() {
        const token = this.getToken();
        if (token == null || token === undefined || token === 'null') {
            this.msalService.login();
        }
    }

    public getTokenDecoded(): any
    {
      return this.jwtHelper.decodeToken(this.getToken());
    }

    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }
}
