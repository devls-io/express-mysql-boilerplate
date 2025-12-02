import { User } from "../entities/User.js";
import { UserRepository } from "../repositories/UserRepository.js";

/*
Instanciamos o repositório para usar em todo o código
não precisa do this pois não está no construtor UserController
*/
const repository = new UserRepository()

export class UserController{

    async getAll(req, res){
        try{
            const users = await repository.getAllUsers()

           return res.status(200).json(users)

        } catch(error){
            console.error("Erro no Controller ao buscar usuários")
            return res.status(500).json({erro: error.message})
        }
    }

    async getById(req, res){
        try{
            const id = req.params.id

            const user =  await repository.getUserById(id)

            if(!user){
               return res.status(404).json({erro: "Usuário não encontrado"})
            }

           return res.status(200).json(user)

        } catch(error){
            console.log("Erro no Controller ao buscar usuário pelo ID")
            return res.status(500).json({erro: error.message})
        }
    }

    async create(req,res){
        try{
            const {name,email,password} = req.body

            // Cria a instância 
            const newUser = new User(name,email,password)

            // Criptografa a senha antes de salvar
            await newUser.encryptPassword()

            const id = await repository.createNewUser(newUser)

            return res.status(201).json({
                id: id,
                mensagem: "Usuário cadastrado com sucesso!"
            })

        } catch(error){
           console.error("Erro no Controller ao criar novo usuário", error)
           return res.status(400).json({erro: error.message})
        }
    }

    async update(req, res){
        try{
            const id = req.params.id // equivalente: const {id} = req.params
            const {name,email,password} = req.body

            // Verificar se o usuário existe

            const oldData = await repository.getUserById(id)

            if(!oldData){
              return  res.status(404).json({erro: "Usuário não encontrado"})
            }

            const newData = {
                name: name || oldData.name,
                email: email || oldData.email,
                password: password || oldData.password
            }

            const newUser = new User(newData.name, newData.email, newData.password)

            // Se o usuário trocou a senha, encriptamos ela
            if(password){
                await newUser.encryptPassword()
            }

            const affectedRows = await repository.updateUser(id, newUser)

            // Dados iguais
            if(affectedRows === 0){
                return res.status(304).json({mensagem: 'Nenhum campo foi alterado'})
            }

            return res.status(200).json({mensagem: 'Usuário atualizado com suceso!'})



            
        } catch(error){
            console.error("Não foi possivel atualizar o usuário no banco de dados", error)
            return res.status(400).json({erro: error.message})
        
        }
    }


    async delete(req, res){
        try{
            const id = req.params.id

            const user =  await repository.getUserById(id)

            if(!user){
               return res.status(404).json({erro: "Usuário não encontrado"})
            }

            const affectedRows = await repository.deleteUser(id)

           if(affectedRows === 0){
            return res.status(404).json({erro: "Usuário não encontrado"})
           }

           return res.status(204).send()

        } catch(error){
            console.error("Não foi possivel deletar o usuário")
            return res.status(500).json({erro: error.message})
        }
    }

}