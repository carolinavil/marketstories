import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagamentoComponent } from './pagamento.component';
import { IndexComponent } from '../index.component';
import { FinalComponent } from './final/final.component';
const routes: Routes = [
  { path: '', component: PagamentoComponent},
  { path: 'final', component: FinalComponent},

   
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentoRoutingModule { }