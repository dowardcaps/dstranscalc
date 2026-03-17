// api/seed.js
import { db } from '@vercel/postgres';

let services = [
  // DOCUMENT PRINTING
  { name: "Letter (B&W)", price: 5, group: "Printing" },
  { name: "A4 (B&W)", price: 5, group: "Printing" },
  { name: "Long (B&W)", price: 7, group: "Printing" },
  { name: "Back to back Add (B&W)", price: 2, group: "Printing" },
  { name: "Letter (Partial)", price: 7, group: "Printing" },
  { name: "A4 (Partial)", price: 7, group: "Printing" },
  { name: "Long (Partial)", price: 8, group: "Printing" },
  { name: "Back to back Add (Partial)", price: 5, group: "Printing" },
  { name: "Letter (Full Color)", price: 10, group: "Printing" },
  { name: "A4 (Full Color)", price: 10, group: "Printing" },
  { name: "Long (Full Color)", price: 15, group: "Printing" },
  { name: "Back to back Add (Full)", price: 5, group: "Printing" },

  // XEROX
  { name: "Letter (B&W)", price: 4, group: "Xerox" },
  { name: "A4 (B&W)", price: 4, group: "Xerox" },
  { name: "Long (B&W)", price: 5, group: "Xerox" },
  { name: "Back to back Add (B&W)", price: 2, group: "Xerox" },
  { name: "Letter (Partial)", price: 6, group: "Xerox" },
  { name: "A4 (Partial)", price: 6, group: "Xerox" },
  { name: "Long (Partial)", price: 7, group: "Xerox" },
  { name: "Back to back Add (Partial)", price: 5, group: "Xerox" },
  { name: "Letter (Full Color)", price: 9, group: "Xerox" },
  { name: "A4 (Full Color)", price: 9, group: "Xerox" },
  { name: "Long (Full Color)", price: 10, group: "Xerox" },
  { name: "Back to back Add (Full)", price: 5, group: "Xerox" },

  // RUSH ID PACKAGES
  { name: "P1 - 9pcs 1x1", price: 50, group: "Rush ID" },
  { name: "P2 - 9pcs 2x2", price: 50, group: "Rush ID" },
  { name: "P3 - 6pcs Passport", price: 50, group: "Rush ID" },
  { name: "P4 - 4pcs 2x2 & 6pcs 1x1", price: 60, group: "Rush ID" },
  { name: "P5 - 3pcs 2x2, Passport, 4pcs 1x1", price: 70, group: "Rush ID" },
  { name: "Add-on: Change Attire", price: 10, group: "Rush ID" },
  { name: "Add-on: Get Soft copy", price: 15, group: "Rush ID" },

  // PHOTO PRINT
  { name: "2R / Wallet Size", price: 15, group: "Photo" },
  { name: '3R (3.5" x 5")', price: 20, group: "Photo" },
  { name: '4R (4" x 6")', price: 30, group: "Photo" },
  { name: '5R (5" x 7")', price: 40, group: "Photo" },
  { name: '6R (6" x 8")', price: 50, group: "Photo" },
  { name: '8R (8" x 10")', price: 50, group: "Photo" },
  { name: "S8R / A4", price: 50, group: "Photo" },

  // LAMINATION
  { name: "Laminate: 2R / Wallet", price: 20, group: "Laminate" },
  { name: "Laminate: 3R", price: 30, group: "Laminate" },
  { name: "Laminate: 4R", price: 40, group: "Laminate" },
  { name: "Laminate: 5R", price: 50, group: "Laminate" },
  { name: "Laminate: 6R", price: 60, group: "Laminate" },
  { name: "Laminate: 8R", price: 60, group: "Laminate" },
  { name: "Laminate: S8R / A4", price: 60, group: "Laminate" },

  // SCAN & OTHERS
  { name: "Scan (Any size)", price: 15, group: "Scan" },
  { name: "Scan (15 pages up)", price: 10, group: "Scan" },
];

async function seedItems() {
  const client = await db.connect();

  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
  // FIX 1: Renamed column from 'group' to 'category'
  await client.sql`
    CREATE TABLE IF NOT EXISTS services (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price INTEGER NOT NULL,
      category VARCHAR(255) NOT NULL
    );
  `;

  // Optional: Clear old data to prevent duplicates
  await client.sql`DELETE FROM services;`;

  const insertedItems = await Promise.all(
    services.map((service) =>
      // FIX 2: Correctly mapping service.group (JS) to category (DB)
      client.sql`
        INSERT INTO services (name, price, category)
        VALUES (${service.name}, ${service.price}, ${service.group})
      `
    )
  );

  return insertedItems;
}

export async function GET() {
  try {
    const result = await seedItems();
    return Response.json({ message: "Database seeded successfully", count: result.length });
  } catch (error) {
    console.error("Error seeding database:", error);
    // Returning error.message gives you the actual text of the SQL error
    return Response.json({ error: error.message }, { status: 500 });
  }
}