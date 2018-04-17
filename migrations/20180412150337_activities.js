
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('activities', function(table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('link');
            table.integer('day').notNullable();
            table.string('time').notNullable();
            table.string('description').notNullable();
            table.integer('createdBy').unsigned().notNullable()
            //.references('user_id').inTable('users');
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('activities'),
    ]);
};
