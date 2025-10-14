import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService, Event } from '../../services/event.service';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: false
})

export class SearchComponent implements OnInit {
  categories: Category[] = [];
  events: Event[] = [];
  loading = false;
  errorMessage = '';

  // filter form
  dateFrom = '';
  dateTo = '';
  location = '';
  selectedCategory = '';

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Failed to load categories:', error);
        this.errorMessage = 'Failed to load categories. Please try again later.';
      }
    });
  }

  clearFilters(): void {
    this.dateFrom = '';
    this.dateTo = '';
    this.location = '';
    this.selectedCategory = '';
    this.events = [];
    this.errorMessage = '';
  }

  async searchEvents(): Promise<void> {
    this.errorMessage = '';

    // Check criteria
    const hasSearchCriteria = this.dateFrom || this.dateTo || this.location || this.selectedCategory;

    if (!hasSearchCriteria) {
      this.errorMessage = 'Please select at least one search criteria.';
      return;
    }

    this.loading = true;
    this.events = [];


    // query parameters
    const params: any = {};

    if (this.dateFrom) params.dateFrom = this.dateFrom;
    if (this.dateTo) params.dateTo = this.dateTo;
    if (this.location) params.location = this.location;
    if (this.selectedCategory) params.categoryId = this.selectedCategory;

    this.eventService.searchEvents(params).subscribe({
      next: (events) => {
        this.events = events;
        if (this.events.length === 0) {
          this.errorMessage = 'No events found. Please try different search criteria.';
        }
      },
      error: (error) => {
        console.error('Search error:', error);
        this.errorMessage = 'Failed to search events. Please try again later.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  viewDetails(eventId: number): void {
    this.router.navigate(['/description', eventId]);
  }
}