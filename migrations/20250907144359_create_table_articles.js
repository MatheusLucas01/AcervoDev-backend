
exports.up = function (knex, Promise) {
    return knex.schema.createTable('articles', table => {
        table.increments('id').primary() // para que não se repita
        table.string('name').notNull()
        table.string('description', 1000).notNull()
        table.string('imageUrl', 1000).notNull()
        table.binary('content').notNull() //blob
        table.integer('userId').references('id') // id do usuário Associado ao artigo
            .inTable('users').notNull()
        table.integer('categoryId').references('id')
            .inTable('categories').notNull()

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('articles')

};
