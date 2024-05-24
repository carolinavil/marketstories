import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VindiService } from '../../../services/vindi-service';
import { lastValueFrom } from 'rxjs';
import { LoginModel } from '../../../models/pagamento.module';
import { Router } from '@angular/router';

declare var M: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Use 'styleUrls' em vez de 'styleUrl'
})
export class LoginComponent {
  loginModel = new LoginModel();
  falhaLogin = false;
  id = 0;
  cus: any;
  paddingConteudo = -100
  constructor(private vindiService: VindiService, private router: Router) {
    lastValueFrom(this.vindiService.getClientes()).then(res => {
      // Acessando diretamente o array customers
      const customers = res.customers;
      this.cus = customers;
      console.log('clientes:', this.cus);
    });
  }



  ngAfterViewInit(): void {
    const elemsConteudo = document.querySelectorAll('.carrossel-conteudo');
    const optionsConteudo = {
      numVisible: 5,
      maxVisible: 5, // Ajuste o número de imagens visíveis aqui
      fullWidth: false,
      padding: -1000,// Define o padding desejado,
      autoplay: true, // Ativa o autoplay
      interval: 2000,
      opacity: false,
      indicators: true// Intervalo em milissegundos entre as transições dos slides
  
    };
    M.Carousel.init(elemsConteudo, optionsConteudo);
  }



  send(form: NgForm) {
    console.log(this.loginModel);

    lastValueFrom(this.vindiService.account(this.loginModel)).then((res) => {
      console.log('Resposta:', res);
    }).catch((error) => {
      if (error.status === 401) {
        console.error('Erro 401: Não autorizado');
        this.falhaLogin = true;
        // Coloque aqui o que deseja fazer em caso de erro 401, como exibir uma mensagem para o usuário
      } else {
        console.error('Erro:', error);
        this.falhaLogin = false;

        // Verificando se há um cliente com o mesmo e-mail
        const cliente = this.cus.find((c: any) => c.email === this.loginModel.email);
        if (cliente) {
          this.id = cliente.id;
          console.log('ID do cliente:', this.id);
          // Navegar para a rota 'painel' com o ID do cliente como parâmetro
          this.router.navigate(['../painel', this.id]);
        }
        else if (this.loginModel.email == 'admin_market@gmail.com') {
          console.log('ok')
          this.router.navigate(['../painel', this.id]);

        }
        else {
          console.error('Cliente não encontrado com o e-mail fornecido.');
          // Coloque aqui o que deseja fazer se nenhum cliente for encontrado com o e-mail fornecido
        }
      }
    });
  }
}
