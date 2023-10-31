import { createClient } from "redis";
import createGraphQLError from "../errors/graphql.error";

const redisPort = process.env.REDIS_PORT ?? 6379;
const redisHost = process.env.REDIS_HOST ?? '127.0.0.1';

type CustomRedisClient = ReturnType<typeof createClient>;

export let client:CustomRedisClient

export const connectRedis = async() => {
    if(!client){
        client = createClient({
            socket:{
                port:Number(redisPort),
                host:redisHost
            }
        })

        await client.connect();

        // await new Promise((resolve, reject) => {
        //     client.once('error', reject)
        //     client.once('connect', resolve)
        // })

        console.log('Connected to Redis');
        
    }
}

export const getClient = () => {

    if(!client){
       throw createGraphQLError('Redis client is not connected', 500)
    }
    return client
}