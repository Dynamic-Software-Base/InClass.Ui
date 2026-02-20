import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AuthStore } from '../../core/auth/auth.store';
import { SchoolSwitcherComponent } from '../schools/school-switcher.component';

@Component({
  standalone: true,
  selector: 'app-shell-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SchoolSwitcherComponent],
  template: `
    <div class="min-h-screen bg-slate-100 text-slate-900">
      <header class="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div class="app-container flex items-center justify-between gap-4 py-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">InClass</p>
            <h1 class="text-lg font-semibold">School Hub</h1>
          </div>

          <div class="flex items-center gap-3">
            <app-school-switcher />
            <button type="button" class="btn-secondary" (click)="logout()">Logout</button>
          </div>
        </div>
      </header>

      <div class="app-container flex gap-6 py-6">
        <aside class="w-56 shrink-0">
          <nav class="card p-3">
            <a
              routerLink="/app/dashboard"
              routerLinkActive="bg-slate-900 text-white"
              class="mb-1 block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              Dashboard
            </a>
            <a
              routerLink="/app/members"
              routerLinkActive="bg-slate-900 text-white"
              class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              Members
            </a>
          </nav>
        </aside>

        <main class="min-w-0 flex-1">
          <div class="mb-4 text-sm text-slate-500">
            Signed in as
            <span class="font-semibold text-slate-700">{{ authStore.user()?.name }}</span>
          </div>
          <router-outlet />
        </main>
      </div>
    </div>
  `
})
export class AppShellLayoutComponent {
  readonly authStore = inject(AuthStore);
  private readonly authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}