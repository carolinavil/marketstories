import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { PagamentoModule } from './pagamento/pagamento.module';
import { LoginModule } from './login/login.module';
import { PainelModule } from './painel/login.module';
import { IndexTesteComponent } from './indexTeste.component';
import { TermosDeUsoComponent } from './termos-de-uso/termos-de-uso.component';

const login = () => import('./login/login.module').then(res => res.LoginModule);
const painel = () => import('./painel/login.module').then(res => res.PainelModule);
const pagamento = () => import('./pagamento/pagamento.module').then(res => res.PagamentoModule);
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'teste', component: IndexTesteComponent },
  { path: 'termos', component: TermosDeUsoComponent },
  { path: 'pagamento', loadChildren: pagamento },
  { path: 'login', loadChildren: login },
  { path: 'painel/:id', loadChildren: painel },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
