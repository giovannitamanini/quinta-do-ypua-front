import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcomodacoesService {
  private apiUrl = 'http://localhost:8080/acomodacoes';

  constructor(private httpClient: HttpClient) { }

  public getAcomodacoes(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/");
  }

  criarAcomodacao(hospede:any): Observable<any> {
    return this.httpClient.post(this.apiUrl, hospede);
  }

  atualizarAcomodacao(hospede:any): Observable<any> {
    const url = `${this.apiUrl}/${hospede.id}`;
    return this.httpClient.put(url, hospede);
  }

  excluirAcomodacao(id:any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}
