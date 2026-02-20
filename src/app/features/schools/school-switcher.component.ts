import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SchoolContextStore } from '../../core/schools/school-context.store';

@Component({
  standalone: true,
  selector: 'app-school-switcher',
  imports: [],
  template: `
    <label class="sr-only" for="schoolSwitcher">Current school</label>
    <select
      id="schoolSwitcher"
      class="input-base w-64"
      [value]="schoolContextStore.selectedSchoolId() ?? ''"
      (change)="onSchoolChange($event)"
    >
      @for (school of schoolContextStore.schools(); track school.schoolId) {
        <option [value]="school.schoolId">{{ school.name }}</option>
      }
    </select>
  `
})
export class SchoolSwitcherComponent {
  readonly schoolContextStore = inject(SchoolContextStore);

  onSchoolChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.schoolContextStore.setSelectedSchoolId(select.value || null);
  }
}