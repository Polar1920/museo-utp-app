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

  constructor(private navCtrl: NavController, private http: HttpClient) { }

  ngOnInit() {
    // Call the function to fetch the data from the API
    this.getGroupLeaders();
  }

  regresar() {
    this.navCtrl.back(); // Navegar a la página anterior
  }

  getGroupLeaders(): void {
    const apiUrl = 'https://rickandmortyapi.com/api/character/418'; // Replace with your actual API endpoint
    this.http.get<string[]>(apiUrl).subscribe(
      (data) => {
        this.groupLeaders = data; // Assign the API response to the groupLeaders array
      },
      (error) => {
        console.error('Error fetching group leaders:', error);
      }
    );
  }

  buttonClicked(index: number): void {
    const apiGroupMembersUrl = `###`; // Replace with the actual API endpoint to fetch group members
    this.http.get<any[]>(apiGroupMembersUrl).subscribe(
      (data) => {
        this.selectedGroupMembers = data; // Assign the API response to the selectedGroupMembers array
      },
      (error) => {
        console.error('Error fetching group members:', error);
      }
    );
  }
}
