import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  // Use const for the client to avoid "Assignment to constant variable" on the server
  const client = await db.connect();

  try {
    if (request.method === 'GET') {
      // Ensure 'services' table exists and has 'category' and 'name' columns
      const { rows } = await client.sql`
        SELECT * FROM services 
        ORDER BY category ASC, name ASC;
      `;
      return response.status(200).json(rows);
    } else {
      return response.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    // This will send the actual SQL error back so you can see it in the Network tab
    console.error("Database Error:", error);
    return response.status(500).json({ error: error.message });
  } finally {
    // Always release the client to prevent "Too many connections" errors in Neon
    client.release();
  }
}