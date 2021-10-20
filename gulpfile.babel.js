// https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles/
// https://markgoodyear.com/2015/06/using-es6-with-gulp/
// https://firxworx.com/blog/wordpress/using-gulp4-and-rsync-to-deploy-locally-and-beyond/

// https://www.npmjs.com/package/gulp-rollup-2
// https://www.devextent.com/import-es-modules-in-nodejs-with-typescript-and-babel/
// https://morioh.com/p/7f28530e951d

import { src, dest, watch, parallel, series } from 'gulp';

import nodemon from 'gulp-nodemon';
import config from'./config';
import babel from "gulp-babel";
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import size from 'gulp-size';

//BASIC ACCESS
const src_client_files=[
  './src/client/client.js'
];

//SERVER ACCESS
const src_server_files=[
  './src/server/server.js'
  , './src/server/**/*.js'
];

//GAME FILES
const src_client_game_files=[
  './src/server/server.js'
];

const src_hbs_files=[
  './src/server/views/*.hbs'
];


//const src_server_game_files=[
  //'./src/server/server.js'
//];

const output_dest='public';
const output_server_dest='server';

// CLIENT BUILD
function client_build(callback){
  // task
  return src(src_client_files)
    .pipe(buffer())
    .pipe(uglify())
    .pipe(size())
    .pipe(dest(output_dest));
  //cb();
}
exports.client_build = client_build;

// HBS BUILD
function hbs_build(callback){
  // task
  return src(src_hbs_files)
    .pipe(buffer())
    //.pipe(uglify())
    .pipe(size())
    .pipe(dest(output_server_dest+"/views"));
  //callback();
}
exports.hbs_build = hbs_build;

// SERVER BUILD
function server_build(callback){
  // task
  return src(src_server_files)
    .pipe(babel({
      presets: ['@babel/preset-env'],
      plugins: [
        ["@babel/plugin-transform-runtime"]
      ]
    }))
    .pipe(buffer())
    //.pipe(uglify())
    .pipe(size())
    .pipe(dest(output_server_dest));
  //callback();
}
exports.server_build = server_build;

function client_game_build(callback){
  return src(src_client_game_files)
    .pipe(buffer())
    .pipe(uglify())
    .pipe(size())
    .pipe(dest(output_dest));
}
exports.client_game_build = client_game_build;

//WATCH FILES
function watchFiles(callback) {
  watch(src_client_files, client_build);
  watch(src_server_files, server_build);
  watch(src_hbs_files, hbs_build);

  watch(src_client_game_files, client_game_build);

  callback();
}

// NODEMON SERVER
function reload_server(done) {
  nodemon({
    //script: 'index.js'
    //script: 'app.js'
    script: 'appserver.js'
    //, ext: 'js html'
    , ext: 'js'
    , env: { 
    'NODE_ENV': 'development' // ex. process.env.NODE_ENV
    ,'PORT': config.port || 3000
    ,'HOST': config.host || 'localhost'
    ,'SECRET': config.secretKey || '1234567890123456789012345678901234567890'
    ,'TOKEN': config.tokenKey || 'token'
  }
  ,ignore: [
    'gulpfile.js'
    ,'node_modules/'
    ,'public/'
  ]
  , done: done
  }).on('restart', function () {
    console.log("RESTARTED");
  });
}
exports.reload_server = reload_server;

//EXPORT DEFAULT
exports.default = series(
  client_build
  , server_build
  , client_game_build
  , hbs_build
  //, copy_html
  //, copy_svg
  , watchFiles
  , reload_server
);

