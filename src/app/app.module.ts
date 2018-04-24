import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { ReportesComponent } from "./components/home/reportes.component";

import { UploadService } from "./services/upload.service";
import { LoginService } from "./services/login.service";

import { FileDropDirective } from './directives/file-drop.directive';

import { IncidenciaPipe } from './pipes/incidencia.pipe';

import { APP_ROUTING } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
	LoginComponent,
	ReportesComponent,
	IncidenciaPipe,
	FileDropDirective
  ],
  imports: [
    BrowserModule,
	APP_ROUTING,
	FormsModule,
	HttpClientModule,
	HttpModule,
  ],
  providers: [
	  UploadService,
	  LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
