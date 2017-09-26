import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

import { AlertService } from '../services/alert.service';

import { UsuarioService } from '../services/usuario.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    public user: any = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    constructor(
        private alert: AlertService,
        private usuarioService: UsuarioService,
        private router: Router
    ) { }

    ngOnInit() { }

    private registrar(usuario: any) {
        this.usuarioService.crearUsuario(usuario).subscribe(
            (mensaje: any) => {
              this.alert.showSuccess(mensaje.message);
              this.router.navigate(['/correcto']);
            },
            error => {
              console.log(error)
              this.alert.showError(error);
            });
    }

    public limpiar () {
        this.user.name = '';
        this.user.email = '';
        this.user.password = '';
        this.user.confirmPassword = ''
    }
}
