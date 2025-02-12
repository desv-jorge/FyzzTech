import prismaClient from "../prisma";

interface CreateProdutoProps{
    catalog: string
    imgPath :string
    desc: string
    price :string
    linkAfl: string
    }

class CreateProdutoService{
    async execute( {catalog, imgPath, desc, price ,linkAfl} : CreateProdutoProps){
        console.log("Rota em execução")

        const produto = await prismaClient.produto.create({
            data:{
                catalog,
                imgPath,
                desc,
                price,
                linkAfl,
            }
        })

        return produto
    } 
}

export { CreateProdutoService  }