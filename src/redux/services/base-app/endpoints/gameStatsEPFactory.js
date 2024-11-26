export const fetchGameStats = (builder) =>
  builder.query({
    query: () => ({
      url: "game-stats",
      method: "GET",
    }),
  });

export const updateGameStats = (builder) =>
  builder.mutation({
    query: (winner) => ({
      url: "game-stats/update",
      method: "POST",
      body: { winner },
    }),
  });