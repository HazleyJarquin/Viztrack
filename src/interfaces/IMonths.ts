export interface IMonths {
  id: number;
  month: string;
  monthName: string;
  income: number;
  expenses: number;
  available: number;
  user_email: string;
}

export interface IMonthsCatalog {
  id: number;
  month: string;
  monthName: string;
}

export interface IAvailableMonths {
  availableMonths: AvailableMonth[];
}

export interface AvailableMonth {
  month: string;
  monthName: string;
}
