// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { 
    path: '', 
    component: DashboardComponent,
    children: [
       { path: 'events', component: EventListComponent },
        { path: 'events/edit/:id', component: EventFormComponent },
      { path: '', redirectTo: 'events', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/events' }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EventListComponent,
    EventFormComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }