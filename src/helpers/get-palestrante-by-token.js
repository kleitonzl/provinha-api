import { response } from "express"
import jwt from "jsonwebtoken"
import conn from "../config/conn.js"

const getPalestranteByToken = async (token) => {
    return new Promise ((resolve, reject)=>{
        if(!token){
            response.status(401).json({err: "Acesso negado!"})
            return
        }

        const decoded = jwt.verify(token, "SENHASUPERSEGURAEDIFICIL")
        const palestranteId = decoded.id

        const checkSql = /*sql*/ `SELECT * FROM palestrantes WHERE ?? = ?`
        const checkData = ["palestrante_id", palestranteId]

        conn.query(checkSql, checkData, (err, data)=>{
            if(err){
                console.error(err)
                response.status(400).json({err: "Erro ao buscar "})
                return
            }
            if(data){
                response.status(404).json({message: "Palestrante não encontrado"})
            }
        })
    })
}

export default getPalestranteByToken