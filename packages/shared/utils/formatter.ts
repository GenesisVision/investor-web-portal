import moment from "moment";
import {
  DEFAULT_DECIMAL_SCALE,
  TUnitName,
  timeUnits
} from "shared/constants/constants";

import { CURRENCY_FRACTIONS, checkCurrencyValue } from "./currency-converter";

const reverseString = (value: string | number): string =>
  String(value)
    .split("")
    .reverse()
    .join("");

const addOne = (item: string[]): string[] =>
  item[1]
    ? [item[0], +item[1] === 0 ? item[1].slice(0, -1) + "1" : item[1]]
    : item;

const cleanNulls = (item: string[]): string[] =>
  item[1] ? [item[0], reverseString(+reverseString(item[1]))] : item;

const sliceFraction = (decimalScale?: number) => (item: string[]): string[] => {
  if (decimalScale === 0) return [item[0]];
  if (decimalScale && decimalScale > 0)
    return [item[0], item[1].slice(0, decimalScale)];
  if (+item[0] < 10) return [item[0], item[1].slice(0, 8)];
  if (+item[0] < 100) return [item[0], item[1].slice(0, 6)];
  if (+item[0] < 1000) return [item[0], item[1].slice(0, 4)];
  if (+item[0] >= 1000) return [item[0], item[1].slice(0, 2)];
  return item;
};

const checkEmptyFraction = (item: string[]): string =>
  item[1] ? item.join(".") : item[0];

const formatValue = (
  value: any,
  decimalScale?: number,
  abs?: boolean
): string => {
  value = typeof value !== "number" ? +value : value;
  value = abs ? Math.abs(value) : value;
  if (value === undefined || isNaN(value) || value.toFixed(0) == value)
    return String(value);

  return [...[value.toFixed(10).split(".")]]
    .map(sliceFraction(decimalScale))
    .map(addOne)
    .map(cleanNulls)
    .map(checkEmptyFraction)
    .join();
};

const formatPercent = (value: number): string => {
  if (value < 0.1 && value > -0.1) return "0";
  return formatValue(value, value > 1 || value < -1 ? 0 : 1);
};

const roundPercents = (value: number): string => {
  const abs = Math.abs(value);
  const newValue = value === 0 ? 0 : formatValue(Math.max(abs, 0.01), 2);
  return `${value < 0.01 && value > 0 ? "<" : ""}${newValue}%`; // TODO put a percent sign
};

const validateFraction = (value: string, currency: string): boolean => {
  const fraction = value.split(".")[1];
  return fraction ? fraction.length <= CURRENCY_FRACTIONS(currency) : true;
};

const formatCurrencyValue = (value: number, currency: string): string =>
  formatValue(
    checkCurrencyValue(value, currency),
    CURRENCY_FRACTIONS(currency)
  );

const formatValueDifferentDecimalScale = (
  value: number,
  decimalScaleSmallValue: number,
  decimalScaleBigValue: number
): string => {
  if (value < 1 && value > -1)
    return formatValue(value, decimalScaleSmallValue);
  return formatValue(value, decimalScaleBigValue);
};

const formatValueWithMin = (
  value: any,
  decimalScale: number = DEFAULT_DECIMAL_SCALE
): string =>
  Math.abs(value) < 1 / 10 ** decimalScale
    ? `<0.${"0".repeat(decimalScale - 1)}1`
    : formatValue(value, decimalScale);

const humanizeDate = (date: number | string): string => {
  const duration = moment.duration(date);
  const thisTimeUnits = { ...timeUnits };
  for (const unitName in thisTimeUnits) {
    const dur = duration[unitName as TUnitName]();
    thisTimeUnits[unitName as TUnitName] = dur;
    duration.subtract(moment.duration(dur, unitName as TUnitName));
  }
  return Object.entries(thisTimeUnits)
    .map(([name, value]) => [name, Math.floor(value)])
    .filter(([name, value]) => value > 0)
    .filter((unit, i) => i < 2)
    .reduce((prev, [name, value]) => `${prev} ${value} ${name} `, "");
};

export {
  humanizeDate,
  formatValueWithMin,
  reverseString,
  addOne,
  cleanNulls,
  sliceFraction,
  checkEmptyFraction,
  formatValue,
  formatPercent,
  validateFraction,
  formatCurrencyValue,
  roundPercents,
  formatValueDifferentDecimalScale
};
