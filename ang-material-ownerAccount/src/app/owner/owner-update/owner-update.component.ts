import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { OwnerRepositoryService } from 'src/app/shared/owner-repository.service';
import { OwnerModel } from '../owner-creation.model';
import { Owner } from '../owner.model';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.scss']
})
export class OwnerUpdateComponent {
  owner: Owner;
  ownerForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private ownerService: OwnerRepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute, private datePipe: DatePipe, private modal: BsModalService) { }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.getOwnerById();
  }

  getOwnerById = () => {
    const ownerId: string = this.activeRoute.snapshot.params['id'];
    const ownerByIdUri: string = `api/owner/${ownerId}`;

    this.ownerService.getOwner(ownerByIdUri).subscribe({
      next: (own: Owner) => {
        this.owner = { ...own, dateOfBirth: new Date(this.datePipe.transform(own.dateOfBirth, 'MM/dd/yyyy')) };
        this.ownerForm.patchValue(this.owner);
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  validateControl = (controlName: string) => {
    if (this.ownerForm.get(controlName).invalid && this.ownerForm.get(controlName).touched)
      return true;

    return false;
  }
  hasError = (controlName: string, errorName: string) => {
    if (this.ownerForm.get(controlName).hasError(errorName))
      return true;

    return false;
  }

  updateOwner = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.executeOwnerUpdate(ownerFormValue);
    }
  }

  private executeOwnerUpdate = (ownerFormValue) => {
    const ownerModel: OwnerModel = {
      name: ownerFormValue.name,
      dateOfBirth: this.datePipe.transform(ownerFormValue.dateOfBirth, 'yyyy-MM-dd'),
      address: ownerFormValue.address
    }

    const apiUri: string = `api/owner/${this.owner.ownerId}`;

    this.ownerService.updateOwner(apiUri, ownerModel).subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: 'Owner update successfully',
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToOwnerList())
      }
    })
  }

  redirectToOwnerList(){
    this.router.navigate(['/owner/owners']);
  }
}
