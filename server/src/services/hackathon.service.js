import instance from "../config/axios.js";

const getHackathon = async (request, reply) => {
  try {
    const hitsResponse = await instance.post(`/hackathons`, {
      type: "past",
      from: 0,
      size: 10,
    });

    const hits = hitsResponse.data.hits.total.value;

    console.log("HACKATHON HITS", hits);

    const randomHit = Math.floor(Math.random() * (hits + 1));

    const response = await instance.post(`/hackathons`, {
      type: "past",
      from: randomHit,
      size: 10,
    });

    const randomInt = Math.floor(Math.random() * (10 + 1));

    const slug = await response.data.hits.hits[randomInt]._source.slug;

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
