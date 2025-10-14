import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  //tab
  currentTab: string = 'current';
  events = {
    current: [] as Event[],
    coming: [] as Event[],
    finish: [] as Event[]
  };
  
constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        const activeEvents = data.filter(event => event.status === 1);
        this.events = this.eventService.eventStatus(activeEvents);
      },
      error: (error) => {
        console.error('Failed to get events data', error);
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
    return this.eventService.formatDate(dateString);
  }
  
  getCurrentEvents(): Event[] {
    return this.events[this.currentTab as keyof typeof this.events];
  }

  isFinishedTab(): boolean {
    return this.currentTab === 'finish';
  }
}