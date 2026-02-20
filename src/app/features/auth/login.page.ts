import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AuthStore } from '../../core/auth/auth.store';

@Component({
  standalone: true,
  selector: 'app-login-page',
  template: `
    <div class="min-h-screen bg-slate-100 px-4 py-16">
      <div class="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <h1 class="text-2xl font-semibold text-slate-900">Welcome back</h1>
        <p class="mt-2 text-sm text-slate-600">Sign in through the InClass identity provider.</p>

        <button
          type="button"
          class="btn-primary mt-8 w-full"
          (click)="login()"
        >
          Continue with InClass
        </button>
      </div>
    </div>
  `
})
export class LoginPageComponent {
  private readonly authStore = inject(AuthStore);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    if (this.authStore.isAuthenticated()) {
      void this.router.navigate(['/app/dashboard']);
    }
  }

  login(): void {
    this.authService.login();
  }
}