import { createClient } from "redis";

let client = null;

export async function initializeRedisClient() {
  if (!client) {
    client = createClient();
    client.on("error", (error) => {
      console.error(error);
    });
    client.on("connect", () => {
      console.log("Redis connected");
    });
    await client.connect();
  }
  return client;
}

export const redis = await initializeRedisClient();
export const redisKey = "swipio";
export const threshold = 10;
export const refillCount = 25;
