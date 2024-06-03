import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private apiUrl = 'http://localhost:8080/reservas';

  constructor(private httpClient: HttpClient) { }

  public getReservas(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/");
  }

  criarReserva(hospede:any): Observable<any> {
    return this.httpClient.post(this.apiUrl, hospede);
  }

  atualizarReserva(hospede:any): Observable<any> {
    const url = `${this.apiUrl}/${hospede.id}`;
    return this.httpClient.put(url, hospede);
  }

  excluirReserva(id:any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}
