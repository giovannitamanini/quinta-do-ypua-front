import { HospedesService } from './../hospedes/hospedes.service';
import { Component, OnInit } from '@angular/core';
import { ReservasService } from './reservas.service';
import { AcomodacoesService } from '../acomodacoes/acomodacoes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  acomodacoes: any[] = [];
  hospedes: any[] = [];
  reservas: any[] = [];
  novaReserva: any = {};
  editando = false;
  reservaEditada: any = {};
  formatoData = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  mensagemErro: string | null = null;

  totalPages: number = 0;
  currentPage: number = 0;
  size: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];

  mostrarFiltros = false;
  selectedStatus: string = 'Todos';
  listStatusReserva: string[] = ['Todos', 'PENDENTE','EM_ANDAMENTO','FINALIZADA','CANCELADA'];
  selectedAcomodacao: string = 'Todas';
  listAcomodacoes: string[] = [];

  constructor(private reservasService: ReservasService,
              private acomodacoesService: AcomodacoesService,
              private hospedesService: HospedesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.carregarCadastros();
    this.carregarReservasPaginadas();
  }

  carregarCadastros(){
    this.acomodacoesService.getAcomodacoes().subscribe(acomodacoes => {
      this.acomodacoes = acomodacoes; 
      this.listAcomodacoes = this.acomodacoes.map(acomodacao => acomodacao.nome);
    });

    this.hospedesService.getHospedes().subscribe(hospedes => {
      this.hospedes = hospedes;
    });
  }

  carregarReservas() {
    this.reservasService.getReservas().subscribe(reservas => {
      this.reservas = reservas;
    });
  }
  
  carregarReservasPaginadas(page: number = 0) {
    this.reservasService.getReservasPaginadas(page, this.size).subscribe(response => {
      this.reservas = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
    });
  }

  mudarPagina(novaPagina: number): void {
    if (novaPagina >= 0 && novaPagina < this.totalPages) {
      this.currentPage = novaPagina;
      if(this.selectedAcomodacao != 'Todas' || this.selectedStatus != 'Todos'){
        this.carregarReservasComFiltros(this.currentPage, this.selectedAcomodacao, this.selectedStatus);
      }else{
        this.carregarReservasPaginadas(this.currentPage);
      }
    }
  }

  mudarTamanhoPagina(tamanho: number): void {
    this.size = tamanho;
    this.currentPage = 0;
    if(this.selectedAcomodacao != 'Todas' || this.selectedStatus != 'Todos'){
      this.carregarReservasComFiltros(this.currentPage, this.selectedAcomodacao, this.selectedStatus);
    }else{
      this.carregarReservasPaginadas(this.currentPage);
    }
  }

  criarReserva() {
    this.reservasService.criarReserva(this.novaReserva).subscribe(
      () => {
        this.carregarReservasPaginadas();
        this.novaReserva = {};    
      },
      (error: { error: any; }) => {
        this.snackBar.open(error.error || "Erro ao criar reserva.", "Fechar", {
          duration: 3000,
          panelClass: ['error-snackbar'] 
        });
      }
    );
  }

  calcularValorTotalNovaReserva() {
    if (!this.novaReserva.idAcomodacao || !this.novaReserva.qtdDiarias) {
      this.novaReserva.valorTotal = 0;
      return;
    }

    let acomodacaoSelecionada = this.acomodacoes.find(ac => String(ac.id) === String(this.novaReserva.idAcomodacao));

    if (!acomodacaoSelecionada) {
      this.novaReserva.valorTotal = 0;
      return;
    }
    
    let qtdDiarias = this.novaReserva.qtdDiarias || 0;

    this.novaReserva.valorTotal = acomodacaoSelecionada.valorDiaria * qtdDiarias;
  }

  atualizarReserva() {
    this.reservasService.atualizarReserva(this.reservaEditada).subscribe(() => {
      this.carregarReservasPaginadas();
      this.editando = false;
      this.reservaEditada = {};
    });
  }

  excluirReserva(id:any) {
    this.reservasService.excluirReserva(id).subscribe(
      () => {
        this.carregarReservasPaginadas();
      },
      (error) => {
        this.snackBar.open(error.error || "Erro ao excluir a comodidade.", "Fechar", {
          duration: 3000,
          panelClass: ['error-snackbar'] 
        });
      }
    );
  }

  formatData(dataString:any){
    if(dataString == undefined || dataString == ""){
      return "";
    }
    return this.formatoData.format(new Date(dataString));;
  }

  getDescricaoAcomodacao(id:any){
    let out_desc = id;
    if(id != undefined){
      this.acomodacoes.forEach(acomodacao => {
        if(acomodacao.id.toString() == id.toString()){
          out_desc = acomodacao.nome;
        }
      });
    }
    return out_desc;
  }

  getDescricaoHospede(id:any){
    let out_desc = id;
    if(id != undefined){
      this.hospedes.forEach(hospede => {
        if(hospede.id.toString() == id.toString()){
          out_desc = hospede.nome + ' ' + hospede.sobrenome;
        }
      });
    }
    return out_desc;
  }

  limparObjetoEdicao(){
    this.reservaEditada = {};
  }

  formatStatus(status: string): string {
    return status.replace(/_/g, ' ');
  }

  formatStatusFiltro(tipo: string): string {
    const tiposFormatados: { [key: string]: string } = {
      'PENDENTE': 'Pendente',
      'EM_ANDAMENTO': 'Em andamento',
      'FINALIZADA': 'Finalizada',
      'CANCELADA': 'Cancelada',
    };
  
    return tiposFormatados[tipo] || tipo;
  }

  formatarDataParaInput(data: string): string {
    const dataObj = new Date(data);
    return dataObj.toISOString().split('T')[0]; 
  }

  copiarObjetoEdicao(reserva: any): void {
    this.reservaEditada = { ...reserva };

    this.reservaEditada.dataReserva = this.formatarDataParaInput(this.reservaEditada.dataReserva);
    this.reservaEditada.dataCheckIn = this.formatarDataParaInput(this.reservaEditada.dataCheckIn);
    this.reservaEditada.dataCheckOut = this.formatarDataParaInput(this.reservaEditada.dataCheckOut);
  }

  carregarReservasComFiltros(page: number = 0, acomodacao: string = '', statusReserva: string = '') {
    this.reservasService.getReservasComFiltros(acomodacao, statusReserva, page, this.size).subscribe(response => {
      this.reservas = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
    });
  }

  filtrarReservas() {
    this.currentPage = 0; 
    this.listAcomodacoes = this.acomodacoes.map(acomodacao => acomodacao.nome);
    this.carregarReservasComFiltros(
      this.currentPage,
      this.selectedAcomodacao,
      this.selectedStatus
    );
  }

  limparFiltros() {
    this.listAcomodacoes = this.acomodacoes.map(acomodacao => acomodacao.nome);
    this.selectedAcomodacao = 'Todas';
    this.selectedStatus = 'Todos';
    this.carregarReservasPaginadas();
  }

}
