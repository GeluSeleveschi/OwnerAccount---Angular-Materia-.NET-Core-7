import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environment';
import { Owner } from '../owner/owner.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private owners$ = new BehaviorSubject<any>([]);
  private selectedOwner$ = new BehaviorSubject<Owner>(null);
  private refreshGrid$ = new BehaviorSubject<string>(null);

  updatedListOfOwners$ = this.owners$.asObservable();
  selectedOwnerAction$ = this.selectedOwner$.asObservable().pipe(tap(data => console.log(JSON.stringify(data))));
  sendPathToRefreshGrid$ = this.refreshGrid$.asObservable();

  constructor(private http: HttpClient) { }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }

  public create = (route: string, body: any) => {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders())
  }

  public update = (route: string, body: any) => {
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }

  public delete = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }

  updateOwnerList(owners: Owner[]) {
    this.owners$.next(owners);
  }

  updateSelectedOwner(owner: Owner) {
    this.selectedOwner$.next(owner);
  }

  getHeaders(route) {
    let contentHeader = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress), { headers: contentHeader, observe: 'response', responseType: 'json' })
  }

  public getItems(pageIndex: number, pageSize: number): Observable<any> {
    const url = `${environment.urlAddress}/api/owner/data?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  public refreshData(path): Observable<any> {
    return this.http.get(path);
  }

  sendPathToRefreshData(path: string) {
    this.refreshGrid$.next(`${environment.urlAddress}/${path}`);
  }
}
