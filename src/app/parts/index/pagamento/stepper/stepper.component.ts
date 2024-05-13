import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers:[{provide:CdkStepper,useExisting:StepperComponent}]
})
export class StepperComponent extends CdkStepper {
  @Input() linearModeSelected = true;
  @Input() teste : any ='trash';
  @Input() iconClass= true;
  retorno: any
  onClick(index:number){
    this.selectedIndex = index;
  }
  icones:any = {
    'Checkout': 'plus',
    'Instagram': 'instagram',
    'Pagamento': 'credit-card'
  };

tipos:any = {
    'Checkout': 'fas',
    'Instagram': 'fab',
    'Pagamento': 'fas'
  };

  // box-shadow: 0px -1px 6px 5px #b172ff69;
  
  
//   isLastStep(index: number): boolean {
//     if (this.selectedIndex = 1){
//       this.selectedIndex = 
//     }
//     return index === 0
// }



}
