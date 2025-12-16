export async function POST(req) {
  const { phone } = await req.json();

  console.log("SEND OTP Requested for:", phone);
  console.log("DEBUG OTP: 1234");

  return Response.json({
    success: true,
    message: "OTP sent successfully (MVP mode)",
    otp: "1234", // debug only, not used for validation
  });
}
