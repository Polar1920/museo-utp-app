import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Data {
  apiUrl = 'https://ds6.glaciar.club/api';

  constructor(private http: HttpClient) { }

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

  getCarreras() {
    return this.http.get(`${this.apiUrl}/carreras/all`);
  }

  getFacultades() {
    return this.http.get(`${this.apiUrl}/facultades/all`);
  }

  getArticuloID(id: string) {
    return this.http.get(`${this.apiUrl}/articulos/`+id);
  }

  getArticuloQR(articulo: string) {
    return this.http.get(`${articulo}`);
  }

}