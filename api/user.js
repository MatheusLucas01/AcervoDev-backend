// Importa a biblioteca bcrypt-nodejs para criptografia de senhas
const bcrypt = require('bcrypt-nodejs')

// Exporta uma função que recebe o objeto 'app' como parâmetro (padrão Express com Consign)
module.exports = app => {

    // Desestruturação para importar funções de validação do arquivo validation.js
    const { existsOrError, notExistsOrError, equalsOrError, validPasswordOrError } = app.api.validation

    // Função para criptografar a senha do usuário
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10) // Gera um salt com fator de custo 10
        return bcrypt.hashSync(password, salt) // Retorna a senha criptografada com o salt
    }

    // Função assíncrona para salvar ou atualizar um usuário no banco de dados
    const save = async (req, res) => {
        const user = { ...req.body } // Cria uma cópia dos dados enviados no corpo da requisição
        if (req.params.id) user; id = req.params.id // Se há ID nos parâmetros da URL, define o ID do usuário

        try {
            // Validações dos campos obrigatórios usando as funções de validação
            existsOrError(user.name, 'Nome não informado!') // Verifica se o nome foi informado
            existsOrError(user.email, 'E-mail não informado') // Verifica se o email foi informado
            existsOrError(user.password, 'Senha não informada') // Verifica se a senha foi informada
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida') // Verifica se a confirmação de senha foi informada
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem') // Verifica se senha e confirmação são iguais
            validPasswordOrError(user.password, 'Senha fraca.') // Valida se a senha atende aos critérios de segurança

            // Verificar se o usuário já está cadastrado no banco de dados pelo email
            const userFromDB = await app.database('users')
                .where({ email: user.email }).first() // Busca o primeiro usuário com o email informado
            if (!user.id) { // Se não é uma atualização (não tem ID)
                notExistsOrError(userFromDB, 'Usuário já cadastrado') // Verifica se o email já não está em uso
            }

        } catch (msg) {
            return res.status(400).send(msg) // Em caso de erro de validação, retorna status 400 (Bad Request) com a mensagem
        }

        user.password = encryptPassword(user.password) // Criptografa a senha antes de salvar no banco
        delete user.confirmPassword // Remove o campo de confirmação de senha (não deve ser salvo no banco)

        // Verifica se é uma atualização ou inserção
        if (user.id) {
            // Se tem ID, é uma atualização
            app.database('users')
                .update(user) // Atualiza os dados do usuário
                .where({ id: user.id }) // Onde o ID corresponde ao usuário
                .then(_ => res.status(204).send()) // Sucesso: retorna status 204 (No Content)
                .catch(err => res.status(500).send(err)) // Erro: retorna status 500 (Internal Server Error)
        } else {
            // Se não tem ID, é uma inserção
            app.database('users')
                .insert(user) // Insere um novo usuário no banco
                .then(_ => res.status(204).send()) // Sucesso: retorna status 204 (No Content)
                .catch(err => res.status(500).send(err)) // Erro: retorna status 500 (Internal Server Error)
        }
    }
    const get = (req, res) => {
        app.database('users')
            .select('id', 'name', 'email', 'admin') // Busca essas informações do banco de dados
            .then(users => res.json(users)) // Se funcionar, lista os usuários
            .catch(err => res.status(500).send(err)) // Se não funcionar, retorna o resultado e mostra o erro
    }

    const getById = (req, res) => {
        app.database('users')
            .select('id', 'name', 'email', 'admin') // Busca essas informações do banco de dados
            .then(users => res.json(users)) // Se funcionar, lista os usuários
            .catch(err => res.status(500).send(err)) // Se não funcionar, retorna o resultado e mostra o erro
    }

    return { save, get } // Retorna um objeto contendo a função save para ser usado em outras partes da aplicação
}