import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiUrlBuilder } from '../http/api-url.builder';
import { AuthUser } from './auth.models';
import { HttpClient } from '@angular/common/http';

interface RawAuthMeResponse {
  id?: string;
  sub?: string;
  email?: string;
  name?: string;
  fullName?: string;
  roles?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(ApiUrlBuilder);
  private readonly document = inject(DOCUMENT);

  me(): Observable<AuthUser> {
    return this.http.get<RawAuthMeResponse>(this.apiUrl.build('/auth/me')).pipe(
      map((response) => ({
        id: response.id ?? response.sub ?? '',
        email: response.email ?? '',
        name: response.name ?? response.fullName ?? response.email ?? 'User',
        roles: response.roles ?? []
      }))
    );
  }

  login(returnUrl?: string): void {
    const resolvedReturnUrl = returnUrl
      ? new URL(returnUrl, this.document.location.origin).toString()
      : this.document.location.href;

    this.document.location.href =
      this.apiUrl.build(`/auth/login?returnUrl=${encodeURIComponent(resolvedReturnUrl)}`);
  }

  logout(): void {
    const form = this.document.createElement('form');
    form.method = 'POST';
    form.action = this.apiUrl.build('/auth/logout');
    form.style.display = 'none';
    this.document.body.appendChild(form);
    form.submit();
  }

}
