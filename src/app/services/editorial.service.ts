import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from '../shared/settings/config.service';
import { JwtService } from '../services/jwt.service';
import { IEditorial } from '../shared/settings/interfaces';

@Injectable()
export class EditorialService {
    _baseUrl = '';


    constructor(private http: Http,
        private configService: ConfigService,
        private jwt: JwtService
    ) {
        this._baseUrl = configService.getApiURI();
    }

    // Traer todos el listado de editoriales
    public getEditorialesTodos(): Observable<IEditorial[]> {
        return this.http.get(this._baseUrl + 'editorials', this.jwt.jwt())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
    // crear Editorial
    public crearEditorial(editorial: IEditorial): Observable<IEditorial> {

        const body = JSON.stringify(editorial);

        return this.http.post(this._baseUrl + 'editorials', body.toString(), this.jwt.jwt())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    // Modificar Editorial
    public modificarEditorial(editorial: IEditorial): Observable<void> {

        return this.http.put(this._baseUrl + 'editoriales/editar', JSON.stringify(editorial), this.jwt.jwt())
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    // Eliminar editorial
    public eliminarEditorial(id: number): Observable<void> {
        return this.http.delete(this._baseUrl + 'editoriales/' + id + '/eliminar', this.jwt.jwt())
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    // Busqueda por nombre
    public buscarNombreEditorial(nombre: string): Observable<void> {
        return this.http.get(this._baseUrl + 'editorials/search/' + nombre, this.jwt.jwt())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    // si ocurre algun error
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
