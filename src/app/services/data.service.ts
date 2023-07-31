import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    apiUrl = 'https://ds6.glaciar.club/api';

    private dbPromise: Promise<IDBPDatabase<any>>;

    constructor(private http: HttpClient) {

        
        // Abrir la base de datos
        this.dbPromise = openDB('MuseoDB', 1, {
            upgrade(db) {
                // Crear un objeto de almacén de objetos
                db.createObjectStore('articulos', { keyPath: 'id' });
            },
        });
    }

    getArticulosAll(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/articulos/all`).pipe(
            map((response) => {
                // Guardar los datos en IndexedDB
                this.dbPromise.then((db) => {
                    const tx = db.transaction('articulos', 'readwrite');
                    const store = tx.objectStore('articulos');
                    response.forEach((articulo) => {
                        store.put(articulo);
                    });
                    return new Promise(resolve => tx.oncomplete = resolve);
                });
                return response;
            })
        );
    }

    getCategoriasAll(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/categorias/all`).pipe(
            map((response) => {
                // Guardar los datos en IndexedDB
                this.dbPromise.then((db) => {
                    const tx = db.transaction('categorias', 'readwrite');
                    const store = tx.objectStore('categorias');
                    response.forEach((categoria) => {
                        store.put(categoria);
                    });
                    return new Promise(resolve => tx.oncomplete = resolve);
                });
                return response;
            })
        );
    }

    getArticulosFromIndexedDB(): Promise<any[]> {
        // Obtener los datos de IndexedDB
        return this.dbPromise.then((db) => {
            const tx = db.transaction('articulos', 'readonly');
            const store = tx.objectStore('articulos');
            return store.getAll();
        });
    }

    getCategoriasFromIndexedDB(): Promise<any[]> {
        // Obtener los datos de IndexedDB
        return this.dbPromise.then((db) => {
            const tx = db.transaction('categorias', 'readonly');
            const store = tx.objectStore('categorias');
            return store.getAll();
        });
    }

}