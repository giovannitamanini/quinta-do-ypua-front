import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComodidadesService {
  private apiUrl = 'http://localhost:8080/comodidade';

  constructor(private httpClient: HttpClient) { }

  public getComodidades(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  criarComodidade(comodidade:any): Observable<any> {
    return this.httpClient.post(this.apiUrl, comodidade);
  }

  atualizarComodidade(comodidade:any): Observable<any> {
    const url = `${this.apiUrl}/${comodidade.id}`;
    return this.httpClient.put(url, comodidade);
  }

  excluirComodidade(id:any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}
