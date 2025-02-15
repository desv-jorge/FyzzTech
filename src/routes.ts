import { 
    FastifyInstance , 
    FastifyPluginOptions, 
    FastifyRequest, 
    FastifyReply
} from "fastify";
import { CreateProdutoController } from "./controllers/CreateProdutoController";
import { ListProdutoController } from "./controllers/ListProdutoController";
import { DeleteProdutoController } from "./controllers/DeleteProdutoController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

    fastify.get("/teste", async(request: FastifyRequest, reply: FastifyReply)=>{
        return {ok : true}
    })

    fastify.post("/produto", async (request: FastifyRequest, reply: FastifyReply)=>{
        return new CreateProdutoController().handle(request ,reply)
    })

    fastify.get("/produto", async (request: FastifyRequest, reply: FastifyReply)=>{
        return new ListProdutoController().handle(request ,reply)
    })

    fastify.delete("/produto", async (request: FastifyRequest, reply: FastifyReply)=>{
        return new DeleteProdutoController().handle(request ,reply)
    })
}