const app = require('express')() // Startar o backend
const consign = require('consign')
const database = require('./config/database')

app.database = database // Passando as configurações do banco de dados, que irá está disponivel em todos os arquivos (app como parametro).

consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app) // Irá injetar em todos arquivos como parâmetro.



app.listen(3002, () => {
    console.log('Backend Executando..')
})

