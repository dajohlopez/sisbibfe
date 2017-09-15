import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AlertService } from '../../services/alert.service';

import * as _ from 'underscore';

import { PaisService } from '../../services/pais.service';
import { ICountry } from '../../shared/settings/interfaces';

@Component({
  selector: 'app-pais',
  templateUrl: 'pais.component.html',
  animations: [routerTransition()]
})
export class PaisComponent implements OnInit {
  //propiedades del componente pais
  nombre: string;
  closeResult: string;
  country: ICountry; //Objecto enviado para la API

  constructor(private paisService: PaisService,              
              private modalService: NgbModal,
              private alert: AlertService    
  ) {
  }
  titulo1 = "LISTADO DE PAISES";

  public todopaises = [];
  public titulo_modal = "";
  public id = "";
  public nombrepais = "";
  public btnguardar = "";
  private modalRef: NgbModalRef;    

  //para el modal Registro y Editar
  public showModal(t: string): void {

    if (t == "N") {
      this.titulo_modal = "NUEVO/REGISTRAR";
      this.btnguardar = "NEW";
    }
    if (t == "M") {
      this.btnguardar = "EDIT"
      this.titulo_modal = "EDITAR/MODIFICAR";
    }    
  }
  
  ngOnInit() {
    this.cargarPaises();
  }

  //cargar Paises
  cargarPaises() {
    this.paisService.getPaisesTodos().subscribe((todocountries: ICountry[]) => {
      this.todopaises = todocountries;      
    },
      error => {
        console.log('Falló Conexión Pais ' + error);
      });
  }

  //Nuevo Anexo Constructor
  guardar(pa: ICountry) {
    this.country = {
      "id": pa.id,
      "name": pa.name
    }    
    if (this.btnguardar == "NEW") {
      this.paisService.crearPais(this.country).subscribe(
        () => {
          this.alert.showSuccess('País creado con éxito');          
          this.cargarPaises();
          this.close();
        },
        error => {
          this.alert.showError(error);
          console.error('Error al Crear el País. ' + error);
        });
    }

    if (this.btnguardar == "EDIT") {
      this.paisService.modificarPais(this.country).subscribe(
        () => {
          this.alert.showSuccess('País modificado con éxito');          
          this.cargarPaises();
          this.close();
        },
        error => {          
          this.alert.showError(error);
          console.error('Error al modificar el Pais. ' + error);
        });
    }

  }

  //Accion Eliminar pais
  eliminar(idpais: number) {
    this.paisService.eliminarPais(idpais).subscribe(
      () => {
        this.alert.showSuccess('Eliminado con éxito');        
        this.cargarPaises();
        this.close();
      },
      error => {
        console.error('Error eliminar el Pais. ' + error);
      });
  }

  //Setea datos Eliminar
  setPaisEliminar(pa: ICountry, content) {
    this.nombrepais = pa.name;
    this.id = pa.id.toString();    
    this.openModal(content);
    this.titulo_modal = "ELIMINAR";
  }

  //boton Nuevo para cargar el formulario en el modal
  nuevo(content) {
    this.showModal("N");
    this.limpiarInterface();
    this.openModal(content);    
  }

  //Setea el objeto a editar
  editar(paiseditado, content) {    
    const paiseditar = Object.assign({}, paiseditado);
    this.showModal("M");
    this.country = paiseditar;    
      this.country = {
        "id": this.country.id,
        "name": this.country.name
      }    
    this.openModal(content);
  }

  //Limpiar campos del formulario
  limpiarInterface() {
    this.country = {
      "name": ""
    }
  }

  //Abrir modal
  openModal(content){    
    this.modalRef = this.modalService.open(content);    
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //Cerrar local
  close() {    
    this.modalRef.close();
  }

  //metodo para cerrar el modal con teclas de escape o en el boton X de la esquina
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