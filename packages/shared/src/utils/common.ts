export const clearUrl = (url: string) => {
  const parsed = new URL(url);
  parsed.search = "";
  parsed.hash = "";
  return parsed.toString();
};

export const removeProtocolsFromUrl = (url: string) =>
  url.replace(/^(https?:\/\/)?(www\.)?/, "");
