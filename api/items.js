import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  const client = await db.connect();

  try {
    if (request.method === 'GET') {
      // Use 'category' to match your new table schema
      const { rows } = await client.sql`SELECT * FROM services ORDER BY category ASC, name ASC;`;
      return response.status(200).json(rows);
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
}