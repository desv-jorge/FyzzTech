import prismaClient from "../prisma";
class ListProdutoService{

    async execute() {
        const produtos = await prismaClient.produto.findMany()
        return produtos
    }
}

export {ListProdutoService}