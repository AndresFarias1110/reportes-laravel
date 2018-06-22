import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment'

@Injectable()
export class UploadService {
	private url: string;
	constructor(private http: Http, private _http: HttpClient) {
		this.url = environment.server;
		console.log('URL:', this.url);
	}

	uploadService(file: File) {
		let headers = new HttpHeaders({
			'Content-Type': 'multipart/form-data',

		});

		let formData = new FormData();

		formData.append('import_file', file);

		const req = new HttpRequest('POST', this.url + '/uploadFile', formData, {

			reportProgress: true,
		});

		return this._http.request(req);
	}

	getAllIncidencias() {
		return this.http.get(this.url + '/todosIncidencias').map((response: Response) => {
			return response.json();
		});
	}

	dowloadFile(responsable: string) {
		return this.http.get(this.url + '/reportes/' + responsable).map((response: Response) => {
			return response.json();
		});
	}

	dowloadFileDF() {
		return this.http.get('http://localhost:8000/reportes/direccion/funcional/df').map((response: Response) => {
			return response;
		});
	}

	dowloadFileDE() {
		return this.http.get(this.url + '/reportes/direccion/funcional/de').map((response: Response) => {
			return response.json();
		});
	}
}
