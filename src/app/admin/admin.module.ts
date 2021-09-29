import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { CreateLayoutComponent } from './shared/components/create-layout/create-layout.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { CreateModelsComponent } from './create-models/create-models.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { EditModelsComponent } from './edit-models/edit-models.component';
import { EditLayoutComponent } from './shared/components/edit-layout/edit-layout.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AuthGuard } from './shared/services/auth.guard';
import { AlertComponent } from './shared/components/alert/alert.component';
import { SearchPipe } from './shared/search.pipe';


@NgModule({
  declarations: [
    LoginPageComponent,
    AdminLayoutComponent,
    CreateLayoutComponent,
    CreateNewsComponent,
    CreateModelsComponent,
    EditNewsComponent,
    EditModelsComponent,
    EditLayoutComponent,
    AlertComponent,
    SearchPipe,
    RegistrationPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'create', component: CreateLayoutComponent, children: [
              { path: 'news', component: CreateNewsComponent },
              { path: 'models', component: CreateModelsComponent }
            ], canActivate: [AuthGuard]
          },
          { path: 'edit', component: EditLayoutComponent, canActivate: [AuthGuard] },
          { path: 'edit/news/:id', component: EditNewsComponent },
          { path: 'edit/models/:id', component: EditModelsComponent },
          { path: 'registration', component: RegistrationPageComponent },
          { path: '**', redirectTo: '/admin/login' }
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AdminModule { }
