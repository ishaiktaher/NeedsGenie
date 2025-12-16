export async function POST(req) {
  const { leadId } = await req.json();
  return Response.json({
    success: true,
    phone: "9876543210"
  });
}