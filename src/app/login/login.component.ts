import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: string = '';
  senha: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.usuario, this.senha).subscribe({
      next: (response) => {
        // Armazena o token
        this.authService.storeToken(response.token);
        // Redireciona para a página inicial ou a página de destino
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = 'Usuário ou senha inválidos';
      }
    });
  }
}
