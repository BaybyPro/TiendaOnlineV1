import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { PrivateComponent } from './components/private/private.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreateComponent } from './components/create/create.component';
import { authGuard } from './auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';



const routes: Routes = [
  {path: '', component:TaskComponent},
  {path: 'task', component: TaskComponent},
  {path: 'private', component: PrivateComponent,canMatch:[authGuard]},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'create',component: CreateComponent,canMatch:[authGuard]},
  {path: 'detail/:id',component: DetailsComponent},
  {path: 'edit/:id',component:EditComponent},
  {path: '**', component:SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
