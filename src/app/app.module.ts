import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvironmentService } from './services/environment.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ShellModule } from './shell/menu/shell.module';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ConfigService } from './services/config.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {IonicStorageModule} from '@ionic/storage-angular';
import { StorageService } from './services/storage.service ';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

export function initConfig(env: EnvironmentService, conf: ConfigService, storage: StorageService) {
  return () => {
    env.loadEnvironmentKeys();
    return conf.loadConfig().subscribe(() => storage.initStorage());
  }
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
registerLocaleData(localeES, 'es');
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    IonicStorageModule.forRoot(),
    ShellModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    })
  ],
  providers: [
    EnvironmentService,
    ConfigService,
    StorageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [EnvironmentService, ConfigService, StorageService],
      multi: true,
    },
    InAppBrowser,
    SplashScreen,
    StatusBar,
    SocialSharing
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
