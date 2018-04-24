import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
	public user:string = 'andres';
	public password:string = '12345678';
	public msjError:string;
	public showAlertDanger:boolean = false;

  constructor(public router: Router, private loginService: LoginService) {  }

  ngOnInit() {}

  login(f: NgForm){
	  console.log(f.value);
	  if (f.value.inputUser && f.value.inputPassword) {
		  this.loginService.login(f.value.inputUser, f.value.inputPassword).subscribe(rs => {
			  console.log(rs);
			  localStorage.setItem('usar_auth', JSON.stringify(f.value));
			  this.router.navigate(['/reportes']);
		  }, err => {
			  console.log(err)
			  this.showAlertDanger = true;
    		  this.msjError = 'Datos incorrectos';
		  });
	  } else {
		  this.showAlertDanger = true;
		  this.msjError = 'Datos incorrectos';
	  }
  }
}
