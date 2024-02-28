export interface IncomeType {
  key: string;
  value: string;
  type: string;
}

export interface CategoryType {
  income: IncomeType | null;
  expense: IncomeType | null;
}
