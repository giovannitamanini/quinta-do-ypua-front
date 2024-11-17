import { HttpClient, HttpParams } from '@angular/common/http';
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

  public getAcomodacoesPaginadas(page: number = 0, size: number = 20): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get(`${this.apiUrl}/paginated`, { params });
  }

  getAcomodacoesFiltradas(nome: string, qtdHospedes: string, page: number, size: number): Observable<any> {
    let url = `${this.apiUrl}/filter`;
    const params = new URLSearchParams();

    if (nome) {
      params.set('nome', nome);
    }

    if (qtdHospedes) {
      params.set('qtdHospedes', qtdHospedes);
    }

    params.set('page', page.toString());
    params.set('size', size.toString());

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    console.log('url', url)

    return this.httpClient.get<any>(url);
  }

  criarAcomodacao(acomodacao: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, acomodacao);
  }

  atualizarAcomodacao(acomodacao: any): Observable<any> {
    const url = `${this.apiUrl}/${acomodacao.id}`;
    return this.httpClient.put(url, acomodacao);
  }

  excluirAcomodacao(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}
