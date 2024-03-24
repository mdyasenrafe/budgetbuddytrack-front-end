export interface BudgetCreationRequest {
  userId: string;
  category: string;
  limit: number;
}
export interface BudgetCreationResponse {
  _id: string;
  id: string;
  category: string;
  limit: number;
  createdAt: Date;
  __v: number;
  isOverLimit: boolean;
  userId: string;
  spent: number;
}
export interface BudgetDetailsResponse {
  data: BudgetCreationResponse[];
  error: boolean;
  message: string;
}
export interface BudgetState {
  budgetList: BudgetCreationResponse[];
}
