const { VITE_API_URL } = import.meta.env;

export const fetchShows = async ({ date }: { date: string }) => {
  const res = await fetch(`${VITE_API_URL}/api/shows?date=${date}`);

  const response = await res.json();

  return response;
};

export const fetchLineUp = async ({ date }: { date: string }) => {
  try {
    const res = await fetch(`${VITE_API_URL}/api/line-up?date=${date}`);

    const response = await res.json();

    return response;
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
  const res = await fetch(`${VITE_API_URL}/api/shows/${timestamp}`);

  const response = await res.json();

  return response;
};

export const createReservation = async ({
  email,
  firstName,
  lastName,
  size,
  phone,
  howHeard,
  smsOk,
  showId,
  date,
  settime,
}) => {
  const res = await fetch(`${VITE_API_URL}/api/reservation/api`, {
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
      date,
      settime,
    }),
  });

  const response = await res.json();

  return response;
};
