import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, Event } from '../../services/event.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  standalone:false
})
export class DescriptionComponent implements OnInit {
  event: Event | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.loadEventDetails();
  }

  loadEventDetails(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    
    if (!eventId) {
      this.errorMessage = 'No event ID provided.';
      return;
    }

    this.loading = true;
    const id = parseInt(eventId, 10);

    this.eventService.getEventById(id).subscribe({
      next: (event) => {
        this.event = event;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to get event details:', error);
        this.errorMessage = 'Unable to get event details.';
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    return this.eventService.formatDate(dateString);
  }

}