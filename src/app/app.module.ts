import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { ConstructorsPageComponent } from './constructors-page/constructors-page.component';
import { ModelsPageComponent } from './models-page/models-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { MainLayoutPageComponent } from './main-layout-page/main-layout-page.component';
import {AuthService} from './admin/shared/services/auth.service';
import {SharedModule} from './shared/shared.module';
import {AuthInterceptor} from './shared/auth.interceptor';
import { FooterComponent } from './footer/footer.component';

registerLocaleData(ruLocale, 'ru');

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HistoryPageComponent,
    ConstructorsPageComponent,
    ModelsPageComponent,
    NewsPageComponent,
    ContactsPageComponent,
    MainLayoutPageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
