import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, role } = await req.json();

  const token = jwt.sign(
    { email: email, role: role },
    process.env.AUTH_SECRET,
    { expiresIn: "1d" }
  );

  return Response.json({ token });
}
