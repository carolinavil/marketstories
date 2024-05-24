// iugu.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssinaturaModel, ClienteModel, FaturaModel, MetodosModel, PagamentoModel, CartaoModel, LoginModel,UsersMkModel } from '../models/pagamento.module';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VindiService {
  private apiUrl = 'https://api.iugu.com/v1'; 
  list = new BehaviorSubject<MetodosModel[]>([])
  baseUrl = environment.url;

  obj: any
  // private apiKey = '0C7EF9D8A5AFF48E262FA23964DB4EC10A4812C3666CB8282C4FC996699E4C25'; 
  // list = new BehaviorSubject<PagamentoModel[]>([]);
  constructor(private http: HttpClient) {


    
   }


  // criarFormaDePagamento(nome: string) {
  //   const url = `${this.apiUrl}/payment_token`;
  //   const body = {
  //     account_id: this.apiKey,
  //     method: 'credit_card',
  //     data: {
       
  //       first_name: nome,
        
  //     }
  //   };
  //   return this.http.post(url, body);
  // }

  getList(loading: boolean = false) {
    return this.http.get<any>(`${this.apiUrl}/0C7EF9D8A5AFF48E262FA23964DB4EC10A4812C3666CB8282C4FC996699E4C25`)
        .pipe(tap({
            next: list => {
                this.list.next(list);
                return of(list);
            },
            // error: res => this.toastr.error('Não foi possível carregar listagem de eventos.')
        }));
}


getClientes(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/Customer`);
}

deleteCliente(clienteId: string): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/Customer/${clienteId}`);
}

postCliente(request: ClienteModel): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/Customer`, request);
}

postSandBoxCliente(request: ClienteModel): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/SBCustomer`, request);
}

postSandBoxSUB(request: AssinaturaModel): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/SBSubscriptions`, request);
}


postCartao(request: CartaoModel): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/Payment`, request);
}


account(request: LoginModel): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/Login/validar-login`, request);
}

postAssinatura(request: AssinaturaModel): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/Subscriptions`, request);
}

postFatura(request: FaturaModel): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/Bills`, request);
}
getAssinaturas(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/Subscriptions`);
}

getMetodos(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/MethodsPayments`).pipe(tap({
    next: list => {
      this.list.next(list);
      return of(list);
  } }));
}

getProdutos(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/Products`).pipe(tap({
    next: list => {
      this.list.next(list);
      return of(list);
  } }));
}

getPlanos(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/Plans`).pipe(tap({
    next: list => {
      this.list.next(list);
      return of(list);
  } }));
}

base64toThumbnails(base64Strings: string[], width: number, height: number): string[] {
  return base64Strings.map(base64 => this.getThumbnail(base64, width, height));
}

// Função para criar uma miniatura a partir de uma imagem em base64
private getThumbnail(base64: string, width: number, height: number): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const image = new Image();

  // Defina a largura e altura do canvas
  canvas.width = width;
  canvas.height = height;

  // Quando a imagem é carregada, desenhe-a no canvas
  image.onload = () => {
    ctx!.drawImage(image, 0, 0, width, height);
  };

  // Carregue a imagem
  image.src = 'data:image/jpeg;base64,' + base64;

  // Retorne a miniatura como URL
  return canvas.toDataURL('image/jpeg');
}


postUsuarios(request: UsersMkModel): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/Usuarios`, request);
}

getUsuarios(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/Usuarios`).pipe(tap({
    next: list => {
      this.list.next(list);
      return of(list);
  } }));
}





// obterAssinaturas(): Observable<any> {
//   return this.http.get<any>(`${this.baseUrl}/Subscription`);
// }




  
}



