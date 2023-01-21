import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environment';
import { Owner } from '../owner/owner.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private owners$ = new BehaviorSubject<any>([]);
  private selectedOwner$ = new BehaviorSubject<Owner>(null);

  updatedListOfOwners$ = this.owners$.asObservable();
  selectedOwnerAction$ = this.selectedOwner$.asObservable().pipe(tap(data => console.log(JSON.stringify(data))));

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
}
