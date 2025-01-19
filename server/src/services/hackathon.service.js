import instance from "../config/axios.js";
import { getHackathonConfig } from "../utils/utils.js";

const getHackathon = async (request, reply) => {
  try {
    const hitsConfig = getHackathonConfig(0);
    const hitsResponse = await instance.post(`/hackathons`, hitsConfig);

    const hits = hitsResponse.data.hits.total.value;
    console.log(`Total hackathons fetched: ${hits}`);

    const randomHit = Math.floor(Math.random() * (hits + 1));
    console.log(`Random Hit: ${randomHit}`);

    const hackathonConfig = getHackathonConfig(randomHit);
    const hackathonResponse = await instance.post(
      `/hackathons`,
      hackathonConfig
    );

    const slug = await hackathonResponse.data.hits.hits[0]._source.slug;
    console.log(`Fetched hackathon slug: ${slug}`);

    return slug;
  } catch (error) {
    console.log(error);
    throw {
      statusCode: 404,
      message: "Could not get hackathon",
    };
  }
};

export { getHackathon };
