import { NgModule } from '@angular/core';
import { DataFilterPipe } from '../shared/dataservices/data-filter.pipe';

@NgModule({
    declarations: [
        DataFilterPipe
    ],
    imports: [
    ],
    exports: [
        DataFilterPipe
    ]
})
export class SharedModule {
}
