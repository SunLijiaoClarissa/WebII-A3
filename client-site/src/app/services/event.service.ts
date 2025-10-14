import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  target: string;
  status: number;
  category_name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3060/api';

  constructor(private http: HttpClient) { }

  // get all event
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events`);
  }

  // search event
  searchEvents(params: any): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/search`, { params });
  }

  // get event detail by id
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/events/${id}`);
  }

  // event status category
  categorizeEvents(events: Event[]): { current: Event[], coming: Event[], finish: Event[] } {
    const today = new Date();
    const result = {
      current: [] as Event[],
      coming: [] as Event[],
      finish: [] as Event[]
    };

    events.forEach(event => {
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);
      
      if (endDate < today) {
        result.finish.push(event);
      } else if (startDate <= today && endDate >= today) {
        result.current.push(event);
      } else if (startDate > today) {
        result.coming.push(event);
      }
    });

    return result;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}