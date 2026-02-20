import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  readonly lastError = signal<string | null>(null);

  capture(error: unknown): void {
    if (error instanceof Error) {
      this.lastError.set(error.message);
      return;
    }

    this.lastError.set('An unexpected error occurred.');
  }

  clear(): void {
    this.lastError.set(null);
  }
}