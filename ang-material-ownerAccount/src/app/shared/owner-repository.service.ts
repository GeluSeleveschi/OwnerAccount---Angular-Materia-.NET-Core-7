import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { OwnerModel } from '../owner/owner-creation.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerRepositoryService {

  constructor(private http: HttpClient) { }

  public getOwner = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }

  public createOwner = (route: string, owner: OwnerModel) => {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), owner);
  }

  public updateOwner = (route: string, owner: OwnerModel) => {
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), owner);
  }

  public deleteOwner = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
