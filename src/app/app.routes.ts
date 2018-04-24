import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./components/login.component";
import { ReportesComponent } from "./components/home/reportes.component";

const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: '**', pathMatch:'full', component: LoginComponent },

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
