import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighchartsMore from 'highcharts/highcharts-more';
import { DashboardService } from './dashboard.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  HighchartsMore: typeof HighchartsMore = HighchartsMore;
  chartOptions: Highcharts.Options = {};
  reservasPorAcomodacao: any;

  dashboardData: any = {};
  selectedMonth: number = new Date().getMonth() + 1; 
  selectedYear: number = new Date().getFullYear();

  months: { name: string, value: number }[] = [
    { name: 'Janeiro', value: 1 },
    { name: 'Fevereiro', value: 2 },
    { name: 'Março', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Maio', value: 5 },
    { name: 'Junho', value: 6 },
    { name: 'Julho', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Setembro', value: 9 },
    { name: 'Outubro', value: 10 },
    { name: 'Novembro', value: 11 },
    { name: 'Dezembro', value: 12 }
  ];
  
  years: number[] = [];
  
  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 11 }, (_, index) => currentYear - 10 + index); 
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getReceitaMensal(this.selectedMonth, this.selectedYear).subscribe(data => {
      this.dashboardData.receitaMensal = data;
    });

    this.dashboardService.getTaxaOcupacao().subscribe(data => {
      this.dashboardData.taxaOcupacao = data;
    });

    this.dashboardService.getTaxaCancelamento(this.selectedMonth, this.selectedYear).subscribe(data => {
      this.dashboardData.taxaCancelamento = data;
    });

    this.dashboardService.getTempoMedioEstadia(this.selectedMonth, this.selectedYear).subscribe(data => {
      this.dashboardData.tempoMedioEstadia = data;
    });

    this.loadReservasPorAcomodacao();
  }

  getReceitaMensal(): number {
    return this.dashboardData ? this.dashboardData.receitaMensal : 0;
  }

  getTaxaOcupacao(): number {
    return this.dashboardData ? this.dashboardData.taxaOcupacao : 0;
  }

  getTaxaCancelamento(): number {
    return this.dashboardData ? this.dashboardData.taxaCancelamento : 0;
  }

  getTempoMedioEstadia(): number {
    return this.dashboardData ? this.dashboardData.tempoMedioEstadia : 0;
  }

  loadReservasPorAcomodacao(): void {
    this.dashboardService.getReservasPorAcomodacao(this.selectedMonth, this.selectedYear).subscribe((data) => {
      console.log('data',data)
      if (data && Array.isArray(data)) {
        const groupedData = data.reduce((acc: any, item: any) => {
          const key = item.acomodacaoNome;
          if (!acc[key]) {
            acc[key] = 0;
          }
          acc[key] += item.numeroReservas;
          return acc;
        }, {});
  
        const labels = Object.keys(groupedData); // Nomes das acomodações
        const reservas: number[] = Object.values(groupedData).map((value: any) => Number(value)); // Converter para número
  
        console.log('Labels:', labels);
        console.log('Reservas:', reservas);
  
        this.chartOptions = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Reservas por Acomodação'
          },
          xAxis: {
            categories: labels,
            title: {
              text: 'Acomodações'
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Número de Reservas'
            }
          },
          series: [{
            type: 'column',
            name: 'Reservas',  // Nome da série
            data: reservas  // Dados das reservas agrupadas
          }]
        };
        this.cdr.detectChanges(); // Força a detecção de mudanças
        console.log('Reservas:', reservas); // Verifique se são números e se não há valores `NaN`

        setTimeout(() => {
          Highcharts.chart('chartContainer', this.chartOptions); // Tente forçar a renderização do gráfico
        }, 0);      } else {
        console.error('Dados de reservas não estão no formato esperado.');
      }
    }, (error) => {
      console.error('Erro ao carregar as reservas por acomodação:', error);
    });
  }
}
