import { getProject } from "../controllers/project.controller.js";

const projectRouter = async (fastify) => {
  fastify.get("/", getProject);
};

export { projectRouter };
