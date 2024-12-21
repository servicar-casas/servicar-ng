export type Housing = House | Apartment

interface Common {
    location: string;
    bedrooms: number;
    bathrooms: number;
    size: number;
    price: number;
    parkingSpaces: number;
    pool: boolean;
    yearBuilt?: number;
    petFriendly: boolean;
}

export interface House extends Common {
    garden: boolean;
}

export interface Apartment extends Common {
    balcony: boolean;
    parkingSpaces: number;
}
