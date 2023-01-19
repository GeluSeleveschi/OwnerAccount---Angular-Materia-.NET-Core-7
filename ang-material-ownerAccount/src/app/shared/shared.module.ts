import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { AppendDirective } from './directives/append.directive';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    ErrorModalComponent,
    SuccessModalComponent,
    AppendDirective,
    SuccessDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    ErrorModalComponent,
    SuccessModalComponent,
    AppendDirective
  ],
  entryComponents: [
    SuccessDialogComponent,
    ErrorDialogComponent
  ]
})
export class SharedModule { }
