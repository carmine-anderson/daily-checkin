// netlify/functions/getCheckins.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async () => {
  const { data, error } = await supabase
    .from("checkins")
    .select("*")
    // .order("created_at", { ascending: false });
    console.log("Fetched check-ins:", data);


  if (error) {
    return new Response("Failed to fetch checkins: " + error.message, {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
};
