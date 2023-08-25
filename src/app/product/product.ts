export interface Product {
    productId: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    warehouseId: Warehouses;
}

interface RatingProps {
    rate: number;
    count: number;
}

interface Warehouses {
    id: number;
    capacity: number;
    location: string;
    availableSpace: number;
   
}
