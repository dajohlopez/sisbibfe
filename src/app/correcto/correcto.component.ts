import { Component } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'app-correcto',
    templateUrl: './correcto.component.html',
    styleUrls: ['correcto.component.scss'],
    animations: [routerTransition()]
})
export class CorrectoComponent { }
