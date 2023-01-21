import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { OwnerRepositoryService } from 'src/app/shared/owner-repository.service';
import { RepositoryService } from 'src/app/shared/repository.service';
import { AddUpdateOwnerDialogComponent } from '../add-update-owner-dialog/add-update-owner-dialog.component';
import { DeleteOwnerDialogComponent } from '../delete-owner-dialog/delete-owner-dialog.component';
import { Owner } from '../owner.model';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.scss']
})
export class OwnerListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  owners: Owner[];
  errorMessage: string;
  private dialogConfig;

  public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'update', 'delete'];

  public dataSource = new MatTableDataSource<Owner>();

  constructor(private repositoryService: RepositoryService, private errorHandlerService: ErrorHandlerService, private router: Router,
    private ownerService: OwnerRepositoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllOwners();
    this.repositoryService.updatedListOfOwners$.subscribe((value) => {
      if (value) {
        this.owners = value as Owner[];
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // public getAllOwners = () => {
  //   this.repositoryService.getData('api/owner').subscribe(res => {
  //     this.dataSource.data = res as Owner[];
  //   },
  //     (error) => {
  //       this.errorService.handleError(error);
  //     });
  // }

  private getAllOwners = () => {
    const apiAddress: string = 'api/owner';
    this.repositoryService.getData(apiAddress).subscribe({
      next: (owners: Owner[]) => this.owners = owners,
      error: (err: HttpErrorResponse) => {
        this.errorHandlerService.handleError(err);
        this.errorMessage = this.errorHandlerService.errorMessage;
      }
    })
  }

  public getOwnerDetails = (ownerId) => {
    const detailsUrl: string = `/owner/details/${ownerId}`
    this.router.navigate([detailsUrl]);
  }

  public redirectToDetails = (id: string) => {

  }
  public redirectToUpdate = (id: string) => {
    const updateUrl: string = `/owner/update/${id}`;
    const ownerByIdUri: string = `api/owner/${id}`;
    // this.router.navigate([updateUrl]);
    let owner: Owner;
    this.ownerService.getOwner(ownerByIdUri).subscribe(data => {
      owner = data as Owner;
      this.repositoryService.updateSelectedOwner(owner);
      this.dialog.open(AddUpdateOwnerDialogComponent, this.dialogConfig);
    });
  }

  public redirectToDelete = (id: string) => {
    // this.router.navigate([`/owner/delete/${id}`]);
    const ownerByIdUri: string = `api/owner/${id}`;
    let owner: Owner;

    this.ownerService.getOwner(ownerByIdUri).subscribe(data => {
      owner = data as Owner;
      this.repositoryService.updateSelectedOwner(owner);
      this.dialog.open(DeleteOwnerDialogComponent, this.dialogConfig);
    });
  }

  doFilter = (event: any) => {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  showAddDialog() {
    this.repositoryService.updateSelectedOwner(null);
    this.dialog.open(AddUpdateOwnerDialogComponent, this.dialogConfig);
  }

}
