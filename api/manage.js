import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  const client = await db.connect();
  const { method } = request;
  
  // SECURITY CHECK
  const authHeader = request.headers['x-admin-password'];
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return response.status(401).json({ error: "Unauthorized: Incorrect Password" });
  }

  try {
    if (method === 'POST') {
      const { name, price, category } = request.body;
      await client.sql`
        INSERT INTO services (name, price, category) 
        VALUES (${name}, ${price}, ${category});
      `;
      return response.status(201).json({ message: "Item added successfully" });
    }

    // UPDATED DELETE: Handles single ID or an array of IDs
    if (method === 'DELETE') {
      const { ids } = request.body; // Expecting { ids: ["uuid1", "uuid2"] }

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return response.status(400).json({ error: "No IDs provided for deletion" });
      }

      // Using ANY() with an array is the safest way to do bulk deletes in Vercel Postgres
      await client.sql`
        DELETE FROM services 
        WHERE id = ANY(${ids});
      `;
      
      return response.status(200).json({ message: `${ids.length} item(s) deleted` });
    }

    if (method === 'PUT') {
      const { id, name, price, category } = request.body;
      await client.sql`
        UPDATE services 
        SET name = ${name}, price = ${price}, category = ${category} 
        WHERE id = ${id};
      `;
      return response.status(200).json({ message: "Item updated" });
    }

  } catch (error) {
    return response.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
}