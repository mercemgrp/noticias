import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { MODES, LANGUAGES} from '../constants';
import { Configuration } from '../models/ui';
import { ConfigurationDTO } from '../models/dtos';

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
      mode: MODES.DEVICE_DEFAULT,
      language: LANGUAGES.ES
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
