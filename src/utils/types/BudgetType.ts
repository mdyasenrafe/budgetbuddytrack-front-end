export interface CreateBudgetBodyType {
  userId: string;
  category: string;
  limit: number;
}
export interface CreateBudgetResponseType {
  _id: string;
  id: string;
  category: string;
  limit: number;
  createAt: Date;
  __v: number;
  isOverLimit: boolean;
  userId: string;
}

export interface GetBudgetByIdResponseType {
  data: CreateBudgetResponseType[];
  error: boolean;
  message: string;
}

export interface BudgetState {
  budgets: CreateBudgetResponseType[];
}
