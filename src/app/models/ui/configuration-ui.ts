import { LANGUAGES } from '../../constants/languages';
import {MODES} from '../../constants/modes';


export interface Configuration {
  mode: MODES;
  language: LANGUAGES;
  deviceIsDarkMode: boolean;
}