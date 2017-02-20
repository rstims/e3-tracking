
exports.up = function(knex, Promise) {
  return knex.schema.createTable('views', function(table){
  	table.increments();
  	table.integer('user_id').notNullable();
  	table.string('route').notNullable();
  	table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('views');
};
