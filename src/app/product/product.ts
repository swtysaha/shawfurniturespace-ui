export interface Product {
   
    name: string;
    price: number;
    description: string;
    quantity: number;
    warehouseId: Warehouses;
    productId: number;
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
