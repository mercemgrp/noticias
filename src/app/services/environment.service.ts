import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  get apiKey() {
    return this.environment?.apiKey;
  }
  get apiUrl() {
    return this.environment?.apiUrl;
  }
  private environment: Environment;
  constructor() { }

  loadEnvironmentKeys() {
    this.environment = environment as Environment;

  }
}
