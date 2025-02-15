import { error } from "console"
import prismaClient from "../prisma"

interface DeleteProdutoProps{
    id: string

}

class DeleteProdutoService{
    async execute({ id }: DeleteProdutoProps){

        if(!id){
            throw new Error("Solicitação inválida")
        }
        
        const findProduto = await prismaClient.produto.findFirst({
            where:{
                id : id
            }
        })

        if(!findProduto){
            throw new Error("Produto inexistente")
        }

        await prismaClient.produto.delete({
            where:{
                id: findProduto.id
            }
        })

        return { message: "Produto foi deletado" }
    }
}

export { DeleteProdutoService }