import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcomodacoesComponent } from './acomodacoes/acomodacoes.component';
import { HospedesComponent } from './hospedes/hospedes.component';
import { ReservasComponent } from './reservas/reservas.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComodidadesComponent } from './comodidades/comodidades.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Página inicial (não protegida)
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },  // Página inicial protegida
  { path: 'acomodacoes', component: AcomodacoesComponent, canActivate: [AuthGuard] },
  { path: 'hospedes', component: HospedesComponent, canActivate: [AuthGuard] },
  { path: 'reservas', component: ReservasComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'comodidades', component: ComodidadesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },  // Rota de login (não protegida)
  { path: '**', redirectTo: '/home' }  // Redireciona para o Home se a rota não existir
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
