export const validateFileExist = async (file: string): Promise<boolean> => {
  try {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Proxy público para desarrollo
    const response = await fetch(proxyUrl + file, { method: "GET" });

    if (response.status === 200) {
      const contentType = response.headers.get("Content-Type");
      if (contentType?.startsWith("image/")) {
        return true;
      }
    }

    return false;
  } catch (e) {
    return false;
  }
};
