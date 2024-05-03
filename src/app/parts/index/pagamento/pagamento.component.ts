import { Component, ViewChild } from '@angular/core';
import { VindiService } from '../../../services/vindi-service';
import { NgForm } from '@angular/forms';
import { AdressModel, AssinaturaModel, ClienteModel, MetodosModel, PagamentoModel, CartaoModel, PerfilPagamentoModel, ProdutosModel } from '../../../models/pagamento.module';
import { MatStepper } from '@angular/material/stepper';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faLocationDot, faMoneyCheckDollar, faPhone, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { CepService } from '../../../services/cep.service';
import { last, lastValueFrom } from 'rxjs';
import { TelefoneModel } from '../../../models/pagamento.module';
import { FaturaModel } from '../../../models/pagamento.module';
import { ProdutoModel } from '../../../models/pagamento.module';
import { format, addDays } from 'date-fns';
interface Car {
  label: string;
  value: string;
}

interface Phone {
  number: string;

}

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css'
})
export class PagamentoComponent {
  // objeto: PagamentoModel = new PagamentoModel;
  nome!: string;
  numero!: string;
  cvv!: string;
  exp_month!: string;
  exp_year!: string;
  date!: Date;

  cepInfo: any;
  cepInvalido: boolean = false;
  idCliente: number = 0;
  objeto: MetodosModel = new MetodosModel;
  objetoCliente = new ClienteModel;
  objetoEndereco = new AdressModel();

  // objeto: Usuario = new Usuario;
  cep: any;
  logradouro: any;
  localidade: any;
  bairro: any;
  enderecoFormat: any
  uf: any;
  ddd: any;
  @ViewChild('appStepper') appStepper!: MatStepper;
  @ViewChild('step1') step1: any; // Adicione referências de template às etapas
  @ViewChild('step2') step2: any;
  @ViewChild('step3') step3: any;
  btnTouched: boolean = false;
  metodos: MetodosModel[] = []
  pay: any
  subs: any
  prods: any
  cus: any
  plans: any
  clienteModel = new ClienteModel();
  assinaturaModel = new AssinaturaModel();
  perfilModel = new PerfilPagamentoModel();
  faturaModel = new FaturaModel();
  cartaoModel = new CartaoModel();

  telefonesModel = new TelefoneModel();
  telefones: any
  endereco: any
  data = new Date();


  dataFormatadaDias = addDays(this.data, 10);

  dataFormatada = format(this.dataFormatadaDias, 'yyyy-MM-dd');

  dataFormatadaTestes = format(this.data, 'yyyy-MM-dd');

  inputs: Phone[] = [{ number: '' }];



  visible: boolean = false;


  bandeiras: any = [
    {label: 'MasterCard', value: 'MasterCard'},
    {label: 'Visa', value:'Visa'},
    {label: 'American Express', value: 'American Express'},
    {label: 'Diners Club', value: 'Diners Club'},
    {label: 'Elo', value: 'Diners Club'},
    {label: 'Hipercard', value: 'Hipercard'},
    {label: 'JCB', value: 'JCB'},
   
    // Adicione mais opções conforme necessário
  ];

  constructor(private vindiService: VindiService,
    private cepService: CepService,
    private library: FaIconLibrary,
  ) {



    console.log('prosssd', this.dataFormatada, this.dataFormatadaDias)

    // this.cars = [
    //   {label: 'Volvo', value: 'Volvo'},
    //   {label: 'Saab', value: 'Saab'},
    //   {label: 'Mercedes', value: 'Mercedes'},
    //   {label: 'Audi', value: 'Audi'}
    // ];



    lastValueFrom(this.vindiService.getMetodos()).then(res => {
      // Acessando diretamente o array payment_methods
      const paymentMethods = res.payment_methods;
      this.pay = paymentMethods
      console.log('payment methods:', paymentMethods);
    });

    lastValueFrom(this.vindiService.getClientes()).then(res => {
      // Acessando diretamente o array payment_methods
      const customers = res.customers;
      this.cus = customers
      console.log('clientes:', this.cus);
    });

    lastValueFrom(this.vindiService.getAssinaturas()).then(res => {
      // Acessando diretamente o array payment_methods
      const assinaturas = res.subscriptions;
      this.subs = assinaturas
      console.log('assinaturas:', this.subs);
    });

    lastValueFrom(this.vindiService.getProdutos()).then(res => {
      // Acessando diretamente o array payment_methods
      const products = res.products;
      this.prods = products
      console.log('produtos:', products);
    });


    lastValueFrom(this.vindiService.getPlanos()).then(res => {
      // Acessando diretamente o array payment_methods
      const planos = res.plans;
      this.plans = planos
      console.log('planos:', planos);
    });



    lastValueFrom(this.vindiService.getPlanos())
      .then(res => {

        this.metodos = res;
        console.log('teste', this.metodos)
      });
    library.addIcons(faChevronRight, faUser, faTrash, faLocationDot, faPhone, faChevronLeft, faPlus, faMoneyCheckDollar)
  }

