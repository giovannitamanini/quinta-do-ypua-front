import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Garante inicialização no `ngOnInit`

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Corrigida estrutura de validadores
      password: ['', [Validators.required]], // Correção na lista de validadores
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) { // Verifica se o formulário está válido
      this.service.login(this.loginForm.value).subscribe(
        (response) => {
          if (response?.jwt) {
            alert("Olá, o seu token de acesso é o: " + response.jwt);
            localStorage.setItem('jwt', response.jwt);
            this.router.navigateByUrl("/");
          } else {
            alert("Falha no login. Credenciais inválidas ou token não recebido!");
          }
        },
        (error) => {
          console.error("Error during login:", error);
          alert("Um erro ocorreu durante o login. Por favor tente novamente.");
        }
      );
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }
}
