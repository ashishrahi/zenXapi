
export function decodeCursor(cursor?: string) {
  if (!cursor) return null;
  try {
    const decoded = Buffer.from(cursor, "base64").toString("utf-8");
    const [createdAtIso, id] = decoded.split("::");
    return { createdAt: new Date(createdAtIso), id };
  } catch (error) {
    return null;
  }
}