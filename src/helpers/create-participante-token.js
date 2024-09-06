import jwt from 'jsonwebtoken'

// assincrono
const createUserToken = async (participante, request, response) => { 

    const token = jwt.sign( 
        {
            nome: participante.nome,
            id: participante.participante_id
        },
        'SENHASUPERSEGURAEDIFICIL' // coloca a senha para a criptografia
    ) 

    // Responder / Retornar o token
    response.status(200).json({
        message: "Você está logado!",
        token: token,
        participanteId: participante.participante_id
    })
}

export default createUserToken