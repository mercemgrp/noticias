import { Platform } from "@ionic/angular";
import { Component } from "@angular/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { map, takeUntil, tap } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { StatusBar } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { LANGUAGES } from "./shared/constants";
import { ConfigService } from "./shared/services/config.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private platform: Platform,
    private configService: ConfigService,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.initializeLangService();
    this.subscribeConfigurationChanges();
    this.subscribeLangChanges();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isNativePlatform()) {
        SplashScreen.hide();
        StatusBar.hide();
        StatusBar.setOverlaysWebView({overlay: false});
      }
    });
  }

  private subscribeLangChanges() {
    this.configService.languageChanges$
      .pipe(
        tap(lang => {
          if (lang) {
            this.translate.use(lang);
          }
        }),
        takeUntil(this.ngUnsubscribe)
      )  
      .subscribe();
  }

  private subscribeConfigurationChanges() {
    this.configService.modeChanges$
      .pipe(map(() => this.changeMode()))
      .subscribe();
  }

  private changeMode() {
    if (this.configService.isDarkMode !== undefined) {
      if (Capacitor.isNativePlatform()) {
        this.updateStatusBar();
      } else {
        this.setMode();
      }
    }
  }

  private initializeLangService() {
    this.translate.setDefaultLang(LANGUAGES.ES);
    this.translate.addLangs([LANGUAGES.ES, LANGUAGES.EN]);
    this.translate.use(this.configService.language);
  }

  private updateStatusBar() {
    StatusBar.getInfo().then(info => {
      if (!info.visible) {
        StatusBar.show();
      }
      const color = this.configService.isDarkMode ? '#222428' : '#2a5ba7';
      StatusBar.setBackgroundColor({color});
      this.setMode();
    });
  }

  private setMode() {
    if (this.configService.isDarkMode) {
      if (!document.body.classList.contains("dark")) {
        document.body.classList.add("dark")
      }
    } else {
      document.body.classList.remove("dark");
    }
  }

}
