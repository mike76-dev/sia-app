/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    google: typeof google;
  }

  const google: any;
}