import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Data } from '../data/data';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.page.html',
  styleUrls: ['./account-edit.page.scss'],
})
export class AccountEditPage implements OnInit {

  usuario: any; // Definir la propiedad "usuario"

  editarNombre: boolean = false;
  editarApellido: boolean = false;
  editarCedula: boolean = false;
  editarNivel: boolean = false;
  editarFacultad: boolean = false;
  editarCarrera: boolean = false;

  name: string = '';
  lastname: string = '';
  cedula: string = '';
  level: number = 0;
  facultad: number = 0;
  carrera: number = 0;
  foto: string = '';
  fotoE: File = new File([], '');

  usuarioEditado = {
    nombre: '',
    apellido: '',
    cedula: '',
    nivel: 0,
    id_facultad: 0,
    id_carrera: 0,
    foto: null
  };

  apiUrl = 'https://ds6.glaciar.club/api';

  constructor(private router: Router, private navCtrl: NavController, private data: Data, private imagePicker: ImagePicker) { }

  ngOnInit() {
    // Obtener el objeto de usuario del localStorage
    let usuarioString = localStorage.getItem('usuario');

    if (usuarioString !== null) {
      this.usuario = JSON.parse(usuarioString);
    }

    this.name = this.usuario.nombre;
    this.lastname = this.usuario.apellido;
    this.cedula = this.usuario.cedula;
    this.level = this.usuario.nivel;
    this.facultad = this.usuario.facultad;
    this.carrera = this.usuario.carrera;
    this.foto = "";
  }

  goToBack() {
    this.navCtrl.back();
  }

  onFileSelected(event: any) {
    const options = {
      maximumImagesCount: 1,
      outputType: 2 // Cambiar a 2 para formato PNG
    };

    this.imagePicker.getPictures(options).then((results) => {
      if (results.length > 0) {
        const file = results[0]; // Obtener el archivo como una cadena de base64

        // Crear un objeto File a partir de la cadena de base64
        const blob = this.dataURItoBlob(file);
        const fileObject = new File([blob], 'foto.png', { type: 'image/png' });

        // Verificar el tamaño del archivo
        if (fileObject.size > 1000000) {
          // Mostrar un mensaje de error
          console.error('El archivo es demasiado grande. El tamaño máximo permitido es de 1MB.');
          return;
        }

        // Asignar el objeto File a this.fotoE
        this.fotoE = fileObject;
      }
    }, (err) => {
      console.log(err);
    });
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  submitProfile() {
    let token = localStorage.getItem('token');
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("x-token", token);

      const formdata = new FormData();// Crear un objeto FormData para incluir los datos del usuario y la imagen
      formdata.append("nombre", "David");
      formdata.append("apellido", "AAAAAAAAA");
      formdata.append("nivel", "3");
      formdata.append("facultad_id", "1");
      formdata.append("carrera_id", "1");

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow' as RequestRedirect // Establecer la propiedad redirect en follow
      };
      
      fetch("https://ds6.glaciar.club/api/usuarios", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    } else {
      console.error('No se encontró un token de sesión. Debe iniciar sesión para actualizar su perfil.');
      // Aquí puedes agregar código adicional para mostrar un mensaje de error o redirigir al usuario a la página de inicio de sesión
    }
  }

  /* LOGICA ANTIGUA - MUCHOS REQUEST
  // NOMBRE
  enableNameEdt = () => this.editarNombre = true;
  cancelNameEdt = () => this.editarNombre = false;

  saveName() {
    this.editarNombre = false;
    // Aquí podrías guardar el nombre editado en una base de datos o hacer cualquier otra acción necesaria.
  }


  // APELLIDO
  enableApellidoEdt = () => this.editarApellido = true;
  cancelApellidoEdt = () => this.editarApellido = false;

  saveApellido() {
    this.editarApellido = false;
    // Aquí podrías guardar el nombre editado en una base de datos o hacer cualquier otra acción necesaria.
  }

  // CEDULA
  enableCedulaEdt = () => this.editarCedula = true;
  cancelCedulaEdt = () => this.editarCedula = false;

  saveCedula() {
    this.editarCedula = false;
    // Aquí podrías guardar la cédula editada en una base de datos o hacer cualquier otra acción necesaria.
  }

  // NIVEL
  enableNivelEdt = () => this.editarNivel = true;
  cancelNivelEdt = () => this.editarNivel = false;

  saveNivel() {
    this.editarNivel = false;
    // Aquí podrías guardar la cédula editada en una base de datos o hacer cualquier otra acción necesaria.
  }

  // FACULTAD
  enableFacultadEdt = () => this.editarFacultad = true;
  cancelFacultadEdt = () => this.editarFacultad = false;

  saveFacultad() {
    this.editarFacultad = false;
    // Aquí podrías guardar la cédula editada en una base de datos o hacer cualquier otra acción necesaria.
  }

  // CARRERA
  enableCarreraEdt = () => this.editarCarrera = true;
  cancelCarreraEdt = () => this.editarCarrera = false;

  saveCarrera() {
    this.editarCarrera = false;
    // Aquí podrías guardar la cédula editada en una base de datos o hacer cualquier otra acción necesaria.
  }
  */
}
