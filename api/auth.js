export default async function handler(request, response) {
  const authHeader = request.headers['x-admin-password'];

  if (authHeader === process.env.ADMIN_PASSWORD) {
    return response.status(200).json({ success: true });
  } else {
    return response.status(401).json({ success: false, error: "Incorrect Password" });
  }
}