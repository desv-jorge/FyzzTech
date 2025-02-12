import { 
    FastifyInstance , 
    FastifyPluginOptions, 
    FastifyRequest, 
    FastifyReply
} from "fastify";
import { CreateProdutoController } from "./controllers/CreateProdutoController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

    fastify.get("/teste", async(request: FastifyRequest, reply: FastifyReply)=>{
        return {ok : true}
    })

    fastify.post("/produto", async (request: FastifyRequest, reply: FastifyReply)=>{
        return new CreateProdutoController().handle(request ,reply)
    })
}