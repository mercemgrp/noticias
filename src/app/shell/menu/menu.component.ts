import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LANGUAGES, MODES } from 'src/app/shared/constants';
import { Configuration } from 'src/app/shared/models/ui';
import { ConfigService } from 'src/app/shared/services/config.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  get nightMode() {
    return this.config.deviceIsDarkMode;
  }
  get spanishLanguage() {
    return this.config.language === LANGUAGES.ES;
  }
  config: Configuration;
  error: boolean;
  constructor(
    private menu: MenuController,
    private configService: ConfigService) { }

  ngOnInit() {
    this.config = this.configService.configuration;
  }

  onCloseMainMenu() {
    this.menu.close('mainMenu');
  }

  onToggleNightMode() {
    const newMode = this.config.mode === MODES.DARK ? MODES.LIGHT : MODES.DARK;
    this.configService.saveMode(newMode);
  }

  onToggleLanguage() {
    const newLang = this.config.language === LANGUAGES.ES ? LANGUAGES.EN : LANGUAGES.ES;
    this.configService.saveLanguage(newLang);
  }

}

