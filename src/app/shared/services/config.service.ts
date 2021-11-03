import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MODES, LANGUAGES} from '../constants';
import { ConfigurationDTO } from '../models/dtos';
import { Storage } from '@ionic/storage';

const CONFIG_KEY = 'configuration';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  get isDarkMode() {
    if (!this.config){
      return undefined;
    }
    return this.config?.mode === MODES.DARK || (this.config?.mode === MODES.DEVICE_DEFAULT && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  get language() {
    return this.configuration.language;
  }
  get configuration(): ConfigurationDTO {
    return this.config;
  }
  private config: ConfigurationDTO;
  private languageSubject =  new BehaviorSubject<LANGUAGES>(undefined);
  private modeSubject =  new BehaviorSubject<MODES>(undefined);
  languageChanges$: Observable<LANGUAGES>;
  modeChanges$: Observable<MODES>;
  constructor(private storage: Storage) {
    this.languageChanges$ = this.languageSubject.asObservable();
    this.modeChanges$ = this.modeSubject.asObservable();
    }

  saveMode(mode: MODES) {
    const config = {...this.config, mode: mode};
    return this.storage.set(CONFIG_KEY,config).then(_ => {
      this.config = config;
      this.modeSubject.next(this.config.mode);
    }
    ).catch(_ =>
      this.modeSubject.next(this.config.mode)
    )
  }

  saveLanguage(lang: LANGUAGES) {
    const config = {...this.config, language: lang};
    return this.storage.set(CONFIG_KEY,config).then(_ => {
      this.config = config;
      this.languageSubject.next(this.config.language);
    }
    ).catch(_ =>
      this.languageSubject.next(this.config.language)
    )
  }

  loadConfig() {
      return this.storage.create().then(() => {
      return this.storage.get(CONFIG_KEY).then(
        (resp: ConfigurationDTO) => {
          this.config = {
            language: resp?.language || LANGUAGES.ES,
            mode: resp?.mode || MODES.DEVICE_DEFAULT,
            
          };
          return this.config;
        }
      );
    });
  }
}
