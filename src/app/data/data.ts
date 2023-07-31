import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Data {
  apiUrl = 'https://ds6.glaciar.club/api';

  constructor(private http: HttpClient, private alertController: AlertController) { }

  getUsers() {
    return this.http.get(`${this.apiUrl}/usuarios/all`);
  }

  getUserById(id: number) {
    return this.http.get(`${this.apiUrl}/usuarios/${id}`);
  }

  loginUser(nombre_usuario: String, password: String) {
    return this.http.post(`${this.apiUrl}/auth/login`, { nombre_usuario, password });
  }

  reUser(nombre_usuario: String, password: String) {
    localStorage.setItem('log_nombre_usuario', nombre_usuario.toString());
    localStorage.setItem('log_password', password.toString());
    let user = localStorage.getItem('log_nombre_usuario');
    let pass = localStorage.getItem('log_password');
    console.log('Se recordara el usuario: ' + user + ", " + pass);
  }

  noReUser() {
    localStorage.removeItem('log_nombre_usuario');
    localStorage.removeItem('log_password');
    let user = localStorage.getItem('log_nombre_usuario');
    let pass = localStorage.getItem('log_password');
    console.log('No se recordara el usuario' + user + ", " + pass);
  }

  Logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    console.log('Sesión finalizada'+localStorage.getItem('usuario')+localStorage.getItem('token'));
  }

  registerUser(nombre_usuario: string, password: string, nombre: string, apellido: string, cedula: string, nivel: number, id_facultad: number, id_carrera: number, foto: string) {
    return this.http.post(`${this.apiUrl}/usuarios`, { nombre_usuario, password, nombre, apellido, cedula, nivel, id_facultad, id_carrera, foto });
  }

  updateUser(formData: any, token: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': token
    });
    return this.http.put(`${this.apiUrl}/usuarios`, JSON.stringify(formData), { headers });
  }

  getCarreras() {
    return this.http.get(`${this.apiUrl}/carreras/all`);
  }

  getCarrerasfacultad(facultadid: number) {
    return this.http.get(`${this.apiUrl}/carreras/facultad/${facultadid}`);
  }

  getFacultades() {
    return this.http.get(`${this.apiUrl}/facultades/all`);
  }

  getComentarios() {
    return this.http.get(`${this.apiUrl}/facultades/all`);
  }

  getComentariosPorArticulo(articuloId: number){
    // Fetch comments for a specific article from the API
    return this.http.get(`${this.apiUrl}/comentarios/${articuloId}`);
  }

  getArticulosAll() {
    return this.http.get(`${this.apiUrl}/articulos/all`);
  }

  getArticulosTimeLine() {
    return this.http.get(`${this.apiUrl}/articulos/all?min=1800`);
  }

  getArticulosCat() {
    return this.http.get(`${this.apiUrl}/categorias/all`);
  }

  getArticulosPorCategoria(categoria: string) {
    return this.http.get(`${this.apiUrl}/articulos/all?categoria=${categoria}`);
  }

  getArticuloID(id: string) {
    return this.http.get(`${this.apiUrl}/articulos/`+id);
  }

  getArticuloURL(articulo: string) {
    return this.http.get(`${articulo}`);
  }

  getArticuloQR(articulo: string) {
    return this.http.get(`${this.apiUrl}/`+articulo);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
  
  convertirObjeto(objeto: any) {
    return {
      "id": objeto.id,
      "nombre": objeto.nombre,
      "categoria": objeto.categoria,
      "descripcion": objeto.descripcion,
      "ubicacion": objeto.ubicacion,
      "dueno": objeto.dueno,
      "year": objeto.year,
      "created_at": objeto.created_at,
      "updated_at": objeto.updated_at,
      "fotos": objeto.fotos,
      "videos": objeto.videos,
      "audios": objeto.audios,
    };
  }
}