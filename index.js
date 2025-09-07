const app = require('express')() // Startar o backend
const consign = require('consign')

consign()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app) // Irá injetar em todos arquivos como parâmetro.



app.listen(3002, () => {
    console.log('Backend Executando..')
})

