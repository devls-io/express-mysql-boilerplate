import pool from "../config/connection.js";

export class UserRepository{

    async getAllUsers(){
        try{
            const sql = 'SELECT * FROM users'


            // Desestruturação
            const [rows] = await pool.query(sql)

            // Retorna um array de objetos
            return rows
        } catch(error){
            console.error("Erro ao buscar usuários no banco de dados", error)
            throw error
        }
    }     

    async getUserById(id){
        try{
            const sql = 'SELECT * FROM users WHERE id = ?'

            const [rows] = await pool.query(sql, [id])

            // Retorna o obj unico
            return rows[0] || null

        } catch(error){
            console.error("Erro ao buscar usuário pelo ID no banco de dados", error)
            throw error
        }
    }

    async createNewUser(user){
       try{
            // user = um objeto com name, email, password

            const sql = 'INSERT INTO users(name,email,password) VALUES (?, ?, ?)'

            const values = [
                user.name,
                user.email,
                user.password
            ]

            const [result] = await pool.query(sql, values)
            return result.insertId
        } catch(error){
            if(error.code === 'ER_DUP_ENTRY'){
                throw new Error('Já existe um usuário com cadastrado com esses dados!')
            }
            throw error
       }
    }


    async updateUser(id, user){
        try{
            const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?'

            const values = [
                user.name,
                user.email,
                user.password,
                id
            ]

            const [result] = await pool.query(sql, values)

            return result.affectedRows
        } catch(error){
            console.error("Erro ao atualizar usuário no banco de dados", error)
            throw error
        }
    }

    async deleteUser(id){
        try{
            const sql = 'DELETE FROM users WHERE id = ?'

            const [result] = await pool.query(sql, [id])

            return result.affectedRows
        } catch(error){
            console.error("Erro ao deletar usuário no banco de dados", error)
            throw error
        }
    }

}