import prismaClient from "../../prisma";

class ListCategoryService{
    //Criando serviço de listagem de todos as category por meio do findMany
    async execute(){
        const category = await prismaClient.category.findMany({
            select:{
                id: true,
                name: true
            }
        })

        return category;
    }
}

export { ListCategoryService }