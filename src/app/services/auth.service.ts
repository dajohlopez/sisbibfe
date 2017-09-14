import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import { ConfigService } from '../shared/settings/config.service';

@Injectable()
export class AuthService {
    _baseUrl: string;

    constructor(private http: Http, private configService: ConfigService) {
        this._baseUrl = configService.getApiURI();
    }

    signin(email: string, password: string) {

        let user = '';
        const headers = new Headers();
        headers.append('X-Request-With', 'XMLHttpRequest');

        const options = new RequestOptions({ headers: headers });

        return this.http.post(this._baseUrl + 'auth_login',
            { email: email, password: password }, options)
            .map(
            (response: Response) => {
                user = response.json();
                const token = response.json().token;
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                return { token: token, decoded: JSON.parse(window.atob(base64)) };
            }
            ).do(
            tokenData => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('isLoggedin', 'true');
                // localStorage.setItem('token', tokenData.token)
            }
            );

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
