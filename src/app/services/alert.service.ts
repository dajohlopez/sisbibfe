import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'toastr-ng2';

@Injectable()
export class AlertService {    

    constructor(private toastrService: ToastrService) {
                
    }

    showError(mensaje: any) {
        this.toastrService.error(mensaje, 'Error!');
    }

    showSuccess(mensaje: any) {
        this.toastrService.success(mensaje, 'Correcto!');
    }
}
