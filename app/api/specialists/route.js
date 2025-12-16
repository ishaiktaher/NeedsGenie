import fs from "fs";
import path from "path";

const specialistsPath = path.join(process.cwd(), "mock/specialists.json");

export async function POST(req) {
  const body = await req.json();
  const data = JSON.parse(fs.readFileSync(specialistsPath, "utf8"));

  const newSpecialist = { id: data.length + 1, ...body, verified: false };
  data.push(newSpecialist);

  fs.writeFileSync(specialistsPath, JSON.stringify(data, null, 2));

  return Response.json({ success: true, specialist: newSpecialist });
}