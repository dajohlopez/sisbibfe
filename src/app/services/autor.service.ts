import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from '../shared/settings/config.service';
import { JwtService } from '../services/jwt.service';
import { IAutor } from '../shared/settings/interfaces';

@Injectable()
export class AutorService {
    _baseUrl: string = '';


    constructor(private http: Http,
        private jwt: JwtService,
        private configService: ConfigService
    ) {
        this._baseUrl = configService.getApiURI();
    }

    //Traer todos el listado de autores
    getAutoresTodos(): Observable<IAutor[]> {
        return this.http.get(this._baseUrl + 'authors', this.jwt.jwt())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
    //crear Autor
    crearAutor(autor: IAutor): Observable<IAutor> {
        let body = JSON.stringify(autor);
        return this.http.post(this._baseUrl + 'authors', body.toString(), this.jwt.jwt())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    //Modificar Autor
    modificarAutor(autor: IAutor): Observable<void> {

           return this.http.post(this._baseUrl + 'author/editar', JSON.stringify(autor), this.jwt.jwt())
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    //Eliminar autor
    eliminarAutor(id: number): Observable<void> {
        return this.http.delete(this._baseUrl + 'author/' + id + '/eliminar', this.jwt.jwt())
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
            console.log('Se detecto un Error' + serverError);

            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }


}