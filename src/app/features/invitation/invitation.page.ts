import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AuthStore } from '../../core/auth/auth.store';
import { InvitationPreview } from '../../core/types/api.types';
import { InvitationService } from './invitation.service';

@Component({
  standalone: true,
  selector: 'app-invitation-page',
  template: `
    <div class="min-h-screen bg-slate-100 px-4 py-16">
      <section class="mx-auto max-w-2xl card p-8">
        <h1 class="text-2xl font-semibold text-slate-900">Invitation</h1>

        @if (loading()) {
          <p class="mt-4 text-sm text-slate-500">Loading invitation...</p>
        } @else if (error()) {
          <p class="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{{ error() }}</p>
        } @else if (preview()) {
          <div class="mt-6 space-y-4">
            <p class="text-sm text-slate-600">
              School:
              <span class="font-semibold text-slate-900">{{ preview()?.schoolName ?? 'Unknown school' }}</span>
            </p>

            @if (preview()?.userExists) {
              <p class="text-sm text-slate-600">An existing user account was found for this invitation.</p>
              @if (!authStore.isAuthenticated()) {
                <button type="button" class="btn-primary" (click)="login()">Login to accept</button>
              }
            } @else {
              <p class="text-sm text-slate-600">No user account found for this invitation token.</p>
              @if (!authStore.isAuthenticated()) {
                <button type="button" class="btn-primary" (click)="login()">Login to create account</button>
              }
            }

            @if (authStore.isAuthenticated()) {
              <button type="button" class="btn-secondary" (click)="acceptInvitation()">Accept invitation</button>
            }

            @if (acceptMessage()) {
              <p class="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{{ acceptMessage() }}</p>
            }
          </div>
        }
      </section>
    </div>
  `
})
export class InvitationPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly invitationService = inject(InvitationService);
  private readonly authService = inject(AuthService);

  readonly authStore = inject(AuthStore);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly preview = signal<InvitationPreview | null>(null);
  readonly acceptMessage = signal<string | null>(null);
  private readonly token = this.route.snapshot.paramMap.get('token') ?? '';

  constructor() {
    this.loadPreview();
  }

  login(): void {
    this.authService.login();
  }

  acceptInvitation(): void {
    if (!this.token) {
      return;
    }

    this.invitationService.accept(this.token).subscribe({
      next: () => this.acceptMessage.set('Invitation accepted successfully.'),
      error: () => this.error.set('Unable to accept invitation at this time.')
    });
  }

  private loadPreview(): void {
    if (!this.token) {
      this.loading.set(false);
      this.error.set('Invitation token is missing.');
      return;
    }

    this.loading.set(true);

    this.invitationService.preview(this.token).subscribe({
      next: (preview) => {
        this.preview.set(preview);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load invitation.');
        this.loading.set(false);
      }
    });
  }
}