export const getConfig = (from, slug) => {
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
    size: 10,
  };
};
