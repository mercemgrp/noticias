import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvironmentService } from './services/environment.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

export function initConfig(config: EnvironmentService) {
  return () => config.loadEnvironmentKeys();
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [EnvironmentService],
      multi: true,
    },
    InAppBrowser],
  bootstrap: [AppComponent],
})
export class AppModule {}
