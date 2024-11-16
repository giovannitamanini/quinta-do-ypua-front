import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';  // Importe o AuthService
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
    if (this.authService.isAuthenticated()) {
      return true;  // Se estiver autenticado, permite o acesso
    } else {
      // Se não estiver autenticado, redireciona para a página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
