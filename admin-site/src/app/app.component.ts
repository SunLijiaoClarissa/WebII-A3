// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { 
    path: '', 
    component: AdminDashboardComponent,
    children: [

    ]
  },
  { path: '**', redirectTo: '/events' }
];

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,

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