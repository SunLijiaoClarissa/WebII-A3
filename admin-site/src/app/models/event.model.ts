export interface Event {
  id?: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  organizer_name: string;
  organizer_email:string;
  category_id: number;
  category_name: string; 
  ticket_price?: string | number | null; 
  target: string;
  current_amount: string;
  status: number; 
}

export interface Category {
  id: number;
  name: string;
}

export interface Registration {
  id: number;
  event_id: number;
  user_name: string;
  user_email: string;
  contact_number: string;
  ticket_quantity: number;
  registration_date: string;
}