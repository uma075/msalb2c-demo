import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msal';
import { environment } from '../../../environments/environment';

@Injectable()
export class MSALService {
    // private applicationConfig: any = {
    //     clientID: 'df7cc9df-8073-4017-a108-390c4ca170f0',
    //     graphScopes: ['user.read']
    // };

    private applicationConfig: any = {
        clientID: 'ddc68d0a-7f70-4233-b295-5e676fa403e2',
        authority: 'https://login.microsoftonline.com/tfp/demob2ccompany.onmicrosoft.com/B2C_1_Signup1',
        b2cScopes: ['https://demob2ccompany.onmicrosoft.com/user.read'],
        redirectUrl: 'https://msalb2c-demo.azurewebsites.net/',
        extraQueryParameter: 'p=B2C_1_signin&scope=openid&nux=1'
    };

    private app: any;
    public user: any;
    constructor() {
        this.app = new UserAgentApplication(this.applicationConfig.clientID, this.applicationConfig.authority,
            (errorDesc, token, error, tokenType) => {
               console.log(token);
            }, { redirectUri: this.applicationConfig.redirectUrl });
        // this.app.redirectUri=this.applicationConfig.redirectUrl;
    }
    public login() {
        let tokenData = '';
        this.app.loginRedirect(this.applicationConfig.b2cScopes).then(data => {tokenData = data; });
    }

    public getUser() {
        const user = this.app.getUser();
        if (user) {
            return user;
        } else {
            return null;
        }
    }

    public logout() {
        this.app.logout();
    }

    public getToken() {
        return this.app.acquireTokenSilent(this.applicationConfig.b2cScopes)
            .then(accessToken => {
                console.log(accessToken);
                return accessToken;
            }, error => {
                return this.app.acquireTokenPopup(this.applicationConfig.b2cScopes)
                    .then(accessToken => {
                        return accessToken;
                    }, err => {
                        console.error(err);
                    });
            });
    }
}
