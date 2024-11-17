import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient) { }

  getReceitaMensal(mes: number, ano: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/receita?mes=${mes}&ano=${ano}`);
  }

  getTaxaOcupacao(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/taxa-ocupacao`);
  }

  getTaxaCancelamento(mes: number, ano: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/taxa-cancelamento?mes=${mes}&ano=${ano}`);
  }

  getTempoMedioEstadia(mes: number, ano: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tempo-medio-estadia?mes=${mes}&ano=${ano}`);
  }

  getReservasPorAcomodacao(mes: number, ano: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/reservas-por-acomodacao?mes=${mes}&ano=${ano}`);
  }
}
