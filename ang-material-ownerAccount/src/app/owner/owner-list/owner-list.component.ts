import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { OwnerRepositoryService } from 'src/app/shared/owner-repository.service';
import { RepositoryService } from 'src/app/shared/repository.service';
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
  public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'update', 'delete'];

  public dataSource = new MatTableDataSource<Owner>();

  constructor(private repositoryService: RepositoryService, private errorHandlerService: ErrorHandlerService, private router: Router,
    private ownerService: OwnerRepositoryService) { }

  ngOnInit(): void {
    this.getAllOwners();
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
    this.router.navigate([updateUrl]);
  }
  
  public redirectToDelete = (id: string) => {

  }

  doFilter = (event: any) => {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
