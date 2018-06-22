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

	testGetPhase() {
		const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:1337/project/phase/task/comments/51/6', { headers }
        ).map((response: Response) => {
            console.log(JSON.parse(response.text()));
            // console.log(response.text());
            localStorage.setItem('tasks', response.text());
            return  JSON.parse(response.text());
        });
	}
}
