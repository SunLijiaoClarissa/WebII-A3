// services/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event, Category, Registration } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3060/admin';

  constructor(private http: HttpClient) { }

  // get all event
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events`);
  }

  // get event by id
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/events/${id}`);
  }

  // create event
  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/event`, eventData);
  }

  // update event
  updateEvent(eventId: number, eventData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/event/${eventId}`, eventData);
  }

  // delete event
  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/event/${eventId}`);
  }

  // category
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  // get event regist
  getEventRegistrations(eventId: number): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.apiUrl}/events/${eventId}/registrations`);
  }

  
  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
}