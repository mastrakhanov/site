import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { MainLayoutPageComponent } from './main-layout-page/main-layout-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { ConstructorsPageComponent } from './constructors-page/constructors-page.component';
import { ModelsPageComponent } from './models-page/models-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';


const routes: Routes = [
 {
   path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
 },
 {
   path: '', component: MainLayoutPageComponent, children: [
     { path: '', redirectTo: '/', pathMatch: 'full' },
     { path: '', component: MainPageComponent },
     { path: 'history', component: HistoryPageComponent },
     { path: 'constructors', component: ConstructorsPageComponent },
     { path: 'models', component: ModelsPageComponent },
     { path: 'news', component: NewsPageComponent },
     { path: 'contacts', component: ContactsPageComponent },
     { path: '**', redirectTo: '/' }
   ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