  showDialog() {
    this.visible = true;
  }

  // hideModal() {
  //   this.displayModal = false;
  // }
  voltar() {

  }


  mostrarBotao(): boolean {
    return this.perfilModel.payment_method_code === 'credit_card';
    return true

  }
  buscaCEP() {
    this.cepService.getCEP(this.cep).subscribe((data) => {
      
 
      
      this.cep = data.cep;
      this.logradouro = data.logradouro
      this.localidade = data.localidade
      this.uf = data.uf
      this.enderecoFormat = this.logradouro + ' - ' + this.localidade + ' , ' + this.uf
      this.bairro = data.bairro
      const endereco: any = {
        state: data.uf,
        neighborhood: data.bairro,
        // Fornecendo valores padrão para outras propriedades
        number: '',
        country: 'BR',
        city: '',
        logradouro: data.logradouro,
        complemento: ''
      };
      this.endereco = endereco

      console.log('end', endereco)
      console.log('this.objeto', this.objetoEndereco, data)

      console.log(this.bairro, this.localidade, this.uf, 'teste', this.objetoEndereco, this.clienteModel);

      

    });
  }
  blur(event: any) {
    this.buscaCEP();

    console.log(this.buscaCEP);
  }

  getMask(value: string): string {
    if (!value) return ''; // Retorna uma string vazia se o valor for nulo ou vazio
    return value.length <= 11 ? '000.000.000-009' : '00.000.000/0000-00';
  }

  // getMaskTelefone(phoneNumber: string): string {
   
  //   return phoneNumber.startsWith('9') ? '(00) 00000-0000' : '(00) 0000-0000';
  // }

  valorNaoClicado: Phone[] = [{ number: '' }];


  populaForm(dados: any, form: any) {
    form.setValue({
      cep: dados.cep,
      logradouro: dados.logradouro

    })
    console.log(dados.logradouro)

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    return filterValue;
  }

  @ViewChild('btn') btn: any;
  ngOnInit(): void {
    // this.getMetodos();
  }


  clientes: any;
  assinaturas: any





  onUpload(event: any) {
    // Acesso aos arquivos enviados
    for (let file of event.files) {
      console.log(file.name); // Nome do arquivo
      console.log(file.size); // Tamanho do arquivo
      console.log(file.type); // Tipo do arquivo
      console.log(file.objectURL); // URL do objeto (para visualizar imagens, por exemplo)
      // Aqui você pode implementar a lógica para manipular os arquivos enviados
    }
  }

  adicionarInput() {
    this.inputs.push({ number: '' });
    console.log(this.inputs);

    // Map the phone numbers to TelefoneModel objects
    const telefones: TelefoneModel[] = this.inputs.map(input => {
      return {
        phone_type: '',  // You may need to set the phoneType here
        number: input.number
      };
    });

    this.telefones = telefones
    console.log('telefones', this.telefones)

    console.log('Telefone Models:', telefones);
    console.log('Cliente Model:', this.clienteModel);

    console.log('Adress Models:', telefones);
    console.log('Cliente Model:', this.clienteModel);
  }

  atribuirValor(valor: string) {

    const telefones: TelefoneModel[] = this.valorNaoClicado.map(input => {
      return {
        phone_type: '',  // You may need to set the phoneType here
        number: input.number
      };
    });

    this.telefones = telefones
    console.log('telefones', this.telefones)
  }
  removerInput(index: number) {
    this.inputs.splice(index, 1);
  }


