import { getIdea } from "../controllers/idea.controller.js";

const ideaRouter = async (fastify) => {
  fastify.get("/", getIdea);
};

export { ideaRouter };
