// Configuração dos middlewares do express
// Cors -> Para conectar a aplicação frontend e backend

const bodyParser = require('body-parser')
const cors = require('cors')


module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
    // Centralizador de arquivos
}