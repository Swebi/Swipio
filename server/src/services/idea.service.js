import { redis, redisKey, refillCount, threshold } from "../config/client.js";
import { seed } from "../utils/seed.js";
import { handleGetProject } from "./project.service.js";

const handleGetIdea = async (request, reply) => {
  try {
    const cacheLength = await redis.lLen(redisKey);
    if (cacheLength <= threshold) {
      console.log("Cache size smaller than threshold, seeding");
      seed(refillCount);
    }

    let project;
    const rawProject = await redis.lPop(redisKey);

    if (!rawProject) {
      console.log("Cache empty fetching from API");

      project = await handleGetProject(); // fetch from api
    } else {
      // console.log("Returning from cache");
      project = JSON.parse(rawProject); // redis
    }

    return project;
  } catch (error) {
    console.log(error);
    throw {
      statusCode: 404,
      message: "Could not get idea",
    };
  }
};

export { handleGetIdea };
