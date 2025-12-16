import { NextResponse } from "next/server";
import { sheets, REQUIREMENT_SHEET_ID } from "@/lib/googleSheets";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      category,
      city,
      localities,
      budget,
      details,
      phone
    } = body;

    const values = [
      [
        new Date().toISOString(),
        category,
        city,
        localities,
        budget,
        details,
        phone
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: REQUIREMENT_SHEET_ID,
      range: "Sheet1!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("GOOGLE-SHEET-ERROR:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
