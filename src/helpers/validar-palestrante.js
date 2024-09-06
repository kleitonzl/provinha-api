// Com next
const validarPalestrante = (request, response, next) => {
    const {nome, expertise} = request.body

    //Validações
    if(!nome) {
        response.status(400).json({message: "O nome é obrigatório"})
        return
    }
    if(!expertise) {
        response.status(400).json({message: "O expertise é obrigatório"})
        return
    }

    next()
}

export default validarPalestrante