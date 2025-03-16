import { redis, redisKey, refillCount, threshold } from "../config/client.js";
import { seed } from "../utils/seed.js";
import { handleGetProject } from "./project.service.js";

const handleGetIdea = async (request, reply) => {
  try {
    const queueLength = await redis.lLen(redisKey);
    if (queueLength <= threshold) {
      seed(refillCount);
    }

    let project;
    const rawProject = await redis.lPop(redisKey);

    if (!rawProject) {
      project = await handleGetProject(); // fetch from api
    } else {
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
