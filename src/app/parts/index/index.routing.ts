import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { PagamentoModule } from './pagamento/pagamento.module';

const pagamento = () => import('./pagamento/pagamento.module').then(res => res.PagamentoModule);
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'pagamento', loadChildren: pagamento },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
