import dotenv from "dotenv";
import Fastify from "fastify";
import { hackathonRouter } from "./routes/hackathon.router.js";
import { projectRouter } from "./routes/project.router.js";
import { ideaRouter } from "./routes/idea.router.js";
import { seed } from "./utils/seed.js";
import cors from "@fastify/cors";

dotenv.config();

const fastify = Fastify({});
await fastify.register(cors, {});
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
fastify.register(ideaRouter, { prefix: "/api/idea" });

seed(50);

fastify.listen({ port: process.env.PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
