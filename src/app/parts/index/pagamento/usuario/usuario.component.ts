import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersMkModel } from '../../../../models/pagamento.module';
import { VindiService } from '../../../../services/vindi-service';
import { lastValueFrom } from 'rxjs';
import * as ImageCompressor from 'image-compressor.js';

@Component({
  selector: 'app-usuario',

  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  usuarios: any
  usuariosModel = new UsersMkModel();
  arquivoSelecionado: File | null = null;
  primeiraSenha: string = '';
  constructor(
    private vindiService: VindiService
  ){

    
    lastValueFrom(this.vindiService.getUsuarios()).then(res => {
      // Acessando diretamente o array payment_methods
      const usuarios = res.usuarios;
      // Filtrando paymentMethods com base no código 'cash'

      console.log('usuarios', res);
    });

  }
  onFileSelected(event: any): void {
    const arquivoSelecionado: File = event.target.files[0];
    if (arquivoSelecionado) {
     
      this.previewImagem(arquivoSelecionado);
      console.log('Arquivo selecionado:', arquivoSelecionado);
    } else {
      console.log('Nenhum arquivo selecionado.');
    }



  }

  previewImagem(arquivo: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(arquivo);
    reader.onload = () => {
      const imagemBase64 = reader.result as string;
   
      this.usuariosModel.foto_instagram = imagemBase64;
    };
  }
  

  senhasNaoCoincidem: boolean = false;

  checkPasswordsMatch() {
    console.log(this.usuariosModel.senha, this.primeiraSenha);
    // Verifique se ambas as senhas estão definidas antes de compará-las
    if (this.usuariosModel.senha && this.primeiraSenha) {
      // Compare as senhas após garantir que ambas estão no mesmo formato (trim() remove espaços em branco extras)
      if (this.usuariosModel.senha.trim() !== this.primeiraSenha.trim()) {
        this.senhasNaoCoincidem = true;
      } else {
        this.senhasNaoCoincidem = false;
      }
    }
  }
  
verdade = false
  send(form: NgForm) {
    this.usuariosModel.crypto = true
    this.usuariosModel
    console.log(this.usuariosModel)
    lastValueFrom(this.vindiService.postUsuarios(this.usuariosModel)).then((res) => {
      
      console.log(res)
    })
  };

  teste(){
    console.log(this.verdade)
    if( this.primeiraSenha !== this.usuariosModel.senha){
      this.verdade =true
    }
    else{
      this.verdade =false
    }

  }

  }


  // sexoList = [
  //   { id: 1, nome: 'Masculino' },
  //   { id: 2, nome: 'Feminino' },

  // ]
