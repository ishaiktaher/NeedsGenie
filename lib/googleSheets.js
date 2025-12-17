import { google } from "googleapis";

if (
  !process.env.GOOGLE_CLIENT_EMAIL ||
  !process.env.GOOGLE_PRIVATE_KEY
) {
  throw new Error("Missing Google Sheets credentials");
}

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const sheets = google.sheets({
  version: "v4",
  auth,
});

export const REQUIREMENT_SHEET_ID =
  process.env.GOOGLE_SHEET_ID_REQUIREMENT;

export const SPECIALIST_SHEET_ID =
  process.env.GOOGLE_SHEET_ID_SPECIALIST;
