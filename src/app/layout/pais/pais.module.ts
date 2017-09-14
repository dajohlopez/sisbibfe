import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from "angular2-datatable";
import { ModalModule } from 'ng2-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PaisComponent } from './pais.component';
import { PaisRoutingModule } from './pais-routing.module';
import { PageHeaderModule } from './../../shared';

import { PaisService } from '../../services/pais.service';
import { DataFilterPipe } from '../../shared/dataservices/data-filter.pipe';
import { PagerService } from '../../services/pager.service';
import { AlertService } from '../../services/alert.service';

@NgModule({
    imports: [
        CommonModule,
        PaisRoutingModule,
        PageHeaderModule,
        DataTableModule,        
        ModalModule.forRoot(),
        NgbModule.forRoot(),        
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        PaisService,
        PagerService,
        AlertService        
    ],
    declarations: [
        PaisComponent,
        DataFilterPipe
    ]    
})
export class PaisModule { }
