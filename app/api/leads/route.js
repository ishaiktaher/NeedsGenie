import fs from "fs";
import path from "path";

const leadsPath = path.join(process.cwd(), "mock/leads.json");

export async function GET() {
  const leads = JSON.parse(fs.readFileSync(leadsPath, "utf8"));
  return Response.json({ leads });
}