import conn from "../config/conn.js"
import { v4 as uuidv4 } from 'uuid'

export const postFeedback = (request, response) =>{
    const { participante_id, evento_id, nota, comentarios } = request.body

    if (!participante_id) {
        response.status(400).json({ message: 'O Id do participante é obrigatório!' })
        return
    }
    if (!evento_id) {
        response.status(400).json({ message: 'O Id do evento é obrigatório!' })
        return
    }
    if (!nota) {
        response.status(400).json({ message: 'A sua avaliação é necessária!' })
        return
    }


    const checkSql = /*sql*/ `
    select * from feedbacks
    where ?? = ? and
    ?? = ?
    `

    const checkSqlData = [
        "participante_id",
        participante_id,
        "evento_id",
        evento_id
    ]

    conn.query(checkSql, checkSqlData, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar existência de feedback"})
            return console.error(err)
        }

        if(data.length > 0){
            response.status(409).json({message: "Feedback já realizado! Agradecemos sua opnião"})
            return console.log(err)
        }

        const feedback_id = uuidv4()

        const insertSql = /*sql*/ `
        insert into feedbacks(??, ??, ??, ??, ??)
        values(?, ?, ?, ?, ?)
        `

        const insertSqlData = [
            "feedback_id",
            "participante_id",
            "evento_id",
            "nota",
            "comentarios",
   
            feedback_id,
            participante_id,
            evento_id,
            nota, 
            comentarios
        ]

        conn.query(insertSql, insertSqlData, (err)=>{
            if(err){
                response.status(500).json({message: "Erro ao postar seu feedback"})
                return console.log(err)
            }

            response.status(201).json({message: 'Feedback postado com sucesso!'})
        })
    })
}

export const getMaisPopular = (request, response) => {
    const sql = /*sql*/ `
    select count(participanteId) as "Qtd de Inscrições", eventoId from inscricao group by eventoId
    `

    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar quantidade de inscrições nos eventos"})
            return console.log(err)
        }

         const participante = data
         response.status(200).json(participante)
    })
}

export const getPalestranteMaisAtivo = (request, response) => {
    const sql = /*sql*/ `
    select count(palestranteId) as "Quantidade de Participações", palestranteId  from evento group by palestranteId
    `

    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar participantes existentes"})
            return console.log(err)
        }

        const participante = data
        response.status(200).json(participante)
    })
}