export interface ServiceResponseObj {
  service: Service;
}
export interface Service {
  billable: boolean;
  created_at: string;
  hourly_rate: null | number;
  id: number;
  name: string;
  note: string;
  updated_at: string;
  archived: boolean;
}