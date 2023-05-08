// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const production = false;
const useMocks = true;

const api = {
  erp: 'https://localhost:7289/api',
  crm: 'https://localhost:7239/api'
}
const uri = { api };

const defaultAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlZmF1bHRfYWRtaW4iLCJpZCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.xAtDHzG5aXvd_XpsFmpuTRPdrG6_Sc6AYTTkqpsbvLM';
const defaultUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlZmF1bHRfdXNlciIsImlkIjowLCJyb2xlIjoidXNlciIsImlhdCI6MTUxNjIzOTAyMn0.LND5ZJTsXAqY7WJjfhLewk5mbtzq43IoeaMgtZF0ZbI';

const defaultAdmin = {
  token: defaultAdminToken,
  requestOptions: {
    headers: {
      'authorization': `Bearer ${defaultAdminToken}`
    }
  }
};

const defaultUser = {
  token: defaultUserToken,
  requestOptions: {
    headers: { 'authorization': `Bearer ${defaultUserToken}` }
  }
}

export const environment = { production, uri, useMocks, defaultAdmin, defaultUser };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
