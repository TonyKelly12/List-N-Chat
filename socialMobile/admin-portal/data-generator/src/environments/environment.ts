// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyA-DZvvvBzt-Fjwle5h-f8l6xsxA6au21s",
    authDomain: "jimbot-managers-portal.firebaseapp.com",
    databaseURL: "https://jimbot-managers-portal.firebaseio.com",
    projectId: "jimbot-managers-portal",
    storageBucket: "jimbot-managers-portal.appspot.com",
    messagingSenderId: "562640545077"
  }
};
