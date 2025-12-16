import { sheets, SPECIALIST_SHEET_ID } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

const RANGE = "Form Responses 1!A:J"; // 10 columns

export async function POST(req) {
  try {
    const body = await req.json();

    const timestamp = new Date().toLocaleString("en-IN");

    const row = [
      timestamp,                  // A: Timestamp
      body.fullName || "",        // B
      body.mobile || "",          // C
      body.whatsapp || "",        // D
      body.city || "",            // E
      body.localities || "",      // F
      body.industries || "",      // G
      body.languages || "",       // H
      body.payPerLead || "",      // I
      body.bestTime || "",        // J
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPECIALIST_SHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SPECIALIST_REGISTER_ERROR:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
