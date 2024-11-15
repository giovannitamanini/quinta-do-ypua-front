import { HttpClient, HttpParams } from '@angular/common/http';
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

  public getComodidadesPaginadas(page: number = 0, size: number = 20): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get(`${this.apiUrl}/paginated`, { params });
  }

  getComodidadesComFiltros(descricao: string, tipo: string, page: number, size: number): Observable<any> {
    let url = `${this.apiUrl}/filter`;
    const params = new URLSearchParams();

    if (descricao) {
      params.append('descricao', descricao);
    }

    if (tipo) {
      params.append('tipo', tipo);
    }

    params.append('page', page.toString());
    params.append('size', size.toString());

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    return this.httpClient.get<any>(url);
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
