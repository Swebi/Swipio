import instance from "../config/axios.js";
import { getConfig } from "../utils/config.js";
import { getHackathon } from "./hackathon.service.js";

const getProject = async (request, reply) => {
  try {
    const slug = await getHackathon();
    console.log(slug);
    const hitsConfig = getConfig(0, slug);
    console.log(hitsConfig);

    const hitsResponse = await instance.post(`/projects`, hitsConfig);

    const hits = hitsResponse.data.hits.total.value;

    if (hits === 0) {
      console.log("0 PROJS");
      throw {
        statusCode: 404,
        message: "Could not get project",
      };
    }

    console.log(hits);

    const randomHit = Math.floor(Math.random() * (hits + 1));
    console.log(randomHit);

    const projectConfig = getConfig(randomHit, slug);

    console.log(projectConfig);

    const response = await instance.post(`/projects`, projectConfig);

    const randomInt = Math.floor(Math.random() * (10 + 1));

    console.log(randomInt);

    const data = await response.data.hits.hits[randomInt]._source;

    // console.log(data);

    return data;
  } catch (error) {
    console.log(error.message);
    throw {
      statusCode: 404,
      message: "Could not get project",
    };
  }
};

export { getProject };
