import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

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

export function initConfig(env: EnvironmentService, conf: ConfigService, storage: StorageService) {
  return () => {
    env.loadEnvironmentKeys();
    return conf.loadConfig().subscribe(() => storage.initStorage());
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    IonicStorageModule.forRoot(),
    ShellModule],
  providers: [
    EnvironmentService,
    ConfigService,
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
