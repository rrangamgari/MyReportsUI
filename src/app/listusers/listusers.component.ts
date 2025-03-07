import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.scss']
})
export class ListusersComponent implements OnInit {

  firstName: string;
  lastName: string;
  middleName: string;
  phonenumber: string;
  username: string;
  password: string;
  email: string;
  usersData;

  imageLoader = true;

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  ngOnInit() {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders.append('Authorization', 'Basic ' + btoa('saikiran:password'));

    const httpOptions = {
      headers: httpHeaders
    };
    this.httpClient.get('/api/UserDetails/users', httpOptions).subscribe(
      data => {
        this.usersData = data;
        this.usersData = this.usersData.data;

        this.imageLoader = false;
      }
    );
  }

  updateUser(userId) {
    console.log(userId);
    this.router.navigate(['updateUser'], { queryParams: userId, skipLocationChange: true});
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
}
