import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { OwnerRepositoryService } from 'src/app/shared/owner-repository.service';
import { Owner } from '../owner.model';

@Component({
  selector: 'app-owner-delete',
  templateUrl: './owner-delete.component.html',
  styleUrls: ['./owner-delete.component.scss']
})
export class OwnerDeleteComponent implements OnInit {
  owner: Owner;
  bsModalRef?: BsModalRef;

  constructor(private ownerService: OwnerRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private activeRoute: ActivatedRoute, private modal: BsModalService) { }

  ngOnInit(): void {
    this.getOwnerById();
  }

  private getOwnerById = () => {
    const ownerId: string = this.activeRoute.snapshot.params['id'];
    const apiUri: string = `api/owner/${ownerId}`;

    this.ownerService.getOwner(apiUri).subscribe({
      next: (own: Owner) => this.owner = own,
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  redirectToOwnerList = () => {
    this.router.navigate(['/owner/owners']);
  }

  deleteOwner = () => {
    const deleteUri: string = `api/owner/${this.owner.ownerId}`;
    this.ownerService.deleteOwner(deleteUri)
      .subscribe({
        next: (_) => {
          const config: ModalOptions = {
            initialState: {
              modalHeaderText: 'Success Message',
              modalBodyText: `Owner deleted successfully`,
              okButtonText: 'OK'
            }
          };
          this.bsModalRef = this.modal.show(SuccessModalComponent, config);
          this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToOwnerList());
        },
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
  }
}
