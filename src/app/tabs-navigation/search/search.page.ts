import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../data/data';

@Component({

  
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})

export class SearchPage {
  isSelected = false;
  numeroResultados: number = 0;
  resultados: any[] = [];
  articles: any[] = [];
  searchedArticle: any[] = [];
  searchText: string = '';
  
  constructor(private router: Router, private dataService: Data) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.dataService.getArticulosAll().subscribe(
      (response: any) => {
        this.articles = response;
        this.searchedArticle = response; // Asignar todos los artículos a la propiedad searchedArticle al cargar la página
      },
      (error) => {
        console.error('Error al obtener datos de los artículos:', error);
      }
    );
  }

  searchArticle(event: any) {
    const text = event.target.value;
    if (text && text.trim() !== '') {
      this.searchedArticle = this.articles.filter((article: any) => {
        return article.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
    } else {
      this.searchedArticle = this.articles; // Si el campo de búsqueda está vacío, mostrar todos los artículos
    }
  }

  viewInformation() {
    this.router.navigate(['/information']);
  }

  verArticulo() {
    this.isSelected = true;
    this.router.navigate(['/articulo']);
    this.isSelected = false;
  }

  getFirstPhotoUrl(article: any): string {
    if (article.fotos && article.fotos.length > 0) {
      return article.fotos[0].url;
    }
    // Si no hay fotos, se puede retornar una URL de imagen por defecto o un mensaje de error.
    return '/assets/imagen-no-disponible.jpg';
  }
}
