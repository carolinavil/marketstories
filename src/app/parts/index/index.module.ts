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
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { IndexTesteComponent } from './indexTeste.component';
import { TermosDeUsoComponent } from './termos-de-uso/termos-de-uso.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

register()


@NgModule({
  declarations: [
    IndexComponent,
    IndexTesteComponent,

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
    NgxPageScrollCoreModule.forRoot({ duration: 1500 }) // Configura a duração da rolagem
    
  

   

  
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class IndexModule { }
