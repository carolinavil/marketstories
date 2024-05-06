import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { PagamentoModule } from './pagamento/pagamento.module';
import { LoginModule } from './login/login.module';
import { Pagamento2Module } from './pagamento copy/pagamento.module';
const login = () => import('./pagamento copy/pagamento.module').then(res => res.Pagamento2Module);

const pagamento = () => import('./pagamento/pagamento.module').then(res => res.PagamentoModule);
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'pagamento', loadChildren: pagamento },
  { path: 'login', loadChildren: login },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
