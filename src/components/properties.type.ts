export interface Property {
    id: string;
    address: string;
    suburb: string;
    city: string;
    predicted_status: string;
    confidence_score: number;
    price: number;
    predicted_price: number;
    category: string;
    last_sold_price: number;
    last_sold_date: string;
    property_history: string;
    year_built: number;
    bedrooms: number;
    bathrooms: number;
    car_spaces: number;
    floor_size: number;
    land_area: number;
    capital_value: number;
    land_value: number;
    improvement_value: number;
    has_rental_history: boolean;
    is_currently_rented: boolean;
    predicted_at: string;
    image_url?: string;
  }
  