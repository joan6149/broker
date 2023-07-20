// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  appName: 'TimeClock',

  // Configuracion del servivor smtp a usar (esto aaqui weeno en fin ...)
  mailerSendOptions: {
    baseUrl: "https://api.elasticemail.com",
    apikey: "D6A0C89692641FD7ED7FD4D693F1C5EFF30309064C7C6D2578FC04237026F60567855643D7FA130992BD3D54DD71D4B6",
    from: 'info@timeclockbkr.com',
    to: 'joan6149@gmail.com'
  },

  // UrlBack
  backend: 'http://localhost:3000/broker'

  // Configuracion de url del back PODRIAMOS HACERLO CON EL PROXY DE ANGULAR

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
