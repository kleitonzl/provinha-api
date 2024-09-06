import conn from "../config/conn.js";

const tableInscricao = /*sql*/ `
    CREATE TABLE IF NOT EXISTS inscricao( 
        inscricao_id VARCHAR(60) PRIMARY KEY,
        participante_id VARCHAR(60) NOT NULL,
        evento_id VARCHAR(60) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

        FOREIGN KEY (participante_id ) REFERENCES participantes(participante_id )   
        FOREIGN KEY (evento_id) REFERENCES eventos(evento_id)   
    )
`

conn.query(tableInscricao, (err) => {
    if(err) {
        console.error(err)
        return
    }
    console.log("Tabela de [Inscrição] criado com sucesso")
})