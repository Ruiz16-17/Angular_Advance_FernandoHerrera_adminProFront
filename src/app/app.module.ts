

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth/auth.module';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PromisesComponent } from './pages/promises/promises.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';

@NgModule({
  declarations: [
    AppComponent,
    NotPageFoundComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
