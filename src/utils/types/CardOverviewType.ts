export interface CardApiResponse {
  data: CardDetails;
  error: boolean;
}

export interface CardState {
  details: CardDetails | null;
  isLoading: boolean;
}

export interface CardDetails {
  _id?: string;
  userId: string;
  totalBalance: string;
  totalIncome: string;
  totalExpense: string;
}
