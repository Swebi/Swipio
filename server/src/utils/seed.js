import { handleGetProject } from "../services/project.service.js";
import { redis, redisKey } from "../config/client.js";

let SEEDING = false;

export const seed = async (refillCount) => {
  if (SEEDING) {
    console.log("Seeding in progress, skipping");
    return;
  }

  console.log("Seeding Projects: ", refillCount);

  SEEDING = true;
  let projectsArray = [];

  for (let i = 0; i < refillCount; i++) {
    // await new Promise((res) => setTimeout(res, 2000)); no timeout for now, maybe if rate limited in the future
    const project = await handleGetProject();
    projectsArray.push(project);
  }

  await redis.rPush(
    redisKey,
    projectsArray.map((p) => JSON.stringify(p))
  );
  console.log(`Added ${projectsArray.length} to cache`);
  SEEDING = false;
};
