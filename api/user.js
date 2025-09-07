
module.exports = app => {
    const save = (req, res) => {
        res.send('user save')
    }

    return { save } // Retorna o objeto com cada uma das funções
}