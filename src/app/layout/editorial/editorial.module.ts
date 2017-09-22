import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'angular2-datatable';
import { ModalModule } from 'ng2-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EditorialComponent } from './editorial.component';
import { EditorialRoutingModule } from './editorial-routing.module';
import { PageHeaderModule } from './../../shared';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { EditorialService } from '../../services/editorial.service';
import { PaisService } from '../../services/pais.service';
import { SharedModule } from '../../shared/shared.module';
import { PagerService } from '../../services/pager.service';
import { AlertService } from '../../services/alert.service';

@NgModule({
    imports: [
        CommonModule,
        EditorialRoutingModule,
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
        EditorialService,
        PaisService,
        PagerService,
        AlertService
    ],
    declarations: [
        EditorialComponent
    ]
})
export class EditorialModule { }
