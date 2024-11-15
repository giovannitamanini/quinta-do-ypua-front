
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
      this.carregarHospedes();
    });
  }

  formatarTelefone(telefone: string): string {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    
    if (telefoneLimpo.length === 11) {
      return `(${telefoneLimpo.slice(0, 2)})${telefoneLimpo.slice(2, 7)}-${telefoneLimpo.slice(7, 11)}`;
    }
    
    return telefoneLimpo;
  }

  formatarCpf(cpf: string): string {
    const cpfLimpo = cpf.replace(/\D/g, '');
  
    if (cpfLimpo.length === 11) {
      return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(6, 9)}-${cpfLimpo.slice(9, 11)}`;
    }
  
    return cpfLimpo;
  }
}
