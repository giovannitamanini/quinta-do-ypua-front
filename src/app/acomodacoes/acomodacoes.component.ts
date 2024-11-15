import { Component, OnInit } from '@angular/core';
import { AcomodacoesService } from './acomodacoes.service';
import { ComodidadesService } from '../comodidades/comodidades.service';

@Component({
  selector: 'app-acomodacoes',
  templateUrl: './acomodacoes.component.html',
  styleUrls: ['./acomodacoes.component.css']
})
export class AcomodacoesComponent implements OnInit {
  acomodacoes: any[] = [];
  novaAcomodacao: any = { comodidades: [] };
  editando = false;
  acomodacaoEditada: any = {};
  comodidades: any[] = [];

  constructor(private acomodacoesService: AcomodacoesService,
              private comodidadeService: ComodidadesService) { }

  ngOnInit() {
    this.carregarAcomodacoes();
    this.carregarComodidades();
  }

  carregarAcomodacoes() {
    this.acomodacoesService.getAcomodacoes().subscribe(acomodacoes => {
      this.acomodacoes = acomodacoes;
    });
  }

  carregarComodidades() {
    this.comodidadeService.getComodidades().subscribe(comodidades => {
      this.comodidades = comodidades.map((comodidade: any) => ({
        ...comodidade,
        selected: false
      }));
    });
  }

  criarAcomodacao() {
    const comodidadesSelecionadas = this.comodidades.filter((comodidade) => comodidade.selected);
    this.novaAcomodacao.comodidades = comodidadesSelecionadas;

    this.acomodacoesService.criarAcomodacao(this.novaAcomodacao).subscribe(() => {
      this.carregarAcomodacoes();
      this.carregarComodidades()
      this.novaAcomodacao = { comodidades: [] };
    });
  }

  editarAcomodacao(acomodacao: any) {
    this.acomodacaoEditada = { ...acomodacao }; 

    this.comodidades.forEach((comodidade) => {
      comodidade.selected = this.acomodacaoEditada.comodidades.some((c: any) => c.id === comodidade.id);
    });
  }

  atualizarAcomodacao() {
    const comodidadesSelecionadas = this.comodidades.filter(c => c.selected);
    this.acomodacaoEditada.comodidades = comodidadesSelecionadas;

    this.acomodacoesService.atualizarAcomodacao(this.acomodacaoEditada).subscribe(() => {
      this.carregarAcomodacoes();
      this.carregarComodidades()
      this.editando = false;
      this.acomodacaoEditada = {}; 
    });
  }

  excluirAcomodacao(id:any) {
    /*this.acomodacoesService.excluirAcomodacao(id).subscribe(() => {
      this.carregarAcomodacoes();
      this.carregarComodidades()
    });*/
    this.acomodacoesService.excluirAcomodacao(id).subscribe(
      () => {
        this.carregarAcomodacoes();
        this.carregarComodidades();
      },
      (error) => {
        // Aqui, capturamos o erro e exibimos uma mensagem ao usuário
        alert(error.error || "Erro ao excluir a acomodação.");
      }
    );
  }

}
