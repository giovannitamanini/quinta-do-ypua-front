import { Component, OnInit } from '@angular/core';
import { HospedesService } from './hospedes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hospedes',
  templateUrl: './hospedes.component.html',
  styleUrls: ['./hospedes.component.css']
})
export class HospedesComponent implements OnInit {
  hospedes: any[] = [];
  novoHospede: any = {};
  editando = false;
  hospedeEditado: any = {};

  totalPages: number = 0;
  currentPage: number = 0;
  size: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];

  nomeFiltro: string = '';
  cpfFiltro: string = '';

  mostrarFiltros = false;

  constructor(private hospedeService: HospedesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.carregarHospedesPaginados();
  }

  carregarHospedes() {
    this.hospedeService.getHospedes().subscribe(hospedes => {
      this.hospedes = hospedes;
    });
  }

  carregarHospedesPaginados(page: number = 0) {
    this.hospedeService.getHospedesPaginados(page, this.size).subscribe(response => {
      this.hospedes = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
    });
  }

  carregarHospedesComFiltros(page: number = 0, nome: string = '', cpf: string = '') {
    this.hospedeService.getHospedesComFiltros(nome, cpf, page, this.size).subscribe(response => {
      this.hospedes = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
    });
  }

  filtrarHospedes() {
    this.currentPage = 0; 
    this.carregarHospedesComFiltros(
      this.currentPage,
      this.nomeFiltro,
      this.cpfFiltro
    );
  }

  limparFiltros() {
    this.nomeFiltro = '';
    this.cpfFiltro = '';
    this.carregarHospedesPaginados();
  }

  mudarPagina(novaPagina: number): void {
    if (novaPagina >= 0 && novaPagina < this.totalPages) {
      this.currentPage = novaPagina;
      if(this.nomeFiltro != '' || this.cpfFiltro != ''){
        this.carregarHospedesComFiltros(this.currentPage, this.nomeFiltro, this.cpfFiltro);
      } else {
        this.carregarHospedesPaginados(this.currentPage);
      }
    }
  }

  mudarTamanhoPagina(tamanho: number): void {
    this.size = tamanho;
    this.currentPage = 0;
    if(this.nomeFiltro != '' || this.cpfFiltro != ''){
      this.carregarHospedesComFiltros(this.currentPage, this.nomeFiltro, this.cpfFiltro);
    } else {
      this.carregarHospedesPaginados(this.currentPage);
    }
  }

  criarHospede() {
    console.log(this.novoHospede);
    this.hospedeService.criarHospede(this.novoHospede).subscribe(() => {
      this.carregarHospedesPaginados();
      this.novoHospede = {};
    });
  }

  atualizarHospede() {
    this.hospedeService.atualizarHospede(this.hospedeEditado).subscribe(() => {
      this.carregarHospedesPaginados();
      this.editando = false;
      this.hospedeEditado = {};
    });
  }

  excluirHospede(id: any) {
    this.hospedeService.excluirHospede(id).subscribe(
      () => {
        this.carregarHospedesPaginados();
      },
      (error) => {
        this.snackBar.open(error.error || "Erro ao excluir o hóspede.", "Fechar", {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  formatarTelefone(telefone: string): string {
    const telefoneLimpo = telefone.replace(/\D/g, '');

    if (telefoneLimpo.length === 11) {
      return `(${telefoneLimpo.slice(0, 2)})${telefoneLimpo.slice(2, 7)}-${telefoneLimpo.slice(7, 11)}`;
    }
    
    return telefoneLimpo;
  }

  formatarCpf(cpf: string): string {
    const cpfLimpo = cpf.replace(/\D/g, '');
  
    if (cpfLimpo.length === 11) {
      return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(6, 9)}-${cpfLimpo.slice(9, 11)}`;
    }
  
    return cpfLimpo;
  }
}
