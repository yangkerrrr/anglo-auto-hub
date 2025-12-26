import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const databaseUrl = Deno.env.get('NEON_DATABASE_URL');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!databaseUrl) {
    console.error('NEON_DATABASE_URL not configured');
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const pool = new Pool(databaseUrl, 3, true);

  try {
    const url = new URL(req.url);
    const method = req.method;
    
    console.log(`${method} request to ${url.pathname}`);

    const connection = await pool.connect();

    try {
      // GET all cars or single car
      if (method === 'GET') {
        const id = url.searchParams.get('id');
        
        if (id) {
          const result = await connection.queryObject`
            SELECT * FROM cars WHERE id = ${id}
          `;
          
          if (result.rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Car not found' }), {
              status: 404,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
          
          return new Response(JSON.stringify(result.rows[0]), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        const result = await connection.queryObject`
          SELECT * FROM cars ORDER BY created_at DESC
        `;
        
        console.log(`Found ${result.rows.length} cars`);
        
        return new Response(JSON.stringify(result.rows), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // POST - Create new car
      if (method === 'POST') {
        const body = await req.json();
        console.log('Creating car:', body);
        
        const result = await connection.queryObject`
          INSERT INTO cars (
            title, make, model, year, price, mileage, image_url, 
            fuel_type, transmission, body_type, color, description, features, sold
          ) VALUES (
            ${body.title}, ${body.make}, ${body.model}, ${body.year}, ${body.price}, 
            ${body.mileage}, ${body.imageUrl}, ${body.fuelType}, ${body.transmission}, 
            ${body.bodyType}, ${body.color}, ${body.description}, ${JSON.stringify(body.features)}, 
            ${body.sold || false}
          )
          RETURNING *
        `;
        
        console.log('Created car:', result.rows[0]);
        
        return new Response(JSON.stringify(result.rows[0]), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // PUT - Update car
      if (method === 'PUT') {
        const body = await req.json();
        const id = url.searchParams.get('id');
        
        if (!id) {
          return new Response(JSON.stringify({ error: 'Car ID required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        console.log('Updating car:', id, body);
        
        const result = await connection.queryObject`
          UPDATE cars SET
            title = ${body.title},
            make = ${body.make},
            model = ${body.model},
            year = ${body.year},
            price = ${body.price},
            mileage = ${body.mileage},
            image_url = ${body.imageUrl},
            fuel_type = ${body.fuelType},
            transmission = ${body.transmission},
            body_type = ${body.bodyType},
            color = ${body.color},
            description = ${body.description},
            features = ${JSON.stringify(body.features)},
            sold = ${body.sold}
          WHERE id = ${id}
          RETURNING *
        `;
        
        if (result.rows.length === 0) {
          return new Response(JSON.stringify({ error: 'Car not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        console.log('Updated car:', result.rows[0]);
        
        return new Response(JSON.stringify(result.rows[0]), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // DELETE - Remove car
      if (method === 'DELETE') {
        const id = url.searchParams.get('id');
        
        if (!id) {
          return new Response(JSON.stringify({ error: 'Car ID required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        console.log('Deleting car:', id);
        
        const result = await connection.queryObject`
          DELETE FROM cars WHERE id = ${id} RETURNING id
        `;
        
        if (result.rows.length === 0) {
          return new Response(JSON.stringify({ error: 'Car not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        console.log('Deleted car:', id);
        
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in cars function:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } finally {
    await pool.end();
  }
});
