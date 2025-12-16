export async function POST(req) {
  const { phone, otp } = await req.json();

  if (otp !== "1234") {
    return Response.json({
      success: false,
      message: "Invalid OTP. Use 1234 in MVP mode.",
    });
  }

  console.log("OTP VERIFIED for:", phone);

  return Response.json({
    success: true,
    phone,
    message: "OTP verified",
  });
}
