import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationSandbox } from './sandbox/authentication.sandbox';
import { MSALService } from './service/msal.service';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './service/auth.service';
import { AuthenticationGuard } from './authentication.guard';
import { JwtHelper } from 'angular2-jwt';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
    ],
    declarations: [LoginComponent],
    providers: [AuthenticationSandbox, MSALService, AuthService, AuthenticationGuard, JwtHelper],
    exports: [LoginComponent]
})
export class AuthenticationModule {

}
