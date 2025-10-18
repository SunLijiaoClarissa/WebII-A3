import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Category, Event, Oraganizations } from '../../models/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
  standalone: false
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  categories: Category[] = [];
  organizations: Oraganizations[] = [];
  loading = false;
  submitted = false;
  isEditMode = false;
  eventId: number | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {
    this.eventForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadOrganizations();
    this.eventId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.eventId;

    if (this.isEditMode && this.eventId) {
      this.loadEventDetails(this.eventId);
    }
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      location: ['', Validators.required],
      organizer_id: [1, Validators.required],
      category_id: ['', Validators.required],
      ticket_price: [0, [Validators.required, Validators.min(0)]],
      target: ['10000.00', Validators.required],
      current_amount: [0],
      status: [1, Validators.required]
    });
  }

  loadCategories(): void {
    this.eventService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Failed to load categories:', error);
        this.errorMessage = 'Failed to load categories.';
      }
    });
  }

  loadOrganizations(): void {
    this.eventService.getOrganizations().subscribe({
      next: (organizations) => {
        this.organizations = organizations;
      },
      error: (error) => {
        console.error('Failed to load organizations:', error);
        this.errorMessage = 'Failed to load organizations.';
      }
    });
  }

  loadEventDetails(eventId: number): void {
    this.loading = true;
    this.eventService.getEventById(eventId).subscribe({
      next: (event) => {
        this.eventForm.patchValue({
          title: event.title,
          description: event.description,
          start_date: this.formatDateForInput(event.start_date),
          end_date: this.formatDateForInput(event.end_date),
          location: event.location,
          organizer_id: event.organizer_id,
          organizer_name: event.organizer_name,
          organizer_email: event.organizer_email,
          category_id: event.category_id,
          category_name: event.category_name,
          ticket_price: event.ticket_price || 0,
          target: event.target,
          current_amount: event.current_amount || 0,
          status: event.status || 1
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load event:', error);
        this.errorMessage = 'Failed to load event details.';
        this.loading = false;
      }
    });
  }

  formatDateForInput(dateString: string): string {
    return new Date(dateString).toISOString().split('T')[0];
  }

  get f() {
    return this.eventForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.eventForm.invalid) {
      return;
    }

    this.loading = true;
    const formData = this.eventForm.value;

    formData.organizer_id = Number(formData.organizer_id);
    formData.category_id = Number(formData.category_id);
    formData.ticket_price = Number(formData.ticket_price);
    formData.current_amount = Number(formData.current_amount);
    formData.status = Number(formData.status);

    if (this.isEditMode && this.eventId) {
      this.eventService.updateEvent(this.eventId, formData).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Event updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/events']);
          }, 1500);
        },
        error: (error) => {
          console.error('Failed to update event:', error);
          this.errorMessage = 'Failed to update event. Please try again.';
          this.loading = false;
        }
      });
    } else {
      this.eventService.createEvent(formData).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Event created successfully!';
          setTimeout(() => {
            this.router.navigate(['/events']);
          }, 1500);
        },
        error: (error) => {
          console.error('Failed to create event:', error);
          this.errorMessage = 'Failed to create event. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/events']);
  }
}