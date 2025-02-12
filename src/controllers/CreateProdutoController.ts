import { FastifyRequest, FastifyReply } from "fastify";
import {CreateProdutoService} from "../services/CreateProdutoService"



class CreateProdutoController{
    async handle (request:FastifyRequest, reply: FastifyReply ){
        const {catalog, imgPath, desc, price ,linkAfl} = request.body as { catalog: string, imgPath: string, desc: string, price: string ,linkAfl: string }


        const NewprodutoService = new CreateProdutoService() 

        const produto = await NewprodutoService.execute({catalog, imgPath, desc, price ,linkAfl});

        reply.send(produto)

    }

}

export { CreateProdutoController }