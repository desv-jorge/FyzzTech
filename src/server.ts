import cors from "@fastify/cors";
import Fastify from "fastify";
import { routes } from "./routes";

const app = Fastify({logger : true})
const port = process.env.PORT || 4000;
console.log(port)


app.setErrorHandler((error,request,reply)=>{
    reply.code(400).send({ message: error.message })
})

const start = async ()=>{

    await app.register(cors)
    await app.register(routes)


    try{
        await app.listen({ port : Number(port)})
    }catch(error){
        process.exit(1)
    }
}

start();