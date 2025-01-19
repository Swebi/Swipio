import Fastify from "fastify";
import dotenv from "dotenv";
import { hackathonRouter } from "./routes/hackathon.router.js";
import { projectRouter } from "./routes/project.router.js";

dotenv.config();

const fastify = Fastify({});

fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(error.statusCode ?? 500).send({
    success: false,
    message: error.message ?? "Internal server error",
  });
});

fastify.get("/", (request, reply) => {
  reply.send("Hello World");
});

fastify.register(hackathonRouter, { prefix: "/api/hackathon" });
fastify.register(projectRouter, { prefix: "/api/project" });

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
