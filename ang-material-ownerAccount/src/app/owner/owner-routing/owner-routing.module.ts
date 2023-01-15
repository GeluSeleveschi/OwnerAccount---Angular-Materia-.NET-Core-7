import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerListComponent } from '../owner-list/owner-list.component';
import { RouterModule, Routes } from '@angular/router';
import { OwnerDetailsComponent } from '../owner-details/owner-details.component';
import { OwnerCreateComponent } from '../owner-create/owner-create.component';

const routes: Routes = [
  { path: 'owners', component: OwnerListComponent },
  { path: 'details/:id', component: OwnerDetailsComponent },
  { path: 'create', component: OwnerCreateComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ], exports: [RouterModule]
})
export class OwnerRoutingModule { }
