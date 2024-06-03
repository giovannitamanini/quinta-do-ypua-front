
import { Component, OnInit } from '@angular/core';
import { HospedesService } from './hospedes.service';

@Component({
  selector: 'app-hospedes',
  templateUrl: './hospedes.component.html',
  styleUrls: ['./hospedes.component.css']
})
export class HospedesComponent implements OnInit {
  hospedes: any[] = [];
  novoHospede: any = {};
  editando = false;
  hospedeEditado: any = {};

  constructor(private hospedeService: HospedesService) { }

  ngOnInit() {
    this.carregarHospedes();
  }

  carregarHospedes() {
    this.hospedeService.getHospedes().subscribe(hospedes => {
      this.hospedes = hospedes;
    });
  }

  criarHospede() {
    console.log(this.novoHospede)
    this.hospedeService.criarHospede(this.novoHospede).subscribe(() => {
      this.carregarHospedes();
      this.novoHospede = {};
    });
  }

  atualizarHospede() {
    this.hospedeService.atualizarHospede(this.hospedeEditado).subscribe(() => {
      this.carregarHospedes();
      this.editando = false;
      this.hospedeEditado = {};
    });
  }

  excluirHospede(id:any) {
    this.hospedeService.excluirHospede(id).subscribe(() => {
      console.log("Carregando dados novamente");
      this.carregarHospedes();
      console.log("Carregou!");
    });
  }
}
