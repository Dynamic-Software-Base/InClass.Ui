import { Component, effect, inject, signal } from '@angular/core';
import { SchoolsService } from '../../core/schools/schools.service';
import { SchoolContextStore } from '../../core/schools/school-context.store';
import { SchoolMemberDto } from '../../core/types/api.types';

@Component({
  standalone: true,
  selector: 'app-members-page',
  template: `
    <section class="card p-6">
      <div class="flex items-end justify-between gap-4">
        <div>
          <h2 class="text-xl font-semibold text-slate-900">Members</h2>
          <p class="mt-1 text-sm text-slate-600">People with access to the selected school.</p>
        </div>
      </div>

      @if (loading()) {
        <p class="mt-6 text-sm text-slate-500">Loading members...</p>
      } @else if (error()) {
        <p class="mt-6 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{{ error() }}</p>
      } @else if (!members().length) {
        <p class="mt-6 text-sm text-slate-500">No members found for this school.</p>
      } @else {
        <div class="mt-6 overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200 text-sm">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-4 py-3 text-left font-semibold text-slate-700">Name</th>
                <th class="px-4 py-3 text-left font-semibold text-slate-700">Email</th>
                <th class="px-4 py-3 text-left font-semibold text-slate-700">Phone</th>
                <th class="px-4 py-3 text-left font-semibold text-slate-700">Roles</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 bg-white">
              @for (member of members(); track member.userId) {
                <tr>
                  <td class="px-4 py-3 text-slate-800">{{ member.fullName }}</td>
                  <td class="px-4 py-3 text-slate-600">{{ member.email ?? '-' }}</td>
                  <td class="px-4 py-3 text-slate-600">{{ member.phoneNumber ?? '-' }}</td>
                  <td class="px-4 py-3 text-slate-600">{{ member.roles.join(', ') }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </section>
  `
})
export class MembersPageComponent {
  private readonly schoolsService = inject(SchoolsService);
  private readonly schoolStore = inject(SchoolContextStore);

  readonly members = signal<SchoolMemberDto[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(
      () => {
        const schoolId = this.schoolStore.selectedSchoolId();

        if (!schoolId) {
          this.members.set([]);
          return;
        }

        this.loadMembers(schoolId);
      },
      { allowSignalWrites: true }
    );
  }

  private loadMembers(schoolId: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.schoolsService.getSchoolMembers(schoolId).subscribe({
      next: (members) => {
        this.members.set(members);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load members.');
        this.loading.set(false);
      }
    });
  }
}