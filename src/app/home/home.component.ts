import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import timeGridPlugin from '@fullcalendar/timegrid';
import { HospedesService } from '../hospedes/hospedes.service';
import { ReservasService } from '../reservas/reservas.service';
import { AcomodacoesService } from '../acomodacoes/acomodacoes.service';
import { ReservasDialogComponent } from '../reservas-dialog/reservas-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  acomodacoes: any[] = [];
  hospedes: any[] = [];
  reservas: any[] = [];
  filteredReservas: any[] = [];
  selectedAcomodacao: string = 'Todas';
  listAcomodacoes: string[] = ['Todas'];
  selectedStatus: string = 'Todos';
  listStatus: string[] = ['Todos'];

  constructor(private reservasService: ReservasService,
              private acomodacoesService: AcomodacoesService,
              private hospedesService: HospedesService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.carregarCadastros();
    this.carregarReservas();
  }

  carregarCadastros(){
    this.acomodacoesService.getAcomodacoes().subscribe(acomodacoes => {
      this.acomodacoes = acomodacoes;
      this.listAcomodacoes = ['Todas', ...acomodacoes.map((a: { nome: any; }) => a.nome)];
    });

    this.hospedesService.getHospedes().subscribe(hospedes => {
      this.hospedes = hospedes;
    });
  }

  carregarReservas() {
    this.reservasService.getReservas().subscribe(reservas => {
      this.reservas = reservas;
      this.listStatus = ['Todos', ...Array.from(new Set(reservas.map((r: { statusReserva: string; }) => this.formatStatus(r.statusReserva)) as unknown as string[]))];
  
      this.calendarOptions.events = reservas.map((reserva: any) => {
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

      this.filtrarReservas();
    }, error => {
      console.error('Erro ao carregar reservas:', error);
    });
  }

  formatStatus(status: string): string {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  getColorForReserva(reserva: any): string {
    console.log(this.formatStatus(reserva.statusReserva))
    switch (this.formatStatus(reserva.statusReserva)) {
      case 'Pendente':
        return '#FFC107';
      case 'Em Andamento':
        return '#007BFF';
      case 'Finalizada':
        return '#28A745';
      default:
        return '#FF0007';
    }
  }

  filtrarReservas() {
    this.filteredReservas = this.reservas.filter(reserva => {
      const statusMatch = this.selectedStatus === 'Todos' || this.formatStatus(reserva.statusReserva) === this.selectedStatus;
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
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    events: [],
    locales: [ptBrLocale],
    locale: 'pt-br',
    titleFormat: {
      month: 'long'
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    eventClick: this.showReservaDetails.bind(this)
  };

  onEventClick(info: any) {
    const reservaDetails = info.event.extendedProps.detalhes;
    this.showReservaDetails(reservaDetails);
  }

  showReservaDetails(event: any): void {
    const dialogRef = this.dialog.open(ReservasDialogComponent, {
      data: {
        hospedeNome: event.event.extendedProps.hospedeNome,
        acomodacaoNome: event.event.extendedProps.acomodacaoNome,
        dataCheckIn: event.event.extendedProps.dataCheckIn,
        dataCheckOut: event.event.extendedProps.dataCheckOut,
        status: event.event.extendedProps.status,
        title: event.event.title,
        start: event.event.start,
        end: event.event.end
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo fechado', result);
    });
  }

}
