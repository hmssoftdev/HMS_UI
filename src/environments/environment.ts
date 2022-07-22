// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiURL : 'https://hmsserver.net/'  ,
   firebase : {
    apiKey: "AIzaSyCtinGzzcZPkWwvTq-CwVhWMQLLJy-reiI",
    authDomain: "hmstest-6cdfd.firebaseapp.com",
    databaseURL: "https://hmstest-6cdfd-default-rtdb.firebaseio.com",
    projectId: "hmstest-6cdfd",
    storageBucket: "hmstest-6cdfd.appspot.com",
    messagingSenderId: "970556843525",
    appId: "1:970556843525:web:dbf891ba00e45986869e6c",
    measurementId: "G-QW3G04YLET"
  }  //'http://localhost:8000/'
};
