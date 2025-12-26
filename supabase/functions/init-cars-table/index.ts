import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const databaseUrl = Deno.env.get('NEON_DATABASE_URL');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!databaseUrl) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const pool = new Pool(databaseUrl, 3, true);

  try {
    const connection = await pool.connect();

    try {
      // Create the cars table if it doesn't exist
      await connection.queryObject`
        CREATE TABLE IF NOT EXISTS cars (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          make VARCHAR(100) NOT NULL,
          model VARCHAR(100) NOT NULL,
          year INTEGER NOT NULL,
          price DECIMAL(12, 2) NOT NULL,
          mileage INTEGER NOT NULL,
          image_url TEXT,
          fuel_type VARCHAR(50),
          transmission VARCHAR(50),
          body_type VARCHAR(50),
          color VARCHAR(50),
          description TEXT,
          features JSONB DEFAULT '[]',
          sold BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `;

      console.log('Cars table created/verified successfully');

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Cars table created/verified successfully' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error initializing cars table:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } finally {
    await pool.end();
  }
});
