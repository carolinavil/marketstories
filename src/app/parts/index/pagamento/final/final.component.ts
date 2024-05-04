import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';
import { PagamentoModel } from '../../../../models/pagamento.module';
@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css'],
  // providers:[{provide:CdkStepper,useExisting:StepperComponent}]
})
export class FinalComponent  {
  @Input() linearModeSelected = true;

  objeto: PagamentoModel = new PagamentoModel;

    ngOnInit(){
      console.log('carregou')
    }

}
