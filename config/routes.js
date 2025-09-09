module.exports = app => {
    app.route('/users')
        .post(app.api.user.save) // Fazer a inserção e a alteração do usuário
        .get(app.api.user.get)

    app.route('/users/:id') // alteração do usuário
        .put(app.api.user.save)
}
