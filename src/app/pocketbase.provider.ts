import { environment } from "@/environments/environment";
import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from "@angular/core";
import pocketbase from "pocketbase";

export const PocketBaseClient = new InjectionToken<pocketbase>('PocketBaseClient');

export const providePocketBase = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    {
      provide: PocketBaseClient,
      useFactory: () => new pocketbase(environment.pb_url),
    },
  ]);
