import { Component, OnInit } from '@angular/core';
import { AcomodacoesService } from './acomodacoes.service';
import { ComodidadesService } from '../comodidades/comodidades.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  totalPages: number = 0;
  currentPage: number = 0;
  size: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];

  constructor(private acomodacoesService: AcomodacoesService,
              private comodidadeService: ComodidadesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.carregarAcomodacoesPaginadas();
    this.carregarComodidades();
  }

  carregarAcomodacoes() {
    this.acomodacoesService.getAcomodacoes().subscribe(acomodacoes => {
      this.acomodacoes = acomodacoes;
    });
  }

  carregarAcomodacoesPaginadas(page: number = 0) {
    this.acomodacoesService.getAcomodacoesPaginadas(page, this.size).subscribe(response => {
      this.acomodacoes = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
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
      this.carregarAcomodacoesPaginadas();
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
      this.carregarAcomodacoesPaginadas();
      this.carregarComodidades()
      this.editando = false;
      this.acomodacaoEditada = {}; 
    });
  }

  excluirAcomodacao(id:any) {
    this.acomodacoesService.excluirAcomodacao(id).subscribe(
      () => {
        this.carregarAcomodacoesPaginadas();
        this.carregarComodidades();
      },
      (error) => {
        this.snackBar.open(error.error || "Erro ao excluir a acomodação.", "Fechar", {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  mudarPagina(novaPagina: number): void {
    if (novaPagina >= 0 && novaPagina < this.totalPages) {
      this.currentPage = novaPagina;
      this.carregarAcomodacoesPaginadas(this.currentPage);
    }
  }

  mudarTamanhoPagina(tamanho: number): void {
    this.size = tamanho;
    this.currentPage = 0;
    this.carregarAcomodacoesPaginadas(this.currentPage);
  }
}
