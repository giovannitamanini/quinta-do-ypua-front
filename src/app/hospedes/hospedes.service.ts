import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospedesService {
  private apiUrl = 'http://localhost:8080/hospede';

  constructor(private httpClient: HttpClient) { }

  public getHospedes(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  criarHospede(hospede:any): Observable<any> {
    return this.httpClient.post(this.apiUrl, hospede);
  }

  atualizarHospede(hospede:any): Observable<any> {
    const url = `${this.apiUrl}/${hospede.id}`;
    return this.httpClient.put(url, hospede);
  }

  excluirHospede(id:any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}
