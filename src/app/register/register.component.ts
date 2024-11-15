import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // Garante que será inicializado no `ngOnInit`

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator } // Validador no grupo
    );
  }

  // Validador de correspondência de senha
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.service.register(this.registerForm.value).subscribe(
        (response) => {
          if (response.id != null) {
            alert("Olá " + response.name);
            this.router.navigateByUrl("/login");
          }
        },
        (error) => {
          console.error('Erro no cadastro:', error);
        }
      );
    } else {
      console.error('Formulário está inválido');
    }
  }
}
