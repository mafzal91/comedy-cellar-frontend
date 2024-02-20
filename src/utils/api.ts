const { VITE_API_URL } = import.meta.env;

const withFetchErrorHandling = (fetchFunction) => {
  return async (...args) => {
    try {
      const response = await fetchFunction(...args);
      if (!response.ok && response.status >= 500) {
        console.log(response.ok);
        throw new Error(`Server Error`);
        // if (response.status >= 400) {
        //   const responseData = await response.json();
        //   console.log(responseData);
        //   throw new Error(`Client Error`);
        // }
      }
      return await response.json();
    } catch (error) {
      console.error("Error in fetch operation:", error);
      throw error;
    }
  };
};

const customFetch = withFetchErrorHandling(fetch);

export const fetchShows = async ({ date }: { date: string }) => {
  const res = await customFetch(`${VITE_API_URL}/api/shows?date=${date}`);

  return res;
};

export const fetchLineUp = async ({ date }: { date: string }) => {
  try {
    const res = await customFetch(`${VITE_API_URL}/api/line-up?date=${date}`);

    return res;
  } catch (error) {
    return {
      date: "",
      lineUps: [],
    };
  }
};

export const fetchShowByTimestamp = async ({
  timestamp,
}: {
  timestamp: string;
}) => {
  const res = await customFetch(`${VITE_API_URL}/api/shows/${timestamp}`);

  return res;
};

export const createReservation = async ({
  guest: { email, firstName, lastName, size, phone, howHeard, smsOk },
  showId,
  timestamp,
}) => {
  const res = await customFetch(
    `${VITE_API_URL}/api/reservation/${timestamp}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guest: {
          email,
          firstName,
          lastName,
          size,
          phone,
          howHeard,
          smsOk,
        },
        showId,
      }),
    }
  );
  return res;
};
