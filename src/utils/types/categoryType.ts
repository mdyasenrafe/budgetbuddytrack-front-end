export interface IncomeType {
  _id?: string;
  label: string;
  value: string;
  type: string;
}

export interface CategoryApiResponseType {
  data: IncomeType[];
}

export interface CategoryType {
  income: IncomeType[] | null;
  expense: IncomeType[] | null;
}
