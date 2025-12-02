import bcrypt from 'bcrypt'
export class User{
    name;
    email;
    password;

    constructor(name,email,password){
        this.#validateName(name)
        this.#validateEmail(email)
        this.#validatePassword(password)

        this.name = name
        this.email = email
        this.password = password
    }

    #validateName(name){
        if(!name || name.trim().length <= 0){
            throw new Error("Nome inválido ou não inserido")
        }
    }

    #validateEmail(email){
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            throw new Error("Email inválido")
        }
    }

    #validatePassword(password){
        if(!password || password.length < 8){
            throw new Error("A senha deve ter no minimo 8 caracteres")
        }
    }

    // Encriptar a senha

    async encryptPassword(){
        this.password = await bcrypt.hash(this.password, 10)
    }
}