import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcomodacoesComponent } from './acomodacoes/acomodacoes.component';
import { HospedesComponent } from './hospedes/hospedes.component';
import { ReservasComponent } from './reservas/reservas.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComodidadesComponent } from './comodidades/comodidades.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'acomodacoes', component: AcomodacoesComponent},
  {path: 'hospedes', component: HospedesComponent},
  {path: 'reservas', component: ReservasComponent},
  {path: 'comodidades', component: ComodidadesComponent},
  {path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
