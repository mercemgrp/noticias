import { Platform } from "@ionic/angular";
import { Component } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ConfigService } from "./services/config.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private configService: ConfigService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.subscribeConfigurationChanges();
    });
  }

  private subscribeConfigurationChanges() {
    this.configService.modeChanges$
      .pipe(map(() => this.changeMode()))
      .subscribe();
  }

  private changeMode() {
    if (this.configService.isDarkMode !== undefined) {
      this.configService.isDarkMode ? document.body.classList.add("dark") : document.body.classList.remove("dark");
    }
  }
}
