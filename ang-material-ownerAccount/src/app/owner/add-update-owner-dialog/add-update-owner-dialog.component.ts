import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { OwnerRepositoryService } from 'src/app/shared/owner-repository.service';
import { RepositoryService } from 'src/app/shared/repository.service';
import { OwnerModel } from '../owner-creation.model';
import { Owner } from '../owner.model';

@Component({
  selector: 'app-add-update-owner-dialog',
  templateUrl: './add-update-owner-dialog.component.html',
  styleUrls: ['./add-update-owner-dialog.component.scss']
})
export class AddUpdateOwnerDialogComponent implements OnInit {
  ownerForm: FormGroup;
  private dialogConfig;
  owners: Owner[];

  constructor(private ownerService: OwnerRepositoryService, private errorService: ErrorHandlerService, private router: Router,
    private dialog: MatDialog, private fb: FormBuilder, private datePipe: DatePipe, private location: Location,
    private dialogRef: MatDialogRef<AddUpdateOwnerDialogComponent>, private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.ownerForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required)
    })
  }

  createOwner = (ownerFormValue) => {
    if (this.ownerForm.invalid) return;

    const owner: OwnerModel = {
      name: ownerFormValue.name,
      dateOfBirth: this.datePipe.transform(ownerFormValue.dateOfBirth, 'yyyy-MM-dd'),
      address: ownerFormValue.address
    }

    this.ownerService.createOwner('api/owner', owner).subscribe(
      {
        next: _ => {
          this.dialogRef.close();
          this.repositoryService.getData('api/owner').subscribe({
            next: response => {
              this.owners = response as Owner[];
              this.repositoryService.updateOwnerList(this.owners);
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
