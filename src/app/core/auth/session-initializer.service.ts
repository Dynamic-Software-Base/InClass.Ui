import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SchoolContextStore } from '../schools/school-context.store';
import { SchoolsService } from '../schools/schools.service';
import { AuthService } from './auth.service';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root'
})
export class SessionInitializerService {
  private readonly authService = inject(AuthService);
  private readonly authStore = inject(AuthStore);
  private readonly schoolsService = inject(SchoolsService);
  private readonly schoolContextStore = inject(SchoolContextStore);
  private initializationPromise: Promise<void> | null = null;
  private initialized = false;

  ensureInitialized(): Promise<void> {
    if (this.initialized) {
      return Promise.resolve();
    }

    if (!this.initializationPromise) {
      this.initializationPromise = this.initialize().finally(() => {
        this.initialized = true;
        this.initializationPromise = null;
      });
    }

    return this.initializationPromise;
  }

  async initialize(): Promise<void> {
    this.authStore.setLoading();

    try {
      const user = await firstValueFrom(this.authService.me());
      this.authStore.setAuthenticated(user);
    } catch {
      this.authStore.setAnonymous();
      this.schoolContextStore.clear();
      return; // stop here, no point loading schools
    }

    try {
      const schools = await firstValueFrom(this.schoolsService.getMySchools());
      this.schoolContextStore.setSchools(schools);
    } catch {
      this.schoolContextStore.clear();
    }
  }
}
