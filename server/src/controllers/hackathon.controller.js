import { handleGetHackathon } from "../services/hackathon.service.js";

const getHackathon = async (request, reply) => {
  const slug = await handleGetHackathon();
  reply.status(200).send({
    success: true,
    data: slug,
  });
};

export { getHackathon };
