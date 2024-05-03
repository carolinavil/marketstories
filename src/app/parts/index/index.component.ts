import { Component, EventEmitter, HostListener, NgModule, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swiper from 'swiper';
import { Router } from '@angular/router';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faHouse, faMask, faStar, faXmark, } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faTiktok, faTwitter, faYoutube, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { MatDrawer } from '@angular/material/sidenav';
import AOS from 'aos'

declare var M: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})



export class IndexComponent implements OnDestroy {
  valorInicial: number = 0;
  valorFinal: number = 1000;
  showMenu = false;

  contadorLayouts: number = 0;
  contadorStories: number = 0;
  contadorAssessores: number = 0;

  contadorLayoutsInterval: any;
  contadorStoriesInterval: any;
  contadorAssessoresInterval: any;

  
  
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @Input() titulo_cards: string = '';
  // @Input() teste: string = '';
  @Input() backgroundImageUrl = '';
  @Input() titulo = '';
  @Input() sub = '';
  // @Input() teste1: any;
  @ViewChild('drawer') drawer!: MatDrawer;
  mySwiper?: Swiper;
  slidesPerView: number = 4.5;
  spaceBetween: any
  spaceQuemSomos: any
  mobileCard = false
  mobileBeneficiosCard = 4.5
  teste1 = false;
  paddingConteudo = -100
  paddingFeed = -100
  condition: boolean = true;
  slidesPerViewQuemSomos: any
  drawerAberto = true;
  faIcon1 = ['fas', 'icon1'];
  faIcon2 = ['fas', 'icon2'];
  verificado: any



  Layoutscount:number = 0;
  Layoutscountstop: any


  Storiescount: number= 0;
  Storiescountstop: any
  
  Assessorescountstop: any
  Assessorescount: number= 0;

  @ViewChild('typeform') typeform!: ElementRef;
  constructor(
    private router: Router,
    private library: FaIconLibrary,
    private elementRef: ElementRef

  ) {

    








    
    this.adjustSlidesPerView(window.innerWidth);

    library.addIcons(faBars, faXmark, faHouse, faInstagram, faLinkedin, faTwitter, faYoutube, faFacebook, faTiktok, faWhatsapp, faStar)
  }

  initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Se a parte estiver visível, comece os contadores
          this.startCounterLayouts();
          this.startCounterStories();
          this.startCounterAssessores();
     
          
          // Desconectar o observador para que ele não seja chamado novamente
          observer.disconnect();
      
        }
      });
    });

    
   
    observer.observe(this.elementRef.nativeElement);
  }




  ContaLayouts() {
    this.Layoutscountstop = setInterval(() => {
      this.Layoutscount++;
      // Precisamos parar quando o contador atingir um valor específico
      if (this.Layoutscount === 36) {
        // clearInterval irá parar a execução da função setInterval
        clearInterval(this.Layoutscountstop);
      }
    }, 10); // 10 milissegundos - você pode ajustar conforme necessário


    this.Storiescountstop = setInterval(() => {
      this.Storiescount++;
      // Precisamos parar quando o contador atingir um valor específico
      if (this.Storiescount === 1055) {
        // clearInterval irá parar a execução da função setInterval
        clearInterval(this.Storiescountstop);
      }
    }, 10); // 10 milissegundos - você pode ajustar conforme necessário

    this.Assessorescountstop = setInterval(() => {
      this.Assessorescount++;
      // Precisamos parar quando o contador atingir um valor específico
      if (this.Assessorescount === 124) {
        // clearInterval irá parar a execução da função setInterval
        clearInterval(this.Assessorescountstop);
      }
    }, 10); // 10 milissegundos - você pode ajustar conforme necessário

  }
  

  startCounterLayouts() {
    this.contadorLayoutsInterval = setInterval(() => {
      this.contadorLayouts++;
      if (this.contadorLayouts == 124) {
        clearInterval(this.contadorLayoutsInterval);
      }
    }, 10);
  }

  startCounterStories() {
    this.contadorStoriesInterval = setInterval(() => {
      this.contadorStories++;
      if (this.contadorStories == 1.055) {
        clearInterval(this.contadorStoriesInterval);
      }
    }, 1);
  }

  startCounterAssessores() {
    this.contadorAssessoresInterval = setInterval(() => {
      this.contadorAssessores++;
      if (this.contadorAssessores == 124) {
        clearInterval(this.contadorAssessoresInterval);
      }
    }, 10);
  }


  ngOnDestroy(): void {
    clearInterval(this.contadorLayoutsInterval);
    clearInterval(this.contadorStoriesInterval);
    clearInterval(this.contadorAssessoresInterval);
    // const script = document.querySelector('script[src="//embed.typeform.com/next/embed.js""]');
    // if (script) {
    //   script.remove();
    // }
  }

  

  ngOnInit() {




const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Define a porcentagem de visibilidade do elemento
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.ContaLayouts()
          console.log('Parte da página está visível agora!');
          observer.unobserve(entry.target); // Desliga a observação após o primeiro acionamento
        }
      });
    }, options);

    observer.observe(this.elementRef.nativeElement.querySelector('.numeros-quem-somos'));


    this.initIntersectionObserver();

    AOS.init()


    setTimeout(() => {
      const logoBanner = document.querySelector('.imagem-logo-banner .logo-banner');
      if (logoBanner) {
        logoBanner.classList.add('shrink');
      }
    }, 500);
    setTimeout(() => {
      const imgBanner = document.querySelector('.carrossel .img-banner');
      if (imgBanner) {
        imgBanner.classList.add('shrink');
      }
    }, 500);


  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const seta = document.querySelector('.link-top');
    if (seta) {
      seta.classList.toggle('link-on', scrollY > 700);
    }
  }

  subir() {
    const scrollY = window.scrollY || window.pageYOffset;
    const seta = document.querySelector('.link-top');
    if (seta) {
      seta.classList.toggle('link-on', scrollY > 700);
    }
  }


  getIconName(): IconName {

    if (this.drawer && this.drawer.opened) {
      this.verificado = false
    }
    else {
      this.verificado = true
    }
    if (this.teste1 == true) {
      return 'bars'
    }
    else {
      return 'xmark'
    }


  };

  verifica(): boolean {
    if (this.drawer && this.drawer.opened) {
      console.log('teste')
      return true
    }
    else {
      return false
    }
  }


  teste() {
    if (this.teste1 == false) {
      this.teste1 = true
    }
    else {
      this.teste1 = false
    }

    this.drawerAberto = !this.drawerAberto;
    setTimeout(() => {
      // Se o drawer estiver fechado após 1 segundo, mude o background
      if (!this.drawerAberto) {
        // Código para mudar o background do mat-drawer-container
      }
    }, 4000); // 1000 milissegundos = 1 segundo

  }

  autoplayConfig = {
    delay: 3000, // Tempo de espera entre cada slide em milissegundos (3 segundos neste exemplo)
    disableOnInteraction: true, // Permitir ou não interação do usuário para pausar o autoplay
  };


  ngAfterViewInit(): void {

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.carrossel-testes');
      var instances = M.Carousel.init(elems, optionsTestes);
    });


    $(window).on('scroll', function () {
      if ($(this).scrollTop()! > 50) { // Se a rolagem for maior que 50 pixels
        $('.menu-desktop').addClass('active-menu'); // Altere para a cor desejada
        $('.link-header').addClass('active-link');
        $('.link-item-header').addClass('link-active');
        $('.logo-header').addClass('logo-header-active');
        $('.logo-header-pb').addClass('logo-header-pb-active');



      } else {
        $('.menu-desktop').removeClass('active-menu');
        $('.link-header').removeClass('active-link');// Volte para a cor padrão
        $('.link-item-header').removeClass('link-active');
        $('.logo-header').removeClass('logo-header-active');
        $('.logo-header-pb').removeClass('logo-header-pb-active');
      }
    });




    const elemsTestes = document.querySelectorAll('.carrossel-testes');
    const optionsTestes = {
      numVisible: 40,
      maxVisible: 40, // Ajuste o número de imagens visíveis aqui
      fullWidth: true,
      padding: 50,// Define o padding desejado,
      // autoplay: true, // Ativa o autoplay
      // interval: 2000,
      // opacity: false,
      indicators: true// Intervalo em milissegundos entre as transições dos slides

    };


    M.Carousel.init(elemsTestes, optionsTestes);

    // Adicione o script ao corpo do documento
  

    const elemsBanner = document.querySelectorAll('.carrossel-banner');
    const optionsBanner = {
      numVisible: 3,
      maxVisible: 3, // Ajuste o número de imagens visíveis aqui
      fullWidth: false,
      padding: 60,// Define o padding desejado,
      autoplay: true, // Ativa o autoplay
      interval: 2000,
      opacity: false, // Intervalo em milissegundos entre as transições dos slides,

    };


    M.Carousel.init(elemsBanner, optionsBanner);


    
    // const elemsApelativo = document.querySelectorAll('.carrossel-apelativo');
    // const optionsApelativo = {
    //   numVisible: 7,
    //   maxVisible: 7,
    // padding:300,
    //   fullWidth: true,


    // };


    // M.Carousel.init(elemsApelativo, optionsApelativo);


    const elemsConteudo = document.querySelectorAll('.carrossel-conteudo');
    const optionsConteudo = {
      numVisible: 4,
      maxVisible: 4, // Ajuste o número de imagens visíveis aqui
      fullWidth: false,
      padding: this.paddingConteudo,// Define o padding desejado,
      autoplay: true, // Ativa o autoplay
      interval: 2000,
      opacity: false,
      indicators: true// Intervalo em milissegundos entre as transições dos slides

    };


    M.Carousel.init(elemsConteudo, optionsConteudo);



    const elemsFeed = document.querySelectorAll('.carrossel-conteudo-feed');
    const optionsFeed = {
      numVisible: 4,
      maxVisible: 4, // Ajuste o número de imagens visíveis aqui
      fullWidth: false,
      padding: this.paddingFeed,// Define o padding desejado,
      autoplay: true, // Ativa o autoplay
      interval: 2000,
      opacity: false,
      indicators: true// Intervalo em milissegundos entre as transições dos slides

    };


    M.Carousel.init(elemsFeed, optionsFeed);



    const elemsLead = document.querySelectorAll('.carrossel-leads');
    const optionsLead = {
      numVisible: 3,
      maxVisible: 3, // Ajuste o número de imagens visíveis aqui
      fullWidth: false,
      padding: 100,// Define o padding desejado,
      autoplay: true, // Ativa o autoplay
      interval: 2000,
      opacity: false,
      indicators: true// Intervalo em milissegundos entre as transições dos slides

    };


    M.Carousel.init(elemsLead, optionsLead);


    // const elemsCont = document.querySelectorAll('.carousel');
    // const optionsCont = {
    //   numVisible: 5,
    //   maxVisible:5, // Ajuste o número de imagens visíveis aqui
    //   fullWidth:false,
    //   padding: 10 ,// Define o padding desejado,
    //   autoplay: true, // Ativa o autoplay
    //   interval: 2000,
    //   opacity: false, // Intervalo em milissegundos entre as transições dos slides,
    //   pagination: true

    // };


    // M.Carousel.init(elemsCont, optionsCont);

    //     const elemsCont = document.querySelectorAll('.carousel');
    // const optionsCont = {
    //   numVisible: 5,
    //   maxVisible:5, // Ajuste o número de imagens visíveis aqui
    //   fullWidth:false,
    //   padding: 10 ,// Define o padding desejado,
    //   autoplay: true, // Ativa o autoplay
    //   interval: 2000,
    //   opacity: false, // Intervalo em milissegundos entre as transições dos slides,
    //   indicators:true

    // };


    // M.Carousel.init(elemsCont, optionsCont);



    // const elemsCont = document.querySelectorAll('.carrossel-conteudo');
    // const optionsCont = {
    //   numVisible: 5,
    //   maxVisible:5, // Ajuste o número de imagens visíveis aqui
    //   fullWidth:false,
    //   padding: 10 ,// Define o padding desejado,
    //   autoplay: true, // Ativa o autoplay
    //   interval: 2000,
    //   opacity: false, // Intervalo em milissegundos entre as transições dos slides,
    //   indicators: true 

    // };


    // M.Carousel.init(elemsCont, optionsCont);





    const swiperOptions: any = {
      speed: 400,
      slidesPerView: 1.2,
      autoHeight: true,
      loop: true,
      autoplay: {
        delay: 1000, // Tempo em milissegundos
      },

    };
    // this.mySwiper = new Swiper(this.swiperContainer.nativeElement, swiperOptions);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustSlidesPerView(event.target.innerWidth);
  }
  adjustSlidesPerView(windowWidth: number) {
    this.mobileCard = false
    if (windowWidth <= 2000) {
      this.spaceBetween = '-150'
      this.spaceQuemSomos = '30'
      this.slidesPerViewQuemSomos = '6.5'
      console.log('oooooo')
      if (windowWidth <= 1500) {
        console.log('1400', this.slidesPerView)
        this.slidesPerView = 4.5;
        this.spaceBetween = '-95'
        console.log(this.slidesPerView)
        if (windowWidth <= 1040) {
          this.mobileCard = true
          console.log('teste')
          this.spaceBetween = '-55'
          this.slidesPerViewQuemSomos = '1';
          this.spaceQuemSomos = '0'

          console.log(this.slidesPerView)
        }
        if (windowWidth <= 960) {
          this.mobileCard = true
          this.slidesPerView = 2.5;
          this.spaceBetween = '-45'
          console.log(this.slidesPerView)
        }
        if (windowWidth <= 900) {
          this.mobileBeneficiosCard = 1.2
          console.log('mobile')
          this.paddingFeed = -300
          this.paddingConteudo = -300
        }

     
      }
    }
  }



  onComplete() {
    console.log('Animation completed');
  }

}

