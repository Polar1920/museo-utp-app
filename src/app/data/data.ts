import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Data {
  apiUrl = 'https://ds6.glaciar.club/api';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.apiUrl}/usuarios/all`);
  }

  getUserById(id: number) {
    return this.http.get(`${this.apiUrl}/usuarios/${id}`);
  }

  loginUser(nombre_usuario: String,password: String){
    return this.http.post(`${this.apiUrl}/auth/login`, { nombre_usuario, password });
  }
  registerUser(nombre_usuario:string,password:string,nombre:string,apellido:string,cedula:string,nivel:number,id_facultad:number,id_carrera:number,foto:string){
    return this.http.post(`${this.apiUrl}/usuarios`, {nombre_usuario,password,nombre,apellido,cedula,nivel,id_facultad,id_carrera,foto});
  }
  getCarreras() {
    return this.http.get(`${this.apiUrl}/carreras/all`);
  }
  getFacultades() {
    return this.http.get(`${this.apiUrl}/facultades/all`);
  }

}