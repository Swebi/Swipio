import { handleGetProject } from "../services/project.service.js";
import { redis, redisKey } from "../config/client.js";

export const seed = async (refillCount) => {
  let projectsArray = [];
  for (let i = 0; i < refillCount; i++) {
    await new Promise((res) => setTimeout(res, 2000));
    const project = await handleGetProject();
    projectsArray.push(project);
  }

  await redis.rPush(
    redisKey,
    projectsArray.map((p) => JSON.stringify(p))
  );
  console.log(projectsArray.length);
};
