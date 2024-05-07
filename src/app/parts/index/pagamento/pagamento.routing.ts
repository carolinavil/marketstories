import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagamentoComponent } from './pagamento.component';
import { FinalComponent } from './final/final.component';
import { UsuarioComponent } from './usuario/usuario.component';
const routes: Routes = [
  { 
    path: '', 
    component: PagamentoComponent,
   
  },

  { 
    path: 'final', 
    component: FinalComponent,
   
  },
  { 
    path: 'usuario', 
    component: UsuarioComponent,
   
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentoRoutingModule { }
