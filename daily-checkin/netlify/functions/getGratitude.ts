import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.GRATITUDE_SUPABASE_URL!, process.env.GRATITUDE_SUPABASE_ANON_KEY!);

export const handler = async () => {
  const { data, error } = await supabase
    .from('gratitude_entries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return {
      statusCode: 500,
      body: `Supabase error: ${error.message}`,
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};
