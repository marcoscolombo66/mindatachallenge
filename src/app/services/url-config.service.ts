import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlConfigService {
  private baseUrls = {
    primary: 'https://url-falla-670e892b3e7151861654f57d.mockapi.io/api/heroes',
    fallback: 'https://670e892b3e7151861654f57d.mockapi.io/api/heroes',
  };

  private currentBaseUrl = this.baseUrls.primary;

  getBaseUrl(): string {
    return this.currentBaseUrl;
  }

  setFallbackUrl(): void {
    this.currentBaseUrl = this.baseUrls.fallback;
  }

  getFullUrl(endpoint: string = ''): string {
    return `${this.currentBaseUrl}${endpoint}`;
  }
}
