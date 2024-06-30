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
    }) ;
  }

  carregarReservas() {
    this.reservasService.getReservas().subscribe(reservas => {
      this.reservas = reservas;
    });
  }

  criarReserva() {
    console.log(this.novaReserva)
    this.reservasService.criarReserva(this.novaReserva).subscribe(() => {
      this.carregarReservas();
      this.novaReserva = {};
    });
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
