import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlBuilder } from '../../core/http/api-url.builder';
import { InvitationPreview } from '../../core/types/api.types';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(ApiUrlBuilder);

  preview(token: string): Observable<InvitationPreview> {
    return this.http.get<InvitationPreview>(this.apiUrl.build(`/api/invitations/${token}`));
  }

  accept(token: string): Observable<void> {
    return this.http.post<void>(this.apiUrl.build(`/api/invitations/${token}/accept`), {});
  }
}