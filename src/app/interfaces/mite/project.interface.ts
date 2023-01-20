export interface ProjectResponseObj {
  project: Project
}
export interface Project {
  budget: number;
  budget_type: BudgetTypeEnum;
  created_at: string;
  customer_id: number;
  hourly_rate: number;
  id: number;
  name: string;
  note: string;
  updated_at: string;
  archived: boolean;
  active_hourly_rate: null | number;
  hourly_rates_per_service: any[];
  customer_name: string;
}

export enum BudgetTypeEnum {
  MINUTES = "minutes"
}