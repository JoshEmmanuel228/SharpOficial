export interface IOrder {
    _id?: string;
    user: {
        fullName: string;
        email: string;
        address: string;
        city: string;
        zipCode: string;
        phone: string;
        deliveryDate: string;
        deliveryTime: string;
        deliveryStation: string;
    };
    cartItems: [
        {
            name: string;
            quantity: number;
            price: number;
            imageUrls: string[];
            size?: string;
            id: string;
        }
    ];
    total: number;
    paymentMethod: string;
    status: string;
    createdAt?: string;
}
