import { Component, OnInit, ElementRef } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Incidencia } from '../../interfaces/incidenca';

@Component({
	selector: 'app-reporte',
	templateUrl: 'reportes.component.html',
})
export class ReportesComponent implements OnInit {

	public ListIncidencias: Array<Incidencia> = [];
	public inputSearch: string = '';
	public titile_modal: string;
	public showModalUploadFile: boolean;
	public statusProgressUpload: number = 0.0;
	public incidencia: Incidencia;
	public isLoading: boolean = false;
	public dropzoneActive: boolean = false;
	public msj: string;
	public user: string;

	constructor(public elementRef: ElementRef, public uploadService: UploadService) { }

	ngOnInit() {
		this.getAllIncidencias();
		this.user = localStorage.getItem('inputUser');
	}

	getAllIncidencias() {
		this.isLoading = true;
		this.uploadService.getAllIncidencias().subscribe(rs => {
			this.ListIncidencias = rs;
			console.log('ListIncidencias:', this.ListIncidencias);
			this.isLoading = false;
		}, err => {
			console.log(err)
			this.isLoading = false;
		})
	}

	showModalUpload() {
		this.showModalUploadFile = true;
	}

	uploadFile(event: any) {
		console.log(event);
		let inputElement: HTMLInputElement = this.elementRef.nativeElement.querySelector('#inputFile');
		let fileList: FileList = inputElement.files;
		console.log(fileList);

		if (fileList) {
			this.uploadFileRequest(fileList[0]);
		}
	}

	uploadFileRequest(file: File) {
		this.isLoading = true;
		this.uploadService.uploadService(file).subscribe(event => {
			console.log(event);
			if (event.type === HttpEventType.UploadProgress) {
				const percentDone = Math.round(100 * event.loaded / event.total);
				console.log(`File is ${percentDone}% uploaded.`);
				this.statusProgressUpload = percentDone;
			} else if (event instanceof HttpResponse) {
				console.log('HttpResponse:', event);
				this.isLoading = false;
				this.showModalUploadFile = false;
				this.getAllIncidencias();
			}
		}, error => {
			console.log(error.error);
			this.isLoading = false;
			this.getAllIncidencias();
		});
	}

	showModalDatail(incidencia: Incidencia) {
		this.incidencia = incidencia;
		this.titile_modal = incidencia.empresa;
	}

	uploadFileDrop(fileList: FileList) {
		console.log('handleDrop(fileList):', fileList);
		if (fileList[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
			// console.log('fileList[0].type:', fileList[0].type)
			this.uploadFileRequest(fileList[0]);
		} else {
			this.msj = 'Sólo puedes subir Excel';
		}
	}

	dropzoneState(event) {
		console.log(event);
		this.dropzoneActive = event;
	}

	dowloadFile() {
		this.uploadService.dowloadFile(this.incidencia.responsable).subscribe(rs => { console.log(rs) }, err => {
			console.log(err)
		});
	}
}
