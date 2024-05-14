import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { PagamentoComponent } from './pagamento.component';
import { PagamentoRoutingModule } from './pagamento.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './stepper/stepper.component';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FinalComponent } from './final/final.component';
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
import { UsuarioComponent } from './usuario/usuario.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { AdminComponent } from '../painel/admin/admin.component';
PagamentoRoutingModule
@NgModule({
  declarations: [
    PagamentoComponent,
    FinalComponent,
    StepperComponent,
    UsuarioComponent,
   
  
  ],
  imports: [
    NgxFileDropModule,
    CommonModule,
    PagamentoRoutingModule,
    FormsModule,
    HttpClientModule,
    CdkStepperModule,
    FileUploadModule,
    InputTextModule,
    SelectButtonModule ,
    MessageModule,
    FontAwesomeModule,
    DropdownModule,
    CalendarModule,
    
    ProgressSpinnerModule,
    FileUploadModule ,

    CommonModule,

    FontAwesomeModule,
    DropdownModule,
    FormsModule,

    CalendarModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    FileUploadModule,


   

  ],
  providers: [
      provideNgxMask()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
  // bootstrap: [AppComponent]
})
export class PagamentoModule { }
