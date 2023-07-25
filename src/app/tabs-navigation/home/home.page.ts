import { Component, OnInit  } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from '../../data/data';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  articulos: any = [];
  categorias: any = [];

  constructor(private navCtrl: NavController, private data: Data) {}

  ngOnInit() {
    this.obtenerArticulos();
    this.obtenerArticulosCat();
  }

  obtenerArticulos() {
    this.data.getArticulosAll().subscribe(
      (response) => {
        this.articulos = response;
        console.log(this.articulos);
      },
      (error) => {
        console.log('Error al obtener los articulos:', error);
      }
    );
  }

  obtenerArticulosCat() {
    this.data.getArticulosCat().subscribe(
      (response) => {
        this.categorias = response;
        console.log(this.categorias);
      },
      (error) => {
        console.log('Error al obtener las categorias:', error);
      }
    );
  }

  cargarArticulosPorCategoria(categoria: string) {
    this.data.getArticulosPorCategoria(categoria).subscribe(
      (response) => {
        this.articulos = response;
        console.log('Artículos cargados por categoría:', this.articulos);
      },
      (error) => {
        console.log('Error al cargar los artículos por categoría:', error);
      }
    );
  }

  viewArticle(articulo: any) {
    localStorage.setItem('showby', 'tc');
    localStorage.setItem('articulo_id', articulo.id);
    this.navCtrl.navigateForward(['/articulo']);
  }

  viewInformation() {
    this.navCtrl.navigateForward(['/information']);
  }

}
