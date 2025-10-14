import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  target: string;
  category_name: string;
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone:false
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
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.http.get<Category[]>('http://localhost:3060/api/categories')
      .subscribe({
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

    try {
      // query parameters
      const params: any = {};

      if (this.dateFrom) params.dateFrom = this.dateFrom;
      if (this.dateTo) params.dateTo = this.dateTo;
      if (this.location) params.location = this.location;
      if (this.selectedCategory) params.categoryId = this.selectedCategory;

      const response = await this.http.get<Event[]>('http://localhost:3060/api/search', { params }).toPromise();

      if (response) {
        this.events = response;
        if (this.events.length === 0) {
          this.errorMessage = 'No events found. Please try different search criteria.';
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      this.errorMessage = 'Failed to search events. Please try again later.';
    } finally {
      this.loading = false;
    }
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  viewDetails(eventId: number): void {
    this.router.navigate(['/description', eventId]);
  }
}