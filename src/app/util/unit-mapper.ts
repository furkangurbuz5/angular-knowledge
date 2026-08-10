export const UnitOptions = ['g', 'ml', 'amount'] as const;
export type UnitOption = (typeof UnitOptions)[number];

const unitIdByOption: Record<UnitOption, number> = {
  ml: 1,
  g: 2,
  amount: 3,
};

const optionByUnitId: Record<number, UnitOption> = {
  1: 'ml',
  2: 'g',
  3: 'amount',
};

export function mapOptionToUnitId(option: UnitOption): number {
  return unitIdByOption[option];
}

export function mapUnitIdToOption(unitId: number): UnitOption {
  const option = optionByUnitId[unitId];
  if (!option) throw new Error(`Unknown unitId: ${unitId}`);
  return option;
}
