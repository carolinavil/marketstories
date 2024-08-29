import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild ,ElementRef, input, } from '@angular/core';
import { VindiService } from '../../../services/vindi-service';
import { NgForm } from '@angular/forms';
import { AdressModel, AssinaturaModel, ClienteModel, MetodosModel, PagamentoModel, CartaoModel, PerfilPagamentoModel, ProdutosModel, UsersMkModel } from '../../../models/pagamento.module';
import { MatStepper } from '@angular/material/stepper';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight, faCheck, faChevronLeft, faChevronRight, faCircleCheck, faCreditCard, faLocationDot, faMagic, faMoneyCheckDollar, faPhone, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { CepService } from '../../../services/cep.service';
import { last, lastValueFrom } from 'rxjs';
import { TelefoneModel } from '../../../models/pagamento.module';
import { FaturaModel } from '../../../models/pagamento.module';
import { ProdutoModel } from '../../../models/pagamento.module';
import { format, addDays } from 'date-fns';
import { Router, ActivatedRoute } from '@angular/router';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swiper from 'swiper';
import * as lottie from 'lottie-web';
import { NavigationEnd } from '@angular/router';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { StepperComponent } from './stepper/stepper.component';
import * as intlTelInput from 'intl-tel-input';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { icon } from '@fortawesome/fontawesome-svg-core';
interface Car {
  label: string;
  value: string;
}

interface Phone {
  number: string;

}
declare var M: any;



@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css'
})
export class PagamentoComponent implements OnInit, OnDestroy {

  
  validacaoRegistro = false
  validacaoPay = false
  spaceBetween: any
  btnClicked = false;
  slidesPerView: any
  loading = false
  // objeto: PagamentoModel = new PagamentoModel;
  nome!: string;
  numero!: string;
  cvv!: string;
  exp_month!: string;
  exp_year!: string;
  date!: Date;
  usuarios: any;
  btnClicado: boolean = false;
  usuariosModel = new UsersMkModel();
  arquivoSelecionado: File | null = null;
  primeiraSenha: string = '';
  numeroInvalido: boolean = false
  mySwiper?: Swiper;
  teste123: string = 'fa-user';
  cepInfo: any;
  cepInvalido: boolean = false;
  idCliente: number = 0;
  objeto: MetodosModel = new MetodosModel;
  objetoCliente = new ClienteModel;
  objetoEndereco = new AdressModel();
  objetoUsuarios = new UsersMkModel()
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
  isClicked = false;
  nomeD:any;
  emailD:any;
  telefoneD: any
teste884= '00 0000-00000'
teste222 = '(00) 0000'
  prods: any
  cus: any
  plans: any
  clienteModel = new ClienteModel();
  clienteModelTestes = new ClienteModel();
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
  paisTelefone: any
  valorNaoClicado: Phone[] = [{ number: '' }];
  visible: boolean = false;
  bandeiras: any = [
    { label: 'MasterCard', value: 'MasterCard'},
    { label: 'Visa', value: 'Visa' },
    { label: 'American Express', value: 'American Express' },
    { label: 'Diners Club', value: 'Diners Club' },
    { label: 'Elo', value: 'Elo' },
    { label: 'Hipercard', value: 'Hipercard' },
    { label: 'JCB', value: 'JCB' },
    // Adicione mais opções conforme necessário
  ];
  

  country: any = [
    { label: '+55', value: '55', image: '../../../assets/img/brazil.png' },
    { label: '+1', value: '1', image: '../../../assets/img/united-states.png' },
    { label: '+44', value: '44', image: '../../../assets/img/united-kingdom.png' },
    { label: '+33', value: '33', image: '../../../assets/img/france.png' },
    { label: '+49', value: '49', image: '../../../assets/img/germany.png' },
    { label: '+34', value: '34', image: '../../../assets/img/spain.png' },
    { label: '+91', value: '91', image: '../../../assets/img/india.png' },
    { label: '+81', value: '81', image: '../../../assets/img/japan.png' },
    { label: '+61', value: '61', image: '../../../assets/img/australia.png' },
    { label: '+86', value: '86', image: '../../../assets/img/china.png' },
    // { label: '+27', value: '27', image: '../../../assets/img/south-africa.png' }, // Corrigido
    // { label: '+52', value: '52', image: '../../../assets/img/mexico.png' }, // Corrigido
    // { label: '+56 Chile', value: '56', image: '../../../assets/img/chile.png' }, // Corrigido
    // { label: '+54 Argentina', value: '54', image: '../../../assets/img/argentina.png' }, // Corrigido
  ];
  
