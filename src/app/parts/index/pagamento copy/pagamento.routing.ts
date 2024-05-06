import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pagamento2Component } from './pagamento.component';


const routes: Routes = [
  { 
    path: '', 
    component: Pagamento2Component,
   
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentoRoutingModule { }
