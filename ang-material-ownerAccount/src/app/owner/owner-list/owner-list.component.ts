import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class OwnerListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  owners: Owner[];
  errorMessage: string;
  private dialogConfig;
  pageSize = 10;
  pageNumber = 1;
  resultsLength = 10;
  pageIndex: number = 0;
  totalItems: number;
  sub: Subscription;

  public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Owner>();

  constructor(private repositoryService: RepositoryService, private router: Router,
    private ownerService: OwnerRepositoryService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getItems();

    this.sub = this.repositoryService.updatedListOfOwners$.subscribe(resp => {
      this.dataSource.data = resp.items;
      this.totalItems = resp.totalItems;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public getOwnerDetails = (ownerId) => {
    const detailsUrl: string = `/owner/details/${ownerId}`
    this.router.navigate([detailsUrl]);
  }

  public redirectToUpdate = (id: string) => {
    const ownerByIdUri: string = `api/owner/${id}/owner`;
    let owner: Owner;
    this.ownerService.getOwner(ownerByIdUri).subscribe(data => {
      owner = data as Owner;
      this.repositoryService.updateSelectedOwner(owner);
      this.sendRefreshDataPath();
      this.dialog.open(AddUpdateOwnerDialogComponent, this.dialogConfig);
    });
  }

  public redirectToDelete = (id: string) => {
    const ownerByIdUri: string = `api/owner/${id}/owner`;
    let owner: Owner;

    this.ownerService.getOwner(ownerByIdUri).subscribe(data => {
      owner = data as Owner;
      this.sendRefreshDataPath();
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

  getItems() {
    this.repositoryService.getItems(this.pageIndex, this.pageSize).subscribe(result => {
      this.dataSource.data = result.items;
      this.totalItems = result.totalItems;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getItems();
  }

  sendRefreshDataPath() {
    const path = `api/owner/data?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`;
    this.repositoryService.sendPathToRefreshData(path);
  }
}
