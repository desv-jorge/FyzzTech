import cors from "@fastify/cors";
import Fastify from "fastify";
import { routes } from "./routes";

const app = Fastify({logger : true})
const port = 4000;


app.setErrorHandler((error,request,reply)=>{
    reply.code(400).send({ message: error.message })
})

const start = async ()=>{

    await app.register(cors)
    await app.register(routes)
    const porta = port;

    try{
        await app.listen({ port : porta})
    }catch(error){
        process.exit(1)
    }
}

start();