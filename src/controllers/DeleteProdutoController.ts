import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteProdutoService } from "../services/DeleteProdutoService";

class DeleteProdutoController{

    async handle(request: FastifyRequest, reply: FastifyReply){

        const { id } = request.query as { id: string}
        
        const produtoService = new DeleteProdutoService

        const produto = await produtoService.execute({ id })

        reply.send(produto)

    }



}

export { DeleteProdutoController }