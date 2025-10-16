import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService, Event, Registration } from '../../services/event.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  standalone: false
})
export class DescriptionComponent implements OnInit {
  event: Event | null = null;
  registrations: Registration[] = [];
  loading = false;
  loadingRegistrations = false;
  errorMessage = '';
  eventId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
        this.loadRegistrations(id);
      },
      error: (error) => {
        console.error('Failed to get event details:', error);
        this.errorMessage = 'Unable to get event details.';
        this.loading = false;
      }
    });
  }


  loadRegistrations(id:number): void {
    // if (!this.eventId) {
    //   console.log("no id");
    //   return;
    // }
    console.log(id);

    this.loadingRegistrations = true;

    this.eventService.getRegistrationsByEventId(id).subscribe({
      next: (registrations) => {
        this.registrations = registrations;
        this.loadingRegistrations = false;
      },
      error: (error) => {
        console.error('Failed to get registrations:', error);
        this.loadingRegistrations = false;
      }
    });
  }


  formatDate(dateString: string): string {
    return this.eventService.formatDate(dateString);
  }

  navigateToRegistration(): void {
    if (this.eventId) {
      this.router.navigate(['/register', this.eventId]);
    }
  }

  hasRegistrations(): boolean {
    return this.registrations && this.registrations.length > 0;
  }
}