  send(form: NgForm) {
    console.log('telefones', this.telefones, this.endereco, this.objeto, this.clienteModel);
    this.clienteModel.phones = this.telefones;
    this.clienteModel.adress = this.endereco;

    // Posta o cliente
    lastValueFrom(this.vindiService.postCliente(this.clienteModel)).then((clientePostado) => {
      const id = clientePostado.customer.id;

      console.log('Cliente postado:', id);
      this.assinaturaModel.customer_id = id;

      this.perfilModel.registry_code = clientePostado.customer.registry_code
      
      console.log('cpf,',this.perfilModel.registry_code, clientePostado, clientePostado.customer.registry_code)
      // Todo o código que depende de idCliente deve estar dentro deste bloco then
      console.log('objeto final cliente', this.idCliente, clientePostado);
      console.log('objeto final', this.clienteModel, this.clienteModel.adress, this.assinaturaModel);
      console.log('objeto assinatura final', this.assinaturaModel, this.perfilModel);

      if (this.perfilModel.card_expiration.length === 4) {
        // Remove todos os caracteres não numéricos
        const onlyNumbers = this.perfilModel.card_expiration.replace(/\D/g, '');
        // Formata a string para "00/00"
        const expiration = this.perfilModel.card_expiration.trim();
        this.perfilModel.card_expiration = `${expiration.slice(0, 2)}/${expiration.slice(2)}`;
        console.log('validade', this.perfilModel.card_expiration);
      }

      


      const perfil_Pagamento: any = {
        holder_name: this.perfilModel.holder_name,
        registry_code: this.perfilModel.registry_code,
        card_expiration: this.perfilModel.card_expiration,
        card_number: this.perfilModel.card_number,
        card_cvv: this.perfilModel.card_cvv,
        payment_method_code: this.perfilModel.payment_method_code,
        payment_company_code: this.perfilModel.payment_company_code,



      }

  
      this.assinaturaModel.payment_method_code = this.perfilModel.payment_method_code
      this.assinaturaModel.payment_profile = perfil_Pagamento;



      // const plano = this.plans
      // this.assinaturaModel.product_items[0].product_id = clientePostado


      interface Produto {
        id: number;
        // outras propriedades do produto
      }

      // Supondo que this.plans seja um array do tipo Produto
      const planoEncontrado = this.plans.find((produto: Produto) => produto.id === this.assinaturaModel.plan_id);


      if (planoEncontrado) {
        if (!this.assinaturaModel.product_items) {
          this.assinaturaModel.product_items = [];
        }

        const produto: ProdutosModel = new ProdutosModel();
        produto.product_id = planoEncontrado.plan_items[0].product.id;

        const teste: any = {
          product_id: planoEncontrado.plan_items[0].product.id
        }


        this.assinaturaModel.product_items.push(teste);

        console.log('objeto finallllll', this.assinaturaModel);

      }


      // const planoEncontrado = this.plans.find((produto: ProdutosModel) => produto.product_id === this.assinaturaModel.plan_id);






















      else {
        console.log('Nenhum plano encontrado com o ID correspondente.');
      }

      console.log('objeto assinatura final atualizado', this.assinaturaModel, this.perfilModel, planoEncontrado,);

      // this.assinaturaModel.payment_method_code[0].holder_name = this.perfilModel.holder_name

      lastValueFrom(this.vindiService.postAssinatura(this.assinaturaModel)).then((assinaturaPostada) => {
        const id = assinaturaPostada.subscription.customer.id
        console.log(assinaturaPostada, assinaturaPostada.subscription.id)
        const plano = assinaturaPostada.subscription.plan.id
        // const metodo = assinaturaPostada.subscription.payment_method.code
        const produto = assinaturaPostada.subscription.product_items[0].product.id
        const preco = assinaturaPostada.subscription.product_items[0].pricing_schema.price
        const valorSemPontos = preco.replace(/\./g, '');
        console.log('preco', preco, valorSemPontos)
        const produtoModel = new ProdutoModel();
        produtoModel.product_id = produto;

        const produtos: any = {
          product_id: produto,
          amount: valorSemPontos,

        };

        this.faturaModel.bill_items.push(produtos);

        this.faturaModel.customer_id = id
        this.faturaModel.plan_id = plano
        // this.faturaModel.due_at = metodo
        // this.faturaModel.payment_method_code = metodo
        this.faturaModel.billing_at = this.dataFormatadaTestes
        this.faturaModel.due_at = this.dataFormatadaTestes



        // if (this.assinaturaModel.payment_method_code=='credit_card') {
        //   this.cartaoModel.payment_method_code = this.faturaModel.payment_method_code
        //   lastValueFrom(this.vindiService.postCartao(this.cartaoModel)).then((res => {
        //     return console.log(res, "corpo", this.cartaoModel)
        //   }))
        // }





        // lastValueFrom(this.vindiService.postFatura(this.faturaModel)).then((res => {
        //   return console.log(res, "corpo", this.faturaModel)
        // }))

        console.log('id', id, assinaturaPostada, this.faturaModel, produtoModel, this.cartaoModel, this.clienteModel)
      })
    });
  }






  sexoList = [
    { id: 1, nome: 'Masculino' },
    { id: 2, nome: 'Feminino' },

  ]





}