  // @ViewChild('phoneInput', { static: true }) phoneInput!: ElementRef;
  // phoneNumber: string = '';
  formatPhone(index: number) {
    let number = this.inputs[index].number.replace(/\D/g, ''); // Remove non-numeric characters
    
    // Verifica se o número é nacional (10 dígitos) ou internacional (12 dígitos com código de país)
    if (number.length === 11) {
        // Formato nacional: (000) 0000 0000
        this.inputs[index].number = `(${number.substring(0, 2)}) ${number.substring(2, 7)}-${number.substring(7, 11)}`;
    } else if (number.length === 10) {
        // Formato internacional: 000-000-0000
        this.inputs[index].number = `${number.substring(0, 3)}-${number.substring(3, 6)}-${number.substring(6, 12)}`;
    } else {
        // Se o número não tiver o comprimento esperado, mantém o valor original
        this.inputs[index].number = number;
    }
}

  
  
  isExpanded: boolean = false;
  desativado: boolean = false;

  handleClick() {
    console.log('teste',this.clienteModel.name, this.telefones[0].number)
    this.isClicked = true;
    this.telefoneD = this.telefones[0].number;
    this.nomeD = this.clienteModel.name
    this.emailD = this.clienteModel.email
  }
  ngAfterViewInit() {
  
    const elemsBanner = document.querySelectorAll('.carrossel-banner');
    const optionsBanner = {
      autoplay: true, // Ativa o autoplay      numVisible: 3,
      maxVisible: 5, // Ajuste o número de imagens visíveis aqui
      fullWidth: true,
      padding: 60,// Define o padding desejado,

      interval: 100,
      opacity: false, // Intervalo em milissegundos entre as transições dos slides,

    };


    M.Carousel.init(elemsBanner, optionsBanner);
  }
  expandFooter() {
    this.isExpanded = !this.isExpanded;
  }
  selectedImage: string | ArrayBuffer | null = null;
  onBtnClicado() {
    this.btnClicado = true;
    console.log('teste')
  }
  onFileSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }

    const arquivoSelecionado: File = event.target.files[0];
    if (arquivoSelecionado) {

      this.previewImagem(arquivoSelecionado);
      console.log('Arquivo selecionado:', arquivoSelecionado);
    } else {
      console.log('Nenhum arquivo selecionado.');
    }
  }

  verificarTelefoneValido(numero: string): boolean {
    // Regex para verificar se o número de telefone tem o formato correto
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return telefoneRegex.test(numero);
  }
  constructor(
    private fb: FormBuilder,
    private vindiService: VindiService,
    private cepService: CepService,
    private library: FaIconLibrary,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
 



    this.adjustSlidesPerView(window.innerWidth);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/pagamento') {
          this.scrollToTop();
        }
      }
    });

 
  




    console.log('prosssd', this.dataFormatada, this.dataFormatadaDias)

    // this.cars = [
    //   {label: 'Volvo', value: 'Volvo'},
    //   {label: 'Saab', value: 'Saab'},
    //   {label: 'Mercedes', value: 'Mercedes'},
    //   {label: 'Audi', value: 'Audi'}
    // ];



    lastValueFrom(this.vindiService.getUsuarios()).then(res => {
      // Acessando diretamente o array payment_methods
      const usuarios = res.usuarios;
      // Filtrando paymentMethods com base no código 'cash'

      console.log('usuarios', res);
    });

    lastValueFrom(this.vindiService.getMetodos()).then(res => {
      // Acessando diretamente o array payment_methods
      const paymentMethods = res.payment_methods;
      // Filtrando paymentMethods com base no código 'cash'
      this.pay = paymentMethods.filter((opcao: any) => opcao.code == 'credit_card');
      console.log('Opções de pagamento após o filtro:', this.pay);
    });


    lastValueFrom(this.vindiService.getClientes()).then(res => {
      // Acessando diretamente o array payment_methods
      const customers = res.customers;
      this.cus = customers

      // this.cus = res.customers.filter((opcao: any) => opcao.status !== 'archived');
      // console.log('Opções de pagamento após o filtro:', this.cus);
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


      this.prods = products.filter((opcao: any) => opcao.id == 1479734);
      console.log('Opções de pagamento após o filtro:', this.prods);
      console.log('produtos:', this.prods);

    });


    lastValueFrom(this.vindiService.getPlanos()).then(res => {


      // Acessando diretamente o array payment_methods
      const planos = res.plans;

      this.plans = planos.filter((opcao: any) => opcao.id == 430912);
      console.log('Opções de pagamento após o filtro:', this.plans);

    });



    lastValueFrom(this.vindiService.getPlanos())
      .then(res => {

        this.metodos = res;
        console.log('teste', this.metodos)
      });
    library.addIcons(faChevronRight, faUser, faTrash, faLocationDot, faPhone, faChevronLeft, faPlus, faMoneyCheckDollar, faArrowRight, faArrowLeft, faCheck, faCreditCard, faInstagram, faCircleCheck, faWhatsapp)
  }

  ngOnDestroy(): void {
    // this.sendEmail();
    // clearTimeout(this.timer);
    window.removeEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }
  onSubmit2() {

  }
  sendEmail(): void {

  
      emailjs.send('service_tthpqxr', 'template_18rg2ek').then((res) => {
          
        console.log('EMAIL ENVIADO nome' , res.status, res.text)
      },

      (err)=>{
        console.log('EERO', err)
      }
    )
 
  }


  



  handleBeforeUnload(event: BeforeUnloadEvent): void {

    if(this.isClicked==true){
      emailjs.init('szyzwshyKvm3WiUsK');
      emailjs.send('service_tthpqxr', 'template_18rg2ek',{
        emailD:this.emailD,
        nomeD:this.nomeD,
        telefoneD:this.telefoneD

      })
        .then((response) => {
          console.log('E-mail enviado com sucesso:', response);
        })
        .catch((error) => {
          console.error('Erro ao enviar e-mail:', error);
        });
  
      // Configurar o retorno para que o navegador mostre uma mensagem
      event.preventDefault();
      event.returnValue = ''; // Necessário para alguns navegadores
    }
   

  
   
  }




  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showDialog() {
    this.visible = true;
  }

  // hideModal() {
  //   this.displayModal = false;
  // }
  voltar() {

  }



  adjustSlidesPerView(windowWidth: number) {

    if (windowWidth <= 2000) {
      this.spaceBetween = '-150'
      this.slidesPerView = '6.5'
      console.log('oooooo')
      // console.log(this.slidesPerView, 'teste234')
      if (windowWidth >= 900) {
        console.log('1400', this.slidesPerView)
        this.slidesPerView = 5;
        this.spaceBetween = '0'
        console.log(this.slidesPerView)

        // console.log(this.slidesPerView, 'teste234')
      }
      if (windowWidth <= 900) {
        console.log('1400', this.slidesPerView)
        this.slidesPerView = 2;
        this.spaceBetween = '-20'
        console.log(this.slidesPerView, 'teste234')


      }
    }
  }

  exibirTeste: boolean = false;

  // Método para lidar com o envio do formulário
  enviarFormulario(form: any) {
    console.log('oi')
    if (form.invalid) {
      // Se o formulário for inválido, exibe o elemento "teste"
      this.exibirTeste = true;
    }
  }

  onFileDrop(event: any) {
    // Lógica para lidar com os arquivos soltos
    console.log(event);
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
        city: data.localidade,
        zipcode: data.cep,
        additional_details: '',
        street: data.logradouro
      };





      this.endereco = endereco
      this.clienteModel.address = this.endereco;
      console.log('end', endereco)
      console.log('this.objeto', this.objetoEndereco, data, 'conteudo', this.clienteModel)

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
 this.paisTelefone = '55'

    // const phoneInputField = this.phoneInput.nativeElement;
    
    // intlTelInput(phoneInputField, {
    //   initialCountry: 'auto',
    //   utilsScript: 'assets/js/utils.js', // Certifique-se de incluir o script de utilitários
    //   preferredCountries: ['br', 'us'],  // Customize os países preferidos
    // });
  
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
    // this.getMetodos();


  }


  countries = [
    { name: 'Brasil', code: 'BR', dialCode: '+55' },
    { name: 'Estados Unidos', code: 'US', dialCode: '+1' },
    { name: 'Canadá', code: 'CA', dialCode: '+1' },
    // Adicione mais países conforme necessário
  ];

  clientes: any;
  assinaturas: any




  // validateRegistryCode() {
  //   const registryCode = this.clienteModel.registry_code;
  //   this.http.get(`${this.apiUrl}/validate/${registryCode}`).subscribe(
  //     (response: any) => {
  //       if (!response.isValid) {
  //         alert('CPF/CNPJ não encontrado.');
  //       }
  //     },
  //     (error) => {
  //       console.error('Erro ao validar CPF/CNPJ', error);
  //     }
  //   );}
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
        number: this.paisTelefone+ input.number
      };
    });

    this.telefones = telefones
    console.log('telefones', this.telefones)

    console.log('Telefone Models:', telefones);
    console.log('Cliente Model:', this.clienteModel);

    console.log('Address Models:', telefones);
    console.log('Cliente Model:', this.clienteModel);
  }

  atribuirValor(numero: string) {

    console.log('testethis.inputs', this.inputs, this.inputs, numero);
    if (numero.length >= 3 && numero[2] !== '9') {
      this.numeroInvalido = true

    }
    else {
      this.numeroInvalido = false
    }
    const telefones: TelefoneModel[] = this.inputs.map(input => {
      const numeroCompleto = `${this.paisTelefone}${input.number}`;
      return {
        phone_type: 'mobile',  // You may need to set the phoneType here

        number: numeroCompleto
      };
    });

    this.telefones = telefones
    console.log('telefones', this.telefones)

    console.log('Telefone Models:', telefones);
    console.log('Cliente Model:', this.clienteModel);

    console.log('Address Models:', telefones);
    console.log('Cliente Model:', this.clienteModel);
  }


  removerInput(index: number) {
    this.inputs.splice(index, 1);
  }




  validateRegistry(form2:any, stepper: StepperComponent) {
    lastValueFrom(this.vindiService.postSandBoxCliente(this.clienteModel)).then((clientePostado) => {
      console.log(clientePostado.customer.id, 'Dados validados com sucesso');
      console.log('foi')
      this.appStepper.next();
      // lastValueFrom(this.vindiService.deleteCliente(clientePostado.customer.id)).then(() => {

      //   console.log('nao foi')
      //     console.log('Dados excluídos após validação');
      //     this.appStepper.next();
      // }).catch((erroExclusao) => {
      //     console.error('Erro ao excluir dados:', erroExclusao);
      // });

    }).catch((erroPostagem) => {
      this.validacaoRegistro = true
      // Captura qualquer erro ocorrido durante a validação com a Vindi
      console.error('Erro ao validar cliente com a Vindi:', erroPostagem);
    });

 
  }




  onFileSelected(event: any): void {




  }

  validateCartao(form: NgForm){
    this.btnClicked = true
    lastValueFrom(this.vindiService.postAssinatura(this.assinaturaModel)).then((assinaturaPostada) => {
      const id = assinaturaPostada.subscription.customer.id;
      console.log(assinaturaPostada, assinaturaPostada.subscription.id);
      const plano = assinaturaPostada.subscription.plan.id;
      const produto = assinaturaPostada.subscription.product_items[0].product.id;
      const preco = assinaturaPostada.subscription.product_items[0].pricing_schema.price;
      const valorSemPontos = preco.replace(/\./g, '');
      console.log('preco', preco, valorSemPontos);
      const produtoModel = new ProdutoModel();
      produtoModel.product_id = produto;

      const produtos: any = {
        product_id: produto,
        amount: valorSemPontos,
      };

      this.faturaModel.bill_items.push(produtos);

      this.faturaModel.customer_id = id;
      this.faturaModel.plan_id = plano;
      this.faturaModel.billing_at = this.dataFormatadaTestes;
      this.faturaModel.due_at = this.dataFormatadaTestes;
      console.log('ASSINATURA', assinaturaPostada)
      this.loading = false;
      console.log('id', id, assinaturaPostada, this.faturaModel, produtoModel, this.cartaoModel, this.clienteModel);
      this.router.navigate(['final'], { relativeTo: this.activatedRoute });
    }).catch((error) => {
      this.validacaoPay = true
      console.error('Erro ao postar assinatura:', error);
      this.loading = false; // Ensure loading is set to false on error
    });

    
  }


  send(form: NgForm) {
   
    this.loading = true;
    console.log('TESTE');
    console.log('telefones', this.telefones, this.endereco, this.objeto, this.clienteModel);
    this.clienteModel.phones = this.telefones;
    this.clienteModel.address = this.endereco;

    // Posta o cliente
    lastValueFrom(this.vindiService.postCliente(this.clienteModel)).then((clientePostado) => {
      const id = clientePostado.customer.id;

      console.log('Cliente postado:', id);
      this.assinaturaModel.customer_id = id;
      this.perfilModel.registry_code = clientePostado.customer.registry_code;

      console.log('cpf,', this.perfilModel.registry_code, clientePostado, clientePostado.customer.registry_code);
      console.log('objeto final cliente', this.idCliente, clientePostado);
      console.log('objeto final', this.clienteModel, this.clienteModel.address, this.assinaturaModel);
      console.log('objeto assinatura final', this.assinaturaModel, this.perfilModel);

      if (this.perfilModel.card_expiration.length === 4) {
        const onlyNumbers = this.perfilModel.card_expiration.replace(/\D/g, '');
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
      };

      console.log('testeteste', perfil_Pagamento)

      this.assinaturaModel.payment_method_code = this.perfilModel.payment_method_code;
      this.assinaturaModel.payment_profile = perfil_Pagamento;

      interface Produto {
        id: number;
      }

      const planoEncontrado = this.plans.find((produto: Produto) => produto.id === this.assinaturaModel.plan_id);

      if (planoEncontrado) {
        if (!this.assinaturaModel.product_items) {
          this.assinaturaModel.product_items = [];
        }

        const produto: ProdutosModel = new ProdutosModel();
        produto.product_id = planoEncontrado.plan_items[0].product.id;

        const teste: any = {
          product_id: planoEncontrado.plan_items[0].product.id
        };

        this.assinaturaModel.product_items.push(teste);

        console.log('objeto finallllll', this.assinaturaModel, clientePostado);
      } else {
        console.log('Nenhum plano encontrado com o ID correspondente.');
      }

      console.log('objeto assinatura final atualizado', this.assinaturaModel, this.perfilModel, planoEncontrado);

      lastValueFrom(this.vindiService.postAssinatura(this.assinaturaModel)).then((assinaturaPostada) => {
        const id = assinaturaPostada.subscription.customer.id;
        console.log(assinaturaPostada, assinaturaPostada.subscription.id);
        const plano = assinaturaPostada.subscription.plan.id;
        const produto = assinaturaPostada.subscription.product_items[0].product.id;
        const preco = assinaturaPostada.subscription.product_items[0].pricing_schema.price;
        const valorSemPontos = preco.replace(/\./g, '');
        console.log('preco', preco, valorSemPontos);
        const produtoModel = new ProdutoModel();
        produtoModel.product_id = produto;

        const produtos: any = {
          product_id: produto,
          amount: valorSemPontos,
        };

        this.faturaModel.bill_items.push(produtos);

        this.faturaModel.customer_id = id;
        this.faturaModel.plan_id = plano;
        this.faturaModel.billing_at = this.dataFormatadaTestes;
        this.faturaModel.due_at = this.dataFormatadaTestes;
        console.log('ASSINATURA', assinaturaPostada)
        this.loading = false;
        console.log('id', id, assinaturaPostada, this.
        
          faturaModel, produtoModel, this.cartaoModel, this.clienteModel);
          console.log('vai entrar4343',this.usuariosModel.nome)
          emailjs.init('szyzwshyKvm3WiUsK')
          emailjs.send('service_tthpqxr', 'template_p5nb22n',{
  
            name: this.usuariosModel.nome,
            email: this.usuariosModel.email,
            usuario: this.usuariosModel.usuario_instagram,
            telefone: this.usuariosModel.telefone
          }).then((res) => {
          
            console.log('EMAIL ENVIADO nome' , res.status, res.text)
          },
    
          (err)=>{
            console.log('EERO', err)
          }
        )
       
       
          this.router.navigate(['final'], { relativeTo: this.activatedRoute });
      }).catch((error) => {
        
        console.error('Erro ao postar assinatura:', error);
        this.loading = false; // Ensure loading is set to false on error
      });

      this.usuariosModel.crypto = true;
      this.usuariosModel.email = this.clienteModel.email;
      this.usuariosModel.telefone = this.clienteModel.phones[0].number

      lastValueFrom(this.vindiService.postUsuarios(this.usuariosModel)).then((res) => {
        console.log('telefone final', res);
      }).catch((error) => {
        console.error('Erro ao postar usuário:', error);
        this.loading = false; // Ensure loading is set to false on error
      });
    }).catch((error) => {
      console.error('Erro ao postar cliente:', error);
      this.loading = false; // Ensure loading is set to false on error
    });
  }

  previewImagem(arquivo: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(arquivo);
    reader.onload = () => {
      const imagemBase64 = reader.result as string;

      this.usuariosModel.foto_instagram = imagemBase64;
    };
  }
  verdade = false
  teste() {
    console.log(this.verdade)
    if (this.primeiraSenha !== this.usuariosModel.senha) {
      this.verdade = true
    }
    else {
      this.verdade = false
    }

  }


  sexoList = [
    { id: 1, nome: 'Masculino' },
    { id: 2, nome: 'Feminino' },

  ]









}