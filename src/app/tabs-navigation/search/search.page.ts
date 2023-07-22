import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})

export class SearchPage {
  isSelected = false;
  /*numeroResultados: number = 0;
  resultados: any[] = [];
  articles: any = [];
  searchedArticle: any;*/

  constructor(private router: Router) {}

  /*searchArticle(event: any){
    const text = event.target.value;
    this.searchedArticle = this.articles;
    if(text && text.trim() != ''){
      this.searchedArticle = this.searchedArticle.filter((articles: any)=>{
        return (this.articles.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }*/
  viewInformation() {
    this.router.navigate(['/information']);
  }

  verArticulo() {
    this.isSelected = true;
    this.router.navigate(['/articulo']);
    this.isSelected = false;
  }
}
