export const getGender = (
  gender: "male" | "female" | "other" | null | undefined
): string => {
  if (gender === null || gender === undefined) {
    return "No especificado";
  }
  const genderMap: { [key in "male" | "female" | "other"]: string } = {
    male: "Masculino",
    female: "Femenino",
    other: "Otro",
  };
  return genderMap[gender];
};
