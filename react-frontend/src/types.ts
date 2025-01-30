import { Dayjs } from "dayjs";

export type Slot = {
    id: string;
    startDate: Dayjs;
    isBooked?: string;
    bookedCustomerName?: string;
}

export type Flag = {
    content: string,
    severity: string
}