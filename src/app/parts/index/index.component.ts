import { Component, HostListener, NgModule, OnDestroy, TemplateRef } from '@angular/core';
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
  @Input() backgroundImageUrl = '';
  @Input() titulo = '';
  @Input() sub = '';
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

  ngOnDestroy(): void {
    clearInterval(this.contadorLayoutsInterval);
    clearInterval(this.contadorStoriesInterval);
    clearInterval(this.contadorAssessoresInterval);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    location.reload();
  }

  ngOnInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.ContaLayouts()
          observer.unobserve(entry.target);
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

  ngAfterViewInit(): void {
    // document.addEventListener('DOMContentLoaded', function () {
    //   var elems = document.querySelectorAll('.carrossel-testes');
    //   var instances = M.Carousel.init(elems, optionsTestes);
    // });

    $(window).on('scroll', function () {
      if ($(this).scrollTop()! > 50) {
        $('.menu-desktop').addClass('active-menu');
        $('.link-header').addClass('active-link');
        $('.link-item-header').addClass('link-active');
        $('.logo-header').addClass('logo-header-active');
        $('.logo-header-pb').addClass('logo-header-pb-active');
      } else {
        $('.menu-desktop').removeClass('active-menu');
        $('.link-header').removeClass('active-link');
        $('.link-item-header').removeClass('link-active');
        $('.logo-header').removeClass('logo-header-active');
        $('.logo-header-pb').removeClass('logo-header-pb-active');
      }
    });

    const elemsBanner = document.querySelectorAll('.carrossel-banner');
    const optionsBanner = {
      numVisible: 3,
      maxVisible: 3,
      fullWidth: false,
      padding: 60,
      autoplay: true,
      interval: 2000,
      opacity: false,
    };

    M.Carousel.init(elemsBanner, optionsBanner);
  }

  adjustSlidesPerView(windowWidth: number) {
    this.mobileCard = false
    if (windowWidth <= 2000) {
      this.spaceBetween = '-150'
      this.spaceQuemSomos = '30'
      this.slidesPerViewQuemSomos = '6.5'
      if (windowWidth <= 1500) {
        this.slidesPerView = 4.5;
        this.spaceBetween = '-95'
        if (windowWidth <= 1040) {
          this.mobileCard = true
          this.spaceBetween = '-55'
          this.slidesPerViewQuemSomos = '1';
          this.spaceQuemSomos = '0'
        }
        if (windowWidth <= 960) {
          this.mobileCard = true
          this.slidesPerView = 2.5;
          this.spaceBetween = '-45'
        }
        if (windowWidth <= 900) {
          this.mobileBeneficiosCard = 1.2
          this.paddingFeed = -300
          this.paddingConteudo = -300
        }
      }
    }
  }

  initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounterLayouts();
          this.startCounterStories();
          this.startCounterAssessores();
          observer.disconnect();
        }
      });
    });
    observer.observe(this.elementRef.nativeElement);
  }

  ContaLayouts() {
    this.Layoutscountstop = setInterval(() => {
      this.Layoutscount++;
      if (this.Layoutscount === 36) {
        clearInterval(this.Layoutscountstop);
      }
    }, 10);

    this.Storiescountstop = setInterval(() => {
      this.Storiescount++;
      if (this.Storiescount === 1055) {
        clearInterval(this.Storiescountstop);
      }
    }, 10);

    this.Assessorescountstop = setInterval(() => {
      this.Assessorescount++;
      if (this.Assessorescount === 124) {
        clearInterval(this.Assessorescountstop);
      }
    }, 10);
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

  // Other methods...
}
