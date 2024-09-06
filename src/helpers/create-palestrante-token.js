import jwt from "jsonwebtoken"

//assincrona
const createPalestranteToken = async (palestrante, request, response) => {
  
    const token = jwt.sign(
        {
            nome: palestrante.nome,
            id: palestrante.usuario_id,
        },
        "SENHASUPERSEGURAEDIFICIL" // senha
    )

    //Resposta/retornar o TOKEN
    response.status(200).json({
        message: "Você esta logado!",
        token: token,
        usuarioId: palestrante.palestrante_id,
    })
}

export default createPalestranteToken