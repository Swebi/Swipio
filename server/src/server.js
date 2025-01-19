import Fastify from "fastify";
import dotenv from "dotenv";
import { getHackathon } from "./services/hackathon.service.js";
import { getProject } from "./services/project.service.js";

dotenv.config();

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(error.statusCode ?? 500).send({
    success: false,
    message: error.message ?? "Internal server error",
  });
});

fastify.get("/", (request, reply) => {
  reply.send({ hello: "" });
});

fastify.get("/hackathon", async (request, reply) => {
  const slug = await getHackathon();
  reply.status(200).send({
    success: true,
    data: slug,
  });
});

fastify.get("/project", async (request, reply) => {
  const project = await getProject();
  reply.status(200).send({
    success: true,
    data: project,
  });
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
