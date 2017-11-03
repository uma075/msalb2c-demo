import { Injectable } from '@angular/core';
import { MSALService } from '../service/msal.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';
@Injectable()
export class AuthenticationSandbox {
    constructor(private authService: AuthService) {
    }

    public getToken(): string {
        return this.authService.getToken();
    }

    public login(): void {
        this.authService.login();
    }

    public getUser(): Observable<any> {
        return this.authService.getTokenDecoded();
    }
}
