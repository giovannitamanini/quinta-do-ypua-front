import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private apiUrl = 'http://localhost:8080/reserva';

  constructor(private httpClient: HttpClient) { }

  public getReservas(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  criarReserva(reserva:any): Observable<any> {
    return this.httpClient.post(this.apiUrl, reserva);
  }

  atualizarReserva(reserva:any): Observable<any> {
    const url = `${this.apiUrl}/${reserva.id}`;
    return this.httpClient.put(url, reserva);
  }

  excluirReserva(id:any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}
