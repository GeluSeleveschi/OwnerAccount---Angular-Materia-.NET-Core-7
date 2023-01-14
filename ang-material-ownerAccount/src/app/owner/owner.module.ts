import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerRoutingModule } from './owner-routing/owner-routing.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';

@NgModule({
  declarations: [
    OwnerListComponent,
    OwnerDetailsComponent,
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class OwnerModule { }
