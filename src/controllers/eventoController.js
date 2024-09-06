import { request, response } from 'express';
import conn from '../config/conn.js';
import { v4 as uuidv4 } from 'uuid';

export const postEventos = (request, response) => {
    const { titulo, data_evento, palestrante_id } = request.body

    if (!titulo) {
        response.status(400).json({ message: 'O titulo do evento é obrigatório!' })
        return
    }
    if (!data_evento) {
        response.status(400).json({ message: 'A data do evento é obrigatória!' })
        return
    }
    if (!palestrante_id) {
        response.status(400).json({ message: 'O Id dos palestrantes é obrigatório!' })
        return
    }


    const checkSql = /*sql*/ `
    select * from eventos
    where ?? = ? and
    ?? = ?
    `

    const checkSqlData = [
        "titulo",
        titulo,
        "data_evento",
        data_evento
    ]

    conn.query(checkSql, checkSqlData, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar existência de evento"})
            return console.error(err)
        }

        if(data.length > 0){
            response.status(409).json({message: "Evento já marcado!"})
            return console.log(err)
        }
        // console.log(data)

        const evento_id = uuidv4()

        const insertSql = /*sql*/ `
        insert into eventos(??, ??, ??, ??)
        values(?, ?, ?, ?)
        `

        const insertSqlData = [
            "evento_id",
            "titulo",
            "data_evento",
            "palestrante_id",
   
            evento_id,
            titulo,
            data_evento,
            palestrante_id
        ]

        conn.query(insertSql, insertSqlData, (err)=>{
            if(err){
                response.status(500).json({message: "Erro ao criar evento"})
                return console.log(err)
            }

            response.status(201).json({message: 'Evento criado!'})
        })
    })

}

export const getEventos = (request, response) => {
    const sql = /*sql*/ `
    select * from eventos inner join palestrantes on eventos.palestrante_id = palestrantes.palestrante_id`

    conn.query(sql, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao listar eventos" })
            return console.log(err)
        }

        const eventos = data
        response.status(200).json(eventos)
    })
}

export const editarEventos = (request, response) => {
    const {evento_id} = request.params
    const {titulo, data_evento, palestrante_id} = request.body

    if (!titulo) {
        response.status(400).json({ message: 'O titulo do evento é obrigatório!' })
        return
    }
    if (!data_evento) {
        response.status(400).json({ message: 'A data do evento é obrigatória!' })
        return
    }
    if (!palestrante_id) {
        response.status(400).json({ message: 'O Id dos palestrantes é obrigatório!' })
        return
    }

    const checkSql = /*sql*/ `
    select * from eventos
    where ?? = ? and
    ?? = ?
    `

    const checkSqlData = [
        "titulo",
        titulo,
        "data_evento",
        data_evento
    ]

    conn.query(checkSql, checkSqlData, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar existência de evento"})
            return console.error(err)
        }

        if(data.length > 0){
            response.status(409).json({message: "Evento já marcado!"})
            return console.log(err)
        }

        const updateSql = /*sql*/ `update eventos set ?? = ?, ?? = ?, ?? = ? where ?? = ?`

        const updateSqlData = [
            "titulo",
            titulo,
            "data_evento",
            data_evento,
            "palestrante_id",
            palestrante_id,
            "evento_id",
            evento_id,
        ]

        conn.query(updateSql, updateSqlData, (err)=>{
            if(err){
                response.status(500).json({message: "Erro ao atualizar evento"})
                return console.log(err)
            }

            response.status(200).json({message: "Evento atualizado!"})
        })
    })
}

export const deletarEventos = (request, response) => {
    const {evento_id} = request.params

    const deleteSqlFeedback = /*sql*/ `delete from feedbacks where ?? = ?`

    const deleteSqlFeedbackData = [
        "evento_id",
        evento_id
    ]

    conn.query(deleteSqlFeedback, deleteSqlFeedbackData, (err)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: 'Erro ao deletar feedback'})
            return
        }
    })

    const deleteSql = /*sql*/ `delete from eventos where ?? = ?`

    const deleteSqlData = [
        "evento_id",
        evento_id
    ]

    conn.query(deleteSql, deleteSqlData, (err, info)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: 'Erro ao deletar evento'})
            return
        }
        if(info.affectedRows === 0){
            response.status(404).json({messagae: "evento não encontrado"})
            return
        }

        response.status(200).json({message: "Evento Cancelado!"})
    }) 
}