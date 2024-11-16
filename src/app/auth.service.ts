import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/login`;  // URL da API de login
  private jwtTokenKey = 'jwtToken';  // Chave para armazenar o token JWT no localStorage

  constructor(private http: HttpClient) { }

  // Método para login
  login(usuario: string, senha: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { usuario, senha }).pipe(
      catchError(this.handleError)  // Tratamento de erro, se necessário
    );
  }

  // Método para armazenar o token JWT no localStorage
  storeToken(token: string): void {
    localStorage.setItem(this.jwtTokenKey, token);
  }

  // Método para recuperar o token JWT do localStorage
  getToken(): string | null {
    return localStorage.getItem(this.jwtTokenKey);
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Você pode adicionar uma lógica para verificar a validade do token, se necessário
    return true;
  }

  // Método para realizar logout
  logout(): void {
    localStorage.removeItem(this.jwtTokenKey);
  }

  // Método para tratar erros
  private handleError(error: any): Observable<never> {
    console.error(error);
    throw error;
  }
}
