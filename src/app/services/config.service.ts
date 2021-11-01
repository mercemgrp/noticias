import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { COUNTRIES } from '../constants/countries';
import { LANGUAGES } from '../constants/languages';
import { MODES } from '../constants/modes';
import { Configuration } from '../models/config';
import { ConfigurationDTO } from '../models/dtos/config';

Injectable({
  providedIn: 'root'
})
export class ConfigService {
  get isDarkMode() {
    if (!this.config){
      return undefined;
    }
    return this.config?.mode === MODES.DARK || (this.config?.mode === MODES.DEVICE_DEFAULT && this.config?.deviceIsDarkMode);
  }
  get language() {
    return this.configuration.language;
  }
  get configuration(): Configuration {
    return this.config;
  }
  get countries() {
    return this.config.countries;
  }
  private config: Configuration;
  private languageSubject =  new BehaviorSubject<LANGUAGES>(undefined);
  private modeSubject =  new BehaviorSubject<MODES>(undefined);
  languageChanges$: Observable<LANGUAGES>;
  modeChanges$: Observable<MODES>;
  constructor() {
    this.languageChanges$ = this.languageSubject.asObservable();
    this.modeChanges$ = this.modeSubject.asObservable();
    }

  saveMode(mode: MODES) {
    this.config.mode = mode;
    this.modeSubject.next(this.config.mode);
  }

  saveLanguage(lang: LANGUAGES) {
    this.config.language = lang;
    this.languageSubject.next(this.config.language);
  }

  loadConfig() {
    return of<ConfigurationDTO>({
      mode: MODES.LIGHT,
      language: LANGUAGES.ES,
      countries: [COUNTRIES.ES, COUNTRIES.USA]
    }).pipe(
      first(),
      catchError(() => {
        return of(false);
      }),
      map((configResponse: ConfigurationDTO) => {
        if (configResponse) {
          this.config = {
            ...configResponse,
            deviceIsDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
            };
            return this.config;
        }
      })
    )
  }
}
