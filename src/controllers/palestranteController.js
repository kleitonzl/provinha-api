import conn from "../config/conn.js"
import bcrypt from "bcrypt"
import {v4 as uuidv4} from "uuid"
import jwt from "jsonwebtoken"
//Não precisa fazer as validações, pois ja foi feita nos helpers
//Agora faremos a logica da aplicação

//Helpers
import createPalestranteToken from "../helpers/create-palestrante-token.js"
import getToken from "../helpers/get-token.js"
import getUserByToken from "../helpers/get-palestrante-by-token.js"
import getPalestranteByToken from "../helpers/get-palestrante-by-token.js"

// Rota para criar um novo palestrante
export const postPalestrante = (request, response) => {
    const { nome, expertise } = request.body
    const id = uuidv4()

    const insertSql = /*sql*/ `INSERT INTO palestrantes (??, ??, ??) VALUES (?, ?, ?)`
    const insertSqlData = ["palestrante_id", "nome", "expertise", id, nome, expertise]
    
    conn.query(insertSql, insertSqlData, (err) => {
        if(err) {
            console.error(err)
            response.status(500).json({messag: "Erro ao cadastrar palestrante"})
            return
        }

        const palestranteSql = /*sql*/`SELECT * FROM palestrantes WHERE ?? = ?`
        const palestranteData = ["palestrante_id", id]
        conn.query(palestranteSql, palestranteData, async (err, data) =>{
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao selecionar usuário"})
                return
            }
            const palestrante = data[0]
            //try e cath, sao como if e elses para função async e await
            try {
                await createPalestranteToken(palestrante, request, response)
            } catch(error){
                console.error(error)
            }
            
        })
        response.status(201).json({message:"Palestrante cadastrado com sucesso!"})
    })
    
}
// Rota para listar todos os palestrantes
export const getPalestrante = (request, response) => {
    const sql = /*sql*/`SELECT * FROM palestrantes`

    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao listar os palestrante"})
            return console.log.error(err)
        }
        const palestrante = data
        response.status(200).json(palestrante)
    })
   
}