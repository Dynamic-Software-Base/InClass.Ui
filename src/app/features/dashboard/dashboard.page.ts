import { Component, inject } from '@angular/core';
import { AuthStore } from '../../core/auth/auth.store';
import { SchoolContextStore } from '../../core/schools/school-context.store';

@Component({
  standalone: true,
  selector: 'app-dashboard-page',
  template: `
    <section class="card p-6">
      <h2 class="text-xl font-semibold text-slate-900">Dashboard</h2>
      <p class="mt-1 text-sm text-slate-600">Current session context from the BFF.</p>

      <dl class="mt-6 grid gap-4 md:grid-cols-2">
        <div class="rounded-xl bg-slate-50 p-4">
          <dt class="text-xs uppercase tracking-wide text-slate-500">Selected school</dt>
          <dd class="mt-2 text-lg font-semibold text-slate-900">
            {{ schoolStore.selectedSchool()?.name ?? 'No school selected' }}
          </dd>
        </div>

        <div class="rounded-xl bg-slate-50 p-4">
          <dt class="text-xs uppercase tracking-wide text-slate-500">Roles</dt>
          <dd class="mt-2 text-sm font-medium text-slate-800">
            {{ authStore.user()?.roles?.join(', ') || 'No roles available' }}
          </dd>
        </div>
      </dl>
    </section>
  `
})
export class DashboardPageComponent {
  readonly authStore = inject(AuthStore);
  readonly schoolStore = inject(SchoolContextStore);
}