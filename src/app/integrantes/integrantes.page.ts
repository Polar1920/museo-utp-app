import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.page.html',
  styleUrls: ['./integrantes.page.scss'],
})
export class IntegrantesPage implements OnInit {
  groupLeaders: string[] = []; // This array will hold the group leaders' names
  selectedGroupMembers: any[] = []; // This array will hold the selected group members
  nombreLider: string = '';
  apellidoLider: string = '';
  fotoLider: string = '';
  foto: string = '';
  nombreGrupo: string = '';

// Mapeo de nombres de departamentos
nombreDepartamentos: { [key: string]: string } = {
  'APP': 'APP',
  'BD': 'Base de Datos',
  'API': 'API',
  'MULTIMEDIOS': 'Recursos Multimedios',
  'WEB': 'WEB',
  'QA': 'Q.A.',
  'CONVERSATORIO': 'Conversatorio',
  'VIDEO': 'Video',
  'INTEGRACION':'Integración',
  'VISITAS':'Visitas',
  'CATEGORIA':'Categoria'
};

  constructor(private navCtrl: NavController, private http: HttpClient) { }

  ngOnInit() {
    this.MostrarGrupo('API'); // Cambié 'APP' por 'API' para mostrar los datos de la API.
  }

  regresar() {
    this.navCtrl.back(); // Navegar a la página anterior
  }

  MostrarGrupo(departamento: string): void {
    const apiGroupMembersUrl = `https://ds6.glaciar.club/api/participantes/all?departamento=${departamento}`;

    this.http.get<any[]>(apiGroupMembersUrl).subscribe(
      (data) => {
        this.nombreGrupo = this.nombreDepartamentos[departamento]; // Utilizamos el mapeo para obtener el nombre completo del departamento
        this.nombreLider = data[0].nombre;
        this.apellidoLider = data[0].apellido;
        this.fotoLider = data[0].foto;

        this.selectedGroupMembers = data.slice(1);
      },
      (error) => {
        console.error('Error al obtener datos del API:', error);
      }
    );
  }
}
