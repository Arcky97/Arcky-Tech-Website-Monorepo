
export const getColorByPercentage = (value1: number, value2: number, threshold: { yellow: number, orange: number}) => {
  const growth = calculatePercentage(value1, value2);
  const { yellow, orange } = threshold || { yellow: 15, orange: 25 };

  console.log(growth);

  if (growth >= 0) {
    return "text-green-500";
  } else if (growth > yellow) {
    return "text-yellow-500";
  } else if (growth > orange) {
    return "text-orange-500";
  } else {
    return "text-red-500"
  }
};

const calculatePercentage = (value1: number, value2: number) => {
  if (value2 === 0) return value1 > 0 ? 100 : 0;

  return Math.round(((value1 - value2) / value2) * 100);
};