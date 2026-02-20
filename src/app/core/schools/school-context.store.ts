import { computed, Injectable, signal } from '@angular/core';
import { MySchoolDto } from '../types/api.types';

const SELECTED_SCHOOL_KEY = 'selectedSchoolId';

@Injectable({
  providedIn: 'root'
})
export class SchoolContextStore {
  private readonly schoolsSignal = signal<MySchoolDto[]>([]);
  private readonly selectedSchoolIdSignal = signal<string | null>(
    localStorage.getItem(SELECTED_SCHOOL_KEY)
  );

  readonly schools = this.schoolsSignal.asReadonly();
  readonly selectedSchoolId = this.selectedSchoolIdSignal.asReadonly();
  readonly selectedSchool = computed(() => {
    const selectedId = this.selectedSchoolIdSignal();
    return this.schoolsSignal().find((school) => school.schoolId === selectedId) ?? null;
  });

  setSchools(schools: MySchoolDto[]): void {
    this.schoolsSignal.set(schools);

    const selectedId = this.selectedSchoolIdSignal();
    const hasSelectedSchool = selectedId
      ? schools.some((school) => school.schoolId === selectedId)
      : false;

    if (!hasSelectedSchool) {
      this.setSelectedSchoolId(schools[0]?.schoolId ?? null);
    }
  }

  setSelectedSchoolId(schoolId: string | null): void {
    this.selectedSchoolIdSignal.set(schoolId);

    if (schoolId) {
      localStorage.setItem(SELECTED_SCHOOL_KEY, schoolId);
      return;
    }

    localStorage.removeItem(SELECTED_SCHOOL_KEY);
  }

  clear(): void {
    this.schoolsSignal.set([]);
    this.setSelectedSchoolId(null);
  }
}