exports.up = function (knex) {
  return knex.schema
    .createTable('movies', function (table) {
      table.increments('');
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.string('note').notNullable();
      table.string('image').notNullable();
      table.string('categories').notNullable();
      table.integer('likes');

      table.string('user_id').notNullable();

      table.foreign('user_id').references('id').inTable('user');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('movies');
};
