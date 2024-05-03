import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagamentoModule } from './parts/index/pagamento/pagamento.module';

const routes: Routes = [
  { path: '', loadChildren: () => import('./parts/index/index.module').then(m => m.IndexModule) },
  { path: 'pagamento', loadChildren: () => import('./parts/index/pagamento/pagamento.module').then(m => m.PagamentoModule) },
  // Se você quiser usar loadChildren para o final, crie um módulo separado para ele
  //{ path: 'pagamento/final', loadChildren: () => import('./parts/pagamento-final/pagamento-final.module').then(m => m.PagamentoFinalModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Rota padrão para redirecionar para a página inicial
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
