export const decodeHtmlEntities = (text: string) => {
  const element = document.createElement("div");
  if (text) {
    element.innerHTML = text;
    return element.textContent || element.innerText || "";
  }
  return "";
};
