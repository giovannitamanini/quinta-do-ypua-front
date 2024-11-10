
import { Component, OnInit } from '@angular/core';
import { ComodidadesService } from './comodidades.service';

@Component({
  selector: 'app-comodidades',
  templateUrl: './comodidades.component.html',
  styleUrls: ['./comodidades.component.css']
})
export class ComodidadesComponent implements OnInit {
  comodidades: any[] = [];
  novaComodidade: any = {};
  editando = false;
  comodidadeEditada: any = {};

  constructor(private comodidadeService: ComodidadesService) { }

  ngOnInit() {
    this.carregarComodidades();
  }

  carregarComodidades() {
    this.comodidadeService.getComodidades().subscribe(comodidades => {
      this.comodidades = comodidades;
    });
  }

  criarComodidade() {
    console.log(this.novaComodidade)
    this.comodidadeService.criarComodidade(this.novaComodidade).subscribe(() => {
      this.carregarComodidades();
      this.novaComodidade = {};
    });
  }

  atualizarComodidade() {
    this.comodidadeService.atualizarComodidade(this.comodidadeEditada).subscribe(() => {
      this.carregarComodidades();
      this.editando = false;
      this.comodidadeEditada = {};
    });
  }

  excluirComodidade(id:any) {
    this.comodidadeService.excluirComodidade(id).subscribe(() => {
      this.carregarComodidades();
    });

    /*this.comodidadeService.getAcomodacoes().subscribe((acomodacoes) => {
      // Verificar se a comodidade está associada a alguma acomodação
      const comodidadeEmUso = acomodacoes.some(acomodacao =>
        acomodacao.comodidades.some(comodidade => comodidade.id === id)
      );

      if (comodidadeEmUso) {
        this.erroMensagem = 'Essa comodidade não pode ser excluída, pois está sendo utilizada por uma acomodação.';
      } else {
        // Caso não esteja em uso, podemos excluir a comodidade
        this.comodidadeService.excluirComodidade(id).subscribe(() => {
          this.carregarComodidades(); // Recarregar a lista de comodidades
          this.erroMensagem = ''; // Limpar mensagem de erro
        });
      }*/
  }
}
