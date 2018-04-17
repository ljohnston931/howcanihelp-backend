
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
        table.increments('user_id').primary();
        table.string('username').notNullable();
        table.string('hash').notNullable();
        table.string('role');
    }),
  ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
    ]);
};

/*
*/