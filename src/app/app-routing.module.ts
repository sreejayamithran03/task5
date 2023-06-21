import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: 'Tournaments', loadChildren: () => import('./module/tournaments/tournaments.module').then(m => m.TournamentsModule) },
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{path: "login",component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
