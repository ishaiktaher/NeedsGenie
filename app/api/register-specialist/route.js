import { sheets, SPECIALIST_SHEET_ID } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

const RANGE = "Form Responses 1!A:K"; // Updated to match columns

export async function POST(req) {
  try {
    const body = await req.json();

    const timestamp = new Date().toLocaleString("en-IN");

    // ✅ Normalize array fields for Google Sheets
    const cities =
      Array.isArray(body.city) ? body.city.join(", ") : body.city || "";

    const localities =
      Array.isArray(body.localities)
        ? body.localities.join(", ")
        : body.localities || "";

    const languages =
      Array.isArray(body.languages)
        ? body.languages.join(", ")
        : body.languages || "";
    
    const industries =
      Array.isArray(body.industries)
        ? body.industries.join(", ")
        : body.industries || "";

    const row = [
      timestamp,                // A: Timestamp
      body.fullName || "",      // B
      body.mobile || "",        // C
      body.whatsapp || "",      // D
      body.state || "",         // E
      cities,                   // F: Cities (comma-separated)
      localities,               // G: Localities (comma-separated)
      industries,               // H: Industries (comma-separated)
      languages,                // I: Languages (comma-separated)
      body.payPerLead || "",    // J
      body.bestTime || "",      // K
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPECIALIST_SHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SPECIALIST_REGISTER_ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
