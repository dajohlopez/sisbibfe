import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from '../shared/settings/config.service';
import { ICountry } from '../shared/settings/interfaces';

@Injectable()
export class PaisService {
    _baseUrl: string = '';


    constructor(private http: Http, private configService: ConfigService) {
        this._baseUrl = configService.getApiURI();
    }

    //Traer todos el listado de paises
    getPaisesTodos(): Observable<ICountry[]> {
        return this.http.get(this._baseUrl + 'countries', this.jwt())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    //crear Pais
    crearPais(country: ICountry): Observable<ICountry> {

        let body = JSON.stringify(country);
        return this.http.post(this._baseUrl + 'countries', body.toString(), this.jwt())
            .map((res: Response) => {                
                return res.json();
            })
            .catch(this.handleError);
    }

    //Modificar Pais
    modificarPais(country: ICountry): Observable<void> {
        return this.http.post(this._baseUrl + 'country/editar', JSON.stringify(country), this.jwt())
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);

    }

    //Eliminar Pais
    eliminarPais(id: number): Observable<void> {
        return this.http.delete(this._baseUrl + 'country/' + id + '/eliminar', this.jwt())
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    //si ocurre algun error
    private handleError(error: any) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors: string = '';

        if (!serverError.type) {
            console.log('Se detectó un Error' + serverError);

            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            headers.append('Content-Type', 'application/json');
            return new RequestOptions({ headers: headers });
        }
    }

}