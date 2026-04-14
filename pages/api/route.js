export async function POST(req) {
  const { prompt } = await req.json();

  return new Response(
    JSON.stringify({
      result: "Aivora 🚀: " + prompt,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
