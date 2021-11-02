import { Platform } from "@ionic/angular";
import { Component } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ConfigService } from "./services/config.service";
import { map, takeUntil, tap } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { LANGUAGES } from "./constants";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private configService: ConfigService,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.initializeLangService();
    this.configService.languageChanges$
      .pipe(
        tap(lang => this.translate.use(lang || LANGUAGES.ES)),
        takeUntil(this.ngUnsubscribe))  
      .subscribe();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

  private initializeLangService() {
    this.translate.setDefaultLang(LANGUAGES.ES);
    this.translate.addLangs([LANGUAGES.ES, LANGUAGES.EN]);
    this.translate.use(this.configService.language);
  }
}
