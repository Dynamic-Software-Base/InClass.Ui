import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

const INITIAL_LOADER_MIN_MS = 1000;
const initialLoaderStart = Date.now();
const bootstrapLoader = document.getElementById('bootstrap-loader');

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

bootstrapApplication(App, appConfig)
  .then(async () => {
    const elapsed = Date.now() - initialLoaderStart;
    const remaining = Math.max(0, INITIAL_LOADER_MIN_MS - elapsed);
    if (remaining > 0) {
      await wait(remaining);
    }

    if (bootstrapLoader) {
      bootstrapLoader.remove();
    }
  })
  .catch((err: unknown) => console.error(err));
