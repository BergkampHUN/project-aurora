import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import {
  CreateTimeEntry,
  EditTimeEntry,
  Project,
  ProjectResponseObj,
  Service,
  ServiceResponseObj,
  TimeEntry,
  TimeEntryResponseObj,
  TrackerObj,
  TrackerResponse,
  UserResponseObj,
} from '../interfaces/mite';

@Injectable({
  providedIn: 'root',
})
export class MiteService {
  private apiKey: string = '1d2c5ae826d391e2';
  // private domain: string = 'https://projectaurora.mite.yo.lk'
  private headers: HttpHeaders;
  private baseUrl: string = '';
  private pollInterval: number = 10000;
  private _currentTracker: BehaviorSubject<TrackerObj> = new BehaviorSubject({});

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = '/mite';
    }

    // TODO: make this as a setHeaders function / later to an http interceptor
    this.headers = new HttpHeaders().set('X-MiteApiKey', this.apiKey);

    this.updateTracker();
  }

  public getProjects(): Observable<Project[]> {
    // TODO: mapping the responses later to remove the object keys
    return this.http
      .get<ProjectResponseObj[]>(`${this.baseUrl}/projects.json`, {
        headers: this.headers,
      })
      .pipe(
        map((projectsArray) => {
          return projectsArray.map((projectObj) => projectObj.project);
        })
      );
  }

  public getServices(): Observable<Service[]> {
    // TODO: mapping the responses later to remove the object keys
    return this.http
      .get<ServiceResponseObj[]>(`${this.baseUrl}/services.json`, {
        headers: this.headers,
      })
      .pipe(
        map((servicesArray) => {
          return servicesArray.map((serviceObj) => serviceObj.service);
        })
      );
  }

  public getTracker(): Observable<TrackerResponse> {
    return this.http.get<TrackerResponse>(`${this.baseUrl}/tracker.json`, {
      headers: this.headers,
    });
  }

  public startTracker(id: number, tracker: TrackerResponse): Observable<TrackerResponse> {
    return this.http
      .patch<TrackerResponse>(`${this.baseUrl}/tracker/${id}.json`, tracker, {
        headers: this.headers,
      })
      .pipe(tap((res) => this._currentTracker.next(res.tracker)));
  }

  public stopTracker(trackerId: number): Observable<TrackerResponse> {
    return this.http
      .delete<TrackerResponse>(`${this.baseUrl}/tracker/${trackerId}.json`, {
        headers: this.headers,
      })
      .pipe(tap((res) => this._currentTracker.next({})));
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

  private updateTracker(): void {
    this.getTracker().subscribe((tracker) => {
      this._currentTracker.next(tracker.tracker);
      setTimeout(() => this.updateTracker(), this.pollInterval);
    });
  }

  get currentTracker$(): Observable<TrackerObj> {
    return this._currentTracker.asObservable();
  }
}
