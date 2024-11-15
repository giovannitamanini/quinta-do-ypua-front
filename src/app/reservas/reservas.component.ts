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

  constructor(private reservasService: ReservasService,
              private acomodacoesService: AcomodacoesService,
              private hospedesService: HospedesService) { }

  ngOnInit() {
    this.carregarCadastros();
    this.carregarReservas();
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

  criarReserva() {
    this.reservasService.criarReserva(this.novaReserva).subscribe(() => {
      this.carregarReservas();
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
      this.carregarReservas();
      this.editando = false;
      this.reservaEditada = {};
    });
  }

  excluirReserva(id:any) {
    this.reservasService.excluirReserva(id).subscribe(() => {
      error: (err: { status: number; error: string | null; }) => {
        if (err.status === 409) {
          this.mensagemErro = err.error; // Mostra a mensagem de erro retornada pelo backend
        } else {
          this.mensagemErro = 'Erro desconhecido. Tente novamente mais tarde.';
        }
      }
      this.carregarReservas();
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

  copiarObjetoEdicao(reserva:any){
    this.reservaEditada = JSON.parse(JSON.stringify(reserva));
  }
}
