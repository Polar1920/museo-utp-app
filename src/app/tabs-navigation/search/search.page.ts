import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../data/data';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  isSelected = false;
  numeroResultados: number = 0;
  resultados: any[] = [];
  articles: any[] = [];
  searchedArticle: any[] = [];
  searchText: string = '';

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    // Obtener los datos de IndexedDB
    console.log('Obtener los articulos de IndexedDB');
    this.dataService.getArticulosFromIndexedDB().then(
      (response) => {
        if (response.length > 0) {
          // Si hay datos en IndexedDB, utilizarlos
          this.articles = response;
          this.searchedArticle = response;
          console.log('Articulos obtenidos de IndexedDB:');
          console.log(response);
        } else {
          console.log('No hay Datos en IndexedDB');
        }
      },
      (error) => {
        console.log('Error al obtener los articulos:', error);
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

  viewArticle(article: any) {
    this.isSelected = true;
    localStorage.setItem('showby', 'tc');
    localStorage.setItem('articulo_id', article.id);
    this.router.navigate(['/articulo']);
  }

  getPhotoUrl(article: any): string {
    if (article.fotos && article.fotos.length > 0) {
      for (const foto of article.fotos) {
        const url = foto.url;
        const urlParts = url.split("/");
        const urlPartEnd = urlParts[urlParts.length - 1];
        const urlPartEndParts = urlPartEnd.split("?");
        const fileName = urlPartEndParts[0];
        const extension = fileName.split(".")[1];
        if (extension === 'jpg') {
          return foto.url;
        }
      }
    }
    return '../../assets/img/buho-logo.svg';
  }

  getLimitedDescription(description: string, maxLength: number):string{
    if(description && description.length > maxLength ){
      return description.substring(0, maxLength) + '...';
    }
    return description;
  }
}

