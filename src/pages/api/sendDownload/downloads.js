import path from "path";
import fs from "fs";

export default async function handler(req, res) {
  const { file } = req.query;
  if (!file) return res.status(400).end("No file specified");

  const filePath = path.join(process.cwd(), "public", "pdfs", file);
  if (!fs.existsSync(filePath)) return res.status(404).end("File not found");

  res.setHeader("Content-Disposition", `attachment; filename="${file}"`);
  res.setHeader("Content-Type", "application/pdf");
  fs.createReadStream(filePath).pipe(res);
}
