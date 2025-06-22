export type generateParams = {
  size: string;
  withError: string;
  maxSpend: string;
};

export const ExtFileApi = {
  aggregateRows: async (data: FormData) => {
    return await fetch("http://localhost:3000/aggregate?rows=1000", {
      method: "POST",
      body: data,
    });
  },

  generateFile: async (
    params: generateParams = {
      size: "0.01",
      withError: "off",
      maxSpend: "1000",
    }
  ) => {
    return await fetch(
      `http://localhost:3000/report?${new URLSearchParams({
        ...params,
      }).toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "text/csv",
        },
      }
    );
  },
};
