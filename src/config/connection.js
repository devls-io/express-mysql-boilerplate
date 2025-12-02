import mysql2 from 'mysql2/promise'
import 'dotenv/config';

// Arquivo responsável pela conexão com o banco de dados

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true
})

// Teste de conexão

async function testConnection(){
    try{
        const connection = await pool.getConnection();
        console.log(`✅ Banco de dados conectado com sucesso!`)
        connection.release() // libera a conexão
    } catch(error){
        console.error('❌ Erro ao conectar no banco:', error.message)
    }
}

testConnection()

export default pool

