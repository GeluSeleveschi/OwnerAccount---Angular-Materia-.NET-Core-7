import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { OwnerRepositoryService } from 'src/app/shared/owner-repository.service';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ToastrNotificationService } from 'src/app/shared/toastr-notification.service';
import { OwnerModel } from '../owner-creation.model';
import { Owner } from '../owner.model';

@Component({
  selector: 'app-add-update-owner-dialog',
  templateUrl: './add-update-owner-dialog.component.html',
  styleUrls: ['./add-update-owner-dialog.component.scss']
})
export class AddUpdateOwnerDialogComponent implements OnInit, OnDestroy {
  ownerForm: FormGroup;
  private dialogConfig;
  owners: Owner[];
  owner: Owner;
  sub: Subscription;
  pathToRefreshData: string;
  
  constructor(private ownerService: OwnerRepositoryService, private errorService: ErrorHandlerService,
    private fb: FormBuilder, private datePipe: DatePipe, private toastrService: ToastrNotificationService,
    private dialogRef: MatDialogRef<AddUpdateOwnerDialogComponent>, private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.ownerForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required)
    })


    this.sub = this.repositoryService.selectedOwnerAction$.subscribe(form => {
      this.owner = form;
    })

    if (this.owner) {
      this.ownerForm = this.patchValues(this.owner);
    }

    this.repositoryService.sendPathToRefreshGrid$.subscribe(path => {
      this.pathToRefreshData = path;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  patchValues = (model) => {
    return this.fb.group({
      ownerId: new FormControl(model.ownerId),
      name: new FormControl(model.name, Validators.required),
      dateOfBirth: new FormControl(model.dateOfBirth, Validators.required),
      address: new FormControl(model.address, Validators.required)
    })
  }

  submit = (ownerFormValue) => {
    if (this.ownerForm.invalid) return;

    const owner: OwnerModel = {
      name: ownerFormValue.name,
      dateOfBirth: this.datePipe.transform(ownerFormValue.dateOfBirth, 'yyyy-MM-dd'),
      address: ownerFormValue.address
    }

    if (ownerFormValue.ownerId != undefined && ownerFormValue.ownerId != '') {
      this.ownerService.updateOwner(`api/owner/${ownerFormValue.ownerId}`, owner).subscribe({
        next: _ => {
          this.dialogRef.close()
          this.repositoryService.refreshData(this.pathToRefreshData).subscribe({
            next: response => {
              this.repositoryService.updateOwnerList(response);
              this.toastrService.showSuccess('Owner updated successfully!', 'Owner');
            }
          })
        }
      })
    }

    else {
      this.ownerService.createOwner('api/owner', owner).subscribe(
        {
          next: _ => {
            this.dialogRef.close();
            this.repositoryService.refreshData(this.pathToRefreshData).subscribe({
              next: response => {
                this.owners = response?.items;
                this.repositoryService.updateOwnerList(response);
                this.toastrService.showSuccess('Owner added successfully!', 'Owner');
              }
            })
          },
          error: err => {
            this.errorService.dialogConfig = { ...this.dialogConfig };
            this.errorService.handleError(err);
          }
        }
      );
    }
  }

  hasError = (controlName: string, errorName: string) => {
    if (this.ownerForm.get(controlName).hasError(errorName)) {
      return true;
    }
    return false;
  }

  validateControl = (controlName: string) => {
    if (this.ownerForm.get(controlName).invalid && this.ownerForm.get(controlName).touched) {
      return true;
    }

    return false;
  }

  onCancel() {
    this.dialogRef.close();
  }

}
