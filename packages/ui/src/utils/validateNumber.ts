export default function validateNumber(num: number, min: number, max: number, clear = false) {
  if (isNaN(num) && !clear) return `${min}`;
  if (clear && !num) return '';

  const precision = Math.max(
    (min.toString().split(".")[1]?.length || 0),
    (max.toString().split(".")[1]?.length || 0)
  );

  const factor = Math.pow(10, precision);
  num = Math.round(num * factor) / factor;

  num = Math.min(Math.max(num, min), max);
  return `${num.toFixed(precision)}`;
}