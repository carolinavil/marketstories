// iugu.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssinaturaModel, ClienteModel, FaturaModel, MetodosModel, PagamentoModel, CartaoModel } from '../models/pagamento.module';
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

postCliente(request: ClienteModel): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/Customer`, request);
}



postCartao(request: CartaoModel): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/Payment`, request);
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




// obterAssinaturas(): Observable<any> {
//   return this.http.get<any>(`${this.baseUrl}/Subscription`);
// }




  
}



