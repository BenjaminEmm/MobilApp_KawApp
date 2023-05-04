// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const production = false;

const uri = '';

const default_admin_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlZmF1bHRfYWRtaW4iLCJpZCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.xAtDHzG5aXvd_XpsFmpuTRPdrG6_Sc6AYTTkqpsbvLM';
const default_user_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlZmF1bHRfdXNlciIsImlkIjowLCJyb2xlIjoidXNlciIsImlhdCI6MTUxNjIzOTAyMn0.LND5ZJTsXAqY7WJjfhLewk5mbtzq43IoeaMgtZF0ZbI';

const default_admin = {
  token: default_admin_token,
  requestOptions: {
    headers: {
      'authorization': `Bearer ${default_admin_token}`
    }
  }
};

const default_user = {
  token: default_user_token,
  requestOptions: {
    headers: { 'authorization': `Bearer ${default_user_token}` }
  }
}

export const environment = { production, uri, default_admin, default_user };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
