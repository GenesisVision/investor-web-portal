import GVColors from "components/gv-styles/gv-colors";

export const getStrokeColor = (data: number[]): string => {
  const dataMax = data[data.length - 1];
  const dataMin = data[0];

  return getChartColor(dataMin, dataMax);
};

export const getChartColor = (minValue: number, maxValue: number) => {
  return maxValue - minValue >= 0
    ? GVColors.$positiveColor
    : GVColors.$negativeColor;
};
