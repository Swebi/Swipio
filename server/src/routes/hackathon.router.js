import { getHackathon } from "../controllers/hackathon.controller.js";

const hackathonRouter = async (fastify) => {
  fastify.get("/", getHackathon);
};

export { hackathonRouter };
