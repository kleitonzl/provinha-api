import conn from "../config/conn.js"
import { v4 as uuidv4 } from 'uuid'

export const postInscricao = (request, response) => {
    const { participante_id, evento_id } = request.body

    if (!participante_id) {
        response.status(400).json({ message: 'O Id do participante é obrigatório!' })
        return
    }
    if (!evento_id) {
        response.status(400).json({ message: 'O Id do evento é obrigatório!' })
        return
    }


    const checkSql = /*sql*/ `
    select * from inscricao
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
            response.status(500).json({message: "Erro ao verificar existência de inscrição"})
            return console.error(err)
        }

        if(data.length > 0){
            response.status(409).json({message: "Inscrição já realizada!"})
            return console.log(err)
        }

        const inscricao_id = uuidv4()

        const insertSql = /*sql*/ `
        insert into inscricao(??, ??, ??)
        values(?, ?, ?)
        `

        const insertSqlData = [
            "inscricao_id",
            "participante_id",
            "evento_id",
   
            inscricao_id,
            participante_id,
            evento_id,
        ]

        conn.query(insertSql, insertSqlData, (err)=>{
            if(err){
                response.status(500).json({message: "Erro ao realizar inscrição"})
                return console.log(err)
            }

            response.status(201).json({message: 'Inscrição realizada com sucesso!'})
        })
    })
}

export const getParticipanteInscricoes = (request, response) => {
    const {participante_id} = request.params

    const sql = /*sql*/ `select * from inscricao where ?? = ?`

    const sqlData = [
        "participante_id",
        participante_id
    ]

    conn.query(sql, sqlData, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao buscar inscrções do participante"})
            return console.log(err)
        }

        if(data.length === 0){
            response.status(404).json({message: "Participante não inscrito"})
            return console.log(err)
        }

        const participanteInscricao = data
        response.status(200).json(participanteInscricao)
    })
}