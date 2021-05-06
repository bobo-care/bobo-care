import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from "@sentry/angular";

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn: "https://6883352387644526bb42249fc52905d2@o622113.ingest.sentry.io/5752569",
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ["localhost", "https://baby.sotomski.pl"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
