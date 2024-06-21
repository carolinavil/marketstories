import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Table } from '../utils/table';
import { Component } from '@angular/core';
// import { LoadingService } from '../parts/loading/loading';
import { getError } from '../utils/error';

@Injectable({
    providedIn: 'root'

})




export class RequestInterceptor implements HttpInterceptor {

    excludeUrlsToastr = [
        'turmas/excluir',

    ];

    excludeUrlsLoading = [
        'pessoa/consulta-pessoa',
        'accounts/verify-email',
    ];

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private table: Table,
        // private loadingUtils: LoadingService,
    ) {




    }

    isEnglish(text: string): boolean {
      const englishChars = /^[a-zA-Z]+$/; // ^ e $ garantem que toda a string seja composta apenas por caracteres do alfabeto inglês
      return englishChars.test(text);
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var notLoading = this.excludeUrlsLoading.filter(x => request.url.includes(x));
        var notToastr = this.excludeUrlsToastr.filter(x => request.url.includes(x));

        var loadingHeader = request.headers.get('loading');
        if (notLoading.length == 0 && (request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE' || loadingHeader == 'true')) {
            if (notLoading.length == 0) {
            }
        }

        this.table.resetSelection();
        return next.handle(request).pipe(
            tap({
                next: (data: any) => {

                    if (data.type == 0) {
                        if (request.method == 'POST' || request.method == 'PUT' || request.method == 'PATCH' || request.method == 'DELETE') {
                            this.table.onRowUnselect();
                        }
                    }
                    else
                    if (data instanceof HttpResponse) {
                        if ([200, 204, 201].includes(data.status)) {
                            if (data.body && (data.body.success == false || data.body == false)) {
                                if (notToastr.length == 0) {
                                  if (data.body.mensagem) {
                                    if (this.isEnglish(data.body.mensagem)) {
                                      console.log(data.body.mensagem)
                                      this.toastr.error("Ocorreu um erro.");
                                    } else {
                                      this.toastr.error(data.body.mensagem);
                                    }
                                  }
                                    else {
                                        if (request.method == 'POST') {
                                            this.toastr.error('Não foi possível concluir essa operação.');
                                        }
                                        else if (request.method == 'PUT') {
                                            this.toastr.error('Não foi possível atualizar esse registro.');
                                        }
                                        else if (request.method == 'PATCH') {
                                            this.toastr.error('Não foi possível concluir essa operação');
                                        }
                                        else if (request.method == 'DELETE') {
                                            if(data.body.message){

                                            }
                                            else{
                                                this.toastr.error('Não foi possível excluir esse registro.')
                                            }
                                          }


                                    }
                                }
                            } else {
                                if (notToastr.length == 0) {
                                    if (request.method == 'POST') {
                                        if(data.body.message){
                                            this.toastr.success(data.body.message,  'Sucesso:', {
                                              // closeButton: true,
                                              // timeOut:0,
                                              // toastClass: 'larger-toast',


                                            });
                                        }
                                        else{
                                            this.toastr.success('Operação realizada com sucesso')
                                        }
                                    }
                                    else if (request.method == 'PUT') {
                                        this.toastr.success('Registro atualizado com sucesso');
                                        this.table.onRowUnselect();
                                    }
                                    else if (request.method == 'PATCH') {
                                        this.toastr.success('Registro atualizado com sucesso');
                                        this.table.onRowUnselect();
                                    }
                                    else if (request.method == 'DELETE') {
                                        this.toastr.success('Registro excluído com sucesso')
                                        this.table.onRowUnselect();
                                    }
                                }


                                if (request.method == 'GET') {
                                    setTimeout(() => {
                                        this.table.goToCurrentPage();
                                    }, 100);
                                    this.table.loading.next(false)
                                    // this.loadingUtils.loading.next(false);
                                }

                            }

                        }
                    }
                },
                error: res => {
                    console.error('error', res);
                    var msg = getError(res);

                    if (res.status == 401) {
                        var returnUrl = window.location.pathname;
                        returnUrl = returnUrl.includes('account/login') ? '' : returnUrl;
                        this.router.navigate(['account', 'login'], { queryParams: { returnUrl } });
                        localStorage.clear();
                        this.toastr.error(`Acesso não autorizado. <br> Faça login.`);
                    }
                    else if (res.status == 403) {
                        this.toastr.error('Permissão negada.');
                    }
                    else if (notToastr.length == 0) {
                      if (this.isEnglish(msg)) {
                        console.log(this.isEnglish)
                        console.log(msg)
                        this.toastr.error("Ocorreu um erro.");
                      } else {
                        this.toastr.error(msg);
                      }
                  }
                    this.table.loading.next(false)
                    // this.loadingUtils.loading.next(false);

                    return throwError(() => new Error(msg));

                }
            }),
            // Log when response observable either completes or errors
            finalize(() => {
                this.table.loading.next(false)
                // this.loadingUtils.loading.next(false);
                if (request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE' || loadingHeader == 'true') {
                    // this.loadingUtils.removeLoadingRequest();
                }
            }),
        );
    }
}


