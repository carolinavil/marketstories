import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';

import { MessageModule } from 'primeng/message';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
// import { NgxIuguModule } from "ngx-iugu";
// Importe o módulo aqui
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskApplierService } from 'ngx-mask/lib/ngx-mask-applier.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { PainelRoutingModule } from './painel.routing';
import { PainelComponent } from './painel.component';
import { AdminComponent } from './admin/admin.component';
import { TableModule } from 'primeng/table';
import { UserComponent } from './user/user.component';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@NgModule({
  declarations: [
    PainelComponent,
    AdminComponent,
    UserComponent

  ],
  imports: [
    ProgressSpinnerModule,
    CommonModule,
    PainelRoutingModule,
    FormsModule,
    HttpClientModule,
    CdkStepperModule,
    FileUploadModule,
    InputTextModule,
    SelectButtonModule,
    MessageModule,
    FontAwesomeModule,
    DropdownModule,
    CalendarModule,
    CommonModule,
    FontAwesomeModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FileUploadModule,
    TableModule,
    PaginatorModule,
    CardModule,
    AvatarModule
  ],
  providers: [
    provideNgxMask()
  ]
  // bootstrap: [AppComponent]
})
export class PainelModule { }
