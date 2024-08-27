import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';
import { PagamentoModel } from '../../../../models/pagamento.module';
import {faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css'],
  // providers:[{provide:CdkStepper,useExisting:StepperComponent}]
})
export class FinalComponent  {
  @Input() linearModeSelected = true;

  objeto: PagamentoModel = new PagamentoModel;
constructor(    private library: FaIconLibrary,){

  library.addIcons( faWhatsapp)
}


    ngOnInit(){
      console.log('carregou')
    }

}
