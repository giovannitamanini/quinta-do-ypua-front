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

  constructor(private reservasService: ReservasService,
              private acomodacoesService: AcomodacoesService,
              private hospedesService: HospedesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
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
      console.log('Reservas retornadas:', reservas); // Para depurar
  
      this.reservas = reservas;
  
      // Preenchendo os eventos do calendário com as reservas
      this.calendarOptions.events = reservas.map((reserva: any) => {
        const hospede = this.hospedes.find(h => h.id === reserva.idHospede);
        const acomodacao = this.acomodacoes.find(a => a.id === reserva.idAcomodacao);

        console.log('Hóspede encontrado:', hospede);
        console.log('Acomodação encontrada:', acomodacao);

        const dataCheckIn = new Date(reserva.dataCheckIn[0], reserva.dataCheckIn[1] - 1, reserva.dataCheckIn[2]);
        const dataCheckOut = new Date(reserva.dataCheckOut[0], reserva.dataCheckOut[1] - 1, reserva.dataCheckOut[2]);
  
        return {
          title: `${hospede ? hospede.nome : 'Hóspede Desconhecido'} - ${acomodacao ? acomodacao.nome : 'Acomodação Desconhecida'}`,
          start: dataCheckIn,
          end: new Date(dataCheckOut.getFullYear(), dataCheckOut.getMonth(), dataCheckOut.getDate() + 1).toISOString().split('T')[0], // Adiciona 1 dia à data de check-out
          allDay: true,
          classNames: ['reserva-evento'],
          //editable: true,
          extendedProps: {
            hospedeNome: hospede ? hospede.nome : 'Desconhecido',
            acomodacaoNome: acomodacao ? acomodacao.nome : 'Desconhecida',    
            dataCheckIn: dataCheckIn.toLocaleDateString(),
            dataCheckOut: dataCheckOut.toLocaleDateString(),    
            idHospede: reserva.idHospede,
            idAcomodacao: reserva.idAcomodacao,
            status: reserva.statusReserva,
          },
          backgroundColor: this.getColorForReserva(reserva),
          borderColor: this.getColorForReserva(reserva),
        };
      });
    }, error => {
      console.error('Erro ao carregar reservas:', error); // Para depurar erros
    });
  }

  getColorForReserva(reserva: any): string {
    console.log('Status da Reserva:', reserva.statusReserva);
    switch (reserva.statusReserva) {
      case 'PENDENTE':
        return '#AAAAAA'; // Laranja
      case 'PAGO':
        return '#33FF57'; // Verde
      default:
        return '#FFFFFF'; // Cinza padrão
    }
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
