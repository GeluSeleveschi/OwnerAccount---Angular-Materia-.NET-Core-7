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
  pathToRefreshData: string;

  constructor(private repositoryService: RepositoryService, private dialogRef: MatDialogRef<DeleteOwnerDialogComponent>,
    private toastrService: ToastrNotificationService) {
  }

  ngOnInit() {
    this.sub = this.repositoryService.selectedOwnerAction$.subscribe(data => {
      this.ownerId = data.ownerId;
    })

    this.repositoryService.sendPathToRefreshGrid$.subscribe(path => {
      this.pathToRefreshData = path;
    });
  }

  deleteOwner() {
    if (this.ownerId) {
      let owners: Owner[];
      this.repositoryService.delete(`api/owner/${this.ownerId}`).subscribe({
        next: _ => {
          this.dialogRef.close()
          this.repositoryService.refreshData(this.pathToRefreshData).subscribe({
            next: response => {
              this.repositoryService.updateOwnerList(response);
              this.toastrService.showSuccess('Successfully deleted!', 'Owner');
            }
          })
        }
      });
    }
  }
}
