import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import timeGridPlugin from '@fullcalendar/timegrid';
import { HospedesService } from '../hospedes/hospedes.service';
import { ReservasService } from '../reservas/reservas.service';
import { AcomodacoesService } from '../acomodacoes/acomodacoes.service';

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
    private hospedesService: HospedesService) { }

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
      this.reservas = reservas;
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ],
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
  };

}
