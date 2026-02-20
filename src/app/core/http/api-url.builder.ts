import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlBuilder {
  private readonly baseUrl = environment.bffBaseUrl.replace(/\/$/, '');

  build(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${normalizedPath}`;
  }
}
