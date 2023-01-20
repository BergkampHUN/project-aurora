import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateTimeEntry,
  EditTimeEntry,
  ProjectResponseObj,
  ServiceResponseObj,
  TimeEntryResponseObj,
  TrackerResponse,
  UserResponseObj,
} from '../interfaces/mite';

@Injectable({
  providedIn: 'root',
})
export class MiteService {
  private apiKey: string = '493e5543c9fb5356';
  // private domain: string = 'https://projectaurora.mite.yo.lk'
  private headers: HttpHeaders;
  private baseUrl: string = '';

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = '/mite';
    }

    // TODO: make this as a setHeaders function / later to an http interceptor
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-MiteApiKey', this.apiKey);
  }

  public getProjects(): Observable<ProjectResponseObj[]> {
    // TODO: mapping the responses later to remove the object keys
    return this.http.get<ProjectResponseObj[]>(`${this.baseUrl}/projects.json`, {
      headers: this.headers,
    });
  }

  public getServices(): Observable<ServiceResponseObj[]> {
    // TODO: mapping the responses later to remove the object keys
    return this.http.get<ServiceResponseObj[]>(`${this.baseUrl}/services.json`, {
      headers: this.headers,
    });
  }

  public getTracker(): Observable<TrackerResponse> {
    return this.http.get<TrackerResponse>(`${this.baseUrl}/tracker.json`, {
      headers: this.headers,
    });
  }

  public startTracker(id: number, tracker: TrackerResponse): Observable<TrackerResponse> {
    return this.http.patch<TrackerResponse>(`${this.baseUrl}/tracker/${id}.json`, tracker, {
      headers: this.headers,
    });
  }

  public stopTracker(tracker: TrackerResponse): Observable<TrackerResponse> {
    return this.http.delete<TrackerResponse>(
      `${this.baseUrl}/tracker/${tracker.tracker.tracking_time_entry?.id}.json`,
      { headers: this.headers }
    );
  }

  public getTimeEntries(date?: string): Observable<TimeEntryResponseObj[]> {
    let queryParams = new HttpParams();
    if (date) {
      queryParams = queryParams.set('at', date);
    }
    return this.http.get<TimeEntryResponseObj[]>(`${this.baseUrl}/time_entries.json`, {
      headers: this.headers,
      params: queryParams,
    });
  }

  public getTimeEntry(id: number): Observable<TimeEntryResponseObj> {
    return this.http.get<TimeEntryResponseObj>(`${this.baseUrl}/time_entries/${id}.json`, {
      headers: this.headers,
    });
  }

  public createTimeEntry(timeEntry: CreateTimeEntry): Observable<TimeEntryResponseObj> {
    return this.http.post<TimeEntryResponseObj>(`${this.baseUrl}/time_entries.json`, timeEntry, {
      headers: this.headers,
    });
  }

  public editTimeEntry(id: number, timeEntry: EditTimeEntry): Observable<TimeEntryResponseObj> {
    return this.http.patch<TimeEntryResponseObj>(
      `${this.baseUrl}/time_entries/${id}.json`,
      timeEntry,
      { headers: this.headers }
    );
  }

  public deleteTimeEntry(id: number): Observable<TimeEntryResponseObj> {
    return this.http.delete<TimeEntryResponseObj>(`${this.baseUrl}/time_entries/${id}.json`, {
      headers: this.headers,
    });
  }

  public getMyself(): Observable<UserResponseObj> {
    return this.http.get<UserResponseObj>(`${this.baseUrl}/myself.json`, { headers: this.headers });
  }
}
