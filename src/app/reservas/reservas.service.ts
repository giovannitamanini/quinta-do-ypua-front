import { HttpClient, HttpParams } from '@angular/common/http';
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

  public getReservasPaginadas(page: number = 0, size: number = 20): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get(`${this.apiUrl}/paginated`, { params });
  }

  getReservasComFiltros(acomodacao: string, statusReserva: string, page: number, size: number): Observable<any> {
    let url = `${this.apiUrl}/filter`;
    const params = new URLSearchParams();

    if (acomodacao) {
      params.append('acomodacao', acomodacao);
    }

    if (statusReserva != 'Todos') {
      params.append('statusReserva', statusReserva);
    }

    params.append('page', page.toString());
    params.append('size', size.toString());

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    return this.httpClient.get<any>(url);
  }

  criarReserva(reserva:any): Observable<any> {
    return this.httpClient.post(this.apiUrl, reserva, { responseType: 'text' });
  }

  atualizarReserva(reserva:any): Observable<any> {
    const url = `${this.apiUrl}/${reserva.id}`;
    return this.httpClient.put(url, reserva, { responseType: 'text' });
  }

  excluirReserva(id:any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(url, { responseType: 'text' });
  }
}
