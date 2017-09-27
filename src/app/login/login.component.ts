import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

import { ToastrService } from 'toastr-ng2';

import { AuthService } from '../services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    constructor(
        private toastrService: ToastrService,
        private authService: AuthService,
        private _vcr: ViewContainerRef,
        public router: Router
    ) {
    }

    ngOnInit() {
    }

    onLoggedin(form: NgForm) {
        this.authService.signin(form.value.email, form.value.password)
            .subscribe(
            () => {
                this.showSuccess();
                this.router.navigate(['/dashboard']);
            },
            error => {
                this.showError();
            });
        // localStorage.setItem('isLoggedin', 'true');
    }

    showSuccess() {
        this.toastrService.success('Bienvenido!', 'Acceso concedido');
    }

    showError() {
        this.toastrService.error('Correo o contraseña erradas, vuelva a intentar', 'Lo sentimos!');
    }

}
