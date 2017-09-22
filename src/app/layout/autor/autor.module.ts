import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from "angular2-datatable";
import { ModalModule } from 'ng2-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AutorComponent } from './autor.component';
import { AutorRoutingModule } from './autor-routing.module';
import { PageHeaderModule } from './../../shared';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { AutorService } from '../../services/autor.service';
import { PaisService } from '../../services/pais.service';
import { SharedModule } from '../../shared/shared.module';
import { PagerService } from '../../services/pager.service';
import { AlertService } from '../../services/alert.service';

@NgModule({
    imports: [
        CommonModule,
        AutorRoutingModule,
        PageHeaderModule,
        DataTableModule,        
        ModalModule.forRoot(),
        NgbModule.forRoot(),        
        FormsModule,
        ReactiveFormsModule,
        NguiAutoCompleteModule,
        SharedModule
    ],
    providers: [
        AutorService,
        PaisService,
        PagerService,
        AlertService        
    ],
    declarations: [
        AutorComponent,
        //DataFilterPipe
    ]    
})
export class AutorModule { }
