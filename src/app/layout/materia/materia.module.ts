import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from "angular2-datatable";
import { ModalModule } from 'ng2-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { MateriaComponent } from './materia.component';
import { MateriaRoutingModule } from './materia-routing.module';
import { PageHeaderModule } from './../../shared';

import { PaisService } from '../../services/pais.service';
import { SharedModule } from '../../shared/shared.module';
import { AlertService } from '../../services/alert.service';

@NgModule({
    imports: [
        CommonModule,
        MateriaRoutingModule,
        PageHeaderModule,
        DataTableModule,        
        ModalModule.forRoot(),
        NgbModule.forRoot(),        
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        PaisService,        
        AlertService        
    ],
    declarations: [
        MateriaComponent,
        //DataFilterPipe
    ]    
})
export class MateriaModule { }
