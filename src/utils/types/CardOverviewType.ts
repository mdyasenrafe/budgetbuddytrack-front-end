export interface CardResponse {
  data: CardType;
  error: boolean;
}

export interface CardState {
  data: CardType | null;
  isLoading: boolean;
}

export interface CardType {
  _id?: string;
  userId: string;
  totalBalance: string;
  totalIncome: string;
  totalExpense: string;
}
