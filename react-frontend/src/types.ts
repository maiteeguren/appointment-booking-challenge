export type Slot = {
    id: string;
    startDate: string;
    isBooked?: string;
    bookedCustomerName?: string;
}

export type Flag = {
    content: string,
    severity: any
}