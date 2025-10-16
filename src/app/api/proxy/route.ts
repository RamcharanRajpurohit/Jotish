// app/api/proxy/route.ts
export async function POST(req: Request) {
  try {
    // grab the JSON from the frontend
    const body = await req.json();

    // call the actual backend
    const res = await fetch("https://backend.jotish.in/backend_dev/gettabledata.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.text(); // PHP sometimes returns text
    return new Response(data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
