import { LANGUAGES } from "src/app/constants/languages";
import { MODES } from "src/app/constants/modes";

export interface ConfigurationDTO {
  mode: MODES;
  language: LANGUAGES;
}
