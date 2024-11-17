
import { Component, OnInit } from '@angular/core';
import { ComodidadesService } from './comodidades.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comodidades',
  templateUrl: './comodidades.component.html',
  styleUrls: ['./comodidades.component.css']
})
export class ComodidadesComponent implements OnInit {
  comodidades: any[] = [];
  novaComodidade: any = {};
  editando = false;
  comodidadeEditada: any = {};

  mostrarFiltros = false;
  descricaoFiltro: string = '';
  selectedTipo: string = 'Todos';
  listTipos: string[] = ['Todos', 'MOBILIA', 'ELETRODOMESTICOS', 'UTENSILIOS', 'OUTROS'];

  totalPages: number = 0;
  currentPage: number = 0;
  size: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];

  constructor(private comodidadeService: ComodidadesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.carregarComodidadesPaginadas();
  }

  carregarComodidades() {
    this.comodidadeService.getComodidades().subscribe(comodidades => {
      this.comodidades = comodidades;
    });
  }

  carregarComodidadesPaginadas(page: number = 0) {
    this.comodidadeService.getComodidadesPaginadas(page, this.size).subscribe(response => {
      this.comodidades = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
    });
  }

  carregarComodidadesComFiltros(page: number = 0, descricao: string = '', tipo: string = '') {
    this.comodidadeService.getComodidadesComFiltros(descricao, tipo, page, this.size).subscribe(response => {
      this.comodidades = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
    });
  }

  criarComodidade() {
    console.log(this.novaComodidade)
    this.comodidadeService.criarComodidade(this.novaComodidade).subscribe(() => {
      this.carregarComodidadesPaginadas();
      this.novaComodidade = {};
    });
  }

  atualizarComodidade() {
    this.comodidadeService.atualizarComodidade(this.comodidadeEditada).subscribe(() => {
      this.carregarComodidadesPaginadas();
      this.editando = false;
      this.comodidadeEditada = {};
    });
  }

  excluirComodidade(id:any) {
    this.comodidadeService.excluirComodidade(id).subscribe(
      () => {
        this.carregarComodidadesPaginadas();
      },
      (error) => {
        this.snackBar.open(error.error || "Erro ao excluir a comodidade.", "Fechar", {
          duration: 3000,
          panelClass: ['error-snackbar'] 
        });
      }
    );
  }

  mudarPagina(novaPagina: number): void {
    if (novaPagina >= 0 && novaPagina < this.totalPages) {
      this.currentPage = novaPagina;
      if(this.descricaoFiltro != '' || this.selectedTipo != 'Todos'){
        this.carregarComodidadesComFiltros(this.currentPage, this.descricaoFiltro, this.selectedTipo);
      }else{
        this.carregarComodidadesPaginadas(this.currentPage);
      }
    }
  }

  mudarTamanhoPagina(tamanho: number): void {
    this.size = tamanho;
    this.currentPage = 0;
    if(this.descricaoFiltro != '' || this.selectedTipo != 'Todos'){
      this.carregarComodidadesComFiltros(this.currentPage, this.descricaoFiltro, this.selectedTipo);
    }else{
      this.carregarComodidadesPaginadas(this.currentPage);
    }
  }

  filtrarComodidades() {
    this.currentPage = 0;
    this.carregarComodidadesComFiltros(this.currentPage, this.descricaoFiltro, this.selectedTipo);
  }

  limparFiltros() {
    this.descricaoFiltro = '';
    this.selectedTipo = 'Todos';
    this.carregarComodidadesPaginadas();
  }

  formatTipo(tipo: string): string {
    const tiposFormatados: { [key: string]: string } = {
      'MOBILIA': 'Mobília',
      'ELETRODOMESTICOS': 'Eletrodomésticos',
      'UTENSILIOS': 'Utensílios',
      'OUTROS': 'Outros',
    };
  
    return tiposFormatados[tipo] || tipo;
  }
}
