import { decode } from 'he';
/**
 * Format integer with suffix
 *
 * @example console.log(formatNumber(1000)) //1k
 * @param n positive integer
 * @returns formatted string
 */
const formatNumberSuffix = (n: number): string => {
  if (n < 0) {
    throw new Error("number must be positive")
  }
  if (n < 1e3) {
    return n + '';
  }
  if (n >= 1e3 && n < 1e6) {
    return +(n / 1e3).toFixed(1) + "k";
  }
  if (n >= 1e6 && n < 1e9) {
    return +(n / 1e6).toFixed(1) + "m";
  }
}

const decodeHtmlEntities = (s: string): string => {
  return decode(s);
}


export { formatNumberSuffix, decodeHtmlEntities };