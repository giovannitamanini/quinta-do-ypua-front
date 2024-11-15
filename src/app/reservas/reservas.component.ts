import { HospedesService } from './../hospedes/hospedes.service';
import { Component, OnInit } from '@angular/core';
import { ReservasService } from './reservas.service';
import { AcomodacoesService } from '../acomodacoes/acomodacoes.service';

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

  constructor(private reservasService: ReservasService,
              private acomodacoesService: AcomodacoesService,
              private hospedesService: HospedesService) { }

  ngOnInit() {
    this.carregarCadastros();
    this.carregarReservasPaginadas();
  }

  carregarCadastros(){
    this.acomodacoesService.getAcomodacoes().subscribe(acomodacoes => {
      this.acomodacoes = acomodacoes; 
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
      this.carregarReservasPaginadas(this.currentPage);
    }
  }

  mudarTamanhoPagina(tamanho: number): void {
    this.size = tamanho;
    this.currentPage = 0;
    this.carregarReservasPaginadas(this.currentPage);
  }

  criarReserva() {
    this.reservasService.criarReserva(this.novaReserva).subscribe(() => {
      this.carregarReservasPaginadas();
      this.novaReserva = {};
    });
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
    this.reservasService.excluirReserva(id).subscribe(() => {
      error: (err: { status: number; error: string | null; }) => {
        if (err.status === 409) {
          this.mensagemErro = err.error;
        } else {
          this.mensagemErro = 'Erro desconhecido. Tente novamente mais tarde.';
        }
      }
      this.carregarReservasPaginadas();
    });
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
          out_desc = hospede.nome;
        }
      });
    }
    return out_desc;
  }

  limparObjetoEdicao(){
    this.reservaEditada = {};
  }

  /*copiarObjetoEdicao(reserva:any){
    this.reservaEditada = JSON.parse(JSON.stringify(reserva));
  }*/

  formatarDataParaInput(data: string): string {
    const dataObj = new Date(data);
    return dataObj.toISOString().split('T')[0];  // Retorna no formato YYYY-MM-DD
  }

  copiarObjetoEdicao(reserva: any): void {
    this.reservaEditada = { ...reserva };
  
    this.reservaEditada.dataReserva = this.formatarDataParaInput(this.reservaEditada.dataReserva);
    this.reservaEditada.dataCheckIn = this.formatarDataParaInput(this.reservaEditada.dataCheckIn);
    this.reservaEditada.dataCheckOut = this.formatarDataParaInput(this.reservaEditada.dataCheckOut);
  }
}
