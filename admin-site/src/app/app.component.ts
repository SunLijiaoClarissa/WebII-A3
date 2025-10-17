import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  title = 'Event Management Admin';
}