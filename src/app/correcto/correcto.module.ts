import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CorrectoComponent } from './correcto.component';
import { CorrectoRoutingModule } from './correcto-routing.module';

@NgModule({
    imports: [
        CorrectoRoutingModule,
        RouterModule
    ],
    declarations: [CorrectoComponent]
})
export class CorrectoModule {}
