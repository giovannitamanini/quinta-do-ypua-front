import { Component, OnInit } from '@angular/core';
import { AcomodacoesService } from './acomodacoes.service';

@Component({
  selector: 'app-acomodacoes',
  templateUrl: './acomodacoes.component.html',
  styleUrls: ['./acomodacoes.component.css']
})
export class AcomodacoesComponent implements OnInit {
  acomodacoes: any[] = [];
  novaAcomodacao: any = {};
  editando = false;
  acomodacaoEditada: any = {};

  constructor(private acomodacoesService: AcomodacoesService) { }

  ngOnInit() {
    this.carregarAcomodacoes();
  }

  carregarAcomodacoes() {
    this.acomodacoesService.getAcomodacoes().subscribe(acomodacoes => {
      this.acomodacoes = acomodacoes;
    });
  }

  criarAcomodacao() {
    console.log(this.novaAcomodacao)
    this.acomodacoesService.criarAcomodacao(this.novaAcomodacao).subscribe(() => {
      this.carregarAcomodacoes();
      this.novaAcomodacao = {};
    });
  }

  atualizarAcomodacao() {
    this.acomodacoesService.atualizarAcomodacao(this.acomodacaoEditada).subscribe(() => {
      this.carregarAcomodacoes();
      this.editando = false;
      this.acomodacaoEditada = {};
    });
  }

  excluirAcomodacao(id:any) {
    this.acomodacoesService.excluirAcomodacao(id).subscribe(() => {
      this.carregarAcomodacoes();
    });
  }
}
