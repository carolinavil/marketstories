import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexModule } from './parts/index/index.module';
import { PagamentoModule } from './parts/index/pagamento/pagamento.module';
const index = () => import('./parts/index/index.module').then(res => res.IndexModule);
const pagamento = () => import('./parts/index/pagamento/pagamento.module').then(res => res.PagamentoModule);


const routes: Routes = [
    { path: '', loadChildren: index },
    { path: 'pagamento', loadChildren: pagamento},

    // { path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }