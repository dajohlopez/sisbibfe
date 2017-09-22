import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AlertService } from '../../services/alert.service';

import * as _ from 'underscore';

import { EditorialService } from '../../services/editorial.service';
import { PaisService } from '../../services/pais.service';

import { IEditorial, ICountry } from '../../shared/settings/interfaces';


@Component({
    selector: 'app-editorial',
    templateUrl: 'editorial.component.html',
    animations: [routerTransition()]
})

export class EditorialComponent implements OnInit {
    // propiedades del componente autor
    public name: string;
    public countries: any[];
    public model2: any = {
        'name': ''
    };
    closeResult: string;
    public titulo1 = 'LISTADO DE EDITORIALES';
    todoeditoriales = [];
    titulo_modal = '';
    ideditorial = '';
    nombreeditorial = '';
    btnguardar = '';
    private modalRef: NgbModalRef;
    editor: any;

    public editorial: any; // Objecto enviado para la API

    constructor(
        private alert: AlertService,
        private editorialService: EditorialService,
        private paisService: PaisService,
        private modalService: NgbModal
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
        this.cargarEditoriales();
        this.cargarPaises();
    }

    // cargar Editoriales
    public cargarEditoriales() {
        this.editorialService.getEditorialesTodos().subscribe((todoeditoriales: IEditorial[]) => {
            this.todoeditoriales = todoeditoriales;
        },
            error => {
                console.log('Falló Conexion Editorial ' + error);
            });
    }

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
        this.editorial = {
            'id': aut.id,
            'name': aut.name,
            'country_id': aut.country_id.id
        }
        if (this.btnguardar === 'NEW') {
            this.editorialService.crearEditorial(this.editorial).subscribe(
                () => {
                    this.alert.showSuccess('Editorial creado con éxito');
                    this.cargarEditoriales();
                    this.model2 = {
                        id: 0 as number,
                        name: ''
                    };
                    this.close();
                },
                error => {
                    console.log(error)
                    this.alert.showError(error);
                });
        }

        if (this.btnguardar === 'EDIT') {
            this.editorialService.modificarEditorial(this.editorial).subscribe(
                () => {
                    this.alert.showSuccess('Editorial modificado con éxito');
                    this.cargarEditoriales();
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
        this.editorialService.eliminarEditorial(id).subscribe(
            () => {
                this.alert.showSuccess('Editorial eliminado con éxito')
                this.cargarEditoriales();
                this.close();
            },
            error => {
                this.alert.showError(error);
            });
    }

    // Buscador por nombre
    public buscarNombre(nombre: string) {
        this.editorialService.buscarNombreEditorial(nombre).subscribe((editor: any) => {
            this.editor = editor;
            console.log(editor);
            },
            error => {
                this.alert.showError(error);
            });
    }

    // Setea datos Eliminar
    public setAutorEliminar(ed: IEditorial, content) {
        this.nombreeditorial = ed.name;
        this.ideditorial = ed.id.toString();
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
        this.editorial = autoreditar,
            this.editorial = {
                'id': this.editorial.id,
                'name': this.editorial.name,
                'country': this.editorial.country_id
            }
        this.openModal(content);
    }

    public limpiarInterface() {
        this.editorial = {
            'name': '',
            'country_id': this.model2
        }
    }

    // Formatear el auto-complete
    public autocompleListFormatter = (data: any) => {
        const html = `${data.name}`;
        return (html);
    }

    // Abrir modal
    public openModal(content) {
        this.modalRef = this.modalService.open(content);
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    // Cerrar local
    public close() {
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
