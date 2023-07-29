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

  constructor(private navCtrl: NavController, private http: HttpClient) { }

  ngOnInit() {
    this.MostrarGrupo('APP');

  }

  regresar() {
    this.navCtrl.back(); // Navegar a la página anterior
  }


  MostrarGrupo(departamento: string): void {
    const apiGroupMembersUrl = `https://ds6.glaciar.club/api/participantes/all?departamento=${departamento}`;

    // Realiza la solicitud GET al API
    this.http.get<any[]>(apiGroupMembersUrl).subscribe(
      (data) => {
        this.nombreGrupo = departamento;
        console.log(data); // Muestra los datos en la consola (puedes quitar esta línea si no deseas mostrar los datos en la consola).
        this.nombreLider = data[0].nombre;
        this.apellidoLider = data[0].apellido;
        this.fotoLider = data[0].foto;
      },
      (error) => {
        // Maneja los errores en caso de que la solicitud falle.
        console.error('Error al obtener datos del API:', error);
      }
    );
  }
}
