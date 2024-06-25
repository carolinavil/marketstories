import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageModule } from 'primeng/message';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RouterModule } from '@angular/router';
import { PainelRoutingModule } from './painel.routing';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ImageModule } from 'primeng/image';
import { ToolbarModule } from 'primeng/toolbar';

import { PainelComponent } from './painel.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AdminComponent,
    PainelComponent,

    UserComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
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
    TableModule,
    PaginatorModule,
    CardModule,
    AvatarModule,
    ImageModule,
    ToolbarModule
  ],
  providers: [
    // qualquer outro serviço que você precise fornecer deve ser colocado aqui
  ]
})
export class PainelModule { }
