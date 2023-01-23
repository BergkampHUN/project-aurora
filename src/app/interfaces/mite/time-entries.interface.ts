import { TrackingTimeEntry } from './tracker.interface';

export interface TimeEntryResponseObj {
  time_entry: TimeEntry
}

export interface TimeEntry {
  id: number;
  minutes: number;
  date_at: string;
  note: string;
  billable: boolean;
  locked: boolean;
  revenue: null | number;
  hourly_rate: number;
  user_id: number;
  user_name: string;
  project_id: number;
  project_name: string;
  customer_id: number;
  customer_name: string;
  service_id: number;
  service_name: string;
  created_at: string;
  updated_at: string;
  tracking?: TrackingTimeEntry
}

export interface CreateTimeEntry {
  date_at?: string;
  minutes: number;
  service_id: number;
  project_id: number;
  note: string;
  user_id?: number;
  locked?: boolean;
}

export interface EditTimeEntry {
  date_at?: string;
  minutes?: number;
  service_id?: number;
  project_id?: number;
  note?: string;
  user_id?: number;
  locked?: boolean;
}