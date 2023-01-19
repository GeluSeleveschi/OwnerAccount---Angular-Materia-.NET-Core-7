import { DatePipe, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { OwnerRepositoryService } from 'src/app/shared/owner-repository.service';
import { OwnerModel } from '../owner-creation.model';
import { Owner } from '../owner.model';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.scss']
})
export class OwnerCreateComponent {
  errorMessage: string = '';
  ownerForm: FormGroup;
  bsModalRef?: BsModalRef;
  private dialogConfig;
  constructor(private ownerService: OwnerRepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private datePipe: DatePipe, private modal: BsModalService, private location: Location, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    }),

      this.dialogConfig = {
        height: '200px',
        width: '400px',
        disableClose: true,
        data: {}
      }
  }

  validateControl = (controlName: string) => {
    if (this.ownerForm.get(controlName).invalid && this.ownerForm.get(controlName).touched) {
      return true;
    }

    return false
  }

  hasError = (controlName: string, errorName: string) => {
    if (this.ownerForm.get(controlName).hasError(errorName)) {
      return true;
    }
    return false;
  }

  createOwner = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.executeOwnerCreation(ownerFormValue);
    }
  }

  private executeOwnerCreation = (ownerFormValue) => {
    const owner: OwnerModel = {
      name: ownerFormValue.name,
      dateOfBirth: this.datePipe.transform(ownerFormValue.dateOfBirth, 'yyyy-MM-dd'),
      address: ownerFormValue.address
    }

    const apiUrl = 'api/owner';
    this.saveData(apiUrl, owner);
    // this.ownerService.createOwner(apiUrl, owner)   // save owner and display success modal
    //   .subscribe(
    //     {
    //       next: (own: Owner) => {
    //         const config: ModalOptions = {
    //           initialState: {
    //             modalHeaderText: 'Success Message',
    //             modalBodyText: `Owner: ${own.name} created successfully`,
    //             okButtonText: 'OK'
    //           }
    //         };
    //         this.bsModalRef = this.modal.show(SuccessModalComponent, config);
    //         this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToOwnerList())
    //       },
    //       error: (err: HttpErrorResponse) => {
    //         this.errorHandler.handleError(err);
    //         this.errorMessage = this.errorHandler.errorMessage;
    //       }
    //     }
    //   )
  }

  redirectToOwnerList = () => {
    //    this.router.navigate(['/owner/list']);
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

  // this method uses a dialog for success message
  saveData(apiUrl, owner) {
    this.ownerService.createOwner(apiUrl, owner).subscribe(res => {
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

      dialogRef.afterClosed().subscribe(
        result => this.location.back()),
        (error => {
          this.errorHandler.dialogConfig = { ... this.dialogConfig };
          this.errorHandler.handleError(error);
        });
    })
  }
}
