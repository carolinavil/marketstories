import { Component, Input } from '@angular/core';
import { VindiService } from '../../../../services/vindi-service';
import { lastValueFrom } from 'rxjs';
import { Column } from '../../../../helpers/column.interface';
import { SelectItem } from 'primeng/api';
import { usuariosColumns } from '../../../../models/pagamento.module';

@Component({
  selector: 'app-admin',

  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  usuarios:any
  objeto:any
  imagem: any
  base64Strings: string[] = []; // Supondo que você tenha uma lista de strings em base64
  @Input() icone: string = 'pi pi-search';
  loading: boolean = true; // Initially set to true to show the spinner

  columns: any= usuariosColumns;
  @Input() list: any[] = [];
  @Input() paginator: boolean = true;
  filters: string[] = [];


  first: number = 0; // Índice do primeiro item na página atual
  rows: number = 10; // Número de itens por página
  totalRecords: number = 120; // Total de registros (ajustar conforme necessário)
  thumbnails: string[] = []; // Lista de URLs de miniaturas

  images: string[] = []; // Lista de URLs de imagens


  matchModeOptions: SelectItem<any>[] = [
    { label: 'Começa com', value: 'startsWith' },
    { label: 'Contém', value: 'contains' },
    { label: 'Igual a', value: 'equals' },
    { label: 'Diferente de', value: 'notEquals' },
    { label: 'Termina com', value: 'endsWith' },
    { label: 'Dentro de', value: 'in' },
    { label: 'Menor que', value: 'lt' },
    { label: 'Menor ou igual a', value: 'lte' },
    { label: 'Maior que', value: 'gt' },
    { label: 'Maior ou igual a', value: 'gte' },
    { label: 'É', value: 'is' },
    { label: 'Não é', value: 'isNot' },
    { label: 'Antes', value: 'before' },
    { label: 'Depois', value: 'after' }
  ];
constructor(private vindiService: VindiService){


  lastValueFrom(vindiService.getUsuarios()).then(res=>{
    console.log('usuarios',res)
    this.usuarios = res
    
  })

  
}


ngOnInit() {
  this.loadData();
}

onInputChange(event: any) {
  console.log('Valor do input mudou:', event.target.value);
  // this.cleaned = false
}
async loadData() {
  try {
    const res = await lastValueFrom(this.vindiService.getUsuarios()); // Obter usuários do serviço
    this.usuarios = res; // Atribuir resposta à lista de usuários
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
  } finally {
    this.loading = false; // Definir loading como false após o carregamento
  }
}

onPageChange(event: any) {
  this.first = event.first;
  this.rows = event.rows;

}



redirecionarParaInstagram(url: string) {
  if (url) {
    // Cria um documento HTML com a imagem base64
    const newWindow = window.open();
    newWindow!.document.write('<html><body style="margin: 0; text-align: center;"><img src="' + url + '" style="max-width: 100%; max-height: 100%;"></body></html>');
  }
}
}
