const { VITE_API_URL } = import.meta.env;

export const fetchShowDetails = async ({ date }: { date: string }) => {
  const res = await fetch(`${VITE_API_URL}/api/details?date=${date}`);

  const response = await res.json();

  return response;
};
