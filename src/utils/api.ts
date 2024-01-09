export const fetchShowDetails = async ({ date }: { date: string }) => {
  const res = await fetch(
    `https://ua7yysa65h.execute-api.us-east-1.amazonaws.com/api/details?date=${date}`
  );

  const response = await res.json();

  return response;
};
