import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SwiperModule } from 'swiper/angular';

import { APP_ROOT_REDUCERS } from '@app/store/reducers';
import { APP_ROOT_EFFECTS } from '@app/store/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { ConstructorsPageComponent } from './constructors-page/constructors-page.component';
import { ModelsPageComponent } from './models-page/models-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { MainLayoutPageComponent } from './main-layout-page/main-layout-page.component';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './shared/auth.interceptor';
import { FooterComponent } from './footer/footer.component';
import { environment } from '../environments/environment';

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
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(APP_ROOT_REDUCERS),
    EffectsModule.forRoot(APP_ROOT_EFFECTS),
    ReactiveFormsModule,
    SwiperModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
