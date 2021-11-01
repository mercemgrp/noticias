import { COUNTRIES } from '../constants/countries';
import { LANGUAGES } from '../constants/languages';
import {MODES} from '../constants/modes';


export interface Configuration {
  mode: MODES;
  language: LANGUAGES;
  countries: COUNTRIES[];
  deviceIsDarkMode: boolean;
}