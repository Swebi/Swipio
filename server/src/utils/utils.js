export const getProjectConfig = (from, slug) => {
  return {
    hackathon_slugs: [slug],
    q: "",
    filter: "all",
    prizes: [],
    prize_tracks: [],
    hashtags: [],
    tracks: [],
    category: [],
    from: from,
    size: 1,
  };
};

export const getHackathonConfig = (from) => {
  return {
    type: "past",
    from: from,
    size: 1,
  };
};

export const formatProject = (source) => {
  const slug = source.slug;
  const name = source.name || "N/A";
  const tagline = source.tagline || "N/A";
  const tags = source.hashtags?.map((hashtag) => hashtag.name);

  const problem =
    source.description.find(
      (section) => section.title === "The problem it solves"
    )?.content || "N/A";

  const challenges =
    source.description.find(
      (section) => section.title === "Challenges we ran into"
    )?.content || "N/A";

  const github =
    source.links
      .split(",")
      .find((link) => link.startsWith("https://github.com")) || "N/A";

  const prizes =
    source.prizes.map((prize) => ({
      name: prize.name,
      desc: prize.desc,
    })) || [];

  return {
    slug,
    name,
    tagline,
    tags,
    problem,
    challenges,
    github,
    prizes,
  };
};
