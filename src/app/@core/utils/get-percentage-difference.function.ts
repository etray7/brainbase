const getPercentageIfCurrentValueBiggerIntial = (
  currentValue: number,
  initial: number
): number => {
  return ((currentValue - initial) / initial) * 100;
};

const getPercentageIfCurrentValueLowerIntial = (
  currentValue: number,
  initial: number
): number => {
  return ((initial - currentValue) / initial) * 100;
};

export function getPercantageDifferenceByFormula(
  currentValue: number,
  initial: number
): number {
  return currentValue > initial
    ? getPercentageIfCurrentValueBiggerIntial(currentValue, initial)
    : getPercentageIfCurrentValueLowerIntial(currentValue, initial);
}
