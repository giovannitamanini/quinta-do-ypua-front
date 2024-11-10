
import { Component, OnInit } from '@angular/core';
import { ComodidadesService } from './comodidades.service';

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

  filteredComodidades: any[] = [];
  selectedTipo: string = 'Todos';
  listTipos: string[] = ['Todos'];

  constructor(private comodidadeService: ComodidadesService) { }

  ngOnInit() {
    this.carregarComodidades();
  }

  carregarComodidades() {
    this.comodidadeService.getComodidades().subscribe(comodidades => {
      this.comodidades = comodidades;
    });
  }

  criarComodidade() {
    console.log(this.novaComodidade)
    this.comodidadeService.criarComodidade(this.novaComodidade).subscribe(() => {
      this.carregarComodidades();
      this.novaComodidade = {};
    });
  }

  atualizarComodidade() {
    this.comodidadeService.atualizarComodidade(this.comodidadeEditada).subscribe(() => {
      this.carregarComodidades();
      this.editando = false;
      this.comodidadeEditada = {};
    });
  }

  excluirComodidade(id:any) {
    this.comodidadeService.excluirComodidade(id).subscribe(() => {
      this.carregarComodidades();
    });
  }

  /*filtrarComodidades() {
    this.filteredComodidades = this.comodidades.filter(comodidade => {
      const statusMatch = this.selectedTipo === 'Todos' || this.formatStatus(reserva.statusReserva) === this.selectedStatus;
      const acomodacaoMatch = this.selectedAcomodacao === 'Todas' || this.acomodacoes.find(a => a.nome === this.selectedAcomodacao)?.id === reserva.idAcomodacao;
      return statusMatch && acomodacaoMatch;
    });

    this.calendarOptions.events = this.filteredReservas.map((reserva: any) => {
      const hospede = this.hospedes.find(h => h.id === reserva.idHospede);
      const acomodacao = this.acomodacoes.find(a => a.id === reserva.idAcomodacao);

      const dataCheckIn = new Date(reserva.dataCheckIn[0], reserva.dataCheckIn[1] - 1, reserva.dataCheckIn[2]);
      const dataCheckOut = new Date(reserva.dataCheckOut[0], reserva.dataCheckOut[1] - 1, reserva.dataCheckOut[2]);

      return {
        title: `${hospede ? hospede.nome : 'Hóspede Desconhecido'} - ${acomodacao ? acomodacao.nome : 'Acomodação Desconhecida'}`,
        start: dataCheckIn,
        end: new Date(dataCheckOut.getFullYear(), dataCheckOut.getMonth(), dataCheckOut.getDate() + 1).toISOString().split('T')[0],
        allDay: true,
        extendedProps: {
          hospedeNome: hospede ? hospede.nome : 'Desconhecido',
          acomodacaoNome: acomodacao ? acomodacao.nome : 'Desconhecida',
          dataCheckIn: dataCheckIn.toLocaleDateString(),
          dataCheckOut: dataCheckOut.toLocaleDateString(),
          idHospede: reserva.idHospede,
          idAcomodacao: reserva.idAcomodacao,
          status: this.formatStatus(reserva.statusReserva)
        },
        backgroundColor: this.getColorForReserva(reserva),
        borderColor: this.getColorForReserva(reserva)
      };
    });
  }*/
}
