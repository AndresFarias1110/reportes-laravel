import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment'

@Injectable()
export class LoginService {
	private url: string;
  constructor(private http: Http) {
	  this.url = environment.server;
	}

	login(user:string, password:string):any{

		let formData = new FormData();

		formData.append('inputUser', user);
  	  	formData.append('inputPassword', password);

		return this.http.post(this.url + '/login',
            formData
        ).map((response: Response) => {

            console.log('RS:', response)

            let user = response.json();

            return user;
        });
	}
}
