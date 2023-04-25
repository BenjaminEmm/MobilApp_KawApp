// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const production = false;

const uri = 'https://615f5fb4f7254d0017068109.mockapi.io/api/v1';

const token = 'ADMIN_TOKEN';

const admin = {
  token,
  requestOptions: {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }
};

export const environment = { production, uri, admin };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
