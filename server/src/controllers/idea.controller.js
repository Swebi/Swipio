import { handleGetIdea } from "../services/idea.service.js";

const getIdea = async (request, reply) => {
  const idea = await handleGetIdea();
  reply.status(200).send({
    success: true,
    data: idea,
  });
};

export { getIdea };
