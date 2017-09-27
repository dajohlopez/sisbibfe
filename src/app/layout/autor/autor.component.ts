import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AlertService } from '../../services/alert.service';

import * as _ from 'underscore';

import { AutorService } from '../../services/autor.service';
import { PaisService } from '../../services/pais.service';

import { IAuthor, ICountry } from '../../shared/settings/interfaces';


@Component({
    selector: 'app-autor',
    templateUrl: 'autor.component.html',
    animations: [routerTransition()]
})
export class AutorComponent implements OnInit {
    // propiedades del componente autor
    public name: string;
    public countries: any[];
    public model2: any = {
        'name': ''
    };
    public closeResult: string;
    public titulo1 = 'LISTADO DE AUTORES';
    public todoautores = [];
    public titulo_modal = '';
    public idautor = '';
    public nombreautor = '';
    public btnguardar = '';
    private modalRef: NgbModalRef;
    public sort = 'asc';

    public author: any; // Objecto enviado para la API

    constructor(
        private alert: AlertService,
        private autorService: AutorService,
        private paisService: PaisService,
        private modalService: NgbModal,
        private router: Router
    ) {
    }
    // para el modal Registro y Editar
    public showModal(t: string): void {

        if (t === 'N') {
            this.titulo_modal = 'NUEVO/REGISTRAR';
            this.btnguardar = 'NEW';
        }
        if (t === 'M') {
            this.btnguardar = 'EDIT'
            this.titulo_modal = 'EDITAR/MODIFICAR';
        }
        console.log('btnguardar al inicio= ' + this.btnguardar);
    }

    // Fin de modal Eliminar Registro
    ngOnInit() {
        this.cargarAutores();
        this.cargarPaises();
    }

    // cargar Autores
    public cargarAutores() {
        this.autorService.getAutoresTodos().subscribe((todoautores: IAuthor[]) => {
            this.todoautores = todoautores;
        },
            error => {
                this.alert.showError(error);
                this.router.navigate(['/login']);
            });
    }

    // cargar Paises para el auto-complete
    public cargarPaises() {
        this.paisService.getPaisesTodos().subscribe((countries: ICountry[]) => {
            this.countries = countries;
        },
            error => {
                console.log('Fallo Conexion Autor ' + error);
            });
    }

    // Nuevo Autor
    public guardar(aut: any) {
        aut.country_id = this.model2;
        console.log('Este debería ser el id:' + aut.country_id)
        this.author = {
            'id': aut.id,
            'name': aut.name,
            'country_id': aut.country_id.id
        }
        if (this.btnguardar === 'NEW') {
            this.autorService.crearAutor(this.author).subscribe(
                () => {
                    this.alert.showSuccess('Autor creado con éxito');
                    this.cargarAutores();
                    this.model2 = {
                        id: 0 as number,
                        name: ''
                    };
                    this.close();
                },
                error => {
                    this.alert.showError(error);
                });
        }

        if (this.btnguardar === 'EDIT') {
            this.autorService.modificarAutor(this.author).subscribe(
                () => {
                    this.alert.showSuccess('Autor modificado con éxito');
                    this.cargarAutores();
                    this.model2 = {
                        id: 0 as number,
                        name: ''
                    };
                    this.close();
                },
                error => {
                    this.alert.showError(error);
                });
        }

    }
    // Eliminar autor accion
    public eliminar(id: number) {
        this.autorService.eliminarAutor(id).subscribe(
            () => {
                this.alert.showSuccess('Autor eliminado con éxito')
                this.cargarAutores();
                this.close();
            },
            error => {
                this.alert.showError(error);
            });
    }

    // Setea datos Eliminar
    public setAutorEliminar(au: IAuthor, content) {
        this.nombreautor = au.name;
        this.idautor = au.id.toString();
        this.openModal(content);
        this.titulo_modal = 'ELIMINAR';
    }

    // boton Nuevo Modal
    public nuevo(content) {
        this.showModal('N');
        this.limpiarInterface();
        this.openModal(content);
    }

    // Setea el objeto a editar
    public editar(autoreditado, content) {
        this.model2 = autoreditado.country;
        const autoreditar = Object.assign({}, autoreditado)
        this.showModal('M');
        this.author = autoreditar,
            this.author = {
                'id': this.author.id,
                'name': this.author.name,
                'country': this.author.country_id
            }
        this.openModal(content);
    }

    public limpiarInterface() {
        this.author = {
            'name': '',
            'country_id': this.model2
        }
    }

    // Formatear el auto-complete
    autocompleListFormatter = (data: any) => {
        const html = `${data.name}`;
        return (html);
    }

    // Abrir modal
    openModal(content) {
        this.modalRef = this.modalService.open(content);
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    // Cerrar local
    close() {
        this.modalRef.close();
    }

    // metodo para cerrar el modal con teclas de escape o en el boton X de la esquina
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
