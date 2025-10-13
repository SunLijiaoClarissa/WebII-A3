import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  target: string;
  status: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  currentTab: string = 'current';
  events = {
    current: [] as Event[],
    coming: [] as Event[],
    finish: [] as Event[]
  };
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.http.get<Event[]>('http://localhost:3060/api/events')
      .subscribe({
        next: (data) => {
          //获取活动状态为1的事件
          const activeEvents = data.filter(event => event.status === 1);
          this.categorizeEvents(activeEvents);
        },
        error: (error) => {
          console.error('Failed to get events data', error);
        }
      });
  }

  // status category by date
  categorizeEvents(events: Event[]): void {
    const today = new Date();
    
    this.events.current = [];
    this.events.coming = [];
    this.events.finish = [];
    
    events.forEach(event => {
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);
      
      // switch by current day
      if (endDate < today) {
        this.events.finish.push(event);
      } else if (startDate <= today && endDate >= today) {
        this.events.current.push(event);
      } else if (startDate > today) {
        this.events.coming.push(event);
      }
    });
  }

  switchTab(tab: string): void {
    this.currentTab = tab;
  }

  getStatusClass(type: string): string {
    switch(type) {
      case 'current': return 'status-current';
      case 'coming': return 'status-coming';
      case 'finish': return 'status-finish';
      default: return '';
    }
  }

  getStatusLabel(type: string): string {
    switch(type) {
      case 'current': return 'Ongoing';
      case 'coming': return 'Upcoming';
      case 'finish': return 'Finished';
      default: return '';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getCurrentEvents(): Event[] {
    return this.events[this.currentTab as keyof typeof this.events];
  }

  isFinishedTab(): boolean {
    return this.currentTab === 'finish';
  }
}