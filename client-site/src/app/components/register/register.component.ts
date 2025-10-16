import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService, Event, RegistrationFormData } from '../../services/event.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone:false
})
export class RegisterComponent implements OnInit {
  event: Event | null = null;
  eventId: number | null = null;
  registrationForm: FormGroup;
  loading = false;
  submitted = false;
  success = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private formBuilder: FormBuilder
  ) {
    this.registrationForm = this.formBuilder.group({
      user_name: ['', [Validators.required, Validators.minLength(2)]],
      user_email: ['', [Validators.required, Validators.email]],
      contact_number: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      ticket_quantity: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    this.eventId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (this.eventId) {
      this.loadEventDetails(this.eventId);
    } else {
      this.errorMessage = 'No event ID provided.';
    }
  }

  loadEventDetails(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (event) => {
        this.event = event;
      },
      error: (error) => {
        console.error('Failed to get event details:', error);
        this.errorMessage = 'Unable to load event details.';
      }
    });
  }
    get f() {
    return this.registrationForm.controls;
  }

getFormControl(controlName: string) {
    return this.registrationForm.get(controlName);
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.getFormControl(controlName);
    return control ? control.hasError(errorName) && (control.dirty || control.touched || this.submitted) : false;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    // 如果表单无效，停止提交
    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;

    const registrationData: RegistrationFormData = {
      event_id: this.eventId!,
      ...this.registrationForm.value
    };

    this.eventService.submitRegistration(registrationData).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = true;
        // 3秒后自动跳转回事件详情页
        setTimeout(() => {
          this.router.navigate(['/description', this.eventId]);
        }, 3000);
      },
      error: (error) => {
        this.loading = false;
        console.error('Registration error:', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }

  formatDate(dateString: string): string {
    return this.eventService.formatDate(dateString);
  }

  goBack(): void {
    this.router.navigate(['/description', this.eventId]);
  }
}