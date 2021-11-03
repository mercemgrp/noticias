import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LANGUAGES, MODES } from 'src/app/shared/constants';
import { ConfigurationDTO } from 'src/app/shared/models/dtos';

import { ConfigService } from 'src/app/shared/services/config.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  get nightMode() {
    return this.configService.isDarkMode;
  }
  get spanishLanguage() {
    return this.configService.configuration.language === LANGUAGES.ES;
  }
  error: boolean;
  constructor(
    private menu: MenuController,
    private configService: ConfigService) { }

  onCloseMainMenu() {
    this.menu.close('mainMenu');
  }

  onToggleNightMode() {
    const newMode = this.configService.configuration.mode === MODES.DARK ? MODES.LIGHT : MODES.DARK;
    this.configService.saveMode(newMode).catch(_ => this.configService.configuration.mode === MODES.DARK ? MODES.LIGHT : MODES.DARK);
  }

  onToggleLanguage() {
    const newLang = this.configService.configuration.language === LANGUAGES.ES ? LANGUAGES.EN : LANGUAGES.ES;
    this.configService.saveLanguage(newLang).catch(_ => this.configService.configuration.language === LANGUAGES.ES ? LANGUAGES.EN : LANGUAGES.ES);
  }

}

