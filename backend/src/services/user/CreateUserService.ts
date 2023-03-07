import prismaClient from'../../prisma'
import { hash } from 'bcryptjs'


interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){
        //verificar se enviou um email
        if(!email){
            throw new Error("email incorrect")
        }
        //Verificar se esse email ja esta cadastrado na plataforma
        const userAlreadyExist = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExist){
            throw new Error("User already exists")
        }

        //criptografar senha
        const passwordHash = await hash(password, 8)

        //Criar usuário
        const user = await prismaClient.user.create({
            
            //Oque será salvo no banco
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            //Oque será retornado
            select:{
                id: true,
                name: true,
                email: true
            }
        })


        return user;
    }
}

export { CreateUserService }