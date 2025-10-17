// components/event-list/event-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  standalone: false
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  loading = false; 
  errorMessage = '';

  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load events:', error);
        this.errorMessage = 'Failed to load events. Please try again.';
        this.loading = false;
      }
    });
  }

  createNewEvent(): void {
    this.router.navigate(['/events/new']);
  }

  editEvent(eventId: number): void {
    this.router.navigate(['/events/edit', eventId]);
  }

  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          this.events = this.events.filter(event => event.id !== eventId);
        },
        error: (error) => {
          console.error('Failed to delete event:', error);
          if (error.status === 500 && error.error?.error?.includes('registrations')) {
            this.errorMessage = 'Cannot delete event because it has existing registrations.';
          } else {
            this.errorMessage = 'Failed to delete event. Please try again.';
          }
        }
      });
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'active': return 'badge-active';
      case 'past': return 'badge-past';
      case 'suspended': return 'badge-suspended';
      default: return 'badge-default';
    }
  }

  formatDate(dateString: string): string {
    return this.eventService.formatDate(dateString);
  }
}