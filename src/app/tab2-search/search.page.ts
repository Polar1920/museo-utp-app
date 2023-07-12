import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {
  numeroResultados: number = 0;
  resultados: any[] = [];
  resultadosFiltrados: any[] = [];
  busqueda: string = '';

  constructor() {
    this.resultados = [
      {
        titulo: "Articulo 1",
        descripcion: "Descripcion del articulo 1",
        imagen: "imagen"
      },
      {
        titulo: "Articulo 2",
        descripcion: "Descripcion del articulo 2",
        imagen: "imagen2"
      },
      {
        titulo: "Articulo 3",
        descripcion: "Descripcion del articulo 3",
        imagen: "imagen3"
      }
    ];
  }

  realizarBusqueda() {
    this.resultadosFiltrados = this.resultados.filter(resultado =>
      resultado.titulo.toLowerCase().includes(this.busqueda.toLowerCase())
    );
    this.numeroResultados = this.resultadosFiltrados.length;
  }
}
