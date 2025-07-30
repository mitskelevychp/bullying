import { google } from "googleapis";

type Article = {
  slug: string;
  title: string;
  description: string;
};

const rawKey = process.env.GOOGLE_PRIVATE_KEY || "";

const formattedKey = rawKey.startsWith("-----BEGIN")
  ? rawKey
  : rawKey.replace(/\\n/g, "\n");

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: formattedKey,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

export async function getArticlesFromSheet(): Promise<Article[]> {
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: process.env.SHEET_RANGE,
  });

  const rows = res.data.values;

  if (!rows || rows.length < 2) return [];

  const [header, ...data] = rows;

  const articles: Article[] = data.map((row) => {
    const obj: Record<string, string> = {};
    header.forEach((key, i) => {
      obj[key] = row[i];
    });
    return obj as Article;
  });

  return articles;
}
