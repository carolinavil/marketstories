import { Component, Input, OnInit } from '@angular/core';
import { VindiService } from '../../../../services/vindi-service';
import { lastValueFrom } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { usuariosColumns } from '../../../../models/pagamento.module';
import { format } from 'date-fns';

interface Usuario {
  data_criacao: string;
  data_criacao_formatada: string;
  foto_instagram?: string;
  // adicione outros campos conforme necessário
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuarios: Usuario[] = [];
  @Input() icone: string = 'pi pi-search';
  loading: boolean = true;
  columns: any = usuariosColumns;
  @Input() list: any[] = [];
  @Input() paginator: boolean = true;
  filters: string[] = [];
  first: number = 0;
  rows: number = 20;
  totalRecords: number = 120;
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

  constructor(private vindiService: VindiService) { }

  ngOnInit() {
    this.loadData();
  }

  formatarData(data: string): string {
    return format(new Date(data), 'dd/MM/yyyy');
  }

  async loadData() {
    try {
      const res = await lastValueFrom(this.vindiService.getUsuarios());
      this.usuarios = res.map((item: any) => ({
        ...item,
        data_criacao_formatada: this.formatarData(item.data_criacao)
      }));
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      this.loading = false;
    }
  }

  onInputChange(event: any) {
    console.log('Valor do input mudou:', event.target.value);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  redirecionarParaInstagram(url: string) {
    if (url) {
      const newWindow = window.open();
      newWindow!.document.write('<html><body style="margin: 0; text-align: center;"><img src="' + url + '" style="max-width: 100%; max-height: 100%;"></body></html>');
    }
  }
}
