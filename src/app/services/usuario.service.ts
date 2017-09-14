import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from '../shared/settings/config.service';
import { IUsuario } from '../shared/settings/interfaces';

@Injectable()
export class UsuarioService {
    _baseUrl: string = '';


    constructor(private http: Http, private configService: ConfigService) {
        this._baseUrl = configService.getApiURI();
    }

    //Traer todos el listado de usuarios
    public getUsuariosTodos(): Observable<IUsuario[]> {
        return this.http.get(this._baseUrl + 'usuarios')
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
    //crear Usuario
    public crearUsuario(usuario: IUsuario): Observable<IUsuario> {

        let body = JSON.stringify(usuario);
        console.log(body);
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._baseUrl + 'usuarios', body.toString(), options)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
    
    //Modificar Usuario
    public modificarUsuario(anexo: IUsuario): Observable<void> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(this._baseUrl + 'usuarios' , JSON.stringify(anexo), {
            headers: headers
        })
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    //Eliminar Usuario
    public eliminarUsuario(id: number): Observable<void> {
        return this.http.delete(this._baseUrl + 'usuarios/' + id)
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


}