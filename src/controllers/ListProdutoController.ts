import { FastifyRequest, FastifyReply } from "fastify";
import { ListProdutoService } from "../services/ListProdutoService";

class ListProdutoController{

    async handle(request:FastifyRequest, reply: FastifyReply){
        const listProdutoService = new ListProdutoService()

        const produtos = await listProdutoService.execute()

        reply.send(produtos)
    }

}

export {ListProdutoController}