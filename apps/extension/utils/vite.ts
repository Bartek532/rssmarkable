import { type PluginOption } from "vite";

import addHmr from "./plugins/add-hmr";
import customDynamicImport from "./plugins/custom-dynamic-import";
import inlineVitePreloadScript from "./plugins/inline-vite-preload-script";
import makeManifest from "./plugins/make-manifest";
import watchRebuild from "./plugins/watch-rebuild";

export const getPlugins = (isDev: boolean): PluginOption[] => [
  makeManifest({ getCacheInvalidationKey }),
  customDynamicImport(),
  // You can toggle enable HMR in background script or view
  addHmr({ background: true, view: true, isDev }),
  isDev && watchRebuild({ afterWriteBundle: regenerateCacheInvalidationKey }),
  // For fix issue#177 (https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/177)
  inlineVitePreloadScript(),
];

const cacheInvalidationKeyRef = { current: generateKey() };

export function getCacheInvalidationKey() {
  return cacheInvalidationKeyRef.current;
}

function regenerateCacheInvalidationKey() {
  cacheInvalidationKeyRef.current = generateKey();
  return cacheInvalidationKeyRef;
}

function generateKey(): string {
  return `${Date.now().toFixed()}`;
}
