import { handleGetProject } from "../services/project.service.js";

const getProject = async (request, reply) => {
  const project = await handleGetProject();
  reply.status(200).send({
    success: true,
    data: project,
  });
};

export { getProject };
