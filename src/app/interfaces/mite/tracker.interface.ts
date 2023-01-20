export interface TrackerResponse {
  tracker: TrackerObj;
}

export interface TrackerObj {
  tracking_time_entry?: TrackingTimeEntryWithId;
}

export interface TrackingTimeEntry {
  minutes: number;
  since?: string;
}

export interface TrackingTimeEntryWithId extends TrackingTimeEntry {
  id: number;
}