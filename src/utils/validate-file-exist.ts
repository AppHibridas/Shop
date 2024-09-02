export const validateFileExist = async (file: string): Promise<boolean> => {
  try {
    const response = await fetch(file, { method: "GET" });

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
