import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerRoutingModule } from './owner-routing/owner-routing.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { OwnerAccountsComponent } from './owner-details/owner-accounts/owner-accounts.component';
import { SharedModule } from '../shared/shared.module';
import { OwnerCreateComponent } from './owner-create/owner-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OwnerUpdateComponent } from './owner-update/owner-update.component';
import { OwnerDeleteComponent } from './owner-delete/owner-delete.component';
import { AddUpdateOwnerDialogComponent } from './add-update-owner-dialog/add-update-owner-dialog.component';
import { DeleteOwnerDialogComponent } from './delete-owner-dialog/delete-owner-dialog.component';

@NgModule({
  declarations: [
    OwnerListComponent,
    OwnerDetailsComponent,
    OwnerAccountsComponent,
    OwnerCreateComponent,
    OwnerUpdateComponent,
    OwnerDeleteComponent,
    AddUpdateOwnerDialogComponent,
    DeleteOwnerDialogComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ]
})
export class OwnerModule { }
