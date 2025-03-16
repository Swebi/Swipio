import instance from "../config/axios.js";
import { formatProject, getProjectConfig } from "../utils/utils.js";
import { handleGetHackathon } from "./hackathon.service.js";

const handleGetProject = async (request, reply, retryCount = 0) => {
  try {
    const slug = await handleGetHackathon();
    console.log(`Fetching projects for ${slug}`);

    const hitsConfig = getProjectConfig(0, slug);
    const hitsResponse = await instance.post(`/projects`, hitsConfig);

    const hits = hitsResponse.data.hits.total.value;
    console.log(`Total projects fetched: ${hits}`);

    if (hits === 0) {
      console.log("0 Projects fetched");

      retryCount++;

      if (retryCount < 10) {
        return await handleGetProject(request, reply, retryCount + 1);
      }

      throw {
        statusCode: 404,
        message: "No projects found",
      };
    }

    const randomHit = Math.floor(Math.random() * hits);
    console.log(`Random Hit: ${randomHit}`);

    const projectConfig = getProjectConfig(randomHit, slug);
    const projectResponse = await instance.post(`/projects`, projectConfig);

    const source = await projectResponse.data.hits.hits[0]._source;

    const project = formatProject(source);

    return project;
  } catch (error) {
    console.log(error);
    throw {
      statusCode: 404,
      message: "Could not get project",
    };
  }
};

export { handleGetProject };
