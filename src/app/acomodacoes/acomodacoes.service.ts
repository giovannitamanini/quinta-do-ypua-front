import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcomodacoesService {
  private apiUrl = 'http://localhost:8080/acomodacao';

  constructor(private httpClient: HttpClient) { }

  public getAcomodacoes(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  criarAcomodacao(acomodacao:any): Observable<any> {
    return this.httpClient.post(this.apiUrl, acomodacao);
  }

  atualizarAcomodacao(acomodacao:any): Observable<any> {
    const url = `${this.apiUrl}/${acomodacao.id}`;
    return this.httpClient.put(url, acomodacao);
  }

  excluirAcomodacao(id:any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}
