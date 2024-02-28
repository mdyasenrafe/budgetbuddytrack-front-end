export interface CategoryItem {
  _id?: string;
  label: string;
  value: string;
  type: "income" | "expense";
}

export interface CategoryResponse {
  data: CategoryItem[];
}

export interface CategoryState {
  incomeCategories: CategoryItem[] | null;
  expenseCategories: CategoryItem[] | null;
}
