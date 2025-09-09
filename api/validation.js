module.exports = app => {

    //  Verifica se um valor existe e é válido:
    //   - Se o valor é falsy (null, undefined, false, 0, ""), lança o erro
    //   - Se é um array vazio, lança o erro
    //   - Se é uma string vazia ou só espaços, lança o erro
    function existsOrError(value, msg) {
        if (!value) throw msg
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg
    }

    // Faz o oposto da função anterior:
    //   - Verifica se o valor NÃO existe
    //   - Se o valor existir, lança o erro
    //   - Útil para verificar se algo já não existe (ex: email já cadastrado)
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    // Senha e confirmação de senha
    function equalsOrError(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }

    function validPasswordOrError(password, msg) {
        if (!password || password.length < 8) {
            throw msg || 'Senha deve ter no mínimo 8 caracteres'
        }

        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/
        if (!hasSpecialChar.test(password)) {
            throw msg || 'Senha deve conter pelo menos um caractere especial'
        }
    }
    return { existsOrError, notExistsOrError, equalsOrError, validPasswordOrError }
}
