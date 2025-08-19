import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.GRATITUDE_SUPABASE_URL!, process.env.GRATITUDE_SUPABASE_ANON_KEY!);

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { message } = JSON.parse(event.body || '{}');

  const { error } = await supabase.from('gratitude_entries').insert([{ message }]);

  if (error) {
    return {
      statusCode: 500,
      body: `Supabase error: ${error.message}`,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
