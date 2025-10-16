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

    if (!res.ok) {
      throw new Error(`Backend API failed with status: ${res.status}`);
    }

    const data = await res.json();

    // Data cleaning: Correct city names before sending to frontend
    if (data.TABLE_DATA && data.TABLE_DATA.data) {
      data.TABLE_DATA.data = data.TABLE_DATA.data.map((row: string[]) => {
        // Correct "Sidney" to "Sydney"
        if (row[2] === "Sidney") {
          row[2] = "Sydney";
        }
        return row;
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
