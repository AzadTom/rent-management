export const getAllQuestions = (): string[] => {
  const list: string[] = [
    "Please tell me Unique Serial no.?",
    "Tell me about payment?",
    "What's rent?",
    "what's water Bill",
    "What's previos month bijli unit?",
    "What's current month bijli unit?",
    "What's bijli unit price?",
    "Tell me about due rent?",
  ];

  return list;
};

export const getMonthandYear = () => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return {
    month: month,
    year: year,
  };
};
