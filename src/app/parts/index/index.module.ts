import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index.routing';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountUpModule } from 'ngx-countup';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { PagamentoModule } from './pagamento/pagamento.module';
import { HttpClientModule } from '@angular/common/http';

register()


@NgModule({
  declarations: [
    IndexComponent,

  ],
  imports: [
    HttpClientModule,
    CommonModule,
    IndexRoutingModule,
    MatMenuModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    FontAwesomeModule,
    CountUpModule,

  
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class IndexModule { }
