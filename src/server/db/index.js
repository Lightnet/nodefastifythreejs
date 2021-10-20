// testing...
var knex;

if(!knex){
  knex= require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./mydb.sqlite"
    }
  });
}