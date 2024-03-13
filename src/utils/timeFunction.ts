export const getMonthName = () => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  return month;
};
