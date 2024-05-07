import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VindiService } from '../../../services/vindi-service';
import { lastValueFrom } from 'rxjs';
import { LoginModel } from '../../../models/pagamento.module';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css'
})
export class PainelComponent {
  loginModel=  new LoginModel()
  falhaLogin = false
  cus: any
  constructor(private vindiService: VindiService){
    lastValueFrom(this.vindiService.getClientes()).then(res => {
      // Acessando diretamente o array payment_methods
      const customers = res.customers;
      this.cus = customers
      console.log('clientes:', this.cus);
    });
  }
 
  send(form: NgForm) {
    console.log(this.loginModel);
    
    lastValueFrom(this.vindiService.account(this.loginModel)).then((res) => {
      console.log('Resposta:', res);
    }).catch((error) => {
      if (error.status === 401) {
        console.error('Erro 401: Não autorizado');
        this.falhaLogin = true
        // Coloque aqui o que deseja fazer em caso de erro 401, como exibir uma mensagem para o usuário
      } else {
        console.error('Erro:', error);
        this.falhaLogin = false
      // this.router.navigate
      }
    });
  }}
