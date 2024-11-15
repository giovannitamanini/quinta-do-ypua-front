import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component'; 
import { AcomodacoesComponent } from './acomodacoes/acomodacoes.component';
import { HospedesComponent } from './hospedes/hospedes.component';
import { ReservasComponent } from './reservas/reservas.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComodidadesComponent } from './comodidades/comodidades.component';
import { NotFoundError } from 'rxjs';

const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: '', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'acomodacao', component: AcomodacoesComponent},
  {path: 'hospede', component: HospedesComponent},
  {path: 'reserva', component: ReservasComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'comodidade', component: ComodidadesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
