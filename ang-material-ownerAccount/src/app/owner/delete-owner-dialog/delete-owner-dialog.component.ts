import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ToastrNotificationService } from 'src/app/shared/toastr-notification.service';
import { Owner } from '../owner.model';

@Component({
  selector: 'app-delete-owner-dialog',
  templateUrl: './delete-owner-dialog.component.html',
  styleUrls: ['./delete-owner-dialog.component.scss']
})
export class DeleteOwnerDialogComponent implements OnInit {
  owner: Owner;
  ownerId: string;
  sub: Subscription;
  constructor(private repositoryService: RepositoryService, private dialogRef: MatDialogRef<DeleteOwnerDialogComponent>,
    private toastrService: ToastrNotificationService) {
  }

  ngOnInit() {
    this.sub = this.repositoryService.selectedOwnerAction$.subscribe(data => {
      this.ownerId = data.ownerId;
    })
  }

  deleteOwner() {
    if (this.ownerId) {
      let owners: Owner[];
      this.repositoryService.delete(`api/owner/${this.ownerId}`).subscribe({
        next: _ => {
          this.dialogRef.close()
          this.repositoryService.getData('api/owner').subscribe({
            next: response => {
              owners = response as Owner[];
              this.repositoryService.updateOwnerList(owners);
              this.toastrService.showSuccess('Successfully deleted!', 'Owner');
            }
          })
        }
      });
    }
  }
}
