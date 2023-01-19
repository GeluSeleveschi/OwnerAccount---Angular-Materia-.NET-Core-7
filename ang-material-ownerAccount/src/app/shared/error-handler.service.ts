import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  errorMessage: string = '';
  public dialogConfig;
  constructor(private router: Router, private modal: BsModalService, private dialog: MatDialog) { }

  public handleError = (error: HttpErrorResponse) => {
    if (error.status === 500) {
      this.handle500Error(error);
    } else if (error.status === 404) {
      this.handle404Error(error);
    } else {
      this.handleOtherErrors(error);
    }

  }

  private handle500Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/500'])
  }

  private handle404Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  }

  // private handleOtherErrors = (error: HttpErrorResponse) => {  //display errors in a modal
  //   this.createErrorMessage(error);

  //   const config: ModalOptions = {
  //     initialState: {
  //       modalHeaderText: 'Error Message',
  //       modalBodyText: this.errorMessage,
  //       okButtonText: 'OK'
  //     }
  //   }

  //   this.modal.show(ErrorModalComponent, config);
  // }

  private handleOtherErrors(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.dialogConfig.data = { 'errorMessage': this.errorMessage };
    this.dialog.open(ErrorDialogComponent, this.dialogConfig);
  }

  private createErrorMessage = (error: HttpErrorResponse) => {
    this.errorMessage = error.error ? error.error : error.statusText;
  }
}
