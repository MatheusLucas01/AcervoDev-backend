// Update with your config settings.
// ARQUIVO DE CONEXÃO COM O BANCO DE DADOS

module.exports = {
  client: 'postgresql',
  connection: {
    database: 'acervodev',
    user: 'postgres',
    password: 'admin'
  },
  pool: {
    min: 2,
    max: 30
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}


