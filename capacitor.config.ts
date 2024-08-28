import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.peunajoh.id',
  appName: 'peunajoh',
  webDir: 'out',
  "bundledWebRuntime": false,
  server: {
    url: 'http://172.17.224.1:3000',
    cleartext: true,
  },
};

export default config;
