export class PagamentoModel {
  id: number = 0;
  nome: string = '';
  numero: string = '';
  email: string = '';
  instagram: string = '';
  exp_year: string = '';
}

export class MetodosModel {
  id: number = 0;
  public_name: string = '';
  metodo: string = '';
  plano: string = '';
  data: Date = new Date


}
// export class ClienteModel {
//   name: string = '';
//   email: string = '';
//   documento: string = '';
//   adress: any 
//   registry_code: string = '';
//   metodo: string = '';
//   plano: string = '';
//   data: Date = new Date;
//   telefone: TelefoneModel[] = [];
  




// }

export class ClienteModel {
  name: string = '';
  email: string = '';
  documento: string = '';
  registry_code: string = '';
  address: any 
  phones: TelefoneModel[] = [];
  




}


export class CartaoModel {
  holder_name: string = '';
  registry_code: string = '';
  card_expiration: string = '';
  card_number: string = '';
  card_cvv: string = '';
  payment_method_code: string = '';
  payment_company_code: string = '';

}


export class UsersMkModel {
  nome: string = '';
  email: string = '';
  senha: string = '';
  foto_instagram: string = '';
  usuario_instagram: string = '';
  crypto: boolean = false;


}

export class LoginModel {
  nome: string = '';
  email: string = '';
  senha: string = '';
  foto_instagram: string = '';
  usuario_instagram: string = '';
  crypto: boolean = false;


}


// export class LoginModel {
//   email: string = '';
//   senha: string = '';

// }




export class AssinaturaModel {
  plan_id: number =0;
  customer_id: number =0;

  // product_id: any

  // phones: TelefoneModel[] = [];
  payment_method_code: string = '';
  product_items: ProdutosModel[] = [];
  payment_profile: any
  




}

export class ProdutosModel {
  product_id: number =0;
}



export class PerfilPagamentoModel {
  holder_name: string = '';
  registry_code: string = '';
  card_expiration: string = '';
  card_number: string = '';
  card_cvv: string = '';
  payment_method_code: string = '';
  payment_company_code: string = '';
}


export class FaturaModel {
  plan_id: number =0;
  customer_id: number =0;
  payment_method_code: string = '';
  billing_at: string = '';
  due_at: string = '';
  bill_items: ProdutoModel[] = [];



}



export class TelefoneModel {
  phone_type: string = '';
  number: string = ''
}


export class ProdutoModel {
  product_id: number =0;
  amount: number =0;
}





export class AdressModel {
  state: string = ''
  neighborhood: string = '';
  number: string = '';
  country: string = 'BR';
  city: string = '';
  logradouro: string = '';
  complemento: string = '';
  zipcode: string = '';
  additional_details: string = '';

}




