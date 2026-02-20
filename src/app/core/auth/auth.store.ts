import { computed, Injectable, signal } from '@angular/core';
import { AuthStatus, AuthUser } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly statusSignal = signal<AuthStatus>('loading');
  private readonly userSignal = signal<AuthUser | null>(null);

  readonly status = this.statusSignal.asReadonly();
  readonly user = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.statusSignal() === 'authenticated');

  setAuthenticated(user: AuthUser): void {
    this.userSignal.set(user);
    this.statusSignal.set('authenticated');
  }

  setAnonymous(): void {
    this.userSignal.set(null);
    this.statusSignal.set('anonymous');
  }

  setLoading(): void {
    this.statusSignal.set('loading');
  }
}