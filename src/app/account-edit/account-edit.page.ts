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
  carreras: any = [];
  facultades: any = [];

  /*
  editarNombre: boolean = false;
  editarApellido: boolean = false;
  editarCedula: boolean = false;
  editarNivel: boolean = false;
  editarFacultad: boolean = false;
  editarCarrera: boolean = false;
  */

  name: string = '';
  lastname: string = '';
  cedula: string = '';
  level: number = 0;
  facultad: number = 0;
  carrera: number = 0;
  foto: string = '';
  fotoE: File = new File([], '');

  selectedFacultad: number = 0;
  selectedCarrera: number = 0;

  apiUrl = 'https://ds6.glaciar.club/api';

  constructor(private router: Router, private navCtrl: NavController, private data: Data, private imagePicker: ImagePicker) { }

  ngOnInit() {
    this.obtenerFacultades();

    // Obtener el objeto de usuario del localStorage
    let usuarioString = localStorage.getItem('usuario');

    if (usuarioString !== null) {
      this.usuario = JSON.parse(usuarioString);
    }

    this.name = this.usuario.nombre;
    this.lastname = this.usuario.apellido;
    this.cedula = this.usuario.cedula;
    this.level = this.usuario.nivel;
    this.facultad = this.usuario.facultad_id;
    this.carrera = this.usuario.carrera_id;
    this.foto = "";

    // Establecer la facultad seleccionada segun estaba guardado
    this.selectedFacultad = this.usuario.facultad_id;

    // Establecer la carrera seleccionada segun estaba guardado, y la facultad seleccionad
    this.selectedCarrera = this.usuario.carrera_id;
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
        const fileObject = this.dataURLtoFile(file, 'foto.png');
  
        // Verificar el tamaño del archivo
        if (fileObject.size > 1000000) {
          // Mostrar un mensaje de error
          console.error('El archivo es demasiado grande. El tamaño máximo permitido es de 1MB.');
          return;
        }
  
        // Asignar el objeto File a this.fotoE
        this.fotoE = file;
      }
    }, (err) => {
      console.log(err);
    });
  }
  
  dataURLtoFile(dataURL: string, filename: string): File {
    const arr = dataURL.split(',');
    const mime = arr[0]?.match(/:(.*?);/)?.[1] || '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  submitProfile() {
    let token = localStorage.getItem('token');
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("x-token", token);
  
      const formdata = new FormData();// Crear un objeto FormData para incluir los datos del usuario y la imagen
      formdata.append("nombre", this.name);
      formdata.append("apellido", this.lastname);
      formdata.append("nivel", this.level.toString());
      formdata.append("facultad_id", this.selectedFacultad.toString());
      formdata.append("carrera_id", this.selectedCarrera.toString());

      //formdata.append("foto", this.fotoE, 'foto');
  
      // Agregar la imagen "fotoE" al objeto FormData solo si no es nula
      /*if (this.fotoE) {
        formdata.append("foto", this.fotoE, 'foto');
      }*/
  
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow' as RequestRedirect // Establecer la propiedad redirect en follow
      };
  
      fetch("https://ds6.glaciar.club/api/usuarios", requestOptions)
        .then(response => response.json())
        .then(result => {
          alert(result);
          console.log(result);
          // Actualizar el objeto "usuario" en localStorage con la nueva URL o imagen generada por la API
          this.usuario.foto = result.foto;
          localStorage.setItem('usuario', JSON.stringify(this.usuario));

          alert("Usuario actualizado, para evitar errores se recomienda volver a iniciar sesión");
        })
        .catch(error => alert('error'+ error));
    } else {
      alert('No se encontró un token de sesión. Debe iniciar sesión para actualizar su perfil.');
      console.error('No se encontró un token de sesión. Debe iniciar sesión para actualizar su perfil.');
    }
  }

  obtenerCarreras(selectedFacultad: number) {
    this.data.getCarrerasfacultad(selectedFacultad).subscribe(
      (response) => {
        this.carreras = response;
        console.log(this.carreras);
        const carrerasAsString = JSON.stringify(response);
        console.log(carrerasAsString);
      },
      (error) => {
        console.log('Error al obtener las carreras:', error);
      }
    );
  }

  obtenerFacultades() {
    this.data.getFacultades().subscribe(
      (response) => {
        this.facultades = response;
        console.log(this.facultades);
      },
      (error) => {
        console.log('Error al obtener las facultades:', error);
      }
    );
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
