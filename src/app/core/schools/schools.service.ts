import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlBuilder } from '../http/api-url.builder';
import { MySchoolDto, SchoolMemberDto } from '../types/api.types';

interface CreateSchoolRequest {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(ApiUrlBuilder);

  getMySchools(): Observable<MySchoolDto[]> {
    return this.http.get<MySchoolDto[]>(this.apiUrl.build('/api/me/schools'));
  }

  createSchool(payload: CreateSchoolRequest): Observable<MySchoolDto> {
    return this.http.post<MySchoolDto>(this.apiUrl.build('/api/schools'), payload);
  }

  getSchoolMembers(schoolId: string): Observable<SchoolMemberDto[]> {
    return this.http.get<SchoolMemberDto[]>(this.apiUrl.build(`/api/schools/${schoolId}/members`));
  }
